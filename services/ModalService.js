export const ModalService = {
    domElements: {
        window: null,
        buttonClose: null,
        contentWrapper: null,
        content: null,
        wrapper: null,
    },
    initialize() {
        this.domElements.buttonClose.addEventListener("click", () => { this.close() });
        this.domElements.wrapper.addEventListener("click", () => { this.close() });
    },
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
    show() {
        this.domElements.window.classList.remove("hidden");
        this.domElements.wrapper.classList.remove("hidden");
        document.body.classList.add("no-scroll");
    },
    hide() {
        this.domElements.window.classList.add("hidden");
        this.domElements.wrapper.classList.add("hidden");
        document.body.classList.remove("no-scroll");
    },
    close() {
        this.hide();
        if (!this.domElements.content) {
            return;
        }
        this.removeContent();
        this.domElements.content = null;
    },
    appendContent(domContent) {
        this.domElements.content = domContent;
        this.domElements.contentWrapper.appendChild(domContent);
    },
    removeContent() {
        this.domElements.content.remove();
    }
}