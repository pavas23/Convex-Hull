import React from "react";
import "../css/landing.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="text-container">
      <div className="page">
        <h1 className="title1">CS F364 DAA Assignment 1</h1>
        <h3 className="title1">Convex Hull</h3>
        {/* <div className="entryGrid">
          <div className="entryRow">
            <Entry str={"Atharva Dashora"} />
            <Entry str={"2021A7PS0127H"} />
          </div>
          <div className="entryRow">
            <Entry str={"Dev Gala"} />
            <Entry str={"2021A7PS0182H"} />
          </div>
          <div className="entryRow">
            <Entry str={"Pavas Garg"} />
            <Entry str={"2021A7PS2587H"} />
          </div>
          <div className="entryRow">
            <Entry str={"Tushar Raghani"} />
            <Entry str={"2021A7PS1404H"} />
          </div>
          <div className="entryRow">
            <Entry str={"Vassvik Sai Reddy Jampala"} />
            <Entry str={"2021A7PS0109H"} />
          </div>
        </div> */}
        <Link to="/introduction" className="button-31" disabled={false}>
          Let's Go!
        </Link>
      </div>
    </div>
  );
};

const Entry = (props) => {
  var className = props.str[0] === "2" ? "entryR" : "entryL";
  if (props.str === "Vassvik Sai Reddy Jampala") {
    className = "entryBL";
  } else if (props.str === "2021A7PS0109H") {
    className = "entryBR";
  }
  return (
    <div className={className}>
      <p>{props.str}</p>
    </div>
  );
};

export default LandingPage;