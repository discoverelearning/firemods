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
        //    script: `console.log("This message will appear ONLY ONCE for this block.");`,
        //    fireOnce: true
        //},
        //{
        //    id: 'cmbrrrgxm00li357dkhllr3sw', // Example ID - Use Developer Mode above to discover via console
        //    script: `console.log("This message will appear EVERY TIME this block is scrolled into view.");`,
        //    fireOnce: false
        //}
    ],

    // --- Cover Page Customisations ---
    overrideCoverPagePadding: false,
    coverPagePadding: '4rem 7rem',
	
	// --- Note Taker and Highlighter ---
    enableNoteTakerAndHighlighter: false,
    highlighter_Colors: [
        { name: 'Yellow', color: '#fff1a7' },
        { name: 'Pink', color: '#ffc4e1' },
        { name: 'Blue', color: '#ccebff' },
    ],
    highlighter_NoteModalTitle: 'My Note',

    // --- Text-to-Speech Customisation ---
    enableTextReader: false,
    textReader_ButtonColour: '#0070a3',
    textReader_ButtonColourInactive: '#636363',
    textReader_ButtonSize: '50px',

    // --- Text on Image Block Customisations ---
    moderniseTextOnImage: false,
    textOnImage_TextBlockWidth: '90%',
    textOnImage_Padding: '4rem 7rem',
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
    enableReflectionBlocks: false,
    reflectionBlock_CentreAlign: false,
    reflectionBlock_ButtonRadius: '50px',
    reflectionBlock_ButtonText: 'Save My Answer',

    // --- Display Reflection Block Entry Using Shortcode ---
    //Steps To Follow in Rise: Add the following text into ANY Rise block:
    //[REFLECT01]
    //Replace the value in the square brackets with the ID of the Reflection Block
    enableSummaryShortcodes: false,
    summaryShortcode_DefaultText: 'You may not have yet provided an answer to this reflection activity. You can go back and complete this now if you wish.',

    // --- Rise Background Customisations (Apply fixed background behind all standard Rise content blocks, this does not apply for example to TEXT ON IMAGE blocks) ---
    enableCustomBackground: false,
    backgroundColour: '#fdfdfd',
    showGridLines: false,
    gridLineColour: 'rgba(0, 0, 0, 0.04)',
    gridSize: 30,

    // --- Add Custom Background Image ---
	//Image appears over the custom colour set above. Grid lines if activate will appear over the image
    enableCustomBackgroundImage: false,  // Set to 'true' to use an image for the background. Ensure enableCustomBackground is also true
    backgroundImageUrl: 'https://images.unsplash.com/photo-1749371930388-50c782b0acea?fm=jpg&q=60&w=3000',
    backgroundImageOpacity: 0.2,

    // --- Menu Visibility On Start Customisation ---
    startWithMenuHidden: false,

    // --- Menu Button Customisation ---
    moderniseMenuButton: false,
    modernMenuButton_Blur: '1px',
    modernMenuButton_Opacity: 0.1,
    modernMenuButton_Shadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    modernMenuButton_HoverScale: 1.1,

    // --- Button Block Customisations ---
    centreAlignButtons: false, //Change true To Activate. Remove all text from the button block in Rise
    centredButtonHeight: '5rem', //Change to add extra height to the button if required

    // --- Continue Button Block Customisations---
    roundContinueButtons: false, 
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
        //    script: `console.log("Add your custom script between the open and close single quotes on this line");`,
        //    confetti: false //Change to true to display confetti when button is clicked (good for testing!)
        //}
    ],

    // --- Confetti Settings ---
    confettiSettings: {
        particleCount: 150,
        spread: 90,
        startVelocity: 45,
        colours: ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'],
        origin: 'center',
        zIndex: 9999
    }
};
// =================================================================

// --- NOTE TAKER AND HIGHLIGHTER SCRIPT LOGIC ---

const FIREMODS_STORAGE_KEY = 'firemods_all_highlights_data';
let firemods_loadedHighlightsForPage = [];

let firemods_noteTakerInitialized = false;
let firemods_highlighterContextMenu = null;
let firemods_noteModal = null;
let firemods_modalOverlay = null; // [NEW] Variable for the mobile overlay
let firemods_currentRange = null;
let firemods_activeHighlightIdForNoteModal = null;

let firemods_isMouseDown = false;
let firemods_isDragging = false;
let firemods_dragStartX = 0;
let firemods_dragStartY = 0;
const FIREMODS_DRAG_THRESHOLD = 5;

// [NEW] Helper function to detect mobile devices
function firemods_isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function firemods_generateUUID() {
    return 'fm-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function firemods_getCurrentPageUrl() {
    return window.location.href;
}

function firemods_getAllStoredHighlights() {
    try {
        const storedData = localStorage.getItem(FIREMODS_STORAGE_KEY);
        return storedData ? JSON.parse(storedData) : {};
    } catch (e) {
        console.error("FireMods (Highlighter): Error parsing stored highlights data.", e);
        return {};
    }
}

function firemods_saveAllStoredHighlights(allData) {
    try {
        localStorage.setItem(FIREMODS_STORAGE_KEY, JSON.stringify(allData));
    } catch (e) {
        console.error("FireMods (Highlighter): Error saving highlights data to localStorage.", e);
    }
}

function firemods_getNodePath(rootElement, targetNode) {
    const path = [];
    let currentNode = targetNode;
    if (!rootElement || !targetNode) return null;
    if (!rootElement.contains(targetNode)) {
        console.warn(`FireMods (Highlighter): getNodePath: rootElement does NOT contain targetNode. Path generation failed.`);
        return null;
    }
    while (currentNode && currentNode !== rootElement) {
        const parent = currentNode.parentNode;
        if (!parent) return null;
        let sibling = currentNode;
        let index = 0;
        while (sibling.previousSibling) {
            sibling = sibling.previousSibling;
            index++;
        }
        path.unshift(index);
        currentNode = parent;
    }
    return (currentNode === rootElement) ? path : null;
}

function firemods_getNodeByPath(rootElement, path) {
    let currentNode = rootElement;
    if (!rootElement || !path) return null;
    for (let i = 0; i < path.length; i++) {
        const index = path[i];
        if (currentNode && currentNode.childNodes && currentNode.childNodes[index] !== undefined) {
            currentNode = currentNode.childNodes[index];
        } else {
            return null;
        }
    }
    return currentNode;
}


function firemods_getRangeSerializationData(range, id, color, type, noteText = null) {
    if (!range || range.collapsed || (range.startContainer === range.endContainer && range.startOffset === range.endOffset)) return null;
    const commonAncestor = range.commonAncestorContainer;
    const blockElement = commonAncestor.nodeType === Node.ELEMENT_NODE ?
                         commonAncestor.closest('[data-block-id]') :
                         (commonAncestor.parentNode ? commonAncestor.parentNode.closest('[data-block-id]') : null);
    if (!blockElement) {
        console.warn("FireMods (Highlighter): getRangeSerializationData: Could not find parent block with [data-block-id].");
        return null;
    }
    const blockId = blockElement.dataset.blockId;
    let contentRoot = null;
    let contentSelector = '';
    let contentRootIndex = 0;
    const stableSelectors = ['.fr-view.rise-tiptap', '.fr-view', '.block-text__paragraph', '.block-text__heading', '.list-item__content', '.block-quote__text'];
    let searchStartNode = range.startContainer.nodeType === Node.TEXT_NODE ? range.startContainer.parentNode : range.startContainer;
    for (const selector of stableSelectors) {
        if (!searchStartNode || typeof searchStartNode.closest !== 'function') continue;
        const closestStableAncestor = searchStartNode.closest(selector);
        if (closestStableAncestor && blockElement.contains(closestStableAncestor) && closestStableAncestor.contains(range.startContainer) && closestStableAncestor.contains(range.endContainer)) {
            contentRoot = closestStableAncestor;
            contentSelector = selector;
            const allMatchingRoots = Array.from(blockElement.querySelectorAll(contentSelector));
            contentRootIndex = allMatchingRoots.indexOf(contentRoot);
            if (contentRootIndex === -1) {
                console.error("FireMods (Highlighter): getRangeSerializationData: CRITICAL - Found contentRoot not in querySelectorAll list.");
                contentRoot = blockElement;
                contentSelector = '';
                contentRootIndex = 0;
            }
            break;
        }
    }
    if (!contentRoot) {
        contentRoot = blockElement;
        contentSelector = '';
        contentRootIndex = 0;
        if (!blockElement.contains(range.startContainer) || !blockElement.contains(range.endContainer)) {
            console.error("FireMods (Highlighter): getRangeSerializationData: Critical - Range containers not within blockElement fallback.");
            return null;
        }
    }
    const startContainerPath = firemods_getNodePath(contentRoot, range.startContainer);
    const endContainerPath = firemods_getNodePath(contentRoot, range.endContainer);
    if (!startContainerPath || !endContainerPath) return null;
    const selectedText = (typeof range.toString === 'function' ? range.toString() : "").trim();
    return {
        id: id, blockId: blockId, contentSelector: contentSelector, contentRootIndex: contentRootIndex,
        startContainerPath: startContainerPath, startOffset: range.startOffset,
        endContainerPath: endContainerPath, endOffset: range.endOffset,
        color: color, type: type, selectedText: selectedText, note: noteText
    };
}

