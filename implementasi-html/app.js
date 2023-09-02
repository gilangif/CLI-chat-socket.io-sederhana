const express = require("express")
const http = require("http")
const socketIO = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const port = 3000

app.get("/", (req, res) => {
  res.sendFile("D:\\Hacktiv8\\belajar\\def\\index.html")
})

io.on("connection", (socket) => {
  console.log("Klien terhubung")

  socket.on("pesan", (data) => {
    socket.broadcast.emit("pesan-balasan", `Pesan balasan: Terima kasih atas pesannya: ${data}`)
  })

  socket.on("disconnect", () => {
    console.log("Klien terputus")
  })
})

server.listen(port, () => console.log("listening on 3000"))
