import { type SidebarProps } from "../libs/Sidebar";
import { Link } from "react-router";

export default function Sidebar({ userName, type }: SidebarProps) {
  return (
    <aside
      className="d-flex align-items-start flex-column p-4 bg-light min-vh-100"
      style={{ width: "auto", height: "100%", overflowY: "auto" }}
      data-bs-theme="dark"
    >
      <div className="flex-grow-1">
        <nav className="navbar align-items-start flex-column">
          <h3 className="navbar-brand text-dark">Todo List App</h3>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <span className="d-md-inline px-2 text-dark">Home</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" className="bi bi-house" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                </svg>

              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="d-md-inline px-2 text-dark">My Stuffs</span>
              <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="16 18 22 12 16 6"></polyline>
  <polyline points="8 6 2 12 8 18"></polyline>
</svg>
              </a>
              <ul className="dropdown-menu p-2">
                <li>
                  <Link className="nav-link active" to="/my/todolistpage">
                    <span className="d-md-inline px-2 text-white">TodolistPage</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p className="text-dark">
          {userName} :{type}
        </p>
      </div>
    </aside>
  );
}
