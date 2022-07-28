const notification = document.getElementById('errorBox');
const messageElement = notification.querySelector('span');

export function notify(message) {
    messageElement.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => notification.style.display = 'none', 3000);
}