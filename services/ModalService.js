/**
 * Service used to manage the modal window
 */
export const ModalService = {
    domElements: {
        window: null,
        buttonClose: null,
        contentWrapper: null,
        content: null,
        wrapper: null,
    },
    /**
     * adds listeners to close the modal
     */
    initialize() {
        this.domElements.buttonClose.addEventListener("click", () => { this.close() });
        this.domElements.wrapper.addEventListener("click", () => { this.close() });
    },
    /**
     * creates the whole modal structure
     * @returns array with the dom references of the modal background and the modal window
     */
    createModalStructure() {
        this.domElements.wrapper = document.createElement("div");
        this.domElements.wrapper.id = "modal-background";
        this.domElements.wrapper.className = "hidden";
        this.domElements.window = document.createElement("section");
        this.domElements.window.id = "modal-window";
        this.domElements.window.className = "hidden";
        this.domElements.buttonClose = document.createElement("button");
        this.domElements.buttonClose.id = "modal-close";
        this.domElements.buttonClose.innerText = "X";
        this.domElements.contentWrapper = document.createElement("div");
        this.domElements.contentWrapper.id = "modal-content";
        this.domElements.window.append(this.domElements.buttonClose, this.domElements.contentWrapper);
        return [this.domElements.wrapper, this.domElements.window];
    },
    /**
     * displays the modal
     */
    show() {
        this.domElements.window.classList.remove("hidden");
        this.domElements.wrapper.classList.remove("hidden");
        document.body.classList.add("no-scroll");
    },
    /**
     * hides the modal
     */
    hide() {
        this.domElements.window.classList.add("hidden");
        this.domElements.wrapper.classList.add("hidden");
        document.body.classList.remove("no-scroll");
    },
    /**
     * closes and purge the modal of all recipe info
     *  
     */
    close() {
        this.hide();
        if (!this.domElements.content) {
            return;
        }
        this.removeContent();
        this.domElements.content = null;
    },
    /**
     * append a child node to the modal content node
     * @param {*} domContent 
     */
    appendContent(domContent) {
        this.domElements.content = domContent;
        this.domElements.contentWrapper.appendChild(domContent);
    },
    /**
     * removes the appended content of the modal
     */
    removeContent() {
        this.domElements.content.remove();
    }
}