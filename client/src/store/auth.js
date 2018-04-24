export default {
  actions: {
    authenticate () {
      const popup = window.open(process.env.VUE_APP_API_URL + '/connect/google', '_blank')
      if (window.focus) {
        popup.focus()
      }
      setInterval(() => {
        console.log(popup.location)
      }, 100)
    }
  }
}
