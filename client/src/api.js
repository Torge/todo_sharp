import axios from 'axios'
/**
 * Wir verwenden axios als http client und dieser wird hier
 * mit der API URL aus der enviroment konfiguriert
*/
export default axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
