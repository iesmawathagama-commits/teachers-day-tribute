/* =========================================================
   HAPPY TEACHERS' DAY — INTERACTIVE TRIBUTE
   ========================================================= */


/* =========================================================
   ELEMENTS
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
   TEACHER MESSAGES
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


/* =========================================================
   GENERAL HELPER
   ========================================================= */

function wait(ms) {
    return new Promise(resolve => {
        let remaining = ms;
        let lastTime = performance.now();

        function tick(now) {
            const isPortrait = window.matchMedia("(orientation: portrait)").matches;

            if (!isPortrait) {
                remaining -= now - lastTime;
            }

            lastTime = now;

            if (remaining <= 0) {
                resolve();
                return;
            }

            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    });
}

/* =========================================================
   BACKGROUND CROSSFADE
   =========================================================
   
   Used for:
   BG1 → BG2
   BG2 → BG3
   BG3 → Letter Background

   The current background remains visible underneath
   while the new background fades IN.
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

        nextBg.style.backgroundSize = "100% 100%";
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

    scene.setAttribute(
        "aria-hidden",
        "false"
    );

}


function hideScene(scene) {

    scene.classList.remove("active");

    scene.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   OPENING TITLE
   ========================================================= */

async function showOpeningScene() {

    /*
     * Initial background
     */

    sceneBg.style.backgroundImage =
        `url("${BG1}")`;

    sceneBg.style.opacity = "1";

    sceneBg.style.zIndex = "0";

    currentBackground = BG1;


    /*
     * Show title
     */

    showScene(introTitle);

    titleText.textContent =
        "Happy Teachers' Day";

    titleText.classList.remove("visible");


    await wait(100);


    /*
     * Fade title IN
     */

    titleText.classList.add("visible");


    /*
     * Keep title visible
     */

    await wait(4000);


    /*
     * Fade title OUT
     */

    titleText.classList.remove("visible");


    /*
     * BG1 → BG2
     */

    await crossfadeBackground(
        BG2,
        1400
    );


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

        const div =
            document.createElement("div");

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

    /*
     * PART 1
     */

    await displayIntroPart([

        "This little tribute",

        "has been created especially for you,"

    ]);


    /*
     * PART 2
     */

    await displayIntroPart([

        "to celebrate you",

        "and the wonderful work",

        "you do every day."

    ]);


    /*
     * PART 3
     */

    await displayIntroPart([

        "On this special day,",

        "we simply wanted to pause",

        "for a moment and say:"

    ]);


    /*
     * FINAL INTRO MESSAGE
     */

    await displayIntroPart([

        "Thank you, Teacher."

    ]);


    /*
     * BG2 → BG3
     */

    await crossfadeBackground(
        BG3,
        1400
    );


    /*
     * Show flowers
     */

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

        button.style.pointerEvents =
            "auto";

    });

}


/* =========================================================
   FLOWER SELECTION
   ========================================================= */

