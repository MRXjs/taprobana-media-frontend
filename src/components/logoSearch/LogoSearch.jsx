import React from "react";
import Logo from "../../img/logot.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import Swal from "sweetalert2";

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="logo" />
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div
          className="s-icon"
          onClick={() => {
            Swal.fire({
              title: "info",
              text: "Maintenance is in progress!",
              icon: "info",
              confirmButtonText: "Cool",
            });
          }}
        >
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
