const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;
// tạo messages mới và return nó
const createMessageElement = (content , ...classes) =>{
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

const API_KEY = "";

// show loading khi api response
const showLoadingAnimation = () =>{
    const html = `<div class="message-content">
                    <img src="gemini-icon.png" alt="Gemini Image" class="avatar">
                    <p class="text"></p>
                    <div class="loading-indicator">
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>                        
                    </div>  
                </div>
                <span class="material-symbols-rounded icon">content_copy</span>`;
    const incomingMessageDiv = createMessageElement(html , "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    generateAPIResponse();
};
const handleOutgoingChat = () => {

    userMessage = typingForm.querySelector(".typing-input").value.trim();

    if(!userMessage) return; //exit nếu không có messages
    
    // thêm tin nhắn vào trong chat-list
    const html = `<div class="message-content">
                    <img src="avatar.jpg" alt="user-image" class="avatar" />
                    <p class="text"></p>
                </div>`;
    const outGoingMessageDiv = createMessageElement(html , "outgoing");
    outGoingMessageDiv.querySelector(".text").innerText = userMessage;
    chatList.appendChild(outGoingMessageDiv);

    // xóa input và đưa focus vào input
    typingForm.querySelector(".typing-input").value = ""; // xóa tại ô nhập liệu
    typingForm.querySelector(".typing-input").focus(); // đưa con trỏ chuột ngay tại ô input

    setTimeout(showLoadingAnimation, 500); // show loading animation khi delay
}
typingForm.addEventListener("submit", (event) => {
    event.preventDefault(); // không load trang khi submit
    handleOutgoingChat();
});