function selectFlower(
    flowerNumber,
    clickX,
    clickY
) {

    if (
        flowerLocked ||
        experienceFinished
    ) {
        return;
    }


    /*
     * Lock all flowers immediately.
     */

    flowerLocked = true;


    flowerButtons.forEach(button => {

        button.disabled = true;

        button.style.pointerEvents =
            "none";

    });


    /*
     * Magical particles begin exactly
     * from the user's touch/click.
     */

    createParticles(
        clickX,
        clickY
    );


    /*
     * Keep the flower scene visible
     * during the particle effect.
     */

    setTimeout(async () => {

        /*
         * Hide flowers only after
         * the particle effect has played.
         */

        hideScene(flowerScene);


        /*
         * Find the selected letter background.
         */

        const selectedBackground =
            LETTER_BACKGROUNDS[
                flowerNumber - 1
            ];


        /*
         * -------------------------------------------------
         * IMPORTANT
         * -------------------------------------------------
         *
         * The letter background is now NOT permanently
         * stored in sceneBg.
         *
         * Instead, it is placed directly on letterScene.
         *
         * This guarantees that the letter background
         * remains visible until Finish is pressed.
         * -------------------------------------------------
         */


        /*
         * Set the letter scene background.
         */

        letterScene.style.backgroundImage =
            `url("${selectedBackground}")`;

        letterScene.style.backgroundSize =
            "100% 100%";

        letterScene.style.backgroundPosition =
            "center";

        letterScene.style.backgroundRepeat =
            "no-repeat";


        /*
         * Create temporary letter background
         * for the gentle fade-in.
         */

        const nextLetterBg =
            document.createElement("div");


        nextLetterBg.style.position =
            "absolute";

        nextLetterBg.style.inset = "0";

        nextLetterBg.style.width = "100%";

        nextLetterBg.style.height = "100%";


        nextLetterBg.style.backgroundImage =
            `url("${selectedBackground}")`;

        nextLetterBg.style.backgroundSize =
            "100% 100%";

        nextLetterBg.style.backgroundPosition =
            "center";

        nextLetterBg.style.backgroundRepeat =
            "no-repeat";


        /*
         * Start invisible.
         */

        nextLetterBg.style.opacity =
            "0";


        nextLetterBg.style.transition =
            "opacity 1400ms ease-in-out";


        /*
         * Put it above the current background.
         */

        nextLetterBg.style.zIndex =
            "1";


        experience.appendChild(
            nextLetterBg
        );


        /*
         * Start the gentle fade-in.
         */

        requestAnimationFrame(() => {

            nextLetterBg.style.opacity =
                "1";

        });


        /*
         * Wait until fade is complete.
         */

        await wait(1450);


        /*
         * Remove temporary transition layer.
         *
         * The permanent letterScene background
         * is now underneath.
         */

        nextLetterBg.remove();


        /*
         * Bring letter scene above everything.
         */

        letterScene.style.zIndex =
            "10";

        letterScene.style.opacity =
            "1";

        letterScene.style.transition =
            "";


        /*
         * Show letter and message.
         */

        showLetterScene();

    }, 2000);

}


/* =========================================================
   FLOWER BUTTON EVENTS
   ========================================================= */

flowerButtons.forEach(button => {

    button.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();


            const flowerNumber =
                Number(
                    button.dataset.flower
                );


            selectFlower(

                flowerNumber,

                event.clientX,

                event.clientY

            );

        }
    );

});


/* =========================================================
   FLOWER GRID FALLBACK
   ========================================================= */

flowerGrid.addEventListener(
    "pointerdown",
    event => {

        if (
            flowerLocked ||
            experienceFinished
        ) {
            return;
        }


        /*
         * If an actual flower button
         * was clicked, its own event handles it.
         */

        if (
            event.target.closest(
                ".flower-hit"
            )
        ) {
            return;
        }


        const rect =
            flowerGrid.getBoundingClientRect();


        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const column =
            Math.max(

                0,

                Math.min(

                    4,

                    Math.floor(
                        (x / rect.width) * 5
                    )

                )

            );


        const row =
            Math.max(

                0,

                Math.min(

                    1,

                    Math.floor(
                        (y / rect.height) * 2
                    )

                )

            );


        const flowerNumber =
            row * 5 + column + 1;


        selectFlower(

            flowerNumber,

            event.clientX,

            event.clientY

        );

    }
);


/* =========================================================
   MAGICAL WHITE PARTICLES
   ========================================================= */

function createParticles(
    originX,
    originY
) {

    const canvas =
        particleCanvas;

    const ctx =
        canvas.getContext("2d");


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    const particles = [];


    /*
     * Delicate magical particles.
     */

    const count = 48;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            1.8 +
            0.35;


        particles.push({

            x:
                originX +
                (Math.random() - 0.5) * 10,

            y:
                originY +
                (Math.random() - 0.5) * 10,


            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,


            size:
                Math.random() *
                1.8 +
                0.7,


            life: 1,


            decay:
                Math.random() *
                0.012 +
                0.008,


            drift:
                (Math.random() - 0.5) *
                0.018

        });

    }


    const start =
        performance.now();


    function animate(now) {

        const elapsed =
            now - start;


        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );


        particles.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;


                particle.vx +=
                    particle.drift;

                particle.vy -=
                    0.004;


                particle.life -=
                    particle.decay;


                if (
                    particle.life <= 0
                ) {
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

                    `rgba(
                        255,
                        255,
                        255,
                        ${particle.life * 0.95}
                    )`

                );


                glow.addColorStop(

                    0.35,

                    `rgba(
                        255,
                        255,
                        255,
                        ${particle.life * 0.45}
                    )`

                );


                glow.addColorStop(

                    1,

                    "rgba(255,255,255,0)"

                );


                ctx.fillStyle =
                    glow;


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
                 * Bright center.
                 */

                ctx.fillStyle =
                    `rgba(
                        255,
                        255,
                        255,
                        ${particle.life * 0.9}
                    )`;


                ctx.beginPath();


                ctx.arc(

                    particle.x,

                    particle.y,

                    particle.size * 0.55,

                    0,

                    Math.PI * 2

                );


                ctx.fill();

            }
        );


        if (elapsed < 2000) {

            requestAnimationFrame(
                animate
            );

        } else {

            ctx.clearRect(

                0,

                0,

                canvas.width,

                canvas.height

            );

        }

    }


    requestAnimationFrame(
        animate
    );

}


