// =========================================================================
//  FIRE MODS FOR ARTICULATE RISE 360 - ADD-ON SCRIPT BY DISCOVER ELEARNING
// =========================================================================
const modsConfig = {
	
    // --- Change 'true' To Activate Visible Block ID Logging To Console Whilst Scrolling ---
    developerMode_LogBlockIds: false,

    // --- Custom Scroll Trigger Actions ---
	// Executes a script when a specific block scrolls into view
    scrollTriggers: [
        //{
        //    id: 'cmbqlx72l000u357cces8vtkm', // Example ID - Use Developer Mode above to discover via console
        //    script: 'console.log("This message will appear ONLY ONCE for this block.");',
        //    fireOnce: true
        //},
        //{
        //    id: 'cmbrrrgxm00li357dkhllr3sw', // Example ID - Use Developer Mode above to discover via console
        //    script: 'console.log("This message will appear EVERY TIME this block is scrolled into view.");',
        //    fireOnce: false
        //}
    ],

    // --- Text on Image Block Customisations ---
    moderniseTextOnImage: false, //Change true To Activate
    textOnImage_GlassEffect: false,
	textOnImage_GlassBlur: '6px', 
	textOnImage_GlassBackground: 'rgba(255, 255, 255, 0.2)',
    textOnImage_DropShadow: false,
	textOnImage_Shadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    textOnImage_StaggeredParallax: false,
    textOnImage_AlternateFloat: false, //Switch position of text box to left then right then left etc.
    textOnImage_CustomHeadlineFont: false, textOnImage_HeadlineFontFamily: "'Architects Daughter', cursive",

    // --- Enable Custom Reflection Block  ---
	//Steps To Follow in Rise: Create a NOTE block and paste the following content:
	//REFLECTION ID="REFLECT01" TITLE="What do you think the process of establishing a counselling skills relationship involves?" INSTRUCTION="Write your answer in the box below:"
	//Customise the ID Value, question TITLE, and INSTRUCTION text given to the user in the Rise block
    enableReflectionBlocks: false, //Change true To Activate
    reflectionBlock_CentreAlign: false,
    reflectionBlock_ButtonRadius: '50px',
    reflectionBlock_ButtonText: 'Save My Answer',
	
	// --- Display Reflection Block Entry Using Shortcode ---
	//Steps To Follow in Rise: Add the following text into ANY Rise block:
	//[REFLECT01]
	//Replace the value in the square brackets with the ID of the Reflection Block
    enableSummaryShortcodes: false, //Change true To Activate
    summaryShortcode_DefaultText: 'You may not have yet provided an answer to this reflection activity. You can go back and complete this now if you wish.',

    // --- Rise Background Customisations (Apply fixed background behind all standard Rise content blocks, this does not apply for example to TEXT ON IMAGE blocks) ---
    enableCustomBackground: false, //Change true To Activate
	backgroundColour: '#fdfdfd',
    showGridLines: false,
    gridLineColour: 'rgba(0, 0, 0, 0.04)',
    gridSize: 30,

    // --- Add Custom Background Image ---
	//Image appears over the custom colour set above. Grid lines if activate will appear over the image
    enableCustomBackgroundImage: false, // Set to 'true' to use an image for the background. Ensure enableCustomBackground is also true
    backgroundImageUrl: 'https://images.unsplash.com/photo-1749371930388-50c782b0acea?fm=jpg&q=60&w=3000',
    backgroundImageOpacity: 0.1,

    // --- Menu Visibility On Start Customisation ---
    startWithMenuHidden: false, //Change true To Activate

    // --- Menu Button Customisation ---
    moderniseMenuButton: false, //Change true To Activate
    modernMenuButton_Blur: '1px',
    modernMenuButton_Opacity: 0.1,
    modernMenuButton_Shadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    modernMenuButton_HoverScale: 1.1,

    // --- Button Block Customisations ---
    centreAlignButtons: false, //Change true To Activate. Remove all text from the button block in Rise
    centredButtonHeight: '5rem', //Change to add extra height to the button if required

    // --- Continue Button Block Customisations---
	roundContinueButtons: false, //Change true To Activate
    continueButton_BorderRadius: '50px',
	
    replaceContinueWithLine: false, //Change true To Add Line Separator Once Continue Button Is Clicked
    continueLineColour: '#d4d4d4',
    continueLineWidth: '80%',
    
    // --- Custom Button Execute JavaScript Overrides ---
	//Steps To Follow in Rise: Create a BUTTON BLOCK and set the 'Destination' setting of the button to 'Link to a webpage'
	//Type any ID value you like into the 'Enter a Web URL' box, e.g. MYSCRIPT01
	//The address will change when clicking away to 'http://MYSCRIPT01', this is now all set in Rise.
	//Finally, set up a customButtons block using the template below per button that you wish to add an Execute JavaScript action to:
    customButtons: [
        //{
        //    id: 'MYSCRIPT01',
        //    script: 'console.log("Add your custom script between the open and close single quotes on this line");',
        //    confetti: false //Change to true to display confetti when button is clicked (good for testing!)
        //}
    ],

    // --- Confetti Settings ---
    confettiSettings: {
        particleCount: 150,
        spread: 90,
        startVelocity: 45,
        colours: ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'],
        origin: 'center' 
    }
};
// =================================================================

