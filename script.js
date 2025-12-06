/* ================================
   HOME PAGE NAVIGATION
================================ */
const tamilBtn = document.getElementById("tamilBtn");
const englishBtn = document.getElementById("englishBtn");
const aboutBtn = document.getElementById("aboutBtn"); // <-- NEW LINE

if (tamilBtn) {
    tamilBtn.addEventListener("click", () => {
        sessionStorage.setItem("openTamilPopup", "yes");  // Trigger Tamil popup
        window.location.href = "tamil.html";
    });
}

if (englishBtn) {
    englishBtn.addEventListener("click", () => {
        sessionStorage.setItem("openEnglishPopup", "yes"); // Trigger English popup
        window.location.href = "english.html";
    });
}

/* ABOUT PAGE NAVIGATION — NEW */
if (aboutBtn) {
    aboutBtn.addEventListener("click", () => {
        window.location.href = "about.html";  // Opens About page
    });
}


/* ================================
   SELECTORS USED FOR POPUP
================================ */
const popupOverlay = document.querySelector(".popup-overlay");        // English popup overlay
const nextBtn = document.getElementById("nextPopupBtn");             // English next button
const pageContent = document.querySelector(".page-content");         // Blur background content
const tamilPopup = document.getElementById("tamilPopup");            // Tamil popup overlay
const nextBtnTamil = document.getElementById("nextPopupBtnTamil");   // Tamil popup close button


/* ================================
   POPUP — ENGLISH PAGE ONLY
================================ */
window.addEventListener("load", () => {

    // Only run this if the *English popup* exists on this page
    if (!popupOverlay || !nextBtn) return;

    const shouldOpen = sessionStorage.getItem("openEnglishPopup");

    if (shouldOpen === "yes") {
        popupOverlay.classList.add("active");
        if (pageContent) pageContent.classList.add("blur-active");

        sessionStorage.removeItem("openEnglishPopup"); // prevent reload popup
    }
});

/* Close English popup */
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        popupOverlay.classList.remove("active");
        if (pageContent) pageContent.classList.remove("blur-active");
    });
}


/* ================================
   POPUP — TAMIL PAGE ONLY
================================ */
window.addEventListener("load", () => {

    // Only run this if Tamil popup exists on this page
    if (!tamilPopup || !nextBtnTamil) return;

    const shouldOpen = sessionStorage.getItem("openTamilPopup");

    if (shouldOpen === "yes") {
        tamilPopup.classList.add("active");
        if (pageContent) pageContent.classList.add("blur-active");

        sessionStorage.removeItem("openTamilPopup");
    }
});

/* Close Tamil popup */
if (nextBtnTamil) {
    nextBtnTamil.addEventListener("click", () => {
        tamilPopup.classList.remove("active");
        if (pageContent) pageContent.classList.remove("blur-active");
    });
}


/* ================================
   SNOWFALL EFFECT
================================ */
const snowContainer = document.querySelector(".snow");
const snowCount = 80;

if (snowContainer) {
    for (let i = 0; i < snowCount; i++) {

        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.textContent = "❄";

        snowflake.style.left = Math.random() * window.innerWidth + "px";
        snowflake.style.top = Math.random() * window.innerHeight + "px";
        snowflake.style.fontSize = 8 + Math.random() * 15 + "px";
        snowflake.style.opacity = 0.3 + Math.random() * 0.7;

        snowContainer.appendChild(snowflake);

        const speed = 2 + Math.random() * 3;
        const swing = Math.random() * 50;

        function fall() {
            let top = parseFloat(snowflake.style.top || 0);
            top += speed;
            snowflake.style.top = top + "px";

            snowflake.style.left =
                parseFloat(snowflake.style.left) +
                Math.sin(top / 50) * swing * 0.02 + "px";

            if (top > window.innerHeight) {
                snowflake.style.top = "-10px";
                snowflake.style.left = Math.random() * window.innerWidth + "px";
            }

            requestAnimationFrame(fall);
        }

        fall();
    }
}

/* =====================================================
   FLOATING SCROLL REVEAL FOR ENGLISH CATEGORY CARDS
===================================================== */
const floatingCards = document.querySelectorAll(".floating-card");

if (floatingCards.length > 0) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                }
            });
        },
        { threshold: 0.2 }
    );

    floatingCards.forEach(card => observer.observe(card));
}


 /* =====================================================
   FLOATING REVEAL (ONLY AFTER POPUP IS CLOSED)
===================================================== */

function activateScrollReveal() {
    const floatingCards = document.querySelectorAll(".floating-card");

    if (floatingCards.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal");
                    }
                });
            },
            { threshold: 0.25 }
        );

        floatingCards.forEach(card => observer.observe(card));
    }
}

/* Run reveal only if popup does NOT exist */
if (!document.getElementById("englishPopup")) {
    activateScrollReveal();
}

/* Run reveal AFTER popup closes */
const popupBox = document.getElementById("englishPopup");
const nextBtn2 = document.getElementById("nextPopupBtn");

if (popupBox && nextBtn2) {
    nextBtn2.addEventListener("click", () => {
        setTimeout(() => {
            activateScrollReveal();
        }, 300); // slight delay to sync with popup animation
    });
}


// SCROLL REVEAL FOR FLOATING CARDS
const cards = document.querySelectorAll(".floating-card");

function revealCards() {
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            card.classList.add("reveal");
        }
    });
}

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);
