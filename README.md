# Stagstone Protection — website

A fast, modern, static website for **Stagstone Protection Ltd**. There's no build step, database or CMS: plain HTML, CSS and JavaScript that can be hosted anywhere (GitHub Pages, Azure Static Web Apps, Netlify, or any web host).

## Site map

| Page | File |
|---|---|
| Home | `index.html` |
| Experience (Royal protection experience) | `experience/index.html` |
| Estate Management | `estate-management/index.html` |
| RST & CPO | `rst-cpo/index.html` |
| About (founder) | `about/index.html` |
| Contact | `contact/index.html` |
| Privacy notice | `privacy/index.html` |
| Page not found | `404.html` |

Shared files:

- `assets/css/styles.css` — all styling (colours, fonts and layout are set at the top)
- `assets/js/site.js` — header, footer, navigation and **contact details** (one place)
- `assets/img/` — logo, icons and photography
- `assets/fonts/` — self-hosted fonts (Cormorant Garamond and Manrope, SIL Open Font Licence)

## How to update

### Change the phone number, email, company number or menu
Open `assets/js/site.js` and edit the `SITE` block at the top. The header, footer and contact page all update automatically.

```js
const SITE = {
  phone: "+44 7595 586 992",
  email: "scott@stagstoneprotection.com",
  companyNumber: "",      // e.g. "SC123456" – shown in the footer
  registeredOffice: "",   // shown in the footer
  formEndpoint: "",       // optional, see "Contact form" below
  preview: true,          // set to false at launch to remove the "Preview" badge
  nav: [ ... ]            // menu items
};
```

### Change wording on a page
Open the page's `index.html` and edit the text between the tags. For example:

```html
<h2>Well planned. <em>Calmly</em> delivered.</h2>
<p>Every client and property has different priorities…</p>
```

Words wrapped in `<em>…</em>` appear in the silver italic accent style.

### Swap a photo
Put the new image in `assets/img/`, ideally a landscape JPG about 2000px wide and under 400 KB. Then change the `src="…"` on the relevant `<img>` and update its `alt` text.

### Update the founder's portrait
Replace `assets/img/scott-cox.jpg` with a new portrait of the same name. Portrait orientation (about 2:3) works best.

### Contact form
By default, the form opens the visitor's email app with the enquiry pre-filled. To have enquiries delivered without that step, create a free form endpoint (e.g. [Formspree](https://formspree.io)) and paste its URL into `formEndpoint` in `site.js`.

## Preview locally

```powershell
python -m http.server 8000
# then open http://localhost:8000
```

## Going live checklist

- [ ] Replace the logo with the original vector (SVG) artwork from the designer. The current mark is extracted from the business-card mock-up.
- [ ] Add the company number and registered office (`companyNumber`, `registeredOffice`), which UK companies must show on their website
- [ ] Confirm all biography wording, honours and claims with Scott, including the "stag and the stone" wording on the About page
- [ ] Add any licensing or accreditation details (e.g. SIA licence, ICO registration, insurance) if desired
- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from every page
- [ ] Set `preview: false` in `site.js`
- [ ] Point `stagstoneprotection.com` at the host (GitHub Pages: add a `CNAME` file and DNS records)
- [ ] Optionally connect a form endpoint (see above)

## Image credits

Photography from [Unsplash](https://unsplash.com), used under the Unsplash Licence. The source of each image is `https://images.unsplash.com/<photo id>`:

| File | Unsplash photo |
|---|---|
| hero-highland-loch.jpg | photo-1639156310190-21cc5e7cef7a |
| estate-manor.jpg | photo-1787304494167-2ceeaaaf0a5d |
| estate-gates.jpg | photo-1770398213837-3bf893afb4d8 |
| cpo-vehicles.jpg | photo-1769787301187-0fab290ba2f2 |
| highland-loch.jpg | photo-1639156310190-21cc5e7cef7a |
| scottish-castle-loch.jpg | photo-1589489873423-d1745278a8f4 |
| misty-forest.jpg | photo-1731770204188-5369f5f698bf |
| manor-gate.jpg | photo-1769096543246-73ae2d778d1e |
| stag.jpg | photo-1730671014514-0ca88ad98c3a |
| estate-vehicle.jpg | photo-1653641305372-a084f9b78858 |
| airfield-arrival.jpg | photo-1684426091058-555f5ffc0fdd |

`scott-cox.jpg` was supplied by Stagstone Protection.