// --- SCRIPT LOGIC ---
// (No need to edit below this line)

// A library to map CSS selectors to human-readable block names.
const blockTypeMappings = [
    // Unique & Interactive Blocks (High Priority)
    { selector: '.block-statement--note', name: 'Note Block' },
    { selector: '.block-quote--carousel', name: 'Quote Carousel Block' },
    { selector: '.block-quote--background', name: 'Quote on Image Block' },
    { selector: '.block-quote--a', name: 'Quote A Block' },
    { selector: '.block-quote--b', name: 'Quote B Block' },
    { selector: '.block-quote--c', name: 'Quote C Block' },
    { selector: '.block-quote--d', name: 'Quote D Block' },
    { selector: '.block-text--onecol-custom-width-table-med', name: 'Table Block' },
    { selector: '.block-list--checkboxes', name: 'Checkbox List Block' },
    { selector: '.block-list--numbered', name: 'Numbered List Block' },
    { selector: '.block-list--bulleted', name: 'Bulleted List Block' },
    { selector: '.block-gallery-carousel', name: 'Image Carousel Block' },
    { selector: '.block-gallery--twocol', name: 'Two Column Image Grid' },
    { selector: '.block-gallery--threecol', name: 'Three Column Image Grid' },
    { selector: '.block-gallery--fourcol', name: 'Four Column Image Grid' },
    { selector: '.block-image--text-aside', name: 'Image & Text Block' },
    { selector: '.block-image--full', name: 'Full Width Image Block' },
    { selector: '.block-image--hero', name: 'Image Centred Block' },
    { selector: '.block-image--overlay', name: 'Text on Image Block' },
    { selector: '.block-audio', name: 'Audio Block' },
    { selector: '.block-video', name: 'Video Block' },
    { selector: '.block-embed', name: 'Embed Block' },
    { selector: '.block-attachment', name: 'Attachment Block' },
    { selector: '.block-text--code', name: 'Code Snippet Block' },
    { selector: '.blocks-accordion', name: 'Accordion Block' },
    { selector: '.blocks-tabs', name: 'Tabs Block' },
    { selector: '.block-flashcards.block-flashcard--column', name: 'Flashcard Grid Block' },
    { selector: '.block-flashcards.block-flashcard--stack', name: 'Flashcard Stack Block' },
    { selector: '.block-labeled-graphic', name: 'Labeled Graphic Block' },
    { selector: '.block-process', name: 'Process Block' },
    { selector: '.block-scenario', name: 'Scenario Block' },
    { selector: '.block-sorting-activity', name: 'Sorting Activity Block' },
    { selector: '.block-timeline', name: 'Timeline Block' },
    { selector: '.blocks-storyline', name: 'Storyline Block' },
    { selector: '.blocks-buttonstack', name: 'Button Stack Block' },
    { selector: '.block-knowledge__wrapper--multiple.choice', name: 'Multiple Choice Question' },
    { selector: '.block-knowledge__wrapper--multiple.response', name: 'Multiple Response Question' },
    { selector: '.block-knowledge__wrapper--fillin', name: 'Fill in the Blank Question' },
    { selector: '.block-knowledge__wrapper--matching', name: 'Matching Question' },
    { selector: '.block-chart .block-chart__circle', name: 'Pie Chart Block' }, // Pie charts have a unique inner class
    { selector: '.block-chart', name: 'Bar or Line Chart Block' }, // Generic chart as a fallback
    { selector: '.block-divider--numbered', name: 'Numbered Divider Block' },
    { selector: '.block-divider--spacing', name: 'Spacer Block' },
    { selector: '.block-divider', name: 'Divider Block' },

    // Standard Text Blocks (Order is important)
    { selector: '.block-statement--a', name: 'Statement A Block' },
    { selector: '.block-statement--b', name: 'Statement B Block' },
    { selector: '.block-statement--c', name: 'Statement C Block' },
    { selector: '.block-statement--d', name: 'Statement D Block' },
    { selector: '.block-text--twocol', name: 'Columns Block' },
    { selector: '.block-text--heading-custom-width:has(h2)', name: 'Heading Block' },
    { selector: '.block-text--heading-custom-width:has(h3)', name: 'Subheading Block' },
    { selector: '.block-text--onecol-custom-width:has(h2)', name: 'Paragraph with Heading Block' },
    { selector: '.block-text--onecol-custom-width:has(h3)', name: 'Paragraph with Subheading Block' },
    { selector: '.block-text--onecol-custom-width', name: 'Paragraph Block' },

    // General Fallbacks
    { selector: '.blocks-button', name: 'Button Block' },
    { selector: '.continue-btn', name: 'Continue Button Block' },
    { selector: '[data-continue-sr]', name: 'Completed Continue Block' },
    { selector: '.block-image', name: 'Image Block' },
    { selector: '.block-gallery', name: 'Gallery Block' },
    { selector: '.block-quote', name: 'Quote Block' },
    { selector: '.block-list', name: 'List Block' },
    { selector: '.block-knowledge', name: 'Knowledge Check Block' },
];

