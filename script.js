/* =========================================================
   HAPPY TEACHERS' DAY — INTERACTIVE TRIBUTE
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const experience = document.getElementById("experience");

const sceneBg = document.getElementById("scene-bg");

const introTitle = document.getElementById("intro-title");
const titleText = document.getElementById("title-text");

const introMessage = document.getElementById("intro-message");
const introLine = document.getElementById("intro-line");

const flowerScene = document.getElementById("flower-scene");
const flowerGrid = document.getElementById("flower-grid");
const flowerButtons = document.querySelectorAll(".flower-hit");

const particleCanvas = document.getElementById("particle-canvas");

const letterScene = document.getElementById("letter-scene");
const letterMessageBox = document.getElementById("letter-message-box");
const letterMessage = document.getElementById("letter-message");
const finishButton = document.getElementById("finish-button");

const finalScene = document.getElementById("final-scene");
const finalLogo = document.getElementById("final-logo");

const portraitWarning = document.getElementById("portrait-warning");


/* =========================================================
   BACKGROUNDS
   ========================================================= */

const BG1 = "assets/BG1.png";
const BG2 = "assets/BG2.png";
const BG3 = "assets/BG3.png";

const LETTER_BACKGROUNDS = [
    "assets/letter-bg-1.png",
    "assets/letter-bg-2.png",
    "assets/letter-bg-3.png",
    "assets/letter-bg-4.png",
    "assets/letter-bg-5.png",
    "assets/letter-bg-6.png",
    "assets/letter-bg-7.png",
    "assets/letter-bg-8.png",
    "assets/letter-bg-9.png",
    "assets/letter-bg-10.png"
];

const FINAL_BG = "assets/final-bg.png";


/* =========================================================
   MESSAGES
   ========================================================= */

const teacherMessages = [
    "Dear Teacher, thank you for turning ordinary lessons into little adventures.",
    "Dear Teacher, thank you for adding a little spark to every page, lesson, and classroom moment.",
    "Dear Teacher, thank you for making learning something we look forward to.",
    "Dear Teacher, thank you for turning our little efforts into moments we could be proud of.",
    "Dear Teacher, thank you for teaching us with patience, kindness, and a heart that truly cares.",
    "Dear Teacher, thank you for inspiring us to keep trying when things did not come easily.",
    "Dear Teacher, thank you for making the classroom a place where curiosity always had a home.",
    "Dear Teacher, thank you for making knowledge feel like an adventure.",
    "Dear Teacher, thank you for celebrating our progress, no matter how small it seemed.",
    "Dear Teacher, thank you for giving us memories we will carry far beyond the classroom."
];


/* =========================================================
   STATE
   ========================================================= */

let currentBackground = BG1;

let flowerLocked = false;

let experienceFinished = false;

/*
 * Each visitor gets their own message deck.
 * The messages are shuffled and used one by one.
 * This prevents the same visitor from repeatedly
 * receiving the same message.
 */
let messageDeck = [];


/* =========================================================
   GENERAL HELPERS
   ========================================================= */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* =========================================================
   BACKGROUND TRANSITION
   ========================================================= */

function crossfadeBackground(newBackground, duration = 1400) {

    return new Promise(resolve => {

        if (currentBackground === newBackground) {
            resolve();
            return;
        }

        const nextBg = document.createElement("div");

        nextBg.style.position = "absolute";
        nextBg.style.inset = "0";
        nextBg.style.width = "100%";
        nextBg.style.height = "100%";

        nextBg.style.backgroundImage =
            `url("${newBackground}")`;

        nextBg.style.backgroundSize = "cover";
        nextBg.style.backgroundPosition = "center";
        nextBg.style.backgroundRepeat = "no-repeat";

        nextBg.style.opacity = "0";

        nextBg.style.transition =
            `opacity ${duration}ms ease-in-out`;

        nextBg.style.zIndex = "1";

        sceneBg.style.zIndex = "0";

        experience.appendChild(nextBg);

        nextBg.offsetHeight;

        requestAnimationFrame(() => {
            nextBg.style.opacity = "1";
        });

        setTimeout(() => {

            sceneBg.style.backgroundImage =
                `url("${newBackground}")`;

            sceneBg.style.opacity = "1";
            sceneBg.style.zIndex = "0";

            currentBackground = newBackground;

            nextBg.remove();

            resolve();

        }, duration + 50);
    });
}


