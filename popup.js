document.getElementById("fetchImages").addEventListener("click", async () => {
    console.log("Fetching images...");

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: fetchImagesFromGmail  // Function reference instead of object
    }).catch(error => console.error("Error injecting content script:", error));
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message);
    if (message.images) {
        let container = document.getElementById("imageContainer");
        container.innerHTML = "";
        message.images.forEach(imgUrl => {
            console.log("Found image:", imgUrl);
            let img = document.createElement("img");
            img.src = imgUrl;
            img.dataset.src = imgUrl;
            img.addEventListener("click", () => img.classList.toggle("selected"));
            container.appendChild(img);
        });
    }
});

// ✅ Move function inside popup.js so it can be injected
function fetchImagesFromGmail() {
    console.log("Scanning Gmail for images...");
    let images = Array.from(document.querySelectorAll("img"))
        .map(img => img.src)
        .filter(src => src.includes("mail.google.com/"));

    console.log("Images found:", images);
    chrome.runtime.sendMessage({ images: images });
}