function getBlockTypeName(element) {
    for (const mapping of blockTypeMappings) {
        if (element.querySelector(mapping.selector)) {
            return mapping.name;
        }
    }
    return 'Block';
}

let menuToggleButtonClicked = false;
let confettiScriptLoaded = false;
let scrollTriggerObserver; 
let blockIdLogState = new WeakMap(); 
let scrollTriggerVisibilityState = new WeakMap();
let parallaxInitialized = false;
let latestKnownScrollY = 0;
let ticking = false;

function loadConfettiScript() {
    if (confettiScriptLoaded) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js';
        script.onload = () => { confettiScriptLoaded = true; console.log('Rise mods.js: Confetti script loaded.'); resolve(); };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function fireConfetti() {
    if (!confettiScriptLoaded) return;
    const { particleCount, spread, startVelocity, colours, origin } = modsConfig.confettiSettings;
    let originPoint = { y: 0.7, x: (origin === 'left' ? 0 : origin === 'right' ? 1 : 0.5) };
    const confettiExecutor = typeof tsParticles !== 'undefined' ? tsParticles.confetti : window.confetti;
    if (confettiExecutor) {
        confettiExecutor({ particleCount, spread, startVelocity, colors: colours, origin: originPoint });
    }
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}


function updateShortcodeDisplay(reflectionId) {
    if (!modsConfig.enableSummaryShortcodes) return;
    const storageKey = `reflection-${reflectionId}`;
    const savedData = localStorage.getItem(storageKey);
    const replacementText = savedData ? escapeHtml(atob(savedData)) : modsConfig.summaryShortcode_DefaultText;
    const targetSpans = document.querySelectorAll(`.summary-shortcode-text[data-shortcode-id="${reflectionId}"]`);
    targetSpans.forEach(span => {
        span.innerHTML = replacementText.replace(/\n/g, '<br>');
    });
}

function runShortcodeReplacement() {
    if (!modsConfig.enableSummaryShortcodes) return;
    const contentAreas = document.querySelectorAll('.fr-view.rise-tiptap');
    if (!contentAreas.length) return;
    const shortcodeRegex = /\[([A-Z0-9_]+)\]/g;
    contentAreas.forEach(area => {
        if (shortcodeRegex.test(area.innerHTML) && !area.querySelector('.summary-shortcode-text')) {
            area.innerHTML = area.innerHTML.replace(shortcodeRegex, (match, shortcodeId) => {
                const storageKey = `reflection-${shortcodeId}`;
                const savedData = localStorage.getItem(storageKey);
                const replacementText = savedData ? escapeHtml(atob(savedData)) : modsConfig.summaryShortcode_DefaultText;
                return `<span class="summary-shortcode-text" data-shortcode-id="${shortcodeId}">${replacementText.replace(/\n/g, '<br>')}</span>`;
            });
        }
    });
}

function initializeParallax() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const parallaxElements = document.querySelectorAll('.block-image--overlay .block-image__paragraph');
    const pageWrap = document.getElementById('page-wrap');
    if (parallaxInitialized || parallaxElements.length === 0 || !pageWrap) return;
    if (isMobile) {
        parallaxElements.forEach(el => { el.style.transform = 'none'; });
        parallaxInitialized = true;
        return;
    }
    parallaxElements.forEach((el, index) => {
        const initialOffset = 220 * index;
        el.dataset.initialOffset = initialOffset;
        el.style.transform = `translateY(${initialOffset}px)`;
    });
    function onScroll() {
        latestKnownScrollY = pageWrap.scrollTop;
        if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }
    function update() {
        parallaxElements.forEach(el => {
            const initialOffset = parseFloat(el.dataset.initialOffset) || 0;
            const newTranslate = initialOffset - (latestKnownScrollY * 0.2);
            el.style.transform = `translateY(${newTranslate}px)`;
        });
        ticking = false;
    }
    pageWrap.addEventListener('scroll', onScroll, { passive: true });
    parallaxInitialized = true;
}

