// STEP 4 — type ของ props ที่ Sidebar รับ
interface SidebarProps  {
  userName: string;
  type?: "admin" |"student";
}
export type { SidebarProps };