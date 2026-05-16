import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <>
      {/* Add NavBar here ie. drawer */}
      <Outlet />
    </>
  );
}