function runAllMods() {
    if (modsConfig.enableCustomBackground) {
        document.querySelectorAll('.block-wrapper:not([data-modded="true"])').forEach(block => {
            block.style.backgroundColor = 'transparent';
            block.style.boxShadow = 'none';
            block.style.setProperty('--color-background', 'transparent');
            block.dataset.modded = 'true';
        });
    }

    if (modsConfig.startWithMenuHidden && !menuToggleButtonClicked) {
        const menuButton = document.querySelector('.nav-control__menu .nav-control__button');
        if (menuButton && menuButton.getAttribute('aria-expanded') === 'true') {
            menuButton.click();
            menuToggleButtonClicked = true;
        }
    }

    if (modsConfig.customButtons && modsConfig.customButtons.length > 0) {
        modsConfig.customButtons.forEach(buttonConfig => {
            const selector = `a.blocks-button__button[href*="${buttonConfig.id}"]:not([data-button-modded="true"])`;
            document.querySelectorAll(selector).forEach(button => {
                if (buttonConfig.confetti) loadConfettiScript();
                button.addEventListener('click', event => {
                    event.preventDefault();
                    if (buttonConfig.confetti) fireConfetti();
                    if (buttonConfig.script) try { new Function(buttonConfig.script)(); } catch (e) { console.error(`Error in script for "${buttonConfig.id}":`, e); }
                });
                button.dataset.buttonModded = 'true';
            });
        });
    }

    if (modsConfig.enableReflectionBlocks) {
        document.querySelectorAll('.block-statement--note:not([data-reflection-modded="true"])').forEach(noteBlock => {
            const blockText = noteBlock.textContent;
            if (blockText.includes('REFLECTION ID=')) {
                noteBlock.dataset.reflectionModded = 'true';
                const idMatch = blockText.match(/ID="([^"]+)"/);
                if (!idMatch) return;
                const reflectionId = idMatch[1];
                const storageKey = `reflection-${reflectionId}`;
                const titleMatch = blockText.match(/TITLE="([^"]+)"/);
                const instructionMatch = blockText.match(/INSTRUCTION="([^"]+)"/);
                const title = titleMatch ? titleMatch[1] : 'Reflection';
                const instruction = instructionMatch ? instructionMatch[1] : 'Enter your thoughts below:';
                const alignmentClass = modsConfig.reflectionBlock_CentreAlign ? 'reflection-block--centred' : '';
                const reflectionHTML = `<div class="reflection-block ${alignmentClass}"><h3>${title}</h3><p>${instruction}</p><textarea class="reflection-textarea" placeholder="Type your response here..."></textarea><button class="reflection-save-btn">${modsConfig.reflectionBlock_ButtonText}</button><div class="reflection-saved-feedback">Answer Saved!</div></div>`;
                const container = noteBlock.querySelector('.block-statement__container');
                if (container) {
                    container.innerHTML = reflectionHTML;
                    const textarea = container.querySelector('.reflection-textarea');
                    const saveButton = container.querySelector('.reflection-save-btn');
                    const feedback = container.querySelector('.reflection-saved-feedback');
                    const savedAnswer = localStorage.getItem(storageKey);
                    if (savedAnswer) { textarea.value = atob(savedAnswer); }
                    saveButton.addEventListener('click', () => {
                        localStorage.setItem(storageKey, btoa(textarea.value));
                        feedback.classList.add('visible');
                        updateShortcodeDisplay(reflectionId);
                        setTimeout(() => feedback.classList.remove('visible'), 2000);
                    });
                }
            }
        });
    }
    
    if (modsConfig.replaceContinueWithLine) {
        const continueIndicators = document.querySelectorAll('[data-continue-sr]');
        continueIndicators.forEach(indicator => {
            const continueBlock = indicator.closest('.noOutline[data-block-id]');
            if (!continueBlock) return;
            if (continueBlock.classList.contains('continue-divider-mod')) return;
            const hasButton = continueBlock.querySelector('.continue-btn');
            if (!hasButton) {
                continueBlock.classList.add('continue-divider-mod');
                const wrapper = continueBlock.querySelector('.block-wrapper');
                if (wrapper) wrapper.style.display = 'none';
            }
        });
    }

    if ((modsConfig.developerMode_LogBlockIds || (modsConfig.scrollTriggers && modsConfig.scrollTriggers.length > 0)) && scrollTriggerObserver) {
        const blocksToObserve = document.querySelectorAll('.blocks-lesson > .noOutline[data-block-id]:not([data-dev-observed="true"])');
        blocksToObserve.forEach(block => {
            if (modsConfig.developerMode_LogBlockIds) blockIdLogState.set(block, false);
            if (modsConfig.scrollTriggers.length > 0) scrollTriggerVisibilityState.set(block, false);
            scrollTriggerObserver.observe(block);
            block.dataset.devObserved = 'true';
        });
    }
    
    if (modsConfig.moderniseTextOnImage && modsConfig.textOnImage_AlternateFloat) {
        const allTextImageBlocks = document.querySelectorAll('.block-image--overlay');
        allTextImageBlocks.forEach((block, index) => {
            if (block.hasAttribute('data-float-modded')) return;
            if ((index + 1) % 2 === 0) {
                const textColumn = block.querySelector('.block-image__col');
                if (textColumn) {
                    textColumn.style.float = "right";
                }
            }
            block.dataset.floatModded = 'true';
        });
    }
    
    if (modsConfig.moderniseTextOnImage && modsConfig.textOnImage_StaggeredParallax) {
        initializeParallax();
    }
    
    runShortcodeReplacement();
}

