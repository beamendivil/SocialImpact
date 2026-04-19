import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Preloader from "./components/Preloader/Preloader";

// Utils
import { PRELOADER_SPIN_DURATION } from "./utils/constants";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  // This is a placeholder for your Stage 1.2 API logic
  useEffect(() => {
    // We'll simulate a loading state for now
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path="/" element={<h1>Tucson Social Impact Dashboard</h1>} />
            <Route path="/community-goals" element={<h1>Community Goals</h1>} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
