import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Admin Profile",
    path: "/Admin",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Problems",
    path: "/Admin/Add Problems",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Teams",
    path: "/Admin/manage Teams",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Contest",
    path: "/Admin/contest",
    icon: <IoIcons.IoIosContract />,
    cName: "nav-text",
  },
  {
    title: "Assessment",
    path: "/Admin/Quiz",
    icon: <IoIcons.IoIosDocument />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/Admin/settings",
    icon: <IoIcons.IoIosSettings />,
    cName: "nav-text",
  },
];
