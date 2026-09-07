ชื่อ-สกุล : ศุภัชโชค พิมสาน
รหัส นศ.: 680610724

# lecture13 : React 2 — Route · Layout · useState(hook) · useEffect(hook) · localStorage

---

## STEP 0 — เตรียมโปรเจกต์

```bash
pnpm install
pnpm run dev
```

---

## STEP 1 — ติดตั้ง react-router

```bash
pnpm add react-router
```

**ทำไมต้องมี router?**
เว็บแบบ SPA (Single Page Application) มีไฟล์ HTML จริงแค่ **หน้าเดียว** (`index.html`)
การ "เปลี่ยนหน้า" ที่เราเห็น จริง ๆ คือ JavaScript สลับ component ที่วาดอยู่ ตามค่า URL ปัจจุบัน
โดย **ไม่โหลดหน้าใหม่จาก server** → เร็ว และ state ในหน่วยความจำไม่หาย
`react-router` คือตัวที่ทำหน้าที่จับคู่ **URL → component ไหนควรแสดง**

**ศึกษาเพิ่มเติม**
https://www.w3schools.com/react/react_router.asp

---

## STEP 2 — ประกาศ Route

**2.1** สร้าง `src/pages/HomePage.tsx`

```tsx
export default function HomePage() {
  return <h2>Home</h2>;
}
```

**2.2** สร้าง `src/routes.tsx`

```tsx
import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";

// รายการ route ทั้งหมดของแอป
export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      // เข้า http://localhost:5173/ -> แสดง <HomePage />
      { index: true, element: <HomePage /> },
    ],
  },
]);
```

**2.3** แก้ `src/main.tsx` — เปลี่ยนจาก `<App />` เป็น `<RouterProvider>`

```tsx
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

**2.4** ลบ `src/App.tsx` ทิ้งได้ (ไม่ถูกใช้แล้ว)

---

## STEP 3 — Layout ที่อยู่คงที่ทุกหน้า ด้วย `<Outlet />`

มีโครงหน้า (คอลัมน์ซ้าย/ขวา) ที่ทุก route ใช้ร่วมกัน

**3.1** สร้าง `src/layout/MainLayout.tsx`

```tsx
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="container-fluid min-vh-100">
      <div className="row h-100">
        {/* คอลัมน์ซ้าย — เดี๋ยว STEP 4 จะเอา Sidebar มาใส่ */}
        <div className="col-2 col-md-2 p-0 bg-primary" />

        {/* คอลัมน์ขวา — เนื้อหาหลัก */}
        <div className="col-10 col-md-10 p-0">
          <main className="flex-grow-1 p-4 min-vh-100">
            {/* <Outlet/> = ช่องที่ component ของ route ลูกจะมาแสดง */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
```

**3.2** แก้ `src/routes.tsx` — ให้ `MainLayout` เป็น `element` ของ path `/` และเตรียม path `/my` ไว้

```tsx
import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // โครงหน้า
    children: [
      { index: true, element: <HomePage /> }, // "/" -> HomePage อยู่ใน <Outlet/> ของ MainLayout
    ],
  },
  {
    path: "/my",
    element: <MainLayout />,
    children: [
      // { path: "todolistpage", element: <TodolistPage /> },  // จะเปิดใช้ที่ STEP 8
    ],
  },
]);
```

---

## STEP 4 — Sidebar / Header / Footer

**4.1** สร้าง type ของ props — `src/libs/Sidebar.ts`

```ts
interface SidebarProps {
  userName: string;
  type?: "admin" | "student"; // ? = ใส่หรือไม่ใส่ก็ได้
}
export type { SidebarProps };
```

`src/libs/Footer.ts`

```ts
interface FooterProps {
  year: string;
  fullName: string;
  studentId: string | number;
}
export type { FooterProps };
```

**4.2** `src/components/Header.tsx`

```tsx
export default function Header() {
  return (
    <header className="text-white bg-secondary p-2 w-100">
      <p className="m-4">lecture13</p>
    </header>
  );
}
```

**4.3** `src/components/Footer.tsx`

```tsx
import { type FooterProps } from "../libs/Footer";

// รับ props 3 ตัว แล้วเอามาแสดงในข้อความ Copyright
export default function Footer({ year, fullName, studentId }: FooterProps) {
  return (
    <footer className="align-self-end text-center w-100">
      <p className="text-white bg-secondary p-4 m-0">
        Copyright © {year} {fullName} {studentId}
      </p>
    </footer>
  );
}
```

**4.4** `src/components/Sidebar.tsx`

```tsx
import { Link } from "react-router"; //
import { type SidebarProps } from "../libs/Sidebar";

