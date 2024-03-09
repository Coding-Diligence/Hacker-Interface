const content = document.getElementById('content');
const text = document.querySelector('.text');
const cursor = document.querySelector('.cursor');
const input = document.getElementById('commandInput');

const lines = [
    "Initializing connection...",
    "Establishing secure tunnel...",
    "Access granted.",
    "Welcome to the mainframe.",
];

let lineIndex = 0;
let charIndex = 0;

function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}
function type() {
    if (lineIndex === lines.length) return;

    const line = lines[lineIndex];
    text.innerHTML += line[charIndex];
    charIndex++;

    if (charIndex === line.length) {
        text.innerHTML += '<br>';
        charIndex = 0;
        lineIndex++;
    }

    setTimeout(type, Math.random() * 10 + 10);
}

type();

setInterval(() => {
    cursor.classList.toggle('hidden');
}, 500);

function scrollToBottom() {
    content.scrollTop = content.scrollHeight;
}

function submitCommand(event) {
    if (event.key === 'Enter') {
        const command = input.value;
        input.value = '';

        const output = document.createElement('div');
        output.textContent = `> ${command}`;
        text.appendChild(output);

        executeCommand(command);
        scrollToBottom();
    }
}

input.addEventListener('keypress', submitCommand);

function executeCommand(command) {
    const output = document.createElement('div');
    output.textContent = `Output for command: ${command}`;
    text.appendChild(output);

    if (command === "trigger") {
        const gifContainer = document.createElement('div');
        const gif = document.createElement('img');
        gif.src = "https://media.discordapp.net/attachments/1154677438316544060/1159433745112244294/trigger.gif?ex=653101d2&is=651e8cd2&hm=9d93ca21108e2e0daa978e81952248c9d0a2f3b766fe1147fc33dee7fc95c702&=&width=384&height=384";
        gifContainer.appendChild(gif);
        text.appendChild(gifContainer);

        setTimeout(() => {
            text.removeChild(gifContainer);
            scrollToBottom();
        }, 5000);
    }

    if (command === "code") {
        const codeConsole = document.createElement('div');
        codeConsole.classList.add('code-console');
        document.body.appendChild(codeConsole);

        for (let i = 0; i < 10; i++) {
            const line = document.createElement('div');
            line.textContent = `Line ${i}`;
            codeConsole.appendChild(line);
        }

        const closeButton = document.createElement('div');
        closeButton.classList.add('btn', 'btn-close');
        codeConsole.appendChild(closeButton);

        closeButton.addEventListener('click', () => {
            document.body.removeChild(codeConsole);
        });
    }
    if (command === "song") {
        const audio = document.createElement('audio');
        audio.src = 'https://www.myinstants.com/media/sounds/never-gonna-give-you-up.mp3';
        audio.controls = true;
        text.appendChild(audio);

        audio.addEventListener('ended', () => {
            text.removeChild(audio);
            scrollToBottom();
        });

        audio.play();
    }        
    if (command === "mdp") {
        const randomPassword = generateRandomPassword(20);
        const passwordMessage = document.createElement('div');
        passwordMessage.textContent = `Mot de passe généré : ${randomPassword}`;
        text.appendChild(passwordMessage);
    }

    if (command === "help") {
        showAvailableCommands();
    }
    function showAvailableCommands() {
        const commands = [
            "trigger - Affiche un GIF",
            "code - Affiche une console de code",
            "song - Joue la chanson Rickroll",
            "mdp - Affiche un mot de passe généré "
        ];
    
        commands.forEach(command => {
            const commandOutput = document.createElement('div');
            commandOutput.textContent = command;
            text.appendChild(commandOutput);
        });    
        scrollToBottom();
    }
}
