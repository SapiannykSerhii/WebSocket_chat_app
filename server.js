const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const users = [];
const messages = [];


app.use(express.static(path.join(__dirname, "/client")));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

const io = socket(server);
io.on('connection', (socket) => {

  socket.on('join', name => {
    console.log(`${name} Joined`);
    users.push({ name, id: socket.id });
    socket.broadcast.emit('message', { author: 'Chatbot', content: `${name} has joined the conversation` });
  })

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Oh, user ' + socket.id + ' has left');
    const i = users.findIndex(user => user.id === socket.id);
    if (i >= 0) {
      socket.broadcast.emit('message', { author: 'Chatbot', content: `${users[i].name} has left the conversation` });
      users.splice(i, 1);
    }
  });
});