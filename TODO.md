# Franchise Page Background Fix

## Steps
- [x] 1. Analyse Franchise.tsx and understand current background behavior
- [x] 2. Remove `useEffect` that forces `document.body` and `document.documentElement` background to white
- [x] 3. Remove inline `style={{ background: 'white' }}` from root `<div>` container
- [x] 4. Verify no other files affected

