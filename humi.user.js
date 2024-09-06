// ==UserScript==
// @name         ZEvent Place - Humility
// @namespace    https://github.com/A-DBN/Calc-ZPlace/issues
// @version      0.1
// @description  Calc Gelano
// @author       Script From Adcoss95 & CorentinGC, Edited by ZenkiuD
// @match        https://place.zevent.fr/*
// @icon         https://raw.githubusercontent.com/A-DBN/Calc-ZPlace/main/icon.webp
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/A-DBN/Calc-ZPlace/main/humi.user.js
// @updateURL    https://raw.githubusercontent.com/A-DBN/Calc-ZPlace/main/humi.user.js
// @supportURL   https://github.com/A-DBN/Calc-ZPlace/issues
// ==/UserScript==

const DEBUG = false;

const OVERLAY_URL = "https://raw.githubusercontent.com/A-DBN/Calc-ZPlace/main/calc.svg";
const opts = {
    OVERLAY_STATE: true,
    OVERLAY_OPACITY: 0.6,
    ENABLE_AUTOREFRESH: false,
    AUTOREFRESH_DELAY: 5000,
    ENABLE_IMGNOCACHE: true
};

const position = {
    X:"0",
    Y:"0",
    WIDTH:"100",
    HEIGH:"100",
}


const log = (msg) => {
    if (DEBUG) {
        console.log("[Humility Overlay] " + msg);
    }
};

(async function() {
    log("Script loaded and running.");

    window.addEventListener("load", () => {
        log("Document loaded. Starting script.");

        let canvas = document.getElementById("place-canvas");
        if (!canvas) {
            log("Canvas element not found in the main document. Exiting.");
            return;
        }

        log("Canvas found. Proceeding...");

        let canvasContainer = canvas.closest('.game-container__inner');
        if (!canvasContainer) {
            log("Game container inner not found. Exiting.");
            return;
        }

        log("Found the game container.");

        let overlay = document.createElement("img");
        overlay.src = OVERLAY_URL + (opts.ENABLE_IMGNOCACHE ? "?t=" + new Date().getTime() : "");
        overlay.style.position = "absolute";
        overlay.style.left = position.X + "px";
        overlay.style.top = position.Y + "px";
        overlay.style.width = position.WIDTH + "px";
        overlay.style.height = position.HEIGH + "px";
        overlay.style.opacity = opts.OVERLAY_OPACITY;
        overlay.style.zIndex = "10000";
        overlay.style.pointerEvents = "none";

        overlay.onload = function() {
            log("Overlay image loaded successfully.");

            canvasContainer.style.position = "relative";

            canvasContainer.appendChild(overlay);
            log("Overlay successfully appended to the canvas container.");
        };

        overlay.onerror = function() {
            log("Error loading the overlay image.");
        };

        if (opts.ENABLE_AUTOREFRESH) {
            setInterval(() => {
                log("Auto-refreshing overlay.");
                overlay.src = OVERLAY_URL + "?t=" + new Date().getTime();
            }, opts.AUTOREFRESH_DELAY);
        }

    }, false);
})();
