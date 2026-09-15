import type { SettingsUser } from "../types";
import { AccountSection } from "./AccountSection";
import { AppearanceSection } from "./AppearanceSection";
import { SettingsForm } from "./SettingsForm";

type SettingsPageContentProps = {
  user: SettingsUser;
};

/** Composes the four Settings sections (spec §22). */
export function SettingsPageContent({ user }: SettingsPageContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <SettingsForm user={user} />
      <AppearanceSection />
      <AccountSection />
    </div>
  );
}
