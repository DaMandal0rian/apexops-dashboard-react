/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import ClusterManagement from "views/ClusterManagement.js";
import ServerlessManagement from "views/ServerlessManagement.js";
import Billing from "views/Billing.js";
import AgentManagement from "views/AgentManagement.js";
import UserManagement from "views/UserManagement.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/clusters",
    name: "Clusters",
    rtlName: "المجموعات",
    icon: "tim-icons icon-cloud-upload-94",
    component: <ClusterManagement />,
    layout: "/admin",
  },
  {
    path: "/serverless",
    name: "Serverless",
    rtlName: "بلا خوادم",
    icon: "tim-icons icon-components",
    component: <ServerlessManagement />,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    rtlName: "الفواتير",
    icon: "tim-icons icon-coins",
    component: <Billing />,
    layout: "/admin",
  },
  {
    path: "/agents",
    name: "AI Agents",
    rtlName: "وكلاء الذكاء",
    icon: "tim-icons icon-bulb-63",
    component: <AgentManagement />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "المستخدمون",
    icon: "tim-icons icon-single-02",
    component: <UserManagement />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: <Map />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: <Typography />,
    layout: "/admin",
  },
  {
    path: "/rtl-support",
    name: "RTL Support",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: <Rtl />,
    layout: "/rtl",
  },
];
export default routes;
