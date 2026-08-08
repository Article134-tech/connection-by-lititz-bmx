# Connection: by Lititz BMX

Connection is a mobile-first, installable GitHub Pages launch environment for finished Lititz BMX applications and connected public destinations.

## Included applications

- Lititz BMX Public Knowledge Register
- Lititz BMX Global BMX Research Atlas
- Lititz BMX Games

## Connected destinations

- Lititz BMX Archive
- YouTube
- Spotify
- Facebook
- GitHub
- Donate

## Branding

The included Lititz BMX logo is the exact approved white-tire / white-lettering transparent PNG supplied by Lititz BMX. It is copied into the project byte-for-byte and displayed proportionally without recoloring, cropping, effects, or reconstruction.

## Features

- First-visit boot and shorter return wake sequence
- Responsive phone, tablet, and desktop layouts
- Keyboard and screen-reader support
- Reduced-motion support
- Launch transitions
- Last-opened application memory and Resume control
- Resume resolves the remembered application through the current Connection routing configuration rather than retaining a historical destination URL
- Installable Progressive Web App manifest
- Offline app-shell caching
- GitHub Pages deployment workflow

## Routing and live-metric policy

The application cards in `index.html` are the authoritative routing configuration for Connection. Resume stores the stable application key only and resolves the current title and URL from those cards when Connection loads.

Connection intentionally does not duplicate volatile record/profile/game totals from the applications it launches. Current totals belong to, and should be read from, the destination applications themselves. This prevents launcher metadata from silently becoming stale when an independently deployed Lititz BMX application grows or changes.

## Deploy

1. Create a new public GitHub repository.
2. Upload the complete contents of this folder, including `.github/workflows/pages.yml`.
3. Commit to `main`.
4. In **Settings → Pages**, choose **GitHub Actions** as the source.
5. The workflow deploys the site automatically.

No build process, package manager, framework, database, or secrets are required.