/* =========================================================
   LETTER SCENE
   ========================================================= */

function showLetterScene() {

    /*
     * Position of message.
     */

    letterMessageBox.style.top = "25%";


    letterMessageBox.style.left = "65%";

    /*
     * IMPORTANT:
     *
     * Keep letterScene completely visible.
     *
     * Its background stays here permanently
     * until Finish is clicked.
     */

    letterScene.style.opacity =
        "1";

    letterScene.style.visibility =
        "visible";

    letterScene.style.transition =
        "";


    showScene(letterScene);


    /*
     * Start teacher message.
     */

    displayTeacherMessage();

}


/* =========================================================
   MESSAGE FORMATTER
   ========================================================= */

function formatTeacherMessage(
    message
) {

    letterMessage.innerHTML =
        "";


    /*
     * Remove "Dear Teacher,"
     * from original message.
     */

    let remaining =
        message
            .replace(
                /^Dear Teacher,\s*/i,
                ""
            )
            .trim();


    const words =
        remaining.split(/\s+/);


    const lines = [];

    let currentLine = [];


    /*
     * Maximum 4 words per line.
     */

    words.forEach(word => {

        currentLine.push(word);


        if (
            currentLine.length >= 4
        ) {

            lines.push(
                currentLine.join(" ")
            );

            currentLine = [];

        }

    });


    if (
        currentLine.length > 0
    ) {

        lines.push(
            currentLine.join(" ")
        );

    }


    /*
     * Dear Teacher
     */

    const dearLine =
        document.createElement(
            "div"
        );

    dearLine.className =
        "message-line";

    dearLine.textContent =
        "Dear Teacher,";


    letterMessage.appendChild(
        dearLine
    );


    /*
     * Main message
     */

    lines.forEach(line => {

        const lineElement =
            document.createElement(
                "div"
            );

        lineElement.className =
            "message-line";

        lineElement.textContent =
            line;


        letterMessage.appendChild(
            lineElement
        );

    });


    /*
     * Closing
     */

    const closingLine =
        document.createElement(
            "div"
        );

    closingLine.className =
        "message-line message-closing";

    closingLine.textContent =
        "Happy Teachers' Day";


    letterMessage.appendChild(
        closingLine
    );

}


/* =========================================================
   MESSAGE DISPLAY
   ========================================================= */

async function displayTeacherMessage() {

    /*
     * Select random message.
     */

    const randomIndex =
        Math.floor(

            Math.random() *
            teacherMessages.length

        );


    const selectedMessage =
        teacherMessages[
            randomIndex
        ];


    /*
     * Format message.
     */

    formatTeacherMessage(
        selectedMessage
    );


    letterMessage.style.opacity =
        "1";


    /*
     * Get every message line.
     */

    const lines =
        Array.from(

            letterMessage.querySelectorAll(
                ".message-line"
            )

        );


    /*
     * Initially hide lines.
     */

    lines.forEach(line => {

        line.style.opacity =
            "0";

    });


    /*
     * Type each line.
     */

    for (
        const line of lines
    ) {

        await typeLine(line);

        await wait(180);

    }

}


/* =========================================================
   TYPEWRITER EFFECT
   ========================================================= */

