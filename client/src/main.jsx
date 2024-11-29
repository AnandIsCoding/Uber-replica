
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";

createRoot(document.getElementById("root")).render(
  <CaptainContext>
    <UserContextProvider>
     <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </UserContextProvider>
  </CaptainContext>
   
  
);
