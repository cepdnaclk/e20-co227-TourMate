import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RoutePage from "./pages/RoutePage";
import HotelPage from "./pages/HotelPage";
import AddBookmarks from "./pages/bookmarks/AddBookmarks";
import PlanPage from "./pages/PlanPage";
import RestaurantPage from "./pages/RestaurantPage";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Box, Container } from "@mui/material";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Header />
          <Container component="main" sx={{ flex: 1 }}>
            <div>
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  {/* Add other protected routes here if needed */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/schedule-plan" element={<PlanPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/add-bookmarks" element={<AddBookmarks />} />
                </Route>
                <Route path="/" element={<Home />} />{" "}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/find-route" element={<RoutePage />} />
                <Route path="/find-hotel" element={<HotelPage />} />
                <Route path="/find-restaurant" element={<RestaurantPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/navbar" element={<Navbar />} />
              </Routes>
            </div>
          </Container>
          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;