import Navbar from "../components/Navbar";
import React from "react";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="image">
        <div className="backgroundtext">
          <h1 className="text"> Travel with your best friend </h1>
        </div>
        <img
          className="indexdog"
          src="https://images.unsplash.com/photo-1635071820831-2ff32c21d82f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
