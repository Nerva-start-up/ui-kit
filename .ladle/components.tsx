import type { GlobalProvider } from "@ladle/react";
import "@xyflow/react/dist/style.css";
import "../src/styles/ladle.css";
import "../src/styles/base.css";

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <div
    data-theme={globalState.theme === "light" ? "light" : undefined}
    style={{ minHeight: "100vh", background: "var(--bg)", padding: "2rem" }}
  >
    {children}
  </div>
);
