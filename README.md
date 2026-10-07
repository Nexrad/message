# Messages — local demo

Samsung Messages-inspired university assignment demo. No real SMS, authentication, database, native permissions or external messaging service. Sample messages are included on first launch; all changes are stored on this device in localStorage.

## Demo workflows
Open the three-dot menu → Settings → Demo Messages to add, edit or delete received messages. Messages sharing a phone number appear in one conversation, ordered by date and time. Search matches sender, phone number and content. Contacts are derived from the saved messages. Long messages open a full-text view with copy/share actions.

Clearing browser/site data removes your messages. Storage is specific to the current browser and origin. The message composer is a visual demo; it does not send SMS. Reference receipt URLs are demo content.

## Android conversion
This is a phone-first web app, not an APK. A future Android wrapper can package it with local assets. Preserve safe-area insets and let Android supply status/navigation bars. Do not add SMS, phone or contacts permissions. No credentials are required.

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
