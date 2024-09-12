import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import React from "react";
import Calendar from "./components/common/Calendar";
function App() {
  return (
    <div className="App">
      <RouterProvider router={root} />
      <Calendar />
    </div>
  );
}

export default App;
