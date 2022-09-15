import React from "react";
import FollowersCard from "../followersCard/FollowersCard";
import LogoSearch from "../logoSearch/LogoSearch";
import InfoCard from "../InfoCard/InfoCard";

const ProfileLeft = () => {
  return (
    <div className="ProfileLeft ProfileSide">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
