import React from "react";
import { UilDiscord } from "@iconscout/react-unicons";
import { UilFacebook } from "@iconscout/react-unicons";
import { UilYoutube } from "@iconscout/react-unicons";
import "./Copyright.css";

const CopyRight = () => {
  return (
    <div className="Copyrigh">
      <spam
        onClick={() => {
          window.open("https://discord.gg/tEgVEqFxMz", "_blank");
        }}
      >
        <UilDiscord size="100" color="#5865F2" />
      </spam>
      <spam
        onClick={() => {
          window.open(
            "https://www.facebook.com/Taprobana-110157187255284",
            "_blank"
          );
        }}
      >
        <UilFacebook size="100" color="#4267B2" />
      </spam>
      <spam
        onClick={() => {
          window.open("https://www.youtube.com/c/TaprobanaOrg", "_blank");
        }}
      >
        <UilYoutube size="100" color=" #FF0000" />
      </spam>
    </div>
  );
};

export default CopyRight;