export default function Sidebar({ userName, type }: SidebarProps) {
  return (
    <aside
      className="d-flex align-items-start flex-column p-4 bg-primary min-vh-100"
      style={{ width: "auto", height: "100%", overflowY: "auto" }}
      data-bs-theme="dark"
    >
      <div className="flex-grow-1">
        <nav className="navbar align-items-start flex-column">
          <h3 className="navbar-brand">Todo List App</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* <Link> = เปลี่ยนหน้าโดยไม่ reload */}
              <Link className="nav-link" to="/">
                <span className="d-md-inline px-2">Home</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                <span className="d-md-inline px-2">MY Stuffs</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/my/todolistpage">
                    <span className="d-md-inline px-2">TodolistPage</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p className="text-white">
          {userName} : {type}
        </p>
      </div>
    </aside>
  );
}
```

**4.5** ใส่ทั้ง 3 ตัวลง `src/layout/MainLayout.tsx`

```tsx
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="container-fluid min-vh-100">
      <div className="row h-100">
        <div className="col-2 col-md-2 p-0">
          {/* แก้เป็นชื่อของตัวเอง */}
          <Sidebar userName="ชื่อของคุณ" type="student" />
        </div>
        <div className="col-10 col-md-10 p-0">
          <Header />
          <main className="flex-grow-1 p-4 min-vh-100">
            <Outlet />
          </main>
          {/* แก้เป็นชื่อ-รหัสของตัวเอง */}
          <Footer year="2026" fullName="ชื่อ-สกุล" studentId="รหัสนักศึกษา" />
        </div>
      </div>
    </div>
  );
}
```

---

## STEP 5 — หน้า Home + `<Link>`

`src/pages/HomePage.tsx`

```tsx
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="container text-center">
      <h2>Home</h2>
      <p className="text-muted">หน้าแรก — เลือกไปยังหน้าอื่น ๆ ได้จากที่นี่</p>
      <Link className="btn btn-primary mt-3" to="/my/todolistpage">
        ไปหน้า Todo List
      </Link>
    </div>
  );
}
```

---

## STEP 6 — หน้า 404 ด้วย `errorElement`

พิมพ์ URL มั่ว ๆ แล้วเจอหน้า error แทนจอขาว

**6.1** สร้าง `src/pages/ErrorPage.tsx`

```tsx
export default function ErrorPage() {
  return <div>ErrorPage 404</div>;
}
```

**6.2** ใส่ `errorElement` ในทุก branch ของ `src/routes.tsx`

```tsx
import ErrorPage from "./pages/ErrorPage";
// ...
{ path: "/",
element: <MainLayout />,
errorElement: <ErrorPage />,
children: [
  { index: true, element: <HomePage /> }
] },
{ path: "/my", element: <MainLayout />,
errorElement: <ErrorPage />,
children: [ /* ... */ ] },
```

เข้า http://localhost:5173/abcxyz เห็น "ErrorPage 404"

---

## STEP 7 — type ของ task + component `TaskCard`

**7.1** `src/libs/Todolist.ts`

```ts
// รูปร่างของ task 1 อัน (ใช้ร่วมกันทั้ง TodolistPage / TaskCard / Modal)
interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

export type { TaskCardProps };
```

**7.2** `src/components/TaskCard.tsx`

```tsx
interface props {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  deleteTaskFunc: (taskId: string) => void; // ฟังก์ชันที่แม่ส่งมา ให้เรียกตอนกด Delete
  toggleDoneTaskFunc: (taskId: string) => void; // ฟังก์ชันที่แม่ส่งมา ให้เรียกตอนกด Done
}

