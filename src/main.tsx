import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./globals.css";

document.documentElement.style.setProperty("--font-geist-sans", "Inter, system-ui, sans-serif");
document.documentElement.style.setProperty("--font-heading", "Sora, system-ui, sans-serif");
document.documentElement.style.setProperty("--font-outfit", "Sora, system-ui, sans-serif");
document.documentElement.style.setProperty(
  "--font-jetbrains-mono",
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
