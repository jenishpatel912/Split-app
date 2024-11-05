import LightsOut from "../components/LightsOut";
import Slider from "../components/Slider/Slider";
import GroupDetails from "../components/splitsvilla/GroupDetails";
import SplitvillaDashboard from "../components/splitsvilla/SplitvillaDashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const publicRoutes = [
    {
        name:'Login',
        path:'/login',
        component:Login,
    },
    {
        name:'Signup',
        path:'/register',
        component:Register,
    },
    {
        name:'Slider',
        path:'/slider',
        component:Slider
    },
    {
        name:'Light',
        path:'/light',
        component:LightsOut
    },
    {
        name:'redirection-route',
        path:'*',
        component:Login,
        redirectRoute:true,
        navigation:'/login'
    },
]

export const privateRoutes = [
    {
        name:'dashboard',
        path:'/dashboard',
        component:SplitvillaDashboard
    },
    {
      name:'group-detail',
      path:'/group-detail/:groupId',
      component:GroupDetails
    },
    {
        name:'Home-page',
        path:'*',
        component:SplitvillaDashboard,
        redirectRoute:true,
        navigation:'/dashboard'
    },
]