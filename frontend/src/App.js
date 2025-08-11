import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ConstructionsPage from "./pages/ConstructionsPage";
import AboutPage from "./pages/AboutPage";
import ClientsPage from "./pages/ClientsPage";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/construction" element={<ConstructionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/partner" element={<ClientsPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;