function firemods_saveOrUpdateHighlightInStorage(highlightData) {
    if (!highlightData || !highlightData.id) return;
    const pageUrl = firemods_getCurrentPageUrl();
    const allStoredData = firemods_getAllStoredHighlights();
    if (!allStoredData[pageUrl]) allStoredData[pageUrl] = [];
    const pageHighlights = allStoredData[pageUrl];
    const existingIndex = pageHighlights.findIndex(h => h.id === highlightData.id);
    if (existingIndex > -1) {
        const currentNote = pageHighlights[existingIndex].note;
        pageHighlights[existingIndex] = { ...pageHighlights[existingIndex], ...highlightData, note: highlightData.note !== undefined ? highlightData.note : currentNote };
    } else {
        pageHighlights.push(highlightData);
    }
    const cachedIndex = firemods_loadedHighlightsForPage.findIndex(h => h.id === highlightData.id);
    if (cachedIndex > -1) {
        firemods_loadedHighlightsForPage[cachedIndex] = { ...firemods_loadedHighlightsForPage[cachedIndex], ...highlightData };
    } else {
        firemods_loadedHighlightsForPage.push(JSON.parse(JSON.stringify(highlightData)));
    }
    firemods_saveAllStoredHighlights(allStoredData);
}

function firemods_deleteHighlightFromStorage(highlightId) {
    if (!highlightId) return;
    const pageUrl = firemods_getCurrentPageUrl();
    const allStoredData = firemods_getAllStoredHighlights();
    if (allStoredData[pageUrl]) {
        allStoredData[pageUrl] = allStoredData[pageUrl].filter(h => h.id !== highlightId);
        if (allStoredData[pageUrl].length === 0) delete allStoredData[pageUrl];
        firemods_saveAllStoredHighlights(allStoredData);
        firemods_loadedHighlightsForPage = firemods_loadedHighlightsForPage.filter(h => h.id !== highlightId);
    }
}

