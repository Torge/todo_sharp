export default function (to, from, next) {
  const publicPages = ['login']
  if (publicPages.includes(name => to.name === name)) return next()
  console.log(to)
  const isAuthenticated = false
  next()
}
