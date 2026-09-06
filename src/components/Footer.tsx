// STEP 4 — Footer ด้านล่าง (ดู README: STEP 4)
import { type FooterProps } from "../libs/Footer";
export default function Footer({ year, fullName, studentId }: FooterProps) {
  return (
    <footer className="align-self-end  text-center w-100">
      <p className="text-white bg-secondary p-4 m-0">
        Copyright © {year} {fullName} {studentId}
      </p>
    </footer>
  );
}