function firemods_createHighlighterContextMenu() {
    if (firemods_highlighterContextMenu) return;
    firemods_highlighterContextMenu = document.createElement('div');
    firemods_highlighterContextMenu.className = 'firemods-highlighter-context-menu';
    firemods_highlighterContextMenu.style.display = 'none';
    modsConfig.highlighter_Colors.forEach(hc => {
        const colorBtn = document.createElement('button');
        colorBtn.title = `Highlight ${hc.name}`;
        colorBtn.style.backgroundColor = hc.color;
        colorBtn.dataset.color = hc.color;
        colorBtn.addEventListener('click', () => { firemods_applyHighlight(hc.color, false); firemods_hideHighlighterContextMenu(); });
        firemods_highlighterContextMenu.appendChild(colorBtn);
    });
    const removeBtn = document.createElement('button');
    removeBtn.title = 'Remove Highlight';
    removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width:1.25em; height:1.25em; display:inline-block; vertical-align:middle;"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`;
    removeBtn.addEventListener('click', () => { firemods_removeHighlightAction(); firemods_hideHighlighterContextMenu(); });
    firemods_highlighterContextMenu.appendChild(removeBtn);
    const noteBtn = document.createElement('button');
    noteBtn.title = 'Add/Edit Note';
    noteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width:1.25em; height:1.25em; display:inline-block; vertical-align:middle;"><path d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"/></svg>`;
    noteBtn.addEventListener('click', () => { firemods_openNoteModalForSelection(); firemods_hideHighlighterContextMenu(); });
    firemods_highlighterContextMenu.appendChild(noteBtn);
    document.body.appendChild(firemods_highlighterContextMenu);
}

function firemods_showHighlighterContextMenu(x, y) {
    if (!firemods_highlighterContextMenu) firemods_createHighlighterContextMenu();
    firemods_highlighterContextMenu.style.left = `${x}px`;
    firemods_highlighterContextMenu.style.top = `${y + 5}px`;
    firemods_highlighterContextMenu.style.display = 'flex';
}

function firemods_hideHighlighterContextMenu() {
    if (firemods_highlighterContextMenu) firemods_highlighterContextMenu.style.display = 'none';
    firemods_currentRange = null;
}

function firemods_cleanFragmentOfHighlights(fragment) {
    const highlightsInFragment = fragment.querySelectorAll('.firemods-highlight, .firemods-note-anchor');
    highlightsInFragment.forEach(existingElement => {
        const elementId = existingElement.dataset.highlightId;
        const parent = existingElement.parentNode;
        if (parent) {
            while (existingElement.firstChild) {
                parent.insertBefore(existingElement.firstChild, existingElement);
            }
            parent.removeChild(existingElement);
            if (elementId) firemods_deleteHighlightFromStorage(elementId);
        }
    });
}

function firemods_applyHighlight(colorOrNull, isNoteAnchorOnly) {
    if (!firemods_currentRange || firemods_currentRange.collapsed || (firemods_currentRange.startContainer === firemods_currentRange.endContainer && firemods_currentRange.startOffset === firemods_currentRange.endOffset)) {
        firemods_hideHighlighterContextMenu();
        return null;
    }
    const rangeToOperateOn = firemods_currentRange.cloneRange();
    const serializationDetails = {
        startContainer: rangeToOperateOn.startContainer, startOffset: rangeToOperateOn.startOffset,
        endContainer: rangeToOperateOn.endContainer, endOffset: rangeToOperateOn.endOffset,
        commonAncestorContainer: rangeToOperateOn.commonAncestorContainer,
        toString: rangeToOperateOn.toString(), collapsed: rangeToOperateOn.collapsed
    };
    let activeRangeForDomOps = rangeToOperateOn.cloneRange();
    const clonedContents = activeRangeForDomOps.cloneContents();
    let containsBlockElementsAtRoot = false;
    for (let i = 0; i < clonedContents.childNodes.length; i++) {
        if (clonedContents.childNodes[i].nodeType === Node.ELEMENT_NODE) {
            const displayStyle = window.getComputedStyle(clonedContents.childNodes[i]).display;
            if (['block', 'list-item', 'table', 'flex', 'grid'].includes(displayStyle)) {
                containsBlockElementsAtRoot = true;
                break;
            }
        }
    }
    if (containsBlockElementsAtRoot) {
        console.warn("FireMods (Highlighter): applyHighlight: Selection spans/includes block-level elements. Aborting.");
        window.getSelection().removeAllRanges();
        firemods_hideHighlighterContextMenu();
        return null;
    }
    let selectedFragment;
    try {
        selectedFragment = activeRangeForDomOps.extractContents();
    } catch (e) {
        console.error("FireMods (Highlighter): applyHighlight: Error extracting contents from range.", e);
        window.getSelection().removeAllRanges();
        firemods_hideHighlighterContextMenu();
        return null;
    }
    firemods_cleanFragmentOfHighlights(selectedFragment); 
    const newSpan = document.createElement('span');
    const highlightId = firemods_generateUUID();
    newSpan.dataset.highlightId = highlightId;
    const type = isNoteAnchorOnly ? 'note-anchor' : 'highlight';
    newSpan.className = isNoteAnchorOnly ? 'firemods-note-anchor' : 'firemods-highlight';
    if (!isNoteAnchorOnly) newSpan.style.backgroundColor = colorOrNull;
    newSpan.appendChild(selectedFragment);
    try {
        activeRangeForDomOps.insertNode(newSpan);
    } catch (e) {
        console.error("FireMods (Highlighter): applyHighlight: Error inserting new span node.", e);
        if (newSpan.firstChild) {
            let insertionPoint = serializationDetails.commonAncestorContainer;
            if (insertionPoint.nodeType === Node.TEXT_NODE) insertionPoint = insertionPoint.parentNode;
            if (insertionPoint && typeof insertionPoint.appendChild === 'function') insertionPoint.appendChild(newSpan.firstChild);
        }
        window.getSelection().removeAllRanges();
        firemods_hideHighlighterContextMenu();
        return null;
    }
    const tempRangeLikeObjectForSerialization = {
        startContainer: serializationDetails.startContainer, startOffset: serializationDetails.startOffset,
        endContainer: serializationDetails.endContainer, endOffset: serializationDetails.endOffset,
        commonAncestorContainer: serializationDetails.commonAncestorContainer,
        toString: () => serializationDetails.toString, collapsed: serializationDetails.collapsed
    };
    const highlightData = firemods_getRangeSerializationData(tempRangeLikeObjectForSerialization, highlightId, colorOrNull, type);
    if (highlightData) {
        firemods_saveOrUpdateHighlightInStorage(highlightData);
    } else {
        console.warn("FireMods (Highlighter): applyHighlight: Could not get serialization data for new highlight.", highlightId);
    }
    window.getSelection().removeAllRanges();
    firemods_currentRange = null; 
    setTimeout(() => firemods_scanAndApplyNoteIndicators(), 50);
    return newSpan;
}

function firemods_removeHighlightAction() {
    if (!firemods_currentRange || firemods_currentRange.collapsed || (firemods_currentRange.startContainer === firemods_currentRange.endContainer && firemods_currentRange.startOffset === firemods_currentRange.endOffset)) {
        firemods_hideHighlighterContextMenu();
        return;
    }
    const range = firemods_currentRange.cloneRange();
    let selectionIntersectsExistingElement = false;
    const tempFragment = range.cloneContents();
    if (tempFragment.querySelector('.firemods-highlight, .firemods-note-anchor')) {
        selectionIntersectsExistingElement = true;
    } else {
        let el = range.commonAncestorContainer;
        if (el.nodeType === Node.TEXT_NODE) el = el.parentNode;
        if (el && typeof el.closest === 'function') {
            const closestInteractiveElement = el.closest('.firemods-highlight, .firemods-note-anchor');
            if (closestInteractiveElement && range.intersectsNode(closestInteractiveElement)) {
                selectionIntersectsExistingElement = true;
            }
        }
    }
    if (selectionIntersectsExistingElement) {
        let selectedFragment;
        try {
            selectedFragment = range.extractContents();
        } catch (e) {
            console.error("FireMods (Highlighter): removeHighlightAction: Error extracting contents for removal.", e);
            window.getSelection().removeAllRanges();
            firemods_hideHighlighterContextMenu();
            return;
        }
        firemods_cleanFragmentOfHighlights(selectedFragment);
        try {
            range.insertNode(selectedFragment);
        } catch (e) {
            console.error("FireMods (Highlighter): removeHighlightAction: Error inserting cleaned fragment.", e);
        }
    }
    window.getSelection().removeAllRanges();
    firemods_currentRange = null;
    setTimeout(() => firemods_scanAndApplyNoteIndicators(), 0);
}

function firemods_createNoteModal() {
    if (firemods_noteModal) return;
    firemods_noteModal = document.createElement('div');
    firemods_noteModal.className = 'firemods-note-modal';
    firemods_noteModal.style.display = 'none';
    firemods_noteModal.innerHTML = `
        <div class="firemods-note-modal-header"><h3>${modsConfig.highlighter_NoteModalTitle}</h3><button class="firemods-note-modal-close">×</button></div>
        <div class="firemods-note-modal-content"><textarea placeholder="Type your note here..."></textarea></div>
        <div class="firemods-note-modal-footer"><button class="firemods-note-modal-save">Save & Close</button></div>`;
    document.body.appendChild(firemods_noteModal);
    // [NEW] Create the overlay element but don't show it yet
    firemods_modalOverlay = document.createElement('div');
    firemods_modalOverlay.className = 'firemods-modal-overlay';
    firemods_modalOverlay.style.display = 'none';
    document.body.appendChild(firemods_modalOverlay);

    firemods_noteModal.querySelector('.firemods-note-modal-close').addEventListener('click', firemods_hideNoteModal);
    firemods_noteModal.querySelector('.firemods-note-modal-save').addEventListener('click', firemods_saveNoteFromModal);
    firemods_modalOverlay.addEventListener('click', firemods_hideNoteModal); // Close on overlay click
}

function firemods_showNoteModal(highlightId, targetElement) {
    if (!firemods_noteModal) firemods_createNoteModal();
    firemods_activeHighlightIdForNoteModal = highlightId;
    const textarea = firemods_noteModal.querySelector('textarea');
    const highlightData = firemods_loadedHighlightsForPage.find(h => h.id === highlightId);
    textarea.value = highlightData && highlightData.note ? highlightData.note : '';
    
    // [MODIFIED] Logic to handle mobile vs. desktop positioning
    if (firemods_isMobileDevice()) {
        firemods_noteModal.classList.add('firemods-note-modal--mobile-centered');
        firemods_noteModal.style.top = '';
        firemods_noteModal.style.left = '';
        if(firemods_modalOverlay) firemods_modalOverlay.style.display = 'block';
    } else {
        firemods_noteModal.classList.remove('firemods-note-modal--mobile-centered');
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        firemods_noteModal.style.top = `${rect.bottom + scrollTop + 5}px`;
        firemods_noteModal.style.left = `${rect.left + scrollLeft}px`;
        if(firemods_modalOverlay) firemods_modalOverlay.style.display = 'none';
    }
    
    firemods_noteModal.style.display = 'block';
    textarea.focus();
}

function firemods_hideNoteModal() {
    if (firemods_noteModal) firemods_noteModal.style.display = 'none';
    // [MODIFIED] Also hide the overlay
    if (firemods_modalOverlay) firemods_modalOverlay.style.display = 'none';
    firemods_activeHighlightIdForNoteModal = null;
}

function firemods_saveNoteFromModal() {
    if (!firemods_activeHighlightIdForNoteModal) return;
    const textarea = firemods_noteModal.querySelector('textarea');
    const noteText = textarea.value.trim() || null;
    const highlightDataToUpdate = firemods_loadedHighlightsForPage.find(h => h.id === firemods_activeHighlightIdForNoteModal);
    if (highlightDataToUpdate) {
        const updatedData = { ...highlightDataToUpdate, note: noteText };
        firemods_saveOrUpdateHighlightInStorage(updatedData);
    } else {
        console.warn("FireMods (Highlighter): saveNoteFromModal: Could not find highlight data for ID:", firemods_activeHighlightIdForNoteModal);
    }
    firemods_hideNoteModal();
    setTimeout(() => firemods_scanAndApplyNoteIndicators(), 0);
}

function firemods_openNoteModalForSelection() {
    if (!firemods_currentRange || firemods_currentRange.collapsed || (firemods_currentRange.startContainer === firemods_currentRange.endContainer && firemods_currentRange.startOffset === firemods_currentRange.endOffset)) {
        firemods_hideHighlighterContextMenu();
        return;
    }
    let anchorSpan = null; 
    let commonAncestor = firemods_currentRange.commonAncestorContainer;
    if (commonAncestor.nodeType === Node.TEXT_NODE) commonAncestor = commonAncestor.parentNode;
    const existingElement = commonAncestor.closest('.firemods-highlight, .firemods-note-anchor');
    let highlightId;
    if (existingElement && firemods_currentRange.intersectsNode(existingElement)) {
        anchorSpan = existingElement;
        highlightId = anchorSpan.dataset.highlightId;
    } else {
        anchorSpan = firemods_applyHighlight(null, true); 
        if (anchorSpan) {
            highlightId = anchorSpan.dataset.highlightId;
        } else {
            console.warn("FireMods (Highlighter): openNoteModalForSelection: Failed to create new note-anchor.");
            firemods_hideHighlighterContextMenu();
            return;
        }
    }
    if (anchorSpan && highlightId) {
        if (document.body.contains(anchorSpan)) {
            firemods_showNoteModal(highlightId, anchorSpan);
        } else {
            console.warn("FireMods (Highlighter): openNoteModalForSelection: Anchor span detached from DOM.", highlightId);
        }
    } else {
        console.warn("FireMods (Highlighter): openNoteModalForSelection: Could not get valid anchorSpan or highlightId.");
    }
}

function firemods_addNoteIndicator(anchorSpan) { 
    if (!anchorSpan || !anchorSpan.dataset || !anchorSpan.dataset.highlightId || !document.body.contains(anchorSpan)) return;
    const anchorId = anchorSpan.dataset.highlightId;
    const nextSibling = anchorSpan.nextElementSibling;
    if (nextSibling && nextSibling.classList.contains('firemods-note-indicator') && nextSibling.dataset.indicatorFor === anchorId) return; 
    const oldIndicator = document.querySelector(`.firemods-note-indicator[data-indicator-for="${anchorId}"]`);
    if (oldIndicator) oldIndicator.remove();
    const indicator = document.createElement('span');
    indicator.className = 'firemods-note-indicator';
    indicator.dataset.indicatorFor = anchorId;
    indicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style="width:2.5rem; height:2.5rem; display:inline-block; vertical-align:middle; cursor:pointer; border:2px solid black; border-radius:12px; padding:1.5px; margin-left:2px; margin-right:3px;"><path d="M3 2.75C3 1.784 3.784 1 4.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 11.25 15h-6.5A1.75 1.75 0 0 1 3 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zM5.5 4.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 5.5 4.75zm0 2.5a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75zm0 2.5a.75.75 0 0 1 .75-.75H8a.75.75 0 0 1 0 1.5H6.25a.75.75 0 0 1-.75-.75z"/></svg>`;
    indicator.title = 'View/Edit Note';
    indicator.addEventListener('click', (e) => { e.stopPropagation(); firemods_showNoteModal(anchorId, indicator); });
    if (anchorSpan.parentNode) anchorSpan.parentNode.insertBefore(indicator, anchorSpan.nextSibling);
}

