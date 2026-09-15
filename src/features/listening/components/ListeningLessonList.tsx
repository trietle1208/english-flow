import { Headphones } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { listListeningLessons } from "../queries";
import { ListeningLessonCard } from "./ListeningLessonCard";

type ListeningLessonListProps = {
  userId: string;
};

export async function ListeningLessonList({ userId }: ListeningLessonListProps) {
  const lessons = await listListeningLessons(userId);

  if (lessons.length === 0) {
    return (
      <EmptyState
        icon={Headphones}
        title="No listening lessons yet"
        description="Listening practice will appear here once content is seeded."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson) => (
        <ListeningLessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
