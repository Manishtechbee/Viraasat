import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import Heritage from "../Heritage";
import HeritageDetails from "../HeritageDetails";
import Home from "../Home";
import Dashboard from "../Dashboard";
import About from "../About";
import ErrorPage from "../../ErrorPage";
import Privacy from "../Privacy";
import Terms from "../Terms";
import Cookies from "../Cookies";
import WatchDemo from "../WatchDemo";
import Map from "../Map";
import Settings from "../../components/Dashboard/Settings/Settings";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import AIGuide from "../AIGuide";
import SavedPlaces from "../../components/Dashboard/SavedPlaces/SavedPLaces";
import MyJourneys from "../../components/Dashboard/MyJourneys/MyJourneys";
import Bookings from "../../components/Dashboard/Bookings/Bookings";
// import Achievements from "../../components/Dashboard/Achievements/Achievements";
// import Reviews from "../../components/Dashboard/Reviews/Reviews";
import DashboardLayout from "../../layouts/DashboardLayout";
import Profile from "../Profile";
// import Home from "../pages/Home";
// import Explore from "../pages/Explore";
// import About from "../pages/About";

// import Login from "../pages/Login";
// import Signup from "../pages/Signup";

// import MainLayout from "../layouts/MainLayout";


export default function AppRoutes() {
  return (
    <Routes>

      {/*  Public Website */}

         <Route
          path="/"
          element={<Home/>}
        />
         <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<SignUp/>}
        />
        <Route
          path="/about"
          element={<About/>}
        />
        <Route
          path="/privacy"
          element={<Privacy/>}
        />
        <Route
          path="/terms"
          element={<Terms/>}
        />
        <Route
          path="/cookies"
          element={<Cookies/>}
        />
        <Route
          path="/watchdemo"
          element={<WatchDemo/>}
        />




        <Route element={<ProtectedRoute/>}>
        <Route
          path="/explore"
          element={<Heritage />}
        />
        <Route
          path="/exploreHeritages/:slug"
          element={<HeritageDetails />}
        />
        {/* Dashboard layout */}
      <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/saved-places"
          element={<SavedPlaces />}
        />
        <Route
          path="/collections"
          element={<SavedPlaces />}
        />

        <Route
          path="/my-journeys"
          element={<MyJourneys />}
        />

        <Route
          path="/bookings"
          element={<Bookings />}
        />

        

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>
        <Route
  path="/ai_guide"
  element={<AIGuide />}
/>

<Route
  path="/ai-guide"
  element={<AIGuide />}
/>
        
        
        
        <Route
          path="/map"
          element={<Map/>}
        />
         <Route
          path="/profile"
          element={<Profile/>}
        />
        


        </Route>

        {/* 404 page */}
        <Route
        path="*"
          element={<ErrorPage/>}
        />
{/*

        <Route
          path="/explore"
          element={<Explore />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Route>*/}

      {/* Auth */}
      {/* <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />} 
      /> */}

    </Routes>
  );
}