const readline = require("readline")
const socket = require("socket.io-client")

const client = socket("http://54.169.170.156:3000")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const readInput = () => {
  rl.question("", (input) => {
    if (input === "quit") {
      rl.close()
    } else {
      client.emit("message", input)
      readInput()
    }
  })
}

client.on("connect", () => {
  client.on("receiver", (msg, online) => console.log(`\n\n${msg}, (${online} online)`))
  readInput()
})

client.on("disconnect", () => console.log("# Disconnected"))
