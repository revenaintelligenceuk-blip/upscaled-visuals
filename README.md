# Upscaled — studio website

Marketing site for Upscaled, the web design studio run by Raffaele & Brilliana.

## Editing content

All copy, prices, FAQ answers, portfolio items and contact details live in
[`src/siteConfig.ts`](src/siteConfig.ts). Search for `TODO` to find placeholders
that still need confirming before launch.

- **Founder photos:** drop images in `public/images/` and set `photo: "/images/your-file.jpg"` on each founder.
- **Contact form:** set `brand.formEndpoint` to a Formspree/Basin/Getform URL to receive enquiries by email.
  Without one, the form opens the visitor's email app with the enquiry pre-filled.
- **Portfolio:** the four projects are concept mockups. Replace them with real client work as it comes in.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build in dist/
```
