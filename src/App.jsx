import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Applayout from "./ui/Applayout";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<Applayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="account" element={<Account />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