// --- Main Execution Block (CSS Injection & Observer Setup) ---

if (modsConfig.developerMode_LogBlockIds || (modsConfig.scrollTriggers && modsConfig.scrollTriggers.length > 0)) {
    const observerOptions = { root: null, threshold: 0.1 };
    scrollTriggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const blockId = entry.target.dataset.blockId;
            if (modsConfig.developerMode_LogBlockIds) {
                const isDevLogVisible = blockIdLogState.get(entry.target);
                if (entry.isIntersecting && !isDevLogVisible) {
                    const blockTypeName = getBlockTypeName(entry.target);
                    console.log(`%cRise mods.js (Dev Mode):%c ${blockTypeName} scrolled INTO view with ID: %c${blockId}`, "color: #ff9800; font-weight: bold;", "color: inherit;", "color: #03a9f4; font-weight: bold;");
                    blockIdLogState.set(entry.target, true);
                } else if (!entry.isIntersecting && isDevLogVisible) {
                    blockIdLogState.set(entry.target, false);
                }
            }
            if (modsConfig.scrollTriggers.length > 0) {
                const trigger = modsConfig.scrollTriggers.find(t => t.id === blockId);
                const isTriggerVisible = scrollTriggerVisibilityState.get(entry.target);
                if (trigger) {
                    if (entry.isIntersecting && !isTriggerVisible) {
                        if (modsConfig.developerMode_LogBlockIds) { console.log(`%cRise mods.js:%c Firing scroll trigger for block ID: %c${blockId}`, "color: #4CAF50; font-weight: bold;", "color: inherit;", "color: #03a9f4; font-weight: bold;"); }
                        try { new Function(trigger.script)(); } catch (e) { console.error(`Error in scroll trigger for ${blockId}:`, e); }
                        scrollTriggerVisibilityState.set(entry.target, true);
                        if (trigger.fireOnce === true) { observer.unobserve(entry.target); }
                    } else if (!entry.isIntersecting && isTriggerVisible) {
                        if (trigger.fireOnce !== true) { scrollTriggerVisibilityState.set(entry.target, false); }
                    }
                }
            }
        });
    }, observerOptions);
}

