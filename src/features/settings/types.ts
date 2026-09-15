import type { CefrLevel } from "@/config/cefr";
import type { DailyGoalMinutes, PreferredLearningTime } from "./constants";

export type SettingsUser = {
  name: string;
  email: string;
  cefrLevel: CefrLevel | null;
  dailyGoalMinutes: DailyGoalMinutes;
  preferredLearningTime: PreferredLearningTime | null;
};
