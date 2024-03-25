import { NavLink } from "react-router-dom";
import PayQRCode from "../components/PayQRCode";

export default function PayPage() {
  return (
    <div className="mx-40 my-10">
      <div className="mb-8">
        <NavLink to="/">메인페이지로 이동</NavLink>
      </div>
      <PayQRCode />
    </div>
  );
}