/* =========================================================
   SCENE HELPERS
   ========================================================= */

function showScene(scene) {
    scene.classList.add("active");
    scene.setAttribute("aria-hidden", "false");
}


function hideScene(scene) {
    scene.classList.remove("active");
    scene.setAttribute("aria-hidden", "true");
}


/* =========================================================
   TITLE
   ========================================================= */

async function showOpeningScene() {

    sceneBg.style.backgroundImage =
        `url("${BG1}")`;

    sceneBg.style.opacity = "1";
    sceneBg.style.zIndex = "0";

    currentBackground = BG1;

    showScene(introTitle);

    titleText.textContent = "Happy Teachers' Day";

    titleText.classList.remove("visible");

    await wait(100);

    titleText.classList.add("visible");

    await wait(4000);

    titleText.classList.remove("visible");

    await crossfadeBackground(BG2, 1400);

    hideScene(introTitle);

    await wait(1000);

    startIntroMessage();
}


/* =========================================================
   INTRODUCTION
   ========================================================= */

async function displayIntroPart(lines) {

    introLine.innerHTML = "";

    lines.forEach(line => {

        const div = document.createElement("div");

        div.textContent = line;

        introLine.appendChild(div);

    });

    showScene(introMessage);

    await wait(100);

    introLine.style.opacity = "1";

    await wait(3000);

    introLine.style.opacity = "0";

    await wait(900);

    hideScene(introMessage);
}


async function startIntroMessage() {

    await displayIntroPart([
        "This little tribute",
        "has been created especially for you,"
    ]);

    await displayIntroPart([
        "to celebrate you",
        "and the wonderful work",
        "you do every day."
    ]);

    await displayIntroPart([
        "On this special day,",
        "we simply wanted to pause",
        "for a moment and say:"
    ]);

    await displayIntroPart([
        "Thank you, Teacher."
    ]);

    await crossfadeBackground(BG3, 1400);

    showFlowerScene();
}


/* =========================================================
   FLOWER SCENE
   ========================================================= */

function showFlowerScene() {

    showScene(flowerScene);

    flowerLocked = false;

    flowerButtons.forEach(button => {

        button.disabled = false;

        button.style.pointerEvents = "auto";

    });
}


/* =========================================================
   FLOWER SELECTION
   ========================================================= */

function selectFlower(flowerNumber, clickX, clickY) {

    if (flowerLocked || experienceFinished) {
        return;
    }

    flowerLocked = true;

    flowerButtons.forEach(button => {

        button.disabled = true;

        button.style.pointerEvents = "none";

    });

    /*
     * Sparks originate exactly from the clicked flower.
     */

    createParticles(clickX, clickY);

    setTimeout(async () => {

        hideScene(flowerScene);

        const selectedBackground =
            LETTER_BACKGROUNDS[flowerNumber - 1];

        await crossfadeBackground(
            selectedBackground,
            1400
        );

        showLetterScene();

    }, 2000);
}


/* =========================================================
   FLOWER BUTTON EVENTS
   ========================================================= */

flowerButtons.forEach(button => {

    button.addEventListener("pointerdown", event => {

        event.preventDefault();

        const flowerNumber =
            Number(button.dataset.flower);

        selectFlower(
            flowerNumber,
            event.clientX,
            event.clientY
        );

    });

});


/* =========================================================
   FLOWER GRID FALLBACK
   ========================================================= */

flowerGrid.addEventListener("pointerdown", event => {

    if (flowerLocked || experienceFinished) {
        return;
    }

    if (event.target.closest(".flower-hit")) {
        return;
    }

    const rect = flowerGrid.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const column =
        Math.max(
            0,
            Math.min(
                4,
                Math.floor((x / rect.width) * 5)
            )
        );

    const row =
        Math.max(
            0,
            Math.min(
                1,
                Math.floor((y / rect.height) * 2)
            )
        );

    const flowerNumber =
        row * 5 + column + 1;

    selectFlower(
        flowerNumber,
        event.clientX,
        event.clientY
    );

});


/* =========================================================
   MAGICAL WHITE PARTICLES
   ========================================================= */

