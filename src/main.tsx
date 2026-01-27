// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);



import React from "react";   // ✅ required for TSX type inference
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

createRoot(container).render(<App />);
