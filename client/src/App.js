import React from "react";
import JarvisMarch from "./components/JarvisMarch";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route,Outlet } from "react-router-dom";
import KirkPatrikSeidel from "./components/KirkPatrikSeidel";
import Introduction from "./components/Introduction";
function App(){
  return(
    <>
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/introduction" element={<Introduction/>}></Route>
        <Route path="/Jarvis-March-Visualization" element={<JarvisMarch/>}></Route>
        <Route path="/Kirk-Patrik-Seidel-Visualization" element={<KirkPatrikSeidel/>}></Route>
      </Routes>
    </Router>
    <Outlet />
    </>
  )
}

export default App;