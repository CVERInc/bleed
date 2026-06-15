# Funding & Sponsors

This repo ships a [`.github/FUNDING.yml`](.github/FUNDING.yml) so the GitHub repo
sidebar shows a **Sponsor** link. Right now that link is a plain `custom:` URL
pointing at the project page on `oss.cver.net` — it is just a hyperlink and does
**not** enrol the GitHub Sponsors program.

## What is and isn't automatable

| Step | Automatable? |
|------|--------------|
| Add `custom:` link to `.github/FUNDING.yml` | ✅ done (committed) |
| Add a `github:` handle to `.github/FUNDING.yml` | ✅ once Sponsors is enabled on that account |
| **Enable GitHub Sponsors on the account** | ❌ **manual GitHub-settings action — cannot be scripted** |

GitHub Sponsors enablement is a backend account/billing setting behind the
GitHub web UI. There is **no API, no CLI, and no Action** to flip it on. It also
requires identity/bank/tax verification (Stripe Connect), which a human must
complete interactively. Treat everything below as a one-time human checklist.

## Manual steps the human does (GitHub web UI)

These are done for the **account that will receive the money** — for this repo
that is the `CVERInc` organization (or a personal account, if you decide to fund
it personally instead).

1. Go to **https://github.com/sponsors** and click **Join the waitlist / Get
   sponsored**. For an org, pick the `CVERInc` organization as the recipient.
2. Complete the **GitHub Sponsors profile**: short bio, intro text, and (for an
   org) confirm you are an org owner.
3. Set up **payouts via Stripe Connect**: bank account, identity verification,
   and tax form (W-8/W-9 as prompted). This is the part that takes real-world
   time (verification can take days).
4. Wait for GitHub to **approve** the Sponsors profile.
5. Optionally create one or more **sponsorship tiers** (monthly / one-time).
6. Once approved, the account gets a Sponsors handle. Then **add it to
   `.github/FUNDING.yml`** alongside (or instead of) the existing `custom:`
   link, e.g.:

   ```yaml
   github:
     - CVERInc
   custom:
     - "https://oss.cver.net/bleedblend/"
   ```

7. Commit + push that change. GitHub then renders the **Sponsor** button using
   the native Sponsors flow instead of only the custom link.

## Verifying it worked

- The repo sidebar shows a **Sponsor** button.
- For a `github:` entry, clicking it opens the native GitHub Sponsors page
  (`https://github.com/sponsors/<handle>`), not just the external custom URL.
- `.github/FUNDING.yml` must stay valid YAML (see the format reference below).

## FUNDING.yml format notes (for future edits)

- Top level is a mapping of **platform → handle(s)**. Known platform keys:
  `github`, `patreon`, `open_collective`, `ko_fi`, `tidelift`,
  `community_bridge`, `liberapay`, `issuehub`, `otechie`, `lfx_membership`,
  `polar`, `buy_me_a_coffee`, `thanks_dev`, and `custom`.
- `custom:` accepts a single URL string or a **list of up to 4 URLs**.
- `github:` accepts a single handle or a list of handles (org or user) that
  **already have Sponsors enabled** — adding an unenabled handle does nothing.
