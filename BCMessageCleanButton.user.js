// ==UserScript==
// @name         聊天室清理按鈕
// @namespace    https://www.bondageprojects.com/
// @version      1.3
// @description  可拖曳的聊天室清理按鈕，功能與原版剪刀相同（保留 20 條訊息）
// @author       約爾
// @match        https://bondageprojects.elementfx.com/*
// @match        https://www.bondageprojects.elementfx.com/*
// @match        https://bondage-europe.com/*
// @match        https://www.bondage-europe.com/*
// @match        https://bondageprojects.com/*
// @match        https://www.bondageprojects.com/*
// @match        https://www.bondage-asia.com/*
// @icon         https://i.postimg.cc/PxgYLZcm/image.png
// @grant        none
// ==/UserScript==
/* global CurrentScreen, MainRun, bcModSdk */

(function() {
    "use strict";

    console.log("BCMessageCleanButton Start Load");

    const script = document.createElement("script");
    const timestamp = Date.now();
    script.src = `https://yu21019337.github.io/BCMessageCleanButton.js?timestamp=${timestamp}`;
    document.head.appendChild(script);
})();