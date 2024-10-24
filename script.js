const typingform = document.querySelector(".typing-form");
typingform.addEventListener("submit",  (e) =>{
    e.preventDefault();
    handleoutgoingchat();
});