let finalCustomCSS = '';

// --- CORRECTED Background CSS Logic ---
if (modsConfig.enableCustomBackground) {
    let bgLayers = [];
    let bgSizes = [];
    let bgPositions = [];
    let bgRepeats = [];

    // Layer 3 (Bottom): The background image itself.
    if (modsConfig.enableCustomBackgroundImage && modsConfig.backgroundImageUrl) {
        bgLayers.push(`url('${modsConfig.backgroundImageUrl}')`);
        bgSizes.push('cover');
        bgPositions.push('center center');
        bgRepeats.push('no-repeat');
    }

    // Layer 2: A solid color overlay to control the image's "opacity".
    // This calculates the opaqueness of the color overlay needed to achieve the desired image opacity.
    if (modsConfig.enableCustomBackgroundImage && modsConfig.backgroundImageUrl) {
        const overlayOpacity = 1 - modsConfig.backgroundImageOpacity;
        const color = modsConfig.backgroundColour;
        
        let r=0, g=0, b=0;
        if (color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
            let hex = color.substring(1).split('');
            if (hex.length === 3) { hex = [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]]; }
            hex = '0x' + hex.join('');
            r = (hex>>16)&255; g = (hex>>8)&255; b = hex&255;
        }
        bgLayers.push(`linear-gradient(rgba(${r},${g},${b},${overlayOpacity}), rgba(${r},${g},${b},${overlayOpacity}))`);
        bgSizes.push('auto');
        bgPositions.push('center center');
        bgRepeats.push('no-repeat');
    }
    
    // Layer 1 (Top): The grid lines.
    if (modsConfig.showGridLines) {
        bgLayers.push(`linear-gradient(${modsConfig.gridLineColour} 1px, transparent 1px)`);
        bgSizes.push(`${modsConfig.gridSize}px ${modsConfig.gridSize}px`);
        bgPositions.push('top left');
        bgRepeats.push('repeat');

        bgLayers.push(`linear-gradient(90deg, ${modsConfig.gridLineColour} 1px, transparent 1px)`);
        bgSizes.push(`${modsConfig.gridSize}px ${modsConfig.gridSize}px`);
        bgPositions.push('top left');
        bgRepeats.push('repeat');
    }
    
    // CSS layers are applied bottom-to-top, but we build the array top-to-bottom. We must reverse it.
    bgLayers.reverse();
    bgSizes.reverse();
    bgPositions.reverse();
    bgRepeats.reverse();

    let pageWrapCSS = `background-color: ${modsConfig.backgroundColour}; background-attachment: fixed;`;
    if (bgLayers.length > 0) {
        pageWrapCSS += `
            background-image: ${bgLayers.join(', ')};
            background-size: ${bgSizes.join(', ')};
            background-position: ${bgPositions.join(', ')};
            background-repeat: ${bgRepeats.join(', ')};
        `;
    }

    finalCustomCSS += `
        #page-wrap { ${pageWrapCSS} }
        .page__wrapper--white, .page__header, .blocks-lesson, .lesson-nav--full { background: transparent !important; }`;
}
// --- END CORRECTED SECTION ---


if (modsConfig.centreAlignButtons) {
    finalCustomCSS += `
        .blocks-button__description { display: none !important; }
        .blocks-button__container { max-width: none !important; justify-content: center !important; }
        .blocks-button__button {
            flex: 0 1 auto !important; max-width: 30rem !important; min-width: 15rem !important;
            height: ${modsConfig.centredButtonHeight} !important; line-height: ${modsConfig.centredButtonHeight} !important;
        }`;
}

