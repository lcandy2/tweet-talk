import { localExtStorage } from "@webext-core/storage";

const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const GA_DEBUG_ENDPOINT = "https://www.google-analytics.com/debug/mp/collect";

// Get via https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const API_SECRET = import.meta.env.VITE_GA_API_SECRET;
const DEFAULT_ENGAGEMENT_TIME_MSEC = 100;

// Duration of inactivity after which a new session is created
const SESSION_EXPIRATION_IN_MIN = 30;

interface SessionData {
  session_id: string;
  timestamp: string;
}

interface AnalyticsEvent {
  name: string;
  params: Record<string, any>;
}

class Analytics {
  private debug: boolean;

  constructor(debug = false) {
    this.debug = debug;
  }

  // Returns the client id, or creates a new one if one doesn't exist.
  // Stores client id in local storage to keep the same client id as long as
  // the extension is installed.
  private async getOrCreateClientId(): Promise<string> {
    let { clientId } = await localExtStorage.getItem("clientId");
    if (!clientId) {
      // Generate a unique client ID, the actual value is not relevant
      clientId = self.crypto.randomUUID();
      await localExtStorage.setItem("clientId", { clientId });
    }
    return clientId;
  }

  // Returns the current session id, or creates a new one if one doesn't exist or
  // the previous one has expired.
  private async getOrCreateSessionId(): Promise<string> {
    // Use storage.session because it is only in memory
    let { sessionData } = await localExtStorage.getItem("sessionData");
    const currentTimeInMs = Date.now();
    // Check if session exists and is still valid
    if (sessionData && sessionData.timestamp) {
      // Calculate how long ago the session was last updated
      const durationInMin = (currentTimeInMs - sessionData.timestamp) / 60000;
      // Check if last update lays past the session expiration threshold
      if (durationInMin > SESSION_EXPIRATION_IN_MIN) {
        // Clear old session id to start a new session
        sessionData = null;
      } else {
        // Update timestamp to keep session alive
        sessionData.timestamp = currentTimeInMs;
        await localExtStorage.setItem("sessionData", { sessionData });
      }
    }
    if (!sessionData) {
      // Create and store a new session
      sessionData = {
        session_id: currentTimeInMs.toString(),
        timestamp: currentTimeInMs.toString(),
      };
      await localExtStorage.setItem("sessionData", { sessionData });
    }
    return sessionData.session_id;
  }

  // Fires an event with optional params. Event names must only include letters and underscores.
  async fireEvent(
    name: string,
    params: Record<string, any> = {},
  ): Promise<void> {
    // Configure session id and engagement time if not present, for more details see:
    // https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
    if (!params.session_id) {
      params.session_id = await this.getOrCreateSessionId();
    }
    if (!params.engagement_time_msec) {
      params.engagement_time_msec = DEFAULT_ENGAGEMENT_TIME_MSEC;
    }

    try {
      const response = await fetch(
        `${
          this.debug ? GA_DEBUG_ENDPOINT : GA_ENDPOINT
        }?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
        {
          method: "POST",
          body: JSON.stringify({
            client_id: await this.getOrCreateClientId(),
            events: [
              {
                name,
                params,
              },
            ],
          }),
        },
      );
      if (!this.debug) {
        return;
      }
      console.log(await response.text());
    } catch (e) {
      console.error("Google Analytics request failed with an exception", e);
    }
  }

  // Fire a page view event.
  async firePageViewEvent(
    pageTitle: string,
    pageLocation: string,
    additionalParams: Record<string, any> = {},
  ): Promise<void> {
    return this.fireEvent("page_view", {
      page_title: pageTitle,
      page_location: pageLocation,
      ...additionalParams,
    });
  }

  // Fire an error event.
  async fireErrorEvent(
    error: Error,
    additionalParams: Record<string, any> = {},
  ): Promise<void> {
    // Note: 'error' is a reserved event name and cannot be used
    // see https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#reserved_names
    return this.fireEvent("extension_error", {
      ...this.serializeError(error),
      ...additionalParams,
    });
  }

  private serializeError(error: Error): Record<string, any> {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
}
``;
export default new Analytics();
