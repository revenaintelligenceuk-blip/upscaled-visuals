/// <reference types="vite/client" />

/** File names present in public/work/ (set in vite.config.ts). */
declare const __WORK_IMAGES__: string[];
/** True for builds made on Vercel (set in vite.config.ts). */
declare const __ON_VERCEL__: boolean;

interface ImportMetaEnv {
}
