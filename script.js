/* =========================================================
   HAPPY TEACHERS' DAY — INTERACTIVE TRIBUTE
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
const letterMessageBox =
    document.getElementById("letter-message-box");
const letterMessage =
    document.getElementById("letter-message");

const finishButton =
    document.getElementById("finish-button");

const finalScene =
    document.getElementById("final-scene");

const finalLogo =
    document.getElementById("final-logo");

const portraitWarning =
    document.getElementById("portrait-warning");


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


/* =========================================================
   GENERAL HELPERS
   ========================================================= */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* =========================================================
   BACKGROUND TRANSITION
   ========================================================= */

function crossfadeBackground(
    newBackground,
    duration = 1400,
    backgroundSize = "cover"
) {

    return new Promise(resolve => {

        if (currentBackground === newBackground) {
            resolve();
            return;
        }

        const nextBg =
            document.createElement("div");

        nextBg.style.position = "absolute";
        nextBg.style.inset = "0";
        nextBg.style.width = "100%";
        nextBg.style.height = "100%";

        nextBg.style.backgroundImage =
            `url("${newBackground}")`;

        nextBg.style.backgroundSize =
            backgroundSize;

        nextBg.style.backgroundPosition =
            "center";

        nextBg.style.backgroundRepeat =
            "no-repeat";

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

            sceneBg.style.backgroundSize =
                backgroundSize;

            sceneBg.style.opacity = "1";
            sceneBg.style.zIndex = "0";

            currentBackground =
                newBackground;

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
   TITLE
   ========================================================= */

async function showOpeningScene() {

    sceneBg.style.backgroundImage =
        `url("${BG1}")`;

    sceneBg.style.backgroundSize =
        "cover";

    sceneBg.style.backgroundPosition =
        "center";

    sceneBg.style.backgroundRepeat =
        "no-repeat";

    sceneBg.style.opacity = "1";
    sceneBg.style.zIndex = "0";

    currentBackground = BG1;


    /* IMPORTANT:
       This is your original title scene. */

    showScene(introTitle);


    /* Exact title */

    titleText.textContent =
        "Happy Teachers' Day";


    titleText.classList.remove(
        "visible"
    );


    await wait(100);


    /* Fade title IN */

    titleText.classList.add(
        "visible"
    );


    await wait(4000);


    /* Fade title OUT */

    titleText.classList.remove(
        "visible"
    );


    await crossfadeBackground(
        BG2,
        1400,
        "cover"
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


    await crossfadeBackground(
        BG3,
        1400,
        "100% 100%"
    );


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


    flowerLocked = true;


    flowerButtons.forEach(button => {

        button.disabled = true;

        button.style.pointerEvents =
            "none";
    });


    createParticles(
        clickX,
        clickY
    );


    setTimeout(async () => {

        hideScene(flowerScene);


        const selectedBackground =
            LETTER_BACKGROUNDS[
                flowerNumber - 1
            ];


        await crossfadeBackground(
            selectedBackground,
            1400,
            "100% 100%"
        );


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
            event.clientX -
            rect.left;


        const y =
            event.clientY -
            rect.top;


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
            row * 5 +
            column +
            1;


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
                (Math.random() - 0.5) *
                10,

            y:
                originY +
                (Math.random() - 0.5) *
                10,

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
                    `rgba(255,255,255,${
                        particle.life * 0.95
                    })`
                );


                glow.addColorStop(
                    0.35,
                    `rgba(255,255,255,${
                        particle.life * 0.45
                    })`
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


                /* Tiny bright center */

                ctx.fillStyle =
                    `rgba(255,255,255,${
                        particle.life * 0.9
                    })`;


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

    letterMessageBox.style.top =
        "38%";

    letterMessageBox.style.left =
        "54%";


    showScene(letterScene);


    displayTeacherMessage();
}


/* =========================================================
   MESSAGE FORMATTER
   ========================================================= */

/*
   IMPORTANT CHANGE:

   We no longer create a separate DOM element
   for every line.

   The entire letter is kept as ONE text node.

   This removes the stutter/reflow that happened
   whenever a new line started.
*/

function formatTeacherMessage(message) {

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
       One continuous text string.

       Newlines are real line breaks,
       not separate HTML elements.
    */

    return (
        "Dear Teacher,\n\n" +
        lines.join("\n") +
        "\n\n" +
        "Happy Teachers' Day"
    );
}


/* =========================================================
   MESSAGE DISPLAY
   ========================================================= */

async function displayTeacherMessage() {

    const randomIndex =
        Math.floor(
            Math.random() *
            teacherMessages.length
        );


    const selectedMessage =
        teacherMessages[randomIndex];


    const formattedMessage =
        formatTeacherMessage(
            selectedMessage
        );


    await typeLetterMessage(
        formattedMessage
    );
}


/* =========================================================
   SMOOTH CONTINUOUS LETTER TYPE EFFECT
   ========================================================= */

async function typeLetterMessage(
    text
) {

    /*
       Clear the message ONCE.

       After that, only the textContent
       of the SAME element changes.

       This prevents the line-start stutter.
    */

    letterMessage.textContent = "";

    letterMessage.style.opacity =
        "1";


    let visibleText = "";


    const speed = 75;


    for (
        let index = 0;
        index < text.length;
        index++
    ) {

        visibleText +=
            text.charAt(index);


        letterMessage.textContent =
            visibleText;


        /*
           Spaces and line breaks use the
           same timing as every other character.

           There is no special pause when
           a new line begins.
        */

        await wait(speed);
    }
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

    finishButton.style.pointerEvents =
        "none";


    /*
       Button bounce
    */

    finishButton.classList.remove(
        "pressed"
    );

    void finishButton.offsetWidth;

    finishButton.classList.add(
        "pressed"
    );


    const nextBg =
        document.createElement("div");


    nextBg.style.position =
        "absolute";

    nextBg.style.inset = "0";

    nextBg.style.width = "100%";

    nextBg.style.height = "100%";


    nextBg.style.backgroundImage =
        `url("${FINAL_BG}")`;


    nextBg.style.backgroundSize =
        "cover";

    nextBg.style.backgroundPosition =
        "center";

    nextBg.style.backgroundRepeat =
        "no-repeat";


    nextBg.style.opacity = "0";


    nextBg.style.transition =
        "opacity 1400ms ease-in-out";


    nextBg.style.zIndex = "1";


    experience.appendChild(
        nextBg
    );


    letterScene.style.zIndex =
        "10";


    requestAnimationFrame(() => {

        nextBg.style.opacity =
            "1";


        letterScene.style.transition =
            "opacity 1400ms ease-in-out";


        letterScene.style.opacity =
            "0";
    });


    await wait(1450);


    sceneBg.style.backgroundImage =
        `url("${FINAL_BG}")`;


    sceneBg.style.backgroundSize =
        "cover";

    sceneBg.style.opacity = "1";

    sceneBg.style.zIndex = "0";


    currentBackground =
        FINAL_BG;


    nextBg.remove();


    hideScene(letterScene);


    letterScene.style.transition =
        "";

    letterScene.style.opacity =
        "";


    showScene(finalScene);


    finalScene.style.zIndex =
        "10";


    finalLogo.style.opacity =
        "0";

    finalLogo.style.transform =
        "scale(0.96)";


    finalLogo.style.transition =
        "opacity 2200ms ease, transform 2200ms ease";


    await wait(150);


    requestAnimationFrame(() => {

        finalLogo.style.opacity =
            "1";

        finalLogo.style.transform =
            "scale(1)";
    });


    await wait(2400);


    finalLogo.style.transition =
        "none";

    finalLogo.style.opacity =
        "1";

    finalLogo.style.transform =
        "scale(1)";


    document.body.style.pointerEvents =
        "none";
}


/* =========================================================
   PORTRAIT WARNING
   ========================================================= */

function updateOrientation() {

    const portrait =
        window.innerHeight >
        window.innerWidth;


    if (portrait) {

        portraitWarning.style.display =
            "flex";

    } else {

        portraitWarning.style.display =
            "none";
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

sceneBg.style.backgroundSize =
    "cover";

sceneBg.style.backgroundPosition =
    "center";

sceneBg.style.backgroundRepeat =
    "no-repeat";

sceneBg.style.opacity =
    "1";

sceneBg.style.zIndex =
    "0";


currentBackground =
    BG1;


introTitle.classList.remove(
    "active"
);

introMessage.classList.remove(
    "active"
);

flowerScene.classList.remove(
    "active"
);

letterScene.classList.remove(
    "active"
);

finalScene.classList.remove(
    "active"
);


titleText.classList.remove(
    "visible"
);


introLine.style.opacity =
    "0";


finalLogo.style.opacity =
    "0";


/* =========================================================
   START
   ========================================================= */

showOpeningScene();