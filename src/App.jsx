import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import { useSession } from "./hooks/useSession";

import AppLayout from "./layouts/AppLayout";
import CountriesPage from "./pages/CountriesPage";
import GoalsPage from "./pages/GoalsPage";
import ProfilePage from "./pages/ProfilePage";
import RestaurantsPage from "./pages/RestaurantsPage";

export default function App() {
  const session = useSession();

  if (!session) return <Auth />;

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/goals" replace />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/countries" element={<CountriesPage />} />
      </Route>
    </Routes>
  );
}
