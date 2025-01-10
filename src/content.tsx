// src/content.tsx
import cssText from "data-text:~/style.css";
import type { PlasmoContentScript } from "plasmo";
import { createRoot } from "react-dom/client";

import ChatWidget from "~components/chatWidgets";

export const config: PlasmoContentScript = {
  matches: ["https://www.booking.com/hotel/*"],
  exclude_matches: ["https://www.booking.com/hotel/index*"],
  world: "MAIN",
};

// Inject styles
const style = document.createElement("style");
style.textContent = cssText;
document.head.appendChild(style);

window.addEventListener("load", () => {
  const container = document.createElement("div");
  container.id = "plasmo-chat-widget";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<ChatWidget />);
});
