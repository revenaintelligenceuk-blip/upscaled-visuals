# Upscaled — studio website

Marketing site for Upscaled, a web design studio. Vite, React, TypeScript and Tailwind.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # type check
npm run build    # production build in dist/, pages pre-rendered
npm run preview  # serve the production build
```

## Editing content

Copy, FAQ answers, work items and contact details live in
[`src/siteConfig.ts`](src/siteConfig.ts). The legal page wording is in
[`src/legal/LegalPage.tsx`](src/legal/LegalPage.tsx). Search for `TODO` to find
placeholders that still need confirming before launch.

The domain also appears in the HTML files, `public/robots.txt` and `public/llms.txt`.

## Parts that stay hidden until filled in

| Part | How to switch it on |
|---|---|
| Contact buttons and "What do you need?" section | On by default. Set `contact.href` to `""` to hide them |
| Work section and `/work/` page | Add images, then set `showWork` to `true` |
| Logo banner | Add files to `public/logos/` and list them in `logos` |
| About section and menu link | Set `showAbout` to `true` |
| Founder photo (in the About section) | Add it to `public/images/` and set `about.photo` |
| Client stories | Add real quotes, with permission, to `testimonials` |

### Images

- **Work:** 16:10 JPGs, about 1600x1000 and ideally under 200 KB, in `public/work/`, named as in `portfolio` (`ember-oak.jpg`, `maison.jpg`, `northline.jpg`). Rebuild or restart the dev server after adding them.
- **Logos:** SVG or transparent PNG, about 300 px wide.
