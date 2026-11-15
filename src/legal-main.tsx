import { createRoot } from "react-dom/client";
import LegalPage, { type LegalPageKey } from "./legal/LegalPage";
import "./fonts";
import "./index.css";

const page = (document.body.dataset.page || "privacy") as LegalPageKey;
createRoot(document.getElementById("root")!).render(<LegalPage page={page} />);