export default function TaskCard({
  id,
  title,
  description,
  isDone,
  deleteTaskFunc,
  toggleDoneTaskFunc,
}: props) {
  return (
    <div className="card mb-3">
      <div className="card-body row align-items-center">
        <div className="col-lg-4">
          {/* ถ้า isDone = true ให้ขีดฆ่าข้อความ */}
          <h5
            className={
              isDone ? "text-decoration-line-through card-title" : "card-title"
            }
          >
            {title}
          </h5>
        </div>
        <div className="col-lg-4">
          <p className="card-text">{description}</p>
        </div>
        <div className="col-lg-2">
          <button
            className="btn btn-success"
            onClick={() => toggleDoneTaskFunc(id)}
          >
            Done
          </button>
        </div>
        <div className="col-lg-2">
          <button className="btn btn-danger" onClick={() => deleteTaskFunc(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## STEP 8 — `TodolistPage` : `useState`

**8.1** สร้าง `src/pages/TodolistPage.tsx`

```tsx
import { useState } from "react";
import TaskCard from "../components/TaskCard";
import { type TaskCardProps } from "../libs/Todolist";

// ข้อมูลตั้งต้น
const defaultTasks: TaskCardProps[] = [
  {
    id: "1",
    title: "Read a book",
    description: "Vite + React + TS",
    isDone: false,
  },
  {
    id: "2",
    title: "Write code",
    description: "Finish project",
    isDone: false,
  },
  {
    id: "3",
    title: "Deploy app",
    description: "Push to Vercel",
    isDone: false,
  },
];

export default function TodolistPage() {
  // tasks = ค่าปัจจุบัน , setTasks = ฟังก์ชันสั่งเปลี่ยนค่า
  const [tasks, setTasks] = useState<TaskCardProps[]>(defaultTasks);

  // เพิ่ม: สร้าง "array ใหม่" จาก array เดิม + ตัวใหม่
  const handleAdd = (newTask: TaskCardProps) => setTasks([...tasks, newTask]);

  // ลบ: filter คืน array ใหม่ ที่เอาตัว id ตรงกันออก
  const deleteTask = (taskId: string) =>
    setTasks(tasks.filter((t) => t.id !== taskId));

  // toggle: map คืน array ใหม่ — ตัวที่ id ตรง สร้าง object ใหม่ที่สลับ isDone, ตัวอื่นคงเดิม
  const toggleDoneTask = (taskId: string) =>
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, isDone: !t.isDone } : t)),
    );

  return (
    <div className="container text-center">
      <h2>Todo List</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          isDone={task.isDone}
          deleteTaskFunc={deleteTask}
          toggleDoneTaskFunc={toggleDoneTask}
        />
      ))}
    </div>
  );
}
```

**8.2** เปิด route ใน `src/routes.tsx`

```tsx
import TodolistPage from "./pages/TodolistPage";
// ...ใน children ของ path "/my"
{ path: "todolistpage", element: <TodolistPage /> },
```

---

## STEP 9 — `Modal` : ฟอร์มเพิ่ม task (`onChange` / `e.target.value`)

**9.0** ติดตั้งตัวสร้าง id ไม่ซ้ำ

```bash
pnpm add uuid
```

**ศึกษาเพิ่มเติม**
https://www.npmjs.com/package/uuidv4

**9.1** สร้าง `src/components/Modal.tsx`

```tsx
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { type TaskCardProps } from "../libs/Todolist";

type props = { onAdd: (todo: TaskCardProps) => void };

export default function Modal({ onAdd }: props) {
  // 1 ช่องกรอก = 1 state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return; // กันเพิ่มงานที่ไม่มีชื่อ
    onAdd({ id: uuidv4(), title, description, isDone: false });
    setTitle(""); // เคลียร์ฟอร์ม = set state กลับเป็นค่าว่าง
    setDescription("");
  };

  return (
    <div className="modal fade" id="todoModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Todo</h5>
            <button className="btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="form-control"
              placeholder="description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**9.2** ใน `src/pages/TodolistPage.tsx` เพิ่มปุ่มเปิด modal + วาง `<TodoModal>`

```tsx
import TodoModal from "../components/Modal";
// ...ใน return, ใต้ <h2>Todo List</h2> ก่อน tasks.map(...)
<button
  className="btn btn-primary my-3"
  data-bs-toggle="modal"
  data-bs-target="#todoModal"
>
  Add
</button>
<TodoModal onAdd={handleAdd} />
```

---

## STEP 10 — `localStorage` + `useEffect` (refresh แล้วไม่หาย)

แก้ `src/pages/TodolistPage.tsx`

```tsx
import { useEffect, useState } from "react";

const STORAGE_KEY = "lecture13.tasks";

// อ่านค่าเก่าจาก localStorage (เก็บได้แค่ string จึงต้อง JSON.parse กลับเป็น array)
function loadTasks(): TaskCardProps[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks; // เผื่อข้อมูลใน localStorage เสีย
  }
}

export default function TodolistPage() {
  // ส่ง "ฟังก์ชัน" เข้า useState -> React เรียก loadTasks() แค่ครั้งเดียวตอน mount
  const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);

  // เซฟลง localStorage ทุกครั้งที่ tasks เปลี่ยน
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ...handleAdd / deleteTask / toggleDoneTask / allCount / doneCount เหมือนเดิม...
}
```

| เขียนแบบ                 | รันเมื่อไหร่                                    |
| ------------------------ | ----------------------------------------------- |
| `useEffect(fn)`          | ทุก render (ระวังวนไม่จบ)                       |
| `useEffect(fn, [])`      | ครั้งเดียว ตอน component ขึ้นจอครั้งแรก (mount) |
| `useEffect(fn, [tasks])` | ตอน mount + **ทุกครั้งที่ `tasks` เปลี่ยน**     |

อย่าเขียน `useEffect(() => setTasks(...))` โดยไม่มี dependency array — มันจะ set state → re-render → รัน effect → set state ... วนไม่จบ

---