function createParticles(originX, originY) {

    const canvas = particleCanvas;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    /*
     * Fewer particles so the effect feels delicate,
     * not explosive.
     */

    const count = 48;

    for (let i = 0; i < count; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        /*
         * Very gentle outward movement.
         */

        const speed =
            Math.random() * 1.8 + 0.35;

        particles.push({

            x: originX + (Math.random() - 0.5) * 10,

            y: originY + (Math.random() - 0.5) * 10,

            vx: Math.cos(angle) * speed,

            vy: Math.sin(angle) * speed,

            size:
                Math.random() * 1.8 + 0.7,

            life: 1,

            decay:
                Math.random() * 0.012 + 0.008,

            drift:
                (Math.random() - 0.5) * 0.018

        });

    }

    const start = performance.now();

    function animate(now) {

        const elapsed = now - start;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(particle => {

            particle.x += particle.vx;
            particle.y += particle.vy;

            /*
             * Very subtle drifting movement.
             */

            particle.vx += particle.drift;
            particle.vy -= 0.004;

            particle.life -= particle.decay;

            if (particle.life <= 0) {
                return;
            }

            /*
             * Soft white glow.
             */

            const glow =
                ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    particle.size * 4
                );

            glow.addColorStop(
                0,
                `rgba(255,255,255,${particle.life * 0.95})`
            );

            glow.addColorStop(
                0.35,
                `rgba(255,255,255,${particle.life * 0.45})`
            );

            glow.addColorStop(
                1,
                "rgba(255,255,255,0)"
            );

            ctx.fillStyle = glow;

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size * 4,
                0,
                Math.PI * 2
            );

            ctx.fill();

            /*
             * Tiny bright center.
             */

            ctx.fillStyle =
                `rgba(255,255,255,${particle.life * 0.9})`;

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size * 0.55,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });

        if (elapsed < 2000) {

            requestAnimationFrame(animate);

        } else {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        }
    }

    requestAnimationFrame(animate);
}


/* =========================================================
   LETTER SCENE
   ========================================================= */

function showLetterScene() {

    letterMessageBox.style.top = "38%";

    letterMessageBox.style.left = "54%";

    showScene(letterScene);

    displayTeacherMessage();
}


/* =========================================================
   MESSAGE FORMATTER
   ========================================================= */

function formatTeacherMessage(message) {

    letterMessage.innerHTML = "";

    let remaining =
        message.replace(/^Dear Teacher,\s*/i, "").trim();

    const words = remaining.split(/\s+/);

    const lines = [];

    let currentLine = [];

    words.forEach(word => {

        currentLine.push(word);

        if (currentLine.length >= 4) {

            lines.push(currentLine.join(" "));

            currentLine = [];

        }

    });

    if (currentLine.length > 0) {

        lines.push(currentLine.join(" "));

    }

    const dearLine = document.createElement("div");

    dearLine.className = "message-line";

    dearLine.textContent = "Dear Teacher,";

    letterMessage.appendChild(dearLine);

    lines.forEach(line => {

        const lineElement =
            document.createElement("div");

        lineElement.className = "message-line";

        lineElement.textContent = line;

        letterMessage.appendChild(lineElement);

    });

    const closingLine =
        document.createElement("div");

    closingLine.className =
        "message-line message-closing";

    closingLine.textContent =
        "Happy Teachers' Day";

    letterMessage.appendChild(closingLine);
}


/* =========================================================
   MESSAGE DISPLAY
   ========================================================= */

async function displayTeacherMessage() {

    /*
     * If all 10 messages have already been used,
     * create a completely new shuffled deck.
     */

    if (messageDeck.length === 0) {

        messageDeck = Array.from(
            { length: teacherMessages.length },
            (_, index) => index
        );

        /*
         * Fisher-Yates shuffle.
         * This gives every message a random position
         * in this visitor's personal deck.
         */

        for (
            let i = messageDeck.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            const temp = messageDeck[i];

            messageDeck[i] = messageDeck[j];

            messageDeck[j] = temp;
        }
    }

    /*
     * Take one message from the shuffled deck.
     * It cannot appear again until the deck is empty.
     */

    const randomIndex = messageDeck.pop();

    const selectedMessage =
        teacherMessages[randomIndex];

    formatTeacherMessage(selectedMessage);

    letterMessage.style.opacity = "1";

    const lines =
        Array.from(
            letterMessage.querySelectorAll(".message-line")
        );

    lines.forEach(line => {

        line.style.opacity = "0";

    });

    for (const line of lines) {

        await typeLine(line);

        await wait(180);

    }
}


