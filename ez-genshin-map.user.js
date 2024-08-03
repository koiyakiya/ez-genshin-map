// ==UserScript==
// @name         EZ Genshin Map
// @namespace    https://github.com/koiyakiya/ez-genshin-map
// @version      1.0
// @description  A userscript that adds new features to https://genshin-impact-map.appsample.com/.
// @author       koiyakiya
// @match        https://genshin-impact-map.appsample.com/*
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const batchmark = document.createElement('div');
    batchmark.className = 'batch-mark-button-disabled'
    batchmark.innerHTML = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="30px" viewBox="0 0 24 24">
	<g fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		<path d="M19.914 11.105A7 7 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0a32 32 0 0 0 .824-.738" />
		<circle cx="12" cy="10" r="3" />
		<path d="M16 18h6m-3-3v6" />
	</g>
</svg>
    `
    const toggleRightBar = document.createElement('div');
    toggleRightBar.className = 'right-bar-enabled';
    toggleRightBar.innerHTML = `
        <svg class="enabled" xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24">
	<path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12H4m10 0l-4 4m4-4l-4-4m10-4v16" />
</svg>
<svg class="disabled" xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24">
	<path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12h10m-10 0l4 4m-4-4l4-4M4 4v16" />
</svg>
    `;

    GM_addStyle(`
            .batch-mark-button-disabled {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                padding: 10px 10px;
                width: fit-content;
                position: fixed;
                border-radius: 50%;
                background-color: black;
                gap: 4px;
                bottom: 10px;
                transform: translateX(-50%);
                z-index: 1000;
                left: 50%;
                transition: background-color 0.3s ease-in-out, stroke 0.3s ease-in-out;
            }

            .batch-mark-button-disabled svg g {
                stroke: white;
            }

            .batch-mark-button-enabled {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                padding: 10px 10px;
                width: fit-content;
                position: fixed;
                border-radius: 50%;
                z-index: 1000;
                background-color: white;
                gap: 4px;
                bottom: 10px;
                transform: translateX(-50%);
                left: 50%;
                transition: background-color 0.3s ease-in-out, stroke 0.3s ease-in-out, border 0.3s ease-in-out;
            }

            .batch-mark-button-enabled svg g {
                stroke: black;
            }
            
            /* right bar */
            .right-bar-enabled {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                padding: 10px 10px;
                width: fit-content;
                position: fixed;
                z-index: 1000;
                background-color: white;
                transform: translateX(-50%);
                border-radius: 50px;
                top: 25px;
                right: 320px;
                transition: background-color 0.3s ease-in-out, stroke 0.3s ease-in-out, border 0.3s ease-in-out;
            }

            .right-bar-enabled .disabled{
                display: none;
            }

            .right-bar-enabled svg path {
                stroke: black;
            }

            .right-bar-disabled {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                padding: 10px 10px;
                width: fit-content;
                position: fixed;
                z-index: 1000;
                background-color: black;
                transform: translateX(-50%);
                border-radius: 50px;
                top: 25px;
                right: 20px;
                transition: background-color 0.3s ease-in-out, stroke 0.3s ease-in-out, border 0.3s ease-in-out;
            }

            @media (width <= 1024px) {
                .right-bar-disabled {
                    display: none;
                }

                .right-bar-enabled {
                    display: none;
                }
            }

            .right-bar-disabled .disabled {
                display: block;
            }

            .right-bar-disabled .enabled {
                display: none;
            }

            .right-bar-disabled svg path {
                stroke: white;
            }
        `)
    document.body.appendChild(batchmark);
    document.body.appendChild(toggleRightBar);
    batchmark.addEventListener('click', () => {
        if (batchmark.classList.contains('batch-mark-button-disabled')) {
            batchmark.classList.remove('batch-mark-button-disabled');
            batchmark.classList.add('batch-mark-button-enabled');
        } else {
            batchmark.classList.remove('batch-mark-button-enabled');
            batchmark.classList.add('batch-mark-button-disabled');
        }
    });

    toggleRightBar.addEventListener('click', () => {
        var rightBar = document.querySelector('.MapRightbar_Main');
        if (toggleRightBar.classList.contains('right-bar-enabled')) {
            toggleRightBar.classList.remove('right-bar-enabled');
            toggleRightBar.classList.add('right-bar-disabled');
            rightBar.style.display = 'none';
        } else {
            toggleRightBar.classList.remove('right-bar-disabled');
            toggleRightBar.classList.add('right-bar-enabled');
            rightBar.style.display = 'block';
        }
    })

    function toggleBatchMark() {
        let found = document.querySelector("button.btn.btn-sm.btn-success.mt-2");
        let notfound = document.querySelector("a[href='#'][onclick^='window._markAsNotFound']")

        if (found) {
            found.click()
        }
        if (notfound) {
            notfound.click()
        }
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                if (batchmark.classList.contains('batch-mark-button-enabled')) {
                    toggleBatchMark();
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();