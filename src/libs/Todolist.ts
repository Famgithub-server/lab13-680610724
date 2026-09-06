// STEP 7 — type ของ task 1 อัน (ใช้ร่วมกันทั้ง TodolistPage / TaskCard / Modal)
interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

export type { TaskCardProps };
