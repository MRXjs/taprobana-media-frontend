import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import "./Navbar.css";
import Swal from "sweetalert2";

const navAlert = () => {
  Swal.fire({
    title: "info",
    text: "Maintenance is in progress",
    icon: "info",
    confirmButtonText: "Cool",
  });
};
const Navbar = ({ settingOpen }) => {
  return (
    <div>
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        <UilSetting onClick={navAlert} />
        <img src={Noti} alt="" onClick={navAlert} />
        <Link to="../chat">
          <img src={Comment} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
