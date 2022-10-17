# Medical Forum

## Acknowledgement:

- [react](https://reactjs.org/)
- [nextjs](https://nextjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [firebase v9](https://firebase.google.com/)
- [recoil](https://recoiljs.org/)
- [framer motion](https://www.framer.com/motion/)

## For development:

- Clone this project.
- Run command in project root to install dependencies:

```
# for npm user:
npm i

# for yarn user:
yarn
```

- Go to [Firebase console](https://console.firebase.google.com), add a project and get the bellow information, then put them in .env.local file

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

- To run:

```
# for npm user:
npm run dev

# for yarn user:
yarn dev
```

- Install [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) (_if you use vs code, install extensions instead_)
- For contributing, use [conventional commits](https://conventionalcommits.org)

## To-do:

- [x] create header
- [x] add toggle light/dark theme button
- [ ] authentication
- [ ] create post
- [ ] display posts
- [ ] add comment
- [ ] display comments
- [ ] save posts
- [ ] mark a comment as answer (author only)
- [ ] ...
