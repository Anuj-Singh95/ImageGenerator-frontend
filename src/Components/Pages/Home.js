import React, { useState } from "react";
import Navbar from "../Navbar";
import Banner from "../Banner";
import ImageSection from "../ImageSection";
import { Navigate } from "react-router-dom";

export default function Home() {
  const [searchKey, setSearchKey] = useState("");

  const onGettingSearchKey = (data) => {
    setSearchKey(data);
    console.log("search key is " + data);
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <Banner onSubmitting={onGettingSearchKey} />
      {searchKey !== "" && <ImageSection query={searchKey} />}
      {/* <ImageSection query={searchKey} /> */}
    </div>
  );
}
