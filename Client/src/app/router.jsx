import { createBrowserRouter , createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import VerifyEmail from "../Pages/VerifyEmail";
import Verify from "../Pages/Verify";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "../Components/ProtectedRoute";
import ForgotPassword from "../Pages/ForgotPassword";
import VerifyOTP from "../Pages/VerifyOTP";
import ChangePassword from "../Pages/ChangePassword";
import PublicRoute from "../Components/PublicRoute";
import PublicProfile from "../Pages/PublicProfile";

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<App/>}>
            <Route index element={<Home/>}/>
            <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>}/>
            <Route path="/verify" element={<PublicRoute><VerifyEmail/></PublicRoute>}/>
            <Route path="/verify-email/:token" element={<Verify/>}/>
            <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword/></PublicRoute>}/>
            <Route path="/verify-otp/:email" element={<VerifyOTP/>}/>
            <Route path="/change-password/:email" element={<ChangePassword/>}/>
            <Route path="/u/:username" element={<PublicProfile/>}/>

        </Route>
    )
)

export default router;