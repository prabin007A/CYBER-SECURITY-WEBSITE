# Partner logos

Drop official partner logo files in this folder (SVG or PNG preferred), then add an entry for each partner to the `PARTNERS` array in `/app/frontend/src/data/content.js`:

```js
export const PARTNERS = [
    { name: "Partner Name", logo: "/partners/partner-logo.svg", description: "What the partnership delivers.", url: "https://partner-site.example" },
];
```

As soon as at least one entry exists, the Technology Partners page renders real partner cards instead of the reserved placeholder slots.
