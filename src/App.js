import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import Letter from "./Letter";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />

      {/* Protected Home Route */}
      <Route
        path="/home"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/" />
        }
      />

      {/* Protected Letter Route */}
      <Route
        path="/letter"
        element={
          isAuthenticated ? <Letter /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;
