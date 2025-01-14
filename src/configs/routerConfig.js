import AccountDetail from "../components/account/accountDetail"
import Login from "../components/account/login"
import PrivateContest from "../components/contest/privatecontest"
import Home from "../components/home"

const publicRouter = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
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