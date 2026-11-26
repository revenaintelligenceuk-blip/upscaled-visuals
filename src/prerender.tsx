/** Build-time only: renders each page to HTML. The head tags come from seo.ts. */
import { renderToString } from "react-dom/server";
import App from "./App";
import LegalPage from "./legal/LegalPage";
import WorkPage from "./work/WorkPage";
import NotFoundPage from "./NotFoundPage";
import { siteConfig } from "./siteConfig";
import type { PageKey } from "./seo";

export { headTags, pages } from "./seo";

export const siteUrl = siteConfig.brand.url;

export const render = (page: PageKey) =>
  renderToString(
    page === "home" ? <App /> : page === "work" ? <WorkPage /> : page === "notFound" ? <NotFoundPage /> : <LegalPage page={page} />
  );
