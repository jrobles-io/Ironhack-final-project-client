import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EventListPage from "./pages/EventListPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="h-screen">
      <Navbar />

      <div className="pt-10">
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route element={<LoggedIn />}>
            <Route exact path="/events" element={<EventListPage />} />
            <Route
              exact
              path="/events/edit/:eventId"
              element={<EditEventPage />}
            />
            <Route
              exact
              path="/events/:eventId"
              element={<EventDetailsPage />}
            />
          <Route
              exact
              path="/checkout"
              element={<CheckoutPage />}
            />
          </Route>
          

          <Route element={<NotLoggedIn />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
