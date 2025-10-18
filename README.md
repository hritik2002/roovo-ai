## Safarmonk — Smart Travel Assistant for Hotel Bookings

Safarmonk is a Chrome extension that uses AI to simplify how travelers discover and evaluate hotels. Instead of scrolling through hundreds of conflicting reviews, Safarmonk provides concise, reliable insights directly within your browser.

[Link to Chrome Extension](https://chromewebstore.google.com/detail/safarmonk/ooodhdmbhgcfpedeiigaijglpapmhbfh)

## Overview

Safarmonk analyzes hotel details and user reviews in real time to help users make informed booking decisions. It focuses on aspects that matter most — safety, amenities, cuisines, and overall experience — and delivers summarized insights without requiring users to leave the booking page.

The extension integrates seamlessly with popular travel and hotel booking platforms, enhancing the browsing experience rather than replacing it.

<img width="797" height="746" alt="Screenshot 2025-10-19 at 12 11 47 AM" src="https://github.com/user-attachments/assets/4521f159-ff10-4d4f-a217-29ca4f0c73e7" />
<img width="910" height="585" alt="Screenshot 2025-10-19 at 12 12 11 AM" src="https://github.com/user-attachments/assets/3dbd8f41-ef22-41dc-b37b-3d66ba9b0f82" />
<img width="891" height="540" alt="Screenshot 2025-10-19 at 12 12 23 AM" src="https://github.com/user-attachments/assets/3340ba62-f000-4869-819f-943d0862ff0f" />


## Features

Instant Hotel Insights
Displays concise AI-generated summaries of key hotel details directly within the page.

AI-Powered Recommendations
Ranks and highlights hotels based on user-centric factors such as safety, amenities, and cuisine options.

Seamless Integration
Works automatically across supported booking sites with no manual input required.

Privacy by Design
All analysis happens locally or through trusted APIs. No personal data is collected, tracked, or sold.

## How It Works

Install Safarmonk from the Chrome Web Store.

Visit any supported hotel booking website (e.g., Booking.com, Agoda, Expedia).

Safarmonk automatically parses visible hotel data and relevant reviews.

The extension’s AI layer processes this information to extract insights.

Results are rendered contextually within the page UI for easy comparison and understanding.


## How to setup?
This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
