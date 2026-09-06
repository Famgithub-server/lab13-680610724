// STEP 9 — Modal: ฟอร์มเพิ่ม task (ดู README: STEP 9)
// เป็น "Controlled Component" — ค่าใน <input> ถูกกำหนดโดย state
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // STEP 9: pnpm add uuid
import { type TaskCardProps } from "../libs/Todolist";

type props = {
  onAdd: (todo: TaskCardProps) => void;
};

export default function Modal({ onAdd }: props) {
  // STEP 9 — 1 state ต่อ 1 ช่องกรอก
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      const newtodo: TaskCardProps = {
        id: uuidv4(),
        title,
        description,
        isDone: false,
      };
      onAdd(newtodo);
      // STEP 9 — reset ฟอร์มด้วยการ set state กลับเป็นค่าว่าง
      setTitle("");
      setDescription("");
    }
  };

  // STEP 9 — onChange: อ่านค่าล่าสุดจาก event.target.value (string เสมอ)
  const titleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const descriptionOnchange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <div className="modal fade" id="todoModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Todo List</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* STEP 9 — Input: value ผูกกับ state + onChange อัปเดต state */}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title Todo"
              value={title}
              onChange={titleOnchange}
            />
            <textarea
              className="form-control"
              placeholder="description..."
              value={description}
              onChange={descriptionOnchange}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              id="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