function firemods_removeNoteIndicator(anchorId) {
    const indicatorToRemove = document.querySelector(`.firemods-note-indicator[data-indicator-for="${anchorId}"]`);
    if (indicatorToRemove) indicatorToRemove.remove();
}

function firemods_scanAndApplyNoteIndicators() {
    if (!modsConfig.enableNoteTakerAndHighlighter) return;
    const existingIndicators = new Map();
    document.querySelectorAll('.firemods-note-indicator[data-indicator-for]').forEach(ind => existingIndicators.set(ind.dataset.indicatorFor, ind));
    document.querySelectorAll('.firemods-highlight[data-highlight-id], .firemods-note-anchor[data-highlight-id]').forEach(anchorSpan => {
        const anchorId = anchorSpan.dataset.highlightId;
        const highlightData = firemods_loadedHighlightsForPage.find(h => h.id === anchorId);
        if (highlightData && highlightData.note && highlightData.note.trim() !== '') {
            if (!existingIndicators.has(anchorId)) firemods_addNoteIndicator(anchorSpan); 
            else existingIndicators.delete(anchorId); 
        } else { 
            if (existingIndicators.has(anchorId)) {
                existingIndicators.get(anchorId).remove();
                existingIndicators.delete(anchorId); 
            }
        }
    });
    existingIndicators.forEach((indicatorElement) => indicatorElement.remove());
}

function firemods_recreateHighlightFromData(highlightData) {
    const blockElement = document.querySelector(`[data-block-id="${highlightData.blockId}"]`);
    if (!blockElement) {
        console.warn("FireMods (Highlighter): recreateHighlightFromData: Block element not found for stored highlight:", highlightData.blockId);
        return false;
    }
    let contentRoot = null;
    if (highlightData.contentSelector) {
        const allMatchingRoots = Array.from(blockElement.querySelectorAll(highlightData.contentSelector));
        if (allMatchingRoots.length > highlightData.contentRootIndex && highlightData.contentRootIndex >= 0) {
            contentRoot = allMatchingRoots[highlightData.contentRootIndex];
        } else {
            console.warn(`FireMods (Highlighter): recreateHighlightFromData: Could not find contentRoot using selector '${highlightData.contentSelector}' at index ${highlightData.contentRootIndex}. Falling back to blockElement.`);
            contentRoot = blockElement; 
        }
    } else { 
        contentRoot = blockElement;
    }
    if (!contentRoot) { 
        console.warn("FireMods (Highlighter): recreateHighlightFromData: Critical - contentRoot could not be determined.");
        return false;
    }
    const startContainer = firemods_getNodeByPath(contentRoot, highlightData.startContainerPath);
    const endContainer = firemods_getNodeByPath(contentRoot, highlightData.endContainerPath);
    if (!startContainer || !endContainer) {
        console.warn("FireMods (Highlighter): recreateHighlightFromData: Could not reconstruct start or end container for highlight:", highlightData.id);
        return false;
    }
    try {
        if ((startContainer.nodeType === Node.TEXT_NODE && highlightData.startOffset > startContainer.length) ||
            (endContainer.nodeType === Node.TEXT_NODE && highlightData.endOffset > endContainer.length) ||
            (startContainer.nodeType === Node.ELEMENT_NODE && highlightData.startOffset > startContainer.childNodes.length) ||
            (endContainer.nodeType === Node.ELEMENT_NODE && highlightData.endOffset > endContainer.childNodes.length)) {
            console.warn("FireMods (Highlighter): recreateHighlightFromData: Start/End offset out of bounds.", highlightData.id);
            return false;
        }
        const range = document.createRange();
        range.setStart(startContainer, highlightData.startOffset);
        range.setEnd(endContainer, highlightData.endOffset);
        if (range.collapsed) {
            return false;
        }
        if (document.querySelector(`[data-highlight-id="${highlightData.id}"]`)) return true; 
        const newSpan = document.createElement('span');
        newSpan.dataset.highlightId = highlightData.id;
        newSpan.className = highlightData.type === 'note-anchor' ? 'firemods-note-anchor' : 'firemods-highlight';
        if (highlightData.type !== 'note-anchor') newSpan.style.backgroundColor = highlightData.color;
        const common = range.commonAncestorContainer;
        if (common.nodeType === Node.DOCUMENT_FRAGMENT_NODE || common.nodeType === Node.DOCUMENT_NODE) {
            console.warn("FireMods (Highlighter): recreateHighlightFromData: Range common ancestor too broad.", highlightData.id);
            return false;
        }
        range.surroundContents(newSpan);
        return true;
    } catch (e) {
        console.error("FireMods (Highlighter): Error re-applying highlight:", highlightData.id, e);
        const problematicSpan = document.querySelector(`[data-highlight-id="${highlightData.id}"]`);
        if (problematicSpan && problematicSpan.innerHTML === "") problematicSpan.remove();
        return false;
    }
}

let firemods_highlightsLoadedForCurrentPage = false;
let firemods_loadInProgress = false;

function firemods_loadAndApplyPersistedHighlights() {
    if (firemods_highlightsLoadedForCurrentPage || !modsConfig.enableNoteTakerAndHighlighter || firemods_loadInProgress) return;
    firemods_loadInProgress = true;
    const pageUrl = firemods_getCurrentPageUrl();
    const allStoredData = firemods_getAllStoredHighlights();
    const highlightsForThisPage = allStoredData[pageUrl] || [];
    firemods_loadedHighlightsForPage = highlightsForThisPage.map(h => ({...h}));
    if (firemods_loadedHighlightsForPage.length > 0) {
        let successCount = 0;
        let applyIndex = 0;
        function applyNext() {
            if (applyIndex < firemods_loadedHighlightsForPage.length) {
                if (firemods_recreateHighlightFromData(firemods_loadedHighlightsForPage[applyIndex])) successCount++;
                applyIndex++;
                setTimeout(applyNext, 0); 
            } else {
                firemods_highlightsLoadedForCurrentPage = true;
                firemods_loadInProgress = false;
                firemods_scanAndApplyNoteIndicators(); 
            }
        }
        applyNext();
    } else {
        firemods_highlightsLoadedForCurrentPage = true;
        firemods_loadInProgress = false;
        firemods_scanAndApplyNoteIndicators();
    }
}

