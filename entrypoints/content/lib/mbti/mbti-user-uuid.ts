import { v5 as uuidv5 } from "uuid";

export function getMBTIUserUUID(): string {
  const pageUsernameElement = document.querySelector<HTMLElement>(
    'div[data-testid="UserName"] div[dir="ltr"] span',
  );
  const pageUsername = pageUsernameElement?.textContent ?? "";
  const pageUserJoinDateElement = document.querySelector<HTMLSpanElement>(
    'span[data-testid="UserJoinDate"] > span',
  );
  const pageUserJoinDate = pageUserJoinDateElement?.textContent ?? "";
  if (!pageUsername || !pageUserJoinDate) {
    console.log(
      "Couldn't find the page username. Make sure you're on a user's profile page.",
    );
    return "";
  }
  const userId = `${pageUsername}-${pageUserJoinDate}`;
  const NAMESPACE_UUID = "98338a03-a616-4b66-9505-a1d03fb8c061";
  const userUUID = uuidv5(userId, NAMESPACE_UUID);
  return userUUID;
}
