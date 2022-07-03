import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./routes/Home";
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage";
import UpdatePage from "./routes/UpdatePage";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/restaurants/:id"
              element={<RestaurantDetailsPage />}
            />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