function firemods_handleTextSelectionEvent(event) {
    if (!modsConfig.enableNoteTakerAndHighlighter) return;
    if (event.target.closest('.firemods-highlighter-context-menu, .firemods-note-modal, .firemods-modal-overlay')) {
        firemods_isMouseDown = false; firemods_isDragging = false; return;
    }
    if (firemods_highlighterContextMenu && firemods_highlighterContextMenu.style.display === 'flex' && !firemods_highlighterContextMenu.contains(event.target)) {
        firemods_hideHighlighterContextMenu();
    }
    if (firemods_noteModal && firemods_noteModal.style.display === 'block' && 
        !firemods_noteModal.contains(event.target) && 
        !event.target.closest('.firemods-note-indicator') &&
        !event.target.closest('.firemods-highlighter-context-menu button[title*="Note"]')) {
        firemods_hideNoteModal();
    }
    if (!firemods_isDragging) {
        firemods_isMouseDown = false; firemods_isDragging = false; return;
    }
    firemods_isMouseDown = false; firemods_isDragging = false;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
        firemods_hideHighlighterContextMenu(); return;
    }
    const liveRange = selection.getRangeAt(0);
    if (liveRange.collapsed || (liveRange.startContainer === liveRange.endContainer && liveRange.startOffset === liveRange.endOffset) || selection.toString().trim().length === 0) {
        firemods_hideHighlighterContextMenu(); return;
    }
    const contentArea = event.target.closest('.fr-view, .block-text__paragraph, .block-quote__text, .lesson-content__inner_player .fr-view p, .list-item__content, .block-statement__text');
    if (contentArea) {
        if (event.target.closest('.reflection-textarea, .firemods-note-modal textarea')) {
            firemods_hideHighlighterContextMenu(); return;
        }
        firemods_currentRange = liveRange.cloneRange(); 
        const rect = firemods_currentRange.getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) { 
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            firemods_showHighlighterContextMenu(rect.left + scrollLeft, rect.bottom + scrollTop);
        } else {
            firemods_hideHighlighterContextMenu(); 
        }
    } else {
        firemods_hideHighlighterContextMenu(); 
    }
}

function firemods_initializeNoteTakerAndHighlighter() {
    if (!modsConfig.enableNoteTakerAndHighlighter || firemods_noteTakerInitialized) return;
    firemods_createHighlighterContextMenu(); 
    firemods_createNoteModal(); 
    document.addEventListener('mousedown', (event) => {
        if (!modsConfig.enableNoteTakerAndHighlighter || event.button !== 0 || 
            event.clientX >= document.documentElement.clientWidth || event.clientY >= document.documentElement.clientHeight) return;
        const target = event.target;
        if (target.closest('.firemods-highlighter-context-menu, .firemods-note-modal, .firemods-note-indicator, .reflection-textarea, .firemods-note-modal textarea')) {
            firemods_isMouseDown = false; firemods_isDragging = false; return;
        }
        const contentArea = target.closest('.fr-view, .block-text__paragraph, .block-quote__text, .lesson-content__inner_player .fr-view p, .list-item__content, .block-statement__text');
        if (!contentArea) {
            firemods_isMouseDown = false; firemods_isDragging = false; 
            if (firemods_highlighterContextMenu && firemods_highlighterContextMenu.style.display === 'flex' && !firemods_highlighterContextMenu.contains(target)) firemods_hideHighlighterContextMenu();
            if (firemods_noteModal && firemods_noteModal.style.display === 'block' && !firemods_noteModal.contains(target) && !target.closest('.firemods-note-indicator')) firemods_hideNoteModal();
            return;
        }
        firemods_isMouseDown = true; firemods_isDragging = false;
        firemods_dragStartX = event.clientX; firemods_dragStartY = event.clientY;
        if (firemods_highlighterContextMenu && firemods_highlighterContextMenu.style.display === 'flex' && !firemods_highlighterContextMenu.contains(target)) firemods_hideHighlighterContextMenu();
        if (firemods_noteModal && firemods_noteModal.style.display === 'block' && !firemods_noteModal.contains(target) && !target.closest('.firemods-note-indicator')) firemods_hideNoteModal();
    }, true); 
    document.addEventListener('mousemove', (event) => {
        if (!modsConfig.enableNoteTakerAndHighlighter || !firemods_isMouseDown) return;
        const deltaX = Math.abs(event.clientX - firemods_dragStartX);
        const deltaY = Math.abs(event.clientY - firemods_dragStartY);
        if (deltaX > FIREMODS_DRAG_THRESHOLD || deltaY > FIREMODS_DRAG_THRESHOLD) firemods_isDragging = true; 
    }, true); 
    document.addEventListener('mouseup', firemods_handleTextSelectionEvent, true); 
    firemods_noteTakerInitialized = true;
    setTimeout(() => { firemods_loadAndApplyPersistedHighlights(); }, 1500); 
}
// --- END OF NOTE TAKER AND HIGHLIGHTER SCRIPT LOGIC ---


// --- SCRIPT LOGIC (Main Fire Mods) ---
const blockTypeMappings = [
    { selector: '.block-statement--note', name: 'Note Block' }, { selector: '.block-quote--carousel', name: 'Quote Carousel Block' }, { selector: '.block-quote--background', name: 'Quote on Image Block' }, { selector: '.block-quote--a', name: 'Quote A Block' }, { selector: '.block-quote--b', name: 'Quote B Block' }, { selector: '.block-quote--c', name: 'Quote C Block' }, { selector: '.block-quote--d', name: 'Quote D Block' }, { selector: '.block-text--onecol-custom-width-table-med', name: 'Table Block' }, { selector: '.block-list--checkboxes', name: 'Checkbox List Block' }, { selector: '.block-list--numbered', name: 'Numbered List Block' }, { selector: '.block-list--bulleted', name: 'Bulleted List Block' }, { selector: '.block-gallery-carousel', name: 'Image Carousel Block' }, { selector: '.block-gallery--twocol', name: 'Two Column Image Grid' }, { selector: '.block-gallery--threecol', name: 'Three Column Image Grid' }, { selector: '.block-gallery--fourcol', name: 'Four Column Image Grid' }, { selector: '.block-image--text-aside', name: 'Image & Text Block' }, { selector: '.block-image--full', name: 'Full Width Image Block' }, { selector: '.block-image--hero', name: 'Image Centred Block' }, { selector: '.block-image--overlay', name: 'Text on Image Block' }, { selector: '.block-audio', name: 'Audio Block' }, { selector: '.block-video', name: 'Video Block' }, { selector: '.block-embed', name: 'Embed Block' }, { selector: '.block-attachment', name: 'Attachment Block' }, { selector: '.block-text--code', name: 'Code Snippet Block' }, { selector: '.blocks-accordion', name: 'Accordion Block' }, { selector: '.blocks-tabs', name: 'Tabs Block' }, { selector: '.block-flashcards.block-flashcard--column', name: 'Flashcard Grid Block' }, { selector: '.block-flashcards.block-flashcard--stack', name: 'Flashcard Stack Block' }, { selector: '.block-labeled-graphic', name: 'Labeled Graphic Block' }, { selector: '.block-process', name: 'Process Block' }, { selector: '.block-scenario', name: 'Scenario Block' }, { selector: '.block-sorting-activity', name: 'Sorting Activity Block' }, { selector: '.block-timeline', name: 'Timeline Block' }, { selector: '.blocks-storyline', name: 'Storyline Block' }, { selector: '.blocks-buttonstack', name: 'Button Stack Block' }, { selector: '.block-knowledge__wrapper--multiple.choice', name: 'Multiple Choice Question' }, { selector: '.block-knowledge__wrapper--multiple.response', name: 'Multiple Response Question' }, { selector: '.block-knowledge__wrapper--fillin', name: 'Fill in the Blank Question' }, { selector: '.block-knowledge__wrapper--matching', name: 'Matching Question' }, { selector: '.block-chart .block-chart__circle', name: 'Pie Chart Block' }, { selector: '.block-chart', name: 'Bar or Line Chart Block' }, { selector: '.block-divider--numbered', name: 'Numbered Divider Block' }, { selector: '.block-divider--spacing', name: 'Spacer Block' }, { selector: '.block-divider', name: 'Divider Block' }, { selector: '.block-statement--a', name: 'Statement A Block' }, { selector: '.block-statement--b', name: 'Statement B Block' }, { selector: '.block-statement--c', name: 'Statement C Block' }, { selector: '.block-statement--d', name: 'Statement D Block' }, { selector: '.block-text--twocol', name: 'Columns Block' }, { selector: '.block-text--heading-custom-width:has(h2)', name: 'Heading Block' }, { selector: '.block-text--heading-custom-width:has(h3)', name: 'Subheading Block' }, { selector: '.block-text--onecol-custom-width:has(h2)', name: 'Paragraph with Heading Block' }, { selector: '.block-text--onecol-custom-width:has(h3)', name: 'Paragraph with Subheading Block' }, { selector: '.block-text--onecol-custom-width', name: 'Paragraph Block' }, { selector: '.blocks-button', name: 'Button Block' }, { selector: '.continue-btn', name: 'Continue Button Block' }, { selector: '[data-continue-sr]', name: 'Completed Continue Block' }, { selector: '.block-image', name: 'Image Block' }, { selector: '.block-gallery', name: 'Gallery Block' }, { selector: '.block-quote', name: 'Quote Block' }, { selector: '.block-list', name: 'List Block' }, { selector: '.block-knowledge', name: 'Knowledge Check Block' },
];

