function fetchImages() {
    console.log("Scanning Gmail for images...");
    let images = Array.from(document.querySelectorAll("img"))
        .map(img => img.src)
        .filter(src => src.includes("mail.google.com/"));

    console.log("Images found:", images);
    chrome.runtime.sendMessage({ images: images });
}