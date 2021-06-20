# APP IN PROGRESS

[https://gymeasure-production-6dcb6.web.app/](https://gymeasure-production-6dcb6.web.app/)

## Gymeasure app(with firebase/firestore) - track your gym progress

### Current functionalities
- Login with email/pw (firebase)
- Signup with email/pw (firebase)
- Logout (firebase)
- Forgot password module with rest link via email (firebase)
- Verification link sent to email after sign up (firebase)
- Login validation : no login until account verified
- Realtime UI data display / update
- Add / Edit personal data (firestore)
- Add personal info input validation
- Server-side CRUD on measurements (firestore)
- Add measurements input validation
- Live search bar (UI updating on every keystroke)

### To do list
- Improve overall design
- Posibility to add photos / each measurements "session" to keep track of visual progress
- Deployment (CI / CD)
- Edit personal info input validation
- Fix bug auto rerender edit-update measurements
- UI/UX improvement
- Code review
- Switch from bootstrap to ant design

### Current stuck at's
- Setting login session for firebase login
- Fixing dev tools console errors (sometimes)
- Dealing with global and local scoping with `CSS`
- After measurement update, component doesnt rerender automatically but needs a refresh (aware of why it doesn't work)