function getBlockTypeName(element) {
    for (const mapping of blockTypeMappings) { if (element.querySelector(mapping.selector)) { return mapping.name; } }
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
let ttsInitialized = false;
let ttsActive = false;
let firemods_highlighterRunTimeout = null; 

function loadConfettiScript() {
    if (confettiScriptLoaded) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js';
        script.onload = () => { confettiScriptLoaded = true; resolve(); };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function fireConfetti() {
    if (!confettiScriptLoaded) return;
    const { particleCount, spread, startVelocity, colours, origin, zIndex } = modsConfig.confettiSettings;
    let originPoint = { y: 0.7, x: (origin === 'left' ? 0 : origin === 'right' ? 1 : 0.5) };
    const confettiExecutor = typeof tsParticles !== 'undefined' ? confetti : window.confetti;
    if (confettiExecutor) {
        confettiExecutor({ particleCount, spread, startVelocity, colors: colours, origin: originPoint, zIndex: zIndex });
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
    const replacementText = savedData ? escapeHtml(decodeURIComponent(atob(savedData))) : modsConfig.summaryShortcode_DefaultText;
    const targetSpans = document.querySelectorAll(`.summary-shortcode-text[data-shortcode-id="${reflectionId}"]`);
    targetSpans.forEach(span => { span.innerHTML = replacementText.replace(/\n/g, '<br>'); });
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
                const replacementText = savedData ? escapeHtml(decodeURIComponent(atob(savedData))) : modsConfig.summaryShortcode_DefaultText;
                return `<span class="summary-shortcode-text" data-shortcode-id="${shortcodeId}">${replacementText.replace(/\n/g, '<br>')}</span>`;
            });
        }
    });
}

function initializeParallax() {
    if (!modsConfig.moderniseTextOnImage || !modsConfig.textOnImage_StaggeredParallax) return;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const parallaxElements = document.querySelectorAll('.block-image--overlay .block-image__paragraph');
    const pageWrap = document.getElementById('page-wrap');
    if (parallaxElements.length === 0 || !pageWrap || isMobile) {
        if(isMobile) parallaxElements.forEach(el => { el.style.transform = 'none'; });
        return;
    }
    if (!window.parallaxInitializedElements) window.parallaxInitializedElements = new WeakMap();
    parallaxElements.forEach((el, index) => {
        if (window.parallaxInitializedElements.has(el)) return;
        const initialOffset = 220 * index;
        el.dataset.initialOffset = initialOffset;
        el.style.transform = `translateY(${initialOffset}px)`;
        window.parallaxInitializedElements.set(el, true);
    });
    if (parallaxInitialized) return;
    function onScroll() {
        latestKnownScrollY = pageWrap.scrollTop;
        if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }
    function update() {
        document.querySelectorAll('.block-image--overlay .block-image__paragraph').forEach(el => {
            const initialOffset = parseFloat(el.dataset.initialOffset) || 0;
            el.style.transform = `translateY(${initialOffset - (latestKnownScrollY * 0.2)}px)`;
        });
        ticking = false;
    }
    pageWrap.addEventListener('scroll', onScroll, { passive: true });
    parallaxInitialized = true;
}

