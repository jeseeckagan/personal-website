/* ==========================================================
   MOBILE MENU TOGGLE
   ========================================================== */
function toggleMenu() {
    // Toggles the 'show' class which is styled in style.css for the mobile menu
    document.querySelector(".nav-links").classList.toggle("show");
}

/* ==========================================================
   INITIALIZATION & ACTIVE LINK HIGHLIGHT
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Fade in effect
    document.body.classList.add("loaded");

    // 2. Highlight current page in navbar
    highlightActiveLink();

    // 3. Initialize the Global Image Pop-up for all projects and certificates
    setupImagePopups();
});

function highlightActiveLink() {
    // Gets the current file name (e.g., 'projects.html')
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath) {
            link.classList.add("active");
        } else {
            // Important: Removes the hard-coded 'active' class from other pages
            link.classList.remove("active");
        }
    });
}

/* ==========================================================
   GLOBAL IMAGE POPUP FOR PROJECTS AND ACHIEVEMENTS (CLICK)
   ========================================================== */
function setupImagePopups() {
    // Select all images from both project and cert cards
    const allImages = document.querySelectorAll(".project-card img, .cert-card img");
    if (allImages.length === 0) return; // Exit if no images found

    // --- Create Popup Elements (only once) ---
    const popup = document.createElement("div");
    popup.id = "globalPopup";
    Object.assign(popup.style, {
        display: "none", position: "fixed", top: "0", left: "0",
        width: "100%", height: "100%", background: "rgba(0,0,0,0.9)",
        zIndex: "9999", justifyContent: "center", alignItems: "center",
        backdropFilter: "blur(5px)", cursor: "zoom-out"
    });
    document.body.appendChild(popup);

    const popupImg = document.createElement("img");
    Object.assign(popupImg.style, {
        maxWidth: "90%", maxHeight: "90%", borderRadius: "10px",
        boxShadow: "0 0 25px rgba(224, 176, 255, 0.8)" // Purple shadow
    });
    popup.appendChild(popupImg);

    // --- Attach Click Event ---
    allImages.forEach(img => {
        img.addEventListener("click", () => {
            popupImg.src = img.src; // Set image source
            popup.style.display = "flex"; // Show popup
        });
    });

    // --- Close Logic ---
    // Close on clicking the black background
    popup.addEventListener("click", e => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
}