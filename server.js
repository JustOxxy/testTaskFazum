const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
// Расскомментировать для эмуляции ошибки
// server.get('/data', (req, res) => {
//   res.status(500).jsonp({
//     error: "error message here"
//   })
// })
server.use(router)
server.listen(8000, () => {
  console.log('JSON Server is running')
})