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