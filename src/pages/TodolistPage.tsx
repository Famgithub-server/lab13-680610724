import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { type TaskCardProps } from "../libs/Todolist";
import TodoModal from "../components/Modal";

const STORAGE_KEY = "lecture13.tasks";
const defaultTasks: TaskCardProps[] = [];

function loadTasks(): TaskCardProps[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : defaultTasks;
    } catch {
        return defaultTasks; // เผื่อข้อมูลใน localStorage เสีย
    }
}


// ข้อมูลตั้งต้น
export default function TodolistPage() {
    // tasks = ค่าปัจจุบัน , setTasks = ฟังก์ชันสั่งเปลี่ยนค่า
    const [tasks, setTasks] = useState<TaskCardProps[]>(loadTasks);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

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

    const count = tasks.filter((t) => t.isDone).length;

    return (
        <div className="container text-center">
            <h2 className="mt-3">Todo List</h2>
            <div className="card shadow-sm p-3 mb-5 mx-auto" style={{ maxWidth: "365px" }}>
                <div className="d-flex justify-content-between text-muted small fw-semibold mb-1">
                    <span>Total: {tasks.length}</span>
                    <span className="text-success">Done: {count}</span>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                            width: `${tasks.length > 0 ? (count / tasks.length) * 100 : 0}%`,
                        }}
                    />
                </div>
            <button
                className="btn btn-primary my-3"
                data-bs-toggle="modal"
                data-bs-target="#todoModal"
            >
                Add
            </button>
            </div>
            <TodoModal onAdd={handleAdd} />
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
