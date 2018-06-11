import store from './store'
/**
 * Der Authguard wird im router vor jeder route aufgerufen
 * und checkt ob der Nutzer authentifiziert ist. Wenn er das
 * nicht ist, wird dieser auf die Login Seite geleitet.
*/
export default async function (to, from, next) {
  const publicPages = ['login']
  if (publicPages.includes(to.name)) {
    return next()
  }
  const isAuthenticated = !!store.state.auth.user
  if (isAuthenticated) {
    return next()
  } else {
    const jwt = localStorage['todo_sharp_jwt']
    const userId = localStorage['todo_sharp_userId']
    if (jwt && userId) {
      try {
        await store.dispatch('auth/reAuthenticate', {
          jwt,
          userId
        })
        next()
      } catch (e) {
        console.log(e)
        next({
          name: 'login'
        })
      }
    } else {
      next({
        name: 'login'
      })
    }
  }
}
