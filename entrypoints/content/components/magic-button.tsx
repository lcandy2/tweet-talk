import ShinyButton from "@/entrypoints/content/components/magicui/shiny-button";
interface MagicButtonProps {
  onClick: () => void;
}

export function MagicButton({ onClick }: MagicButtonProps) {
  return (
    <ShinyButton
      onClick={onClick}
      text="test"
    >
    </ShinyButton>
  );
}