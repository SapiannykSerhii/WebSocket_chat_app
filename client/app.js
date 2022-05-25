const loginForm = document.getElementById('welcome-form');
const messageSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName

loginForm.addEventListener('submit', event => login(event))
addMessageForm.addEventListener('submit', event => sendMessage(event))

function login (event) {
  event.preventDefault()

  if (userNameInput.value) {
    userName = userNameInput.value
    messageSection.classList.add('show')
    loginForm.classList.remove('show')
  } else {
    alert('Insert your name!')
  }
  console.log(userName);
}

function sendMessage(event) {
  event.preventDefault()
  let messageContent
  if (messageContentInput.value) {
    messageContent = messageContentInput.value
    addMessage(userName, messageContentInput.value)
    messageContentInput.value = ''
  } else {
    alert('Type your letter!')
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}