import store from './store'
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
