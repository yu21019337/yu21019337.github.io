

//SDK
var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
//SDK end

(function () {
    const modApi = bcModSdk.registerMod({
        name: "ChatCleaner",
        fullName: "Bondage Club - 聊天室清理按鈕",
        version: "1.3",
        repository: "可拖曳浮動按鈕，簡易清理訊息，只保留最新 20 條",
    });

    let btn;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let hasMoved = false;

    // 儲存位置
    function storeButtonPosition(pos) {
        localStorage.setItem("clearChatBtnPos", JSON.stringify(pos));
    }

    // 載入位置
    function loadButtonPosition() {
        const saved = localStorage.getItem("clearChatBtnPos");
        return saved ? JSON.parse(saved) : null;
    }

    function createButton() {
        if (btn) return;

        btn = document.createElement("button");
        btn.id = "clearChatBtn";
        btn.textContent = "✂";
        btn.style.position = "fixed";
        btn.style.bottom = "20px";
        btn.style.left = "20px";
        btn.style.zIndex = 9999;
        btn.style.width = "48px";       // 固定寬
        btn.style.height = "48px";      // 固定高
        btn.style.backgroundColor = "#ff4d4f";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.borderRadius = "50%"; // 圓形
        btn.style.cursor = "pointer";
        btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        btn.style.fontSize = "20px";
        btn.style.lineHeight = "48px";  // 垂直置中
        btn.style.textAlign = "center"; // 水平置中
        btn.style.padding = "0";
        btn.style.display = "none";
        btn.style.transition = "transform 0.2s, background-color 0.2s";

        // hover 效果
        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "scale(1.1)";
            btn.style.backgroundColor = "#ff7875";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "scale(1)";
            btn.style.backgroundColor = "#ff4d4f";
        });

        // 如果有儲存位置，恢復
        const savedPos = loadButtonPosition();
        if (savedPos) {
            btn.style.right = savedPos.right;
            btn.style.bottom = savedPos.bottom;
            btn.style.left = "auto"; // 防止 left/right 衝突
        }

        // 按鈕點擊：清理訊息
        btn.addEventListener("click", () => {
            if (hasMoved) return; // 拖曳不觸發
            const log = document.querySelector("#TextAreaChatLog");
            if (!log) return console.warn("找不到 #TextAreaChatLog 容器");

            const children = Array.from(log.children);
            const excess = children.length - 20;
            if (excess > 0) {
                for (let i = 0; i < excess; i++) {
                    log.removeChild(children[i]);
                }
            }
            log.scrollTop = log.scrollHeight;
            console.log("訊息清理完成，只保留最新 20 條訊息！");
        });

        // 滑鼠事件：開始拖曳
        btn.addEventListener("mousedown", (e) => {
            isDragging = true;
            hasMoved = false;

            const rect = btn.getBoundingClientRect();
            // 讓拖曳基準點在按鈕中心
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            offsetX = rect.left + rect.width / 2 - e.clientX;
            offsetY = rect.top + rect.height / 2 - e.clientY;

            btn.style.transition = "none"; // 拖曳時移除過渡效果
            document.addEventListener("mousemove", handleDrag);
            document.addEventListener("mouseup", stopDrag);

            e.preventDefault();
        });

        document.body.appendChild(btn);
    }

    function handleDrag(e) {
        if (!isDragging) return;

        const moveX = Math.abs(e.clientX - dragStartX);
        const moveY = Math.abs(e.clientY - dragStartY);
        if (moveX > 3 || moveY > 3) {
            hasMoved = true;
        }

        const rect = btn.getBoundingClientRect();
        const newLeft = e.clientX + offsetX - rect.width / 2;
        const newTop = e.clientY + offsetY - rect.height / 2;

        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        const boundedLeft = Math.max(0, Math.min(newLeft, maxX));
        const boundedTop = Math.max(0, Math.min(newTop, maxY));

        btn.style.right = `${window.innerWidth - boundedLeft - rect.width}px`;
        btn.style.bottom = `${window.innerHeight - boundedTop - rect.height}px`;
        btn.style.left = "auto";
    }

    function stopDrag() {
        if (isDragging) {
            isDragging = false;
            btn.style.transition = "transform 0.2s, background-color 0.2s";

            storeButtonPosition({
                right: btn.style.right,
                bottom: btn.style.bottom,
            });

            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("mouseup", stopDrag);
        }
    }

    // Hook 遊戲的 MainRun，依場景顯示/隱藏
    const oldRun = window.MainRun;
    window.MainRun = function (...args) {
        if (typeof window.CurrentScreen !== "undefined" && window.CurrentScreen === "ChatRoom") {
            createButton();
            if (btn) btn.style.display = "block";
        } else if (btn) {
            btn.style.display = "none";
        }
        return oldRun.apply(this, args);
    };
})();

