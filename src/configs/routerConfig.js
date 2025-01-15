import AccountDetail from "../components/account/accountDetail"
import Login from "../components/account/login"
import PrivateContest from "../components/contest/privatecontest"
import Home from "../components/home"
import ForgotPassword from "../components/account/forgotpassword"
import SignUp from "../components/account/signup"
import ResetPassword from "../components/account/resetpassword"
import VerifyCode from "../components/account/verifyCode"

const publicRouter = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/confirmcode",
        element: <VerifyCode />
    },
    {
        path: "/resetpassword",
        element: <ResetPassword />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    }
]

const privateRouter = [
    {
        path: "/privatecontest",
        element: <PrivateContest />,
        roles: ["USER", "ADMIN", "SUPERADMIN"]
    },
    {
        path: "/accountprofile",
        element: <AccountDetail />,
        roles: ["USER", "ADMIN", "SUPERADMIN"]
    }
]
export {
    publicRouter,
    privateRouter
}