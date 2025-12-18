const WebSocket = require("ws");

// Створюємо WebSocket-сервер на порту 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log("Сервер WebSocket запущено на порті 8080");

// Функція генерації випадкової температури 20–40 °C
function randomTemp() {
  return (20 + Math.random() * 20).toFixed(1);
}

// Функція, яка розсилає температуру всім клієнтам
function sendTemp() {
  const temp = randomTemp();

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(temp);
    }
  });

  // Наступна відправка через 2–5 секунд
  const delay = Math.random() * 3000 + 2000;
  setTimeout(sendTemp, delay);
}

// Запускаємо цикл відправки температури
sendTemp();
