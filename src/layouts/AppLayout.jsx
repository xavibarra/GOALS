import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-background w-full">
      <main className="flex-1 flex justify-center px-4 pt-6 pb-28">
        <div className="w-full max-w-xl">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