function typeLine(element) {

    return new Promise(resolve => {

        const text =
            element.textContent;


        element.textContent =
            "";


        element.style.opacity =
            "1";


        let index = 0;


        /*
         * Typing speed.
         */

        const speed = 75;


        function typeCharacter() {

            if (
                index < text.length
            ) {

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


/* =========================================================
   FINISH EXPERIENCE
   =========================================================

   NOTHING HAPPENS HERE UNTIL THE
   FINISH BUTTON IS ACTUALLY PRESSED.

   Letter background remains completely
   visible until this function runs.

   Then:

   LETTER BG
        ↓
   gentle fade
        ↓
   FINAL BG
        ↓
   logo reveal
   ========================================================= */

async function finishExperience() {

    if (experienceFinished) {
        return;
    }


    /*
     * Lock experience.
     */

    experienceFinished =
        true;


    finishButton.disabled =
        true;

    finishButton.style.pointerEvents =
        "none";


    /*
     * -----------------------------------------------------
     * CREATE FINAL BACKGROUND
     * -----------------------------------------------------
     */

    const nextBg =
        document.createElement(
            "div"
        );


    nextBg.style.position =
        "absolute";

    nextBg.style.inset =
        "0";

    nextBg.style.width =
        "100%";

    nextBg.style.height =
        "100%";


    nextBg.style.backgroundImage =
        `url("${FINAL_BG}")`;


    /*
     * Keep the same Final BG appearance
     * that was previously working.
     */

    nextBg.style.backgroundSize =
        "cover";

    nextBg.style.backgroundPosition =
        "center";

    nextBg.style.backgroundRepeat =
        "no-repeat";


    /*
     * Start completely invisible.
     */

    nextBg.style.opacity =
        "0";


    /*
     * Gentle transition.
     */

    nextBg.style.transition =
        "opacity 1400ms ease-in-out";


    /*
     * Put FINAL BG above the letter.
     */

    nextBg.style.zIndex =
        "11";


    experience.appendChild(
        nextBg
    );


    /*
     * -----------------------------------------------------
     * LETTER REMAINS VISIBLE UNDERNEATH
     * -----------------------------------------------------
     */

    letterScene.style.zIndex =
        "10";

    letterScene.style.opacity =
        "1";


    /*
     * -----------------------------------------------------
     * START FINAL TRANSITION
     * -----------------------------------------------------
     */

    requestAnimationFrame(() => {

        /*
         * Final BG gently fades IN.
         */

        nextBg.style.opacity =
            "1";


        /*
         * Letter gently fades OUT
         * at exactly the same time.
         */

        letterScene.style.transition =
            "opacity 1400ms ease-in-out";

        letterScene.style.opacity =
            "0";

    });


    /*
     * Wait for the transition.
     */

    await wait(1450);


    /*
     * -----------------------------------------------------
     * MAKE FINAL BG PERMANENT
     * -----------------------------------------------------
     */

    sceneBg.style.backgroundImage =
        `url("${FINAL_BG}")`;

    sceneBg.style.opacity =
        "1";

    sceneBg.style.zIndex =
        "0";


    currentBackground =
        FINAL_BG;


    /*
     * Remove temporary final background.
     */

    nextBg.remove();


    /*
     * Hide letter scene.
     */

    hideScene(
        letterScene
    );


    letterScene.style.transition =
        "";

    letterScene.style.opacity =
        "";


    /*
     * -----------------------------------------------------
     * FINAL LOGO
     * -----------------------------------------------------
     */

    showScene(
        finalScene
    );


    finalScene.style.zIndex =
        "10";


    /*
     * Reset logo animation.
     */

    finalLogo.style.opacity =
        "0";

    finalLogo.classList.remove(
        "reveal"
    );


    /*
     * Start logo reveal.
     */

    requestAnimationFrame(() => {

        finalLogo.classList.add(
            "reveal"
        );

    });

}


/* =========================================================
   START EXPERIENCE
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        hideScene(finalScene);

        hideScene(letterScene);

        hideScene(flowerScene);

        hideScene(introMessage);

        function waitForLandscape() {

            return new Promise(resolve => {

                function checkOrientation() {

                    const isPortrait =
                        window.matchMedia("(orientation: portrait)").matches;

                    if (!isPortrait) {

                        window.removeEventListener(
                            "resize",
                            checkOrientation
                        );

                        window.removeEventListener(
                            "orientationchange",
                            checkOrientation
                        );

                        resolve();

                    }

                }

                window.addEventListener(
                    "resize",
                    checkOrientation
                );

                window.addEventListener(
                    "orientationchange",
                    checkOrientation
                );

                checkOrientation();

            });

        }

        waitForLandscape().then(() => {

            showOpeningScene();

        });

    }
);
