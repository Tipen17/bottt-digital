const API_KEY = "ISI_DENGAN_API_KEY_MU"; // <<< Ganti dengan API-mu
const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  // Tampilkan pesan pengguna
  chatbox.innerHTML += `<div class="user"><strong>Kamu:</strong> ${message}</div>`;
  input.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  // Tampilkan placeholder bot
  chatbox.innerHTML += `<div class="bot"><strong>Bot:</strong> ...</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    // Update pesan bot
    const botMessages = document.querySelectorAll(".bot");
    botMessages[botMessages.length - 1].innerHTML = `<strong>Bot:</strong> ${botReply}`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (err) {
    const botMessages = document.querySelectorAll(".bot");
    botMessages[botMessages.length - 1].innerHTML = `<strong>Bot:</strong> Terjadi kesalahan.`;
  }
}