if (modsConfig.moderniseMenuButton) {
    finalCustomCSS += `
        .nav-control__button {
            background: rgba(255, 255, 255, ${modsConfig.modernMenuButton_Opacity}) !important;
            backdrop-filter: blur(${modsConfig.modernMenuButton_Blur}) !important;
            -webkit-backdrop-filter: blur(${modsConfig.modernMenuButton_Blur}) !important;
            box-shadow: ${modsConfig.modernMenuButton_Shadow} !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 8px !important;
            transition: transform 0.2s ease-in-out !important;
        }
        .nav-control__button:hover { transform: scale(${modsConfig.modernMenuButton_HoverScale}) !important; }
        .nav-control__button svg { will-change: transform; transform: translateZ(0); }`;
}

if (modsConfig.roundContinueButtons) {
    finalCustomCSS += `.continue-btn { border-radius: ${modsConfig.continueButton_BorderRadius} !important; }`;
}

if (modsConfig.replaceContinueWithLine) {
    finalCustomCSS += `
        .continue-divider-mod {
            padding: 0 !important; height: 0px !important; margin: 3rem auto !important;
            border-top: 1px solid ${modsConfig.continueLineColour} !important;
            width: ${modsConfig.continueLineWidth} !important;
        }`;
}

if (modsConfig.enableReflectionBlocks) {
    finalCustomCSS += `
        .reflection-block { display: flex; flex-direction: column; width: 100%; gap: 1rem; }
        .reflection-block--centred { align-items: center; }
        .reflection-block--centred h3, .reflection-block--centred p { text-align: center; }
        .reflection-block--centred .reflection-textarea { text-align: center; }
        .reflection-block h3 { font-size: 2.2rem; font-weight: bold; margin: 0; }
        .reflection-block p { font-size: 1.6rem; margin: 0; }
        .reflection-textarea { width: 100%; min-height: 120px; padding: 1rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1.6rem; transition: border-color 0.2s; }
        .reflection-textarea:focus { border-color: var(--color-theme, #00aff0); outline: none; }
        .reflection-save-btn { padding: 1rem 2rem; border: none; border-radius: ${modsConfig.reflectionBlock_ButtonRadius}; background-color: var(--color-theme, #00aff0); color: var(--color-theme-contrast, #fff); font-size: 1.6rem; font-weight: bold; cursor: pointer; transition: opacity 0.2s; }
        .reflection-save-btn:hover { opacity: 0.8; }
        .reflection-saved-feedback { margin-top: 1rem; color: var(--color-theme, #00aff0); font-weight: bold; opacity: 0; transition: opacity 0.3s; }
        .reflection-saved-feedback.visible { opacity: 1; }`;
}

if (modsConfig.enableSummaryShortcodes) {
    finalCustomCSS += `
        .summary-shortcode-text {
            font-style: italic; background-color: #f0f0f0; padding: 0.2rem 0.6rem;
            border-radius: 4px; border: 1px solid #e0e0e0; white-space: pre-wrap;
        }`;
}

if (modsConfig.moderniseTextOnImage) {
    let glassEffectCSS = modsConfig.textOnImage_GlassEffect ? `
        background: ${modsConfig.textOnImage_GlassBackground} !important;
        backdrop-filter: blur(${modsConfig.textOnImage_GlassBlur}) !important;
        -webkit-backdrop-filter: blur(${modsConfig.textOnImage_GlassBlur}) !important;
        border: 1px solid rgba(255, 255, 255, 0.18);
    ` : '';
    let dropShadowCSS = modsConfig.textOnImage_DropShadow ? `
        box-shadow: ${modsConfig.textOnImage_Shadow} !important;
    ` : '';
    finalCustomCSS += `
        .block-image--overlay .block-image__paragraph {
            ${glassEffectCSS}
            ${dropShadowCSS}
            padding: 2rem !important;
            border-radius: 8px;
        }
        .block-image--overlay .block-image__paragraph:before {
            display: none !important;
        }`;
    if (modsConfig.textOnImage_CustomHeadlineFont) {
        finalCustomCSS += `
            .block-image__paragraph.brand--linkColor p:first-of-type {
                font-family: ${modsConfig.textOnImage_HeadlineFontFamily} !important;
            }`;
    }
}

if (finalCustomCSS) {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = finalCustomCSS;
    document.head.appendChild(styleSheet);
}

const targetNode = document.getElementById('app');
const config = { childList: true, subtree: true };
const observer = new MutationObserver(runAllMods);
observer.observe(targetNode, config);
window.addEventListener('load', runAllMods);
console.log('Fire Mods by Discover eLearning: Script loaded and now observing for all content changes...');