const express = require("express")
const socket = require("socket.io")
const http = require("http")

const app = express()
const server = http.createServer(app)
const io = socket(server)

let port = 3000 || process.env.PORT
let online = 0

app.get("/", (req, res) => res.status(200).send("Goodbye world !"))

io.on("connection", (socket) => {
  online++
  console.log(`# (${socket.id}) connected, total ${online} online`)

  socket.on("message", (msg) => socket.broadcast.emit("receiver", msg, online))

  socket.on("disconnect", () => {
    online--
    console.log(`# (${socket.id}) disconnect, total ${online} online`)
    socket.emit("online", online)
  })
})

server.listen(port, () => console.log("# Server listening on port", port))
