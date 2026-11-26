import { createRoot, hydrateRoot } from "react-dom/client";
import WorkPage from "./work/WorkPage";
import "./analytics";
import "./fonts";
import "./index.css";

const root = document.getElementById("root")!;
if (root.firstElementChild) hydrateRoot(root, <WorkPage />);
else createRoot(root).render(<WorkPage />);
