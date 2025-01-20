import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Navigate } from "react-router-dom";
import { DataContext } from "./context/DatabaseContext";
import { publicRouter, privateRouter } from "./configs/routerConfig";
import './index.css';
import Header from "./components/Header/Header";
import { SidebarProvider } from "./context/sidebarContext";
import Navbar from "./components/Header/Navbar";
import ContactInfo from "./components/Contact/ContactInfo";

function App() {
  const { tokenInfor } = useContext(DataContext);
  const location = useLocation();

  // Kiểm tra nếu đường dẫn là "/home" hoặc "/recipe"
  const showNavbarAndContact = location.pathname === "/" || location.pathname === "/recipe";

  return (
    <div className="container">
      <SidebarProvider>
        {/* Render Navbar chỉ khi showNavbarAndContact là true */}
        {showNavbarAndContact && <Navbar />}
        
        <Routes>
          {publicRouter.map((item, index) => {
            return <Route key={index} path={item.path} element={item.element} />;
          })}
          {privateRouter.map((item, index) => (
            <Route
              key={index}
              path={item.roles.includes(tokenInfor?.role) ? item.path : "*"}
              element={
                item.roles.includes(tokenInfor?.role) ? (
                  item.element
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          ))}
        </Routes>

        {/* Render ContactInfo chỉ khi showNavbarAndContact là true */}
        {showNavbarAndContact && <ContactInfo />}
      </SidebarProvider>
    </div>
  );
}

export default App;
