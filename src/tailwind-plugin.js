const plugin = require('tailwindcss/plugin');

// Tailwind surface for the .bleedblend-* classes. This MUST stay in parity with
// src/index.css (test/units.mjs guards it): the same padding, the same
// backdrop-filter stripping, and the same --bleedblend-dynamic-bar-height
// compact-tab-bar correction folded into .bleedblend-bottom's padding.
module.exports = plugin(function bleedblend({ addUtilities, addBase }) {
  // --bleedblend-dynamic-bar-height = the max dynamic chrome height (the compact
  // tab bar). index.css defines it on :root; mirror that here so the var below
  // resolves instead of silently falling back to 0px.
  addBase({
    ':root': {
      '--bleedblend-dynamic-bar-height': 'calc(100lvh - 100svh)',
    },
  });

  addUtilities(
    {
      '.bleedblend-top': {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        minHeight: 'auto',
        paddingTop: 'calc(8px + env(safe-area-inset-top, 0px))',
        boxSizing: 'border-box',
        zIndex: '50',
        '-webkit-backdrop-filter': 'none !important',
        backdropFilter: 'none !important',
      },
      '.bleedblend-bottom': {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        minHeight: 'auto',
        // Parity with index.css: include the dynamic-bar-height term so the bottom
        // bar clears the compact tab bar regardless of which surface applied it.
        paddingBottom:
          'calc(8px + env(safe-area-inset-bottom, 0px) + var(--bleedblend-dynamic-bar-height, 0px))',
        boxSizing: 'border-box',
        zIndex: '50',
        '-webkit-backdrop-filter': 'none !important',
        backdropFilter: 'none !important',
      },
      // Push variant — parity with index.css. Compound selector so position:sticky
      // outranks the base .bleedblend-top / .bleedblend-bottom position:fixed and
      // the bar reserves layout space (pushes content) instead of overlaying it.
      '.bleedblend-top.bleedblend-push, .bleedblend-bottom.bleedblend-push': {
        position: 'sticky',
      },
      '.bleedblend-inner-blur': {
        '-webkit-backdrop-filter': 'blur(10px) saturate(140%)',
        backdropFilter: 'blur(10px) saturate(140%)',
      },
    },
    ['responsive']
  );
});
