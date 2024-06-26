/**
 * ## Team Members
- Atharva Dashora (2021A7PS0127H)
- Dev Gala (2021A7PS0182H)
- Pavas Garg (2021A7PS2587H)
- Tushar Raghani (2021A7PS1404H)
- Vassvik Sai Reddy Jampala (2021A7PS0109H)
 */

import React from "react";
import JarvisMarch from "./components/JarvisMarch";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import KirkPatrikSeidel from "./components/KirkPatrikSeidel";
import Introduction from "./components/Introduction";
import JarvisMarchExplain from "./components/JarvisMarchExplain";
import KPSExplain from "./components/KPSExplain";
import JarvisMarchTimeCpx from "./components/JarvisMarchTimeCpx";
import KPSTimeCpx from "./components/KPSTimeCpx";
import JarvisMarchCodeDocumentation from "./components/JarvisMarchCodeDoc";
import KPSCodeDocumentation from "./components/KPSCodeDocumentation";
import "./css/App.css"
import ComparativeAnalysis from "./components/ComparativeAnalysis";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/introduction" element={<Introduction />}></Route>
          <Route path="/Jarvis-March-Visualization" element={<JarvisMarch />}></Route>
          <Route path="/Kirk-Patrik-Seidel-Visualization" element={<KirkPatrikSeidel />}></Route>
          <Route path="/Jarvis-March" element={<JarvisMarchExplain />}></Route>
          <Route path="/Kirk-Patrick-Seidel" element={<KPSExplain />}></Route>
          <Route path="/Jarvis-March-Time" element={<JarvisMarchTimeCpx />}></Route>
          <Route path="/Kirk-Patrik-Seidel-Time" element={<KPSTimeCpx />}></Route>
          <Route path="/Jarvis-March-Code-Documentation" element={<JarvisMarchCodeDocumentation />}></Route>
          <Route path="/Kirk-Patrik-Seidel-Code-Documentation" element={<KPSCodeDocumentation />}></Route>
          <Route path="/Comparative-Analysis" element={<ComparativeAnalysis />}></Route>
        </Routes>
      </Router>
      <Outlet />
    </>
  )
}

export default App;