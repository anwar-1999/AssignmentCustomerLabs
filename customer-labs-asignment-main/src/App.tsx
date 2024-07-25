import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router';
import SegmentScreen from "./SegmentScreen";


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SegmentScreen />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


