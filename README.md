# RAM Light

<div align="center">

A lightweight, real-time **Free RAM** monitor for Google Chrome and Chromium-based browsers.

Shows **how much free memory you have left** directly in your toolbar and helps you **free up RAM** by discarding inactive tabs.

<br>

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue?logo=googlechrome)](https://developer.chrome.com/docs/extensions/develop)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](docs/LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install-blue?logo=googlechrome)](https://chromewebstore.google.com/)
[![Privacy](https://img.shields.io/badge/Privacy-First-brightgreen)](docs/POLICY)

</div>

---

## Screenshots

<div align="center">
  <img src="icons/indicator2.png" alt="RAM Light Green Badge State" width="64"/>
  <img src="icons/popup.png" alt="RAM Light Popup Detailed View" width="300"/>
  <img src="icons/indicator.png" alt="RAM Light Warning Badge State" width="64"/>
  <br>
  <em>Left: Normal state badge &nbsp;|&nbsp; Center: Detailed popup view &nbsp;|&nbsp; Right: Low memory warning</em>
</div>

---

## Features

- **Smart Toolbar Badge**: Displays free RAM directly on the extension icon with intelligent formatting (e.g., `512M`, `1.2G`, `15G`).
- **Color-Coded Alerts**: The badge background changes dynamically based on free memory percentage:
  - **Green**: > 50% free (Plenty of memory)
  - **Orange**: 20% – 50% free (Moderate load)
  - **Red**: < 20% free (Critically low)
- **One-Click Tab Discard**: Free up memory instantly by discarding inactive tabs. Tabs are safely suspended (not closed) and reload when clicked.
- **Detailed Popup**: Click the icon to see a real-time progress bar, exact free memory, and total system RAM.
- **Battery Efficient**: Built with Manifest V3 Service Workers and Chrome Alarms API. Updates every minute in the background to minimize battery drain, and every 2 seconds only when the popup is open.
- **Privacy-First**: Requires minimal permissions (`system.memory`, `tabs`, `alarms`). Does not request access to your browsing history or any websites.

---

## Privacy Policy

RAM Light does **NOT** collect, store, process, or transmit any personal data, browsing history, or user information. All operations are performed entirely locally on your device.

Read the full policy here: [**POLICY**](docs/POLICY)

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](docs/LICENSE) file for details.

---

## Support the Project

If you find RAM Light useful, consider supporting its development! Your contribution helps keep the project alive and ad-free.

<div align="center">

[![Support on Boosty](https://img.shields.io/badge/Support%20on-Boosty-orange?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMC44NCA0LjYxYTUuNSA1LjUgMCAwIDAtNy43OCAwTDEyIDUuNjdsLTEuMDYtMS4wNmE1LjUgNS41IDAgMCAwLTcuNzggNy43OGwxLjA2IDEuMDZMMTIgMjEuMjNsNy43OC03Ljc4IDEuMDYtMS4wNmE1LjUgNS41IDAgMCAwIDAtNy43OHoiPjwvcGF0aD48L3N2Zz4=)](https://boosty.to/hektr992)

</div>
