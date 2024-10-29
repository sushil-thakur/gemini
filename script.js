const typingForm = document.querySelector(".typing-form");
const chatList= document.querySelector(".chat-list");

let userMessage = null;
const API_KEY = "AIzaSyBc_c4CW304RTeNpdYQT_F7kwTR2e_Hl1Y"
const API_URL =` 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY'`;
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);

    div.innerHTML = content;
return div;
}
const generateAPIResponse =() => {

}
const showLoadingAnimation = () =>{
    const html = `<div class="message-content">
    <img src="image/user.png" alt="User Image" class="avatar">
    <p class="text"></p>
    <div class="loading-indicator">
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
</div>
</div>
<span class="icon material-symbols-rounded">content_copy</span>`;
const incomingMessageDiv = createMessageElement(html, "outgoing", "loading");
outgoingMessageDiv.querySelector(".text").innerText = userMessage;
charlist.appendChild(outgoingMessageDiv); 

generateAPIResponse();

}
const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim();
    if(!userMessage) return;
   const html = `<div class="message-content">
                <img src="image/user.png" alt="User Image" class="avatar">
                <p class="text"></p>
            </div>`;
 const outgoingMessageDiv = createMessageElement(html, "outgoing");
 outgoingMessageDiv.querySelector(".text").innerText = userMessage;
  charlist.appendChild(outgoingMessageDiv); 

  typingForm.reset();
  setTimeout(showLoadingAnimation, 500);
}

typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
});