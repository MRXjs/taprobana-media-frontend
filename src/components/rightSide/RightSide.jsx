import React, { useState } from "react";
import TrendCard from "../trendCard/TrendCard";
import "./RightSide.css";
import ShareModal from "../shareModal/ShareModal";
import Navbar from "../../components/navbar/Navbar";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      <Navbar />
      <TrendCard />
      <button
        className="button r-button"
        onClick={() => {
          setModalOpened(true);
        }}
      >
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
