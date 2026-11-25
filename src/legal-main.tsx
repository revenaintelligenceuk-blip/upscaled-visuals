import { createRoot, hydrateRoot } from "react-dom/client";
import LegalPage, { type LegalPageKey } from "./legal/LegalPage";
import "./analytics";
import "./fonts";
import "./index.css";

const page = (document.body.dataset.page || "privacy") as LegalPageKey;
const root = document.getElementById("root")!;
if (root.firstElementChild) hydrateRoot(root, <LegalPage page={page} />);
else createRoot(root).render(<LegalPage page={page} />);
