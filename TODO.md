# TODO: Convert to Offline PWA

## Tasks
- [x] Create `src/assets/jsons/quotes.json` with quotes data
- [x] Update `src/pages/Quotes.tsx` to load quotes from JSON file
- [x] Add `/settings` route in `src/App.tsx`
- [x] Create `src/pages/Settings.tsx` with notification frequency options
- [x] Create `src/contexts/NotificationContext.tsx` for notification management
- [x] Update `src/components/Header.tsx` to include Settings link
- [x] Remove "Every Minute" option from settings
- [x] Create `public/manifest.json` for PWA manifest
- [x] Create `public/sw.js` for service worker caching
- [x] Update `index.html` to link manifest
- [x] Register service worker in `src/main.tsx`
- [x] Add custom install modal with nice UI
- [ ] Test PWA installation and offline functionality
- [ ] Test quotes loading from JSON and theming
- [ ] Test notification permissions and scheduling
