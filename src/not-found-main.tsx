import { createRoot, hydrateRoot } from "react-dom/client";
import NotFoundPage from "./NotFoundPage";
import "./analytics";
import "./fonts";
import "./index.css";

const root = document.getElementById("root")!;
if (root.firstElementChild) hydrateRoot(root, <NotFoundPage />);
else createRoot(root).render(<NotFoundPage />);
