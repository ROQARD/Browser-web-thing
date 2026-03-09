const view = document.getElementById('view');
const urlInput = document.getElementById('urlInput');

// Function to load a new website
function updateSurface() {
    const targetUrl = urlInput.value || 'https://google.com';
    // We add Date.now() to force the browser to bypass the cache and show the new site
    view.src = `/run?url=${encodeURIComponent(targetUrl)}&t=${Date.now()}`;
}

// Allow pressing "Enter" in the input box to load the site
urlInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        updateSurface();
    }
});

// Keep your existing click logic for the iPad touches
view.onclick = (e) => {
    const rect = view.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (834 / rect.width));
    const y = Math.round((e.clientY - rect.top) * (1194 / rect.height));
    
    view.src = `/run?url=${encodeURIComponent(urlInput.value)}&x=${x}&y=${y}&t=${Date.now()}`;
};
