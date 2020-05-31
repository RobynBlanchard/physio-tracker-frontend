https://physio-tracker.now.sh/

Credit for style guide and theme: https://www.invisionapp.com/inside-design/design-resources/fitgoal-ui-kit/

TODO:
custom exercise
work out why need two awaits
fix session page tests
add outline when tabbing - accessibility

update readme (tidy)
error styling
fix background image jumping
https://github.com/RobynBlanchard/physio-tracker-frontend/blob/master/src/context/authentication.js - dont export client etc

handle auth errors
edit and delete data
handle authentication on server instead to persist between page refresh and expire cookie
Protect routes - direct user to sign in
Update user
Only fetch latest 10 sessions at first
D3 for analysis
fix margins on iphone
remove heroku endpoint
Display loading indicator
Lint
more useful log in errors
react datepicker
reduce latency with mutations - https://blog.apollographql.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2
add back in exercise summary
Tidy up _app file
sort
lint
extract out mocks reused in tests
feature tests

reusable way to add dif set types
https://github.com/brunocrosier/next-with-apollo-auth
https://kalm42.com/blog/how-to-handle-authentication-in-react-applications


// TODO
// import React from 'react'
// import {useUser} from './context/auth'
// const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
// const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))
// function App() {
//   const user = useUser()
//   return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
// }
// export App

// https://github.com/howtographql/howtographql/blob/master/content/frontend/react-apollo/5-authentication.md
// https://medium.com/the-ideal-system/user-accounts-with-next-js-an-extensive-tutorial-6831cdaed16b


// css grid?