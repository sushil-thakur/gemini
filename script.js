

const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const themeToggle = document.getElementById("theme-toggle");
const clearChat = document.getElementById("clear-chat");
const API_KEY = "AIzaSyBc_c4CW304RTeNpdYQT_F7kwTR2e_Hl1Y"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

const createMessageElement = (content, type) => {
    const div = document.createElement("div");
    div.classList.add("message", type);

    const avatarSrc = type === 'outgoing' 
        ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/user-VKopKKmx2sGuD4lu2BVFDSj9Z08wA9.png'
        : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gemini-JqFooevP0hIXyQlCiK6lwQ4jH9mb5t.svg';
    
    div.innerHTML = `
        <div class="message-content">
            <div class="avatar-wrapper">
                <img src="${avatarSrc}" alt="${type === 'outgoing' ? 'User' : 'AI'} Avatar" class="avatar">
            </div>
            <p class="text">${content}</p>
        </div>
        <span class="icon material-symbols-rounded">content_copy</span>
    `;
    return div;
};

const showLoadingAnimation = () => {
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("message", "loading");
    loadingDiv.innerHTML = `
        <div class="message-content">
            <div class="avatar-wrapper">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gemini-JqFooevP0hIXyQlCiK6lwQ4jH9mb5t.svg" alt="AI Avatar" class="avatar">
            </div>
            <div class="loading-indicator">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
            </div>
        </div>
    `;
    chatList.appendChild(loadingDiv);
    chatList.scrollTop = chatList.scrollHeight;
    return loadingDiv;
};

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? 'dark_mode' : 'light_mode';
});

// Clear chat functionality
clearChat.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the chat?')) {
        chatList.innerHTML = '';
    }
});

// Rest of your existing JavaScript code remains the same
const generateAPIResponse = async (userMessage) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{
                        text: userMessage
                    }]
                }]
            })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error:", error);
        return "Sorry, I encountered an error. Please try again.";
    }
};

const handleOutgoingChat = async (userMessage) => {
    if (!userMessage) return;

    chatList.appendChild(createMessageElement(userMessage, "outgoing"));
    chatList.scrollTop = chatList.scrollHeight;

    const loadingElement = showLoadingAnimation();
    const aiResponse = await generateAPIResponse(userMessage);
    loadingElement.remove();

    chatList.appendChild(createMessageElement(aiResponse, "incoming"));
    chatList.scrollTop = chatList.scrollHeight;
};

typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userMessage = typingForm.querySelector(".typing-input").value.trim();
    typingForm.reset();
    handleOutgoingChat(userMessage);
});

// Add click event listeners to suggestion items
document.querySelectorAll('.suggestion').forEach(item => {
    item.addEventListener('click', () => {
        const suggestionText = item.querySelector('.text').textContent;
        handleOutgoingChat(suggestionText);
    });
});

// Add click event listener to copy icons
chatList.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon')) {
        const textToCopy = e.target.previousElementSibling.querySelector('.text').textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Text copied to clipboard!');
        });
    }
});