/* =========================================================
   SLOWER LINE TYPE EFFECT
   ========================================================= */

function typeLine(element) {

    return new Promise(resolve => {

        const text = element.textContent;

        element.textContent = "";

        element.style.opacity = "1";

        let index = 0;

        /*
         * Slower, more elegant typing.
         */

        const speed = 75;

        function typeCharacter() {

            if (index < text.length) {

                element.textContent +=
                    text.charAt(index);

                index++;

                setTimeout(
                    typeCharacter,
                    speed
                );

            } else {

                resolve();

            }

        }

        typeCharacter();

    });
}


/* =========================================================
   FINISH BUTTON
   ========================================================= */

finishButton.addEventListener(
    "click",
    finishExperience
);


async function finishExperience() {

    if (experienceFinished) {
        return;
    }

    experienceFinished = true;

    finishButton.disabled = true;

    finishButton.style.pointerEvents = "none";

    const nextBg = document.createElement("div");

    nextBg.style.position = "absolute";

    nextBg.style.inset = "0";

    nextBg.style.width = "100%";

    nextBg.style.height = "100%";

    nextBg.style.backgroundImage =
        `url("${FINAL_BG}")`;

    nextBg.style.backgroundSize = "cover";

    nextBg.style.backgroundPosition = "center";

    nextBg.style.backgroundRepeat = "no-repeat";

    nextBg.style.opacity = "0";

    nextBg.style.transition =
        "opacity 1400ms ease-in-out";

    nextBg.style.zIndex = "1";

    experience.appendChild(nextBg);

    letterScene.style.zIndex = "10";

    requestAnimationFrame(() => {

        nextBg.style.opacity = "1";

        letterScene.style.transition =
            "opacity 1400ms ease-in-out";

        letterScene.style.opacity = "0";

    });

    await wait(1450);

    sceneBg.style.backgroundImage =
        `url("${FINAL_BG}")`;

    sceneBg.style.opacity = "1";

    sceneBg.style.zIndex = "0";

    currentBackground = FINAL_BG;

    nextBg.remove();

    hideScene(letterScene);

    letterScene.style.transition = "";

    letterScene.style.opacity = "";

    showScene(finalScene);

    finalScene.style.zIndex = "10";

    finalLogo.style.opacity = "0";

    finalLogo.style.transform = "scale(0.96)";

    finalLogo.style.transition =
        "opacity 2200ms ease, transform 2200ms ease";

    await wait(150);

    requestAnimationFrame(() => {

        finalLogo.style.opacity = "1";

        finalLogo.style.transform = "scale(1)";

    });

    await wait(2400);

    finalLogo.style.transition = "none";

    finalLogo.style.opacity = "1";

    finalLogo.style.transform = "scale(1)";

    document.body.style.pointerEvents = "none";
}


/* =========================================================
   PORTRAIT WARNING
   ========================================================= */

function updateOrientation() {

    const portrait =
        window.innerHeight > window.innerWidth;

    if (portrait) {

        portraitWarning.style.display = "flex";

    } else {

        portraitWarning.style.display = "none";

    }
}


window.addEventListener(
    "resize",
    updateOrientation
);


window.addEventListener(
    "orientationchange",
    updateOrientation
);


updateOrientation();


/* =========================================================
   INITIAL SETUP
   ========================================================= */

sceneBg.style.backgroundImage =
    `url("${BG1}")`;

sceneBg.style.opacity = "1";

sceneBg.style.zIndex = "0";

currentBackground = BG1;

introTitle.classList.remove("active");

introMessage.classList.remove("active");

flowerScene.classList.remove("active");

letterScene.classList.remove("active");

finalScene.classList.remove("active");

titleText.classList.remove("visible");

introLine.style.opacity = "0";

finalLogo.style.opacity = "0";


/* =========================================================
   START
   ========================================================= */

showOpeningScene();