function initializeTextReader() {
    if (!modsConfig.enableTextReader || ttsInitialized) return;
    const synth = window.speechSynthesis;
    if (!synth) { console.warn("Fire Mods: Text-to-Speech not supported by this browser."); return; }
    const ttsButton = document.createElement('button');
    ttsButton.className = 'tts-toggle-button';
    ttsButton.setAttribute('aria-label', 'Activate text reader');
    ttsButton.setAttribute('title', 'Activate text reader');
    ttsButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="${modsConfig.textReader_ButtonColourInactive}"><path d="M115.008,486.216v-103.76H0V25.784h512v356.672H242.752L115.008,486.216z M32,350.456h115.008V419l84.352-68.544H480V57.784H32V350.456z"/></svg>`;
    document.body.appendChild(ttsButton);
    const toggleTTS = () => {
        ttsActive = !ttsActive;
        document.body.classList.toggle('tts-active-mode', ttsActive);
        ttsButton.classList.toggle('active', ttsActive);
        const svgPath = ttsButton.querySelector('svg path');
        if (svgPath) svgPath.setAttribute('fill', ttsActive ? modsConfig.textReader_ButtonColour : modsConfig.textReader_ButtonColourInactive);
        if (!ttsActive && synth.speaking) synth.cancel();
    };
    ttsButton.addEventListener('click', toggleTTS);
    document.addEventListener('click', (event) => {
        if (!ttsActive) return;
        const targetBlock = event.target.closest('.block-wrapper');
        if (targetBlock) {
            event.stopPropagation(); event.preventDefault(); synth.cancel();
            const textSelector = '.fr-view p, .fr-view li, .fr-view h1, .fr-view h2, .fr-view h3, .fr-view h4, .fr-view h5, .fr-view h6, .block-quote__text, .timeline-card__title, .timeline-card__date, .continue-btn';
            const textElements = targetBlock.querySelectorAll(textSelector);
            if (textElements.length > 0) {
                const textToSpeak = Array.from(textElements).map(el => el.textContent.trim()).filter(Boolean).join('. ');
                if (textToSpeak) synth.speak(new SpeechSynthesisUtterance(textToSpeak));
            }
        }
    }, true);
    ttsInitialized = true;
}

function runAllMods() {
    if (modsConfig.enableNoteTakerAndHighlighter) {
        if (firemods_highlighterRunTimeout) clearTimeout(firemods_highlighterRunTimeout);
        firemods_highlighterRunTimeout = setTimeout(() => {
            if (!firemods_noteTakerInitialized) {
                firemods_initializeNoteTakerAndHighlighter(); 
            } else {
                if (!firemods_highlightsLoadedForCurrentPage && !firemods_loadInProgress) {
                    firemods_loadAndApplyPersistedHighlights();
                } else if (firemods_highlightsLoadedForCurrentPage && !firemods_loadInProgress) {
                    firemods_scanAndApplyNoteIndicators();
                } else if (!firemods_loadInProgress) { 
                    firemods_scanAndApplyNoteIndicators();
                }
            }
            firemods_highlighterRunTimeout = null;
        }, 100); 
    }

    if (modsConfig.enableCustomBackground) {
        document.querySelectorAll('.block-wrapper:not([data-modded="true"])').forEach(block => {
            block.style.backgroundColor = 'transparent'; block.style.boxShadow = 'none';
            block.style.setProperty('--color-background', 'transparent'); block.dataset.modded = 'true';
        });
    }
    if (modsConfig.startWithMenuHidden && !menuToggleButtonClicked) {
        const menuButton = document.querySelector('.nav-control__menu .nav-control__button');
        if (menuButton && menuButton.getAttribute('aria-expanded') === 'true') { menuButton.click(); menuToggleButtonClicked = true; }
    }
    if (modsConfig.customButtons && modsConfig.customButtons.length > 0) {
        if (modsConfig.customButtons.some(b => b.confetti)) loadConfettiScript();
        modsConfig.customButtons.forEach(buttonConfig => {
            document.querySelectorAll(`a.blocks-button__button[href*="${buttonConfig.id}"]:not([data-button-modded="true"])`).forEach(button => {
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
                const idMatch = blockText.match(/ID="([^"]+)"/); if (!idMatch) return;
                const reflectionId = idMatch[1]; const storageKey = `reflection-${reflectionId}`;
                const title = (blockText.match(/TITLE="([^"]+)"/) || [])[1] || 'Reflection';
                const instruction = (blockText.match(/INSTRUCTION="([^"]+)"/) || [])[1] || 'Enter your thoughts below:';
                const alignmentClass = modsConfig.reflectionBlock_CentreAlign ? 'reflection-block--centred' : '';
                const reflectionHTML = `<div class="reflection-block ${alignmentClass}"><h3>${title}</h3><p>${instruction}</p><textarea class="reflection-textarea" placeholder="Type your response here..."></textarea><button class="reflection-save-btn">${modsConfig.reflectionBlock_ButtonText}</button><div class="reflection-saved-feedback">Answer Saved!</div></div>`;
                const container = noteBlock.querySelector('.block-statement__container');
                if (container) {
                    container.innerHTML = reflectionHTML;
                    const textarea = container.querySelector('.reflection-textarea');
                    const saveButton = container.querySelector('.reflection-save-btn');
                    const feedback = container.querySelector('.reflection-saved-feedback');
                    const savedAnswer = localStorage.getItem(storageKey);
                    if (savedAnswer) {
                        try {
                            textarea.value = decodeURIComponent(atob(savedAnswer));
                        } catch (e) {
                            console.error("Fire Mods (Reflection): Could not decode saved answer.", e);
                            textarea.value = "Error: Could not load saved answer.";
                        }
                    }
                    saveButton.addEventListener('click', () => {
                        try {
                            localStorage.setItem(storageKey, btoa(encodeURIComponent(textarea.value)));
                            feedback.classList.add('visible'); 
                            updateShortcodeDisplay(reflectionId);
                            setTimeout(() => feedback.classList.remove('visible'), 2000);
                        } catch (e) {
                            console.error("Fire Mods (Reflection): Could not save answer due to encoding error.", e);
                            alert("Error: Could not save your answer. Please ensure your text does not contain unsupported characters and try again.");
                        }
                    });
                }
            }
        });
    }
    if (modsConfig.replaceContinueWithLine) {
        document.querySelectorAll('[data-continue-sr]').forEach(indicator => {
            const continueBlock = indicator.closest('.noOutline[data-block-id]');
            if (!continueBlock || continueBlock.classList.contains('continue-divider-mod') || continueBlock.querySelector('.continue-btn')) return;
            continueBlock.classList.add('continue-divider-mod');
            const wrapper = continueBlock.querySelector('.block-wrapper');
            if (wrapper) wrapper.style.display = 'none';
        });
    }
    if ((modsConfig.developerMode_LogBlockIds || (modsConfig.scrollTriggers && modsConfig.scrollTriggers.length > 0)) && scrollTriggerObserver) {
        document.querySelectorAll('.blocks-lesson > .noOutline[data-block-id]:not([data-dev-observed="true"])').forEach(block => {
            if (modsConfig.developerMode_LogBlockIds) blockIdLogState.set(block, false);
            if (modsConfig.scrollTriggers.length > 0) scrollTriggerVisibilityState.set(block, false);
            scrollTriggerObserver.observe(block); block.dataset.devObserved = 'true';
        });
    }
    if (modsConfig.moderniseTextOnImage && modsConfig.textOnImage_AlternateFloat) {
        document.querySelectorAll('.block-image--overlay').forEach((block, index) => {
            if (block.hasAttribute('data-float-modded')) return;
            if ((index + 1) % 2 === 0) {
                const textColumn = block.querySelector('.block-image__col');
                if (textColumn) textColumn.style.float = "right";
            }
            block.dataset.floatModded = 'true';
        });
    }
    initializeParallax(); initializeTextReader(); runShortcodeReplacement();
}

// --- Main Execution Block (CSS Injection & Observer Setup) ---
if (modsConfig.developerMode_LogBlockIds || (modsConfig.scrollTriggers && modsConfig.scrollTriggers.length > 0)) {
    scrollTriggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const blockId = entry.target.dataset.blockId;
            if (modsConfig.developerMode_LogBlockIds) {
                const isDevLogVisible = blockIdLogState.get(entry.target);
                if (entry.isIntersecting && !isDevLogVisible) {
                    console.log(`%cFire Mods (Dev Mode):%c ${getBlockTypeName(entry.target)} scrolled INTO view with ID: %c${blockId}`, "color: #ff9800; font-weight: bold;", "color: inherit;", "color: #03a9f4; font-weight: bold;");
                    blockIdLogState.set(entry.target, true);
                } else if (!entry.isIntersecting && isDevLogVisible) {
                    blockIdLogState.set(entry.target, false);
                }
            }
            if (modsConfig.scrollTriggers.length > 0) {
                const trigger = modsConfig.scrollTriggers.find(t => t.id === blockId);
                const isTriggerVisible = scrollTriggerVisibilityState.get(entry.target);
                if (trigger && entry.isIntersecting && !isTriggerVisible) {
                    if (modsConfig.developerMode_LogBlockIds) console.log(`%cFire Mods:%c Firing scroll trigger for block ID: %c${blockId}`, "color: #4CAF50; font-weight: bold;", "color: inherit;", "color: #03a9f4; font-weight: bold;");
                    try { new Function(trigger.script)(); } catch (e) { console.error(`Error in scroll trigger for ${blockId}:`, e); }
                    scrollTriggerVisibilityState.set(entry.target, true);
                    if (trigger.fireOnce) observer.unobserve(entry.target);
                } else if (trigger && !entry.isIntersecting && isTriggerVisible && !trigger.fireOnce) {
                    scrollTriggerVisibilityState.set(entry.target, false);
                }
            }
        });
    }, { root: null, threshold: 0.1 });
}

let finalCustomCSS = '';
if (modsConfig.enableCustomBackground) {
    let bgLayers = [], bgSizes = [], bgPositions = [], bgRepeats = [];
    if (modsConfig.enableCustomBackgroundImage && modsConfig.backgroundImageUrl) {
        bgLayers.push(`url('${modsConfig.backgroundImageUrl}')`);
        bgSizes.push('cover'); bgPositions.push('center center'); bgRepeats.push('no-repeat');
        const overlayOpacity = 1 - modsConfig.backgroundImageOpacity; const color = modsConfig.backgroundColour; let r=0,g=0,b=0;
        if (color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) { let hex = color.substring(1).split(''); if (hex.length === 3) hex = [hex[0],hex[0],hex[1],hex[1],hex[2],hex[2]]; hex = '0x'+hex.join(''); r=(hex>>16)&255; g=(hex>>8)&255; b=hex&255; }
        bgLayers.push(`linear-gradient(rgba(${r},${g},${b},${overlayOpacity}), rgba(${r},${g},${b},${overlayOpacity}))`);
        bgSizes.push('auto'); bgPositions.push('center center'); bgRepeats.push('no-repeat');
    }
    if (modsConfig.showGridLines) {
        bgLayers.push(`linear-gradient(${modsConfig.gridLineColour} 1px, transparent 1px)`); bgSizes.push(`${modsConfig.gridSize}px ${modsConfig.gridSize}px`); bgPositions.push('top left'); bgRepeats.push('repeat');
        bgLayers.push(`linear-gradient(90deg, ${modsConfig.gridLineColour} 1px, transparent 1px)`); bgSizes.push(`${modsConfig.gridSize}px ${modsConfig.gridSize}px`); bgPositions.push('top left'); bgRepeats.push('repeat');
    }
    bgLayers.reverse(); bgSizes.reverse(); bgPositions.reverse(); bgRepeats.reverse();
    let pageWrapCSS = `background-color: ${modsConfig.backgroundColour}; background-attachment: fixed;`;
    if (bgLayers.length > 0) pageWrapCSS += `background-image: ${bgLayers.join(', ')}; background-size: ${bgSizes.join(', ')}; background-position: ${bgPositions.join(', ')}; background-repeat: ${bgRepeats.join(', ')};`;
    finalCustomCSS += `#page-wrap { ${pageWrapCSS} } .page__wrapper--white, .page__header, .blocks-lesson, .lesson-nav--full { background: transparent !important; }`;
}
if (modsConfig.centreAlignButtons) finalCustomCSS += `.blocks-button__description { display: none !important; } .blocks-button__container { max-width: none !important; justify-content: center !important; } .blocks-button__button { flex: 0 1 auto !important; max-width: 30rem !important; min-width: 15rem !important; height: ${modsConfig.centredButtonHeight} !important; line-height: ${modsConfig.centredButtonHeight} !important; }`;
if (modsConfig.moderniseMenuButton) finalCustomCSS += `.nav-control__button { background: rgba(255, 255, 255, ${modsConfig.modernMenuButton_Opacity}) !important; backdrop-filter: blur(${modsConfig.modernMenuButton_Blur}) !important; -webkit-backdrop-filter: blur(${modsConfig.modernMenuButton_Blur}) !important; box-shadow: ${modsConfig.modernMenuButton_Shadow} !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; border-radius: 8px !important; transition: transform 0.2s ease-in-out !important; } .nav-control__button:hover { transform: scale(${modsConfig.modernMenuButton_HoverScale}) !important; } .nav-control__button svg { will-change: transform; transform: translateZ(0); }`;
if (modsConfig.roundContinueButtons) finalCustomCSS += `.continue-btn { border-radius: ${modsConfig.continueButton_BorderRadius} !important; }`;
if (modsConfig.replaceContinueWithLine) finalCustomCSS += `.continue-divider-mod { padding: 0 !important; height: 0px !important; margin: 3rem auto !important; border-top: 1px solid ${modsConfig.continueLineColour} !important; width: ${modsConfig.continueLineWidth} !important; }`;
if (modsConfig.enableReflectionBlocks) finalCustomCSS += `.reflection-block { display: flex; flex-direction: column; width: 100%; gap: 1rem; } .reflection-block--centred { align-items: center; } .reflection-block--centred h3, .reflection-block--centred p { text-align: center; } .reflection-block--centred .reflection-textarea { text-align: center; } .reflection-block h3 { font-size: 2.2rem; font-weight: bold; margin: 0; } .reflection-block p { font-size: 1.6rem; margin: 0; } .reflection-textarea { width: 100%; min-height: 120px; padding: 1rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1.6rem; transition: border-color 0.2s; } .reflection-textarea:focus { border-color: var(--color-theme, #00aff0); outline: none; } .reflection-save-btn { padding: 1rem 2rem; border: none; border-radius: ${modsConfig.reflectionBlock_ButtonRadius}; background-color: var(--color-theme, #00aff0); color: var(--color-theme-contrast, #fff); font-size: 1.6rem; font-weight: bold; cursor: pointer; transition: opacity 0.2s; } .reflection-save-btn:hover { opacity: 0.8; } .reflection-saved-feedback { margin-top: 1rem; color: var(--color-theme, #00aff0); font-weight: bold; opacity: 0; transition: opacity 0.3s; } .reflection-saved-feedback.visible { opacity: 1; }`;
if (modsConfig.enableSummaryShortcodes) finalCustomCSS += `.summary-shortcode-text { font-style: italic; background-color: #f0f0f0; padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid #e0e0e0; white-space: pre-wrap; }`;
if (modsConfig.moderniseTextOnImage) { let glassEffectCSS = modsConfig.textOnImage_GlassEffect ? `background: ${modsConfig.textOnImage_GlassBackground} !important; backdrop-filter: blur(${modsConfig.textOnImage_GlassBlur}) !important; -webkit-backdrop-filter: blur(${modsConfig.textOnImage_GlassBlur}) !important; border: 1px solid rgba(255, 255, 255, 0.18);` : ''; let dropShadowCSS = modsConfig.textOnImage_DropShadow ? `box-shadow: ${modsConfig.textOnImage_Shadow} !important;` : ''; finalCustomCSS += `.block-image--overlay .block-image__paragraph { ${glassEffectCSS} ${dropShadowCSS} padding: ${modsConfig.textOnImage_Padding} !important; border-radius: 8px; } @media(min-width: 48em) { .block-image--overlay .block-image__col { width: ${modsConfig.textOnImage_TextBlockWidth} !important; } } .block-image--overlay .block-image__paragraph:before { display: none !important; }`; if (modsConfig.textOnImage_CustomHeadlineFont) finalCustomCSS += `.block-image__paragraph.brand--linkColor p:first-of-type { font-family: ${modsConfig.textOnImage_HeadlineFontFamily} !important; }`;}
if (modsConfig.overrideCoverPagePadding) finalCustomCSS += `@media(min-width: 62em) { .organic .cover--layout-split-left .cover__header-content, .organic .cover--layout-split-left-image .cover__header-content { padding-block: ${modsConfig.coverPagePadding} !important; } }`;
if (modsConfig.enableTextReader) finalCustomCSS += `.tts-toggle-button { position: fixed; bottom: 1.2rem; right: 2.6rem; width: ${modsConfig.textReader_ButtonSize}; height: ${modsConfig.textReader_ButtonSize}; background-color: #fff; border: 2px solid ${modsConfig.textReader_ButtonColourInactive}; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; transition: border-color 0.3s ease, border-width 0.3s ease; } .tts-toggle-button.active { border-color: ${modsConfig.textReader_ButtonColour}; border-width: 4px; } .tts-toggle-button svg { width: 60%; height: 60%; transition: fill 0.3s ease; } body.tts-active-mode .block-wrapper { cursor: pointer; transition: outline 0.2s ease-out; } body.tts-active-mode .block-wrapper:hover { outline: 2px solid ${modsConfig.textReader_ButtonColour}; outline-offset: 4px; }`;
if (modsConfig.enableNoteTakerAndHighlighter) finalCustomCSS += `
    .firemods-highlight { padding: 0.1em 0; margin: 0; border-radius: 3px; } .firemods-note-anchor { display: inline; padding: 0; margin: 0; } .firemods-note-indicator { display: inline-block; vertical-align: super; font-size: 0.7em; margin-left: 2px; cursor: pointer; user-select: none; } .firemods-note-indicator svg { display: inline-block; vertical-align: middle; } .firemods-highlighter-context-menu { position: absolute; z-index: 10001; background-color: #fff; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); padding: 5px; display: flex; gap: 5px; } .firemods-highlighter-context-menu button { width: 28px; height: 28px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; background-color: #f0f0f0; } .firemods-highlighter-context-menu button:hover { border-color: #bbb; opacity: 0.8; } .firemods-highlighter-context-menu button svg { width: 18px; height: 18px; } .firemods-note-modal { position: absolute; z-index: 10002; width: 300px; background-color: #fff; border: 1px solid #ccc; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.25); display: flex; flex-direction: column; } .firemods-note-modal-header { padding: 10px 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; } .firemods-note-modal-header h3 { margin: 0; font-size: 1.2em; } .firemods-note-modal-close { background: none; border: none; font-size: 1.5em; cursor: pointer; padding: 0 5px; line-height: 1; } .firemods-note-modal-content { padding: 15px; } .firemods-note-modal-content textarea { width: 100%; min-height: 100px; border: 1px solid #ddd; border-radius: 4px; padding: 8px; font-size: 1em; resize: vertical; box-sizing: border-box; } .firemods-note-modal-footer { padding: 10px 15px; border-top: 1px solid #eee; text-align: right; } .firemods-note-modal-save { padding: 8px 15px; background-color: var(--color-theme, #0070a3); color: #fff; border: none; border-radius: 4px; cursor: pointer; } .firemods-note-modal-save:hover { opacity: 0.9; }
    /* [NEW] Styles for mobile modal positioning and overlay */
    .firemods-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10001; }
    .firemods-note-modal--mobile-centered { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 90vw; max-height: 80vh; width: 400px; }
    .firemods-note-modal--mobile-centered .firemods-note-modal-content { overflow-y: auto; }
`;

if (finalCustomCSS) {
    let styleElement = document.getElementById('firemods-custom-styles');
    if (!styleElement) { styleElement = document.createElement("style"); styleElement.id = 'firemods-custom-styles'; styleElement.type = "text/css"; document.head.appendChild(styleElement); }
    styleElement.innerText = finalCustomCSS;
}
const targetNodeForObserver = document.getElementById('app'); 
const observerConfig = { childList: true, subtree: true };
const mainObserver = new MutationObserver(runAllMods); 
if (targetNodeForObserver) mainObserver.observe(targetNodeForObserver, observerConfig);
else console.warn('Fire Mods: Target node #app for MutationObserver not found.');
window.addEventListener('load', runAllMods);
window.addEventListener('beforeunload', () => {}); // Can be used for cleanup
window.addEventListener('popstate', () => {
    if (modsConfig.enableNoteTakerAndHighlighter) {
        firemods_highlightsLoadedForCurrentPage = false;
        firemods_loadInProgress = false;
    }
    runAllMods(); 
});
console.log('Fire Mods v0.5 by Discover eLearning: Script loaded and now observing for all content changes...');