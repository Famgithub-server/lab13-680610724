import { type SidebarProps } from "../libs/Sidebar";
import { Link } from "react-router";

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
              <a className="nav-link active" href="/">
                <span className="d-md-inline px-2">Home</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="d-md-inline px-2">My Stuffs</span>
              </a>
              <ul className="dropdown-menu p-2">
                <li>
                  <Link className="nav-link active" to="/my/todolistpage">
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
          {userName} :{type}
        </p>
      </div>
    </aside>
  );
}
