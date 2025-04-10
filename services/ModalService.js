export class ModalService {
    domElements = {
        window: document.getElementById("modal-window"),
        buttonClose: document.getElementById("modal-close"),
        contentWrapper: document.getElementById("modal-content"),
        content: null,
        background: document.getElementById("modal-background")
    }
    open() {
        this.domElements.window.classList.remove("hidden-modal")
        this.domElements.background.classList.remove("hidden-modal")
    }
    close() {
        this.domElements.window.classList.add("hidden-modal")
        this.domElements.background.classList.add("hidden-modal")
    }
    appendContent(domContent) {
        this.domElements.content = domContent;
        this.domElements.appendChild(domContent);
    }
    removeContent() {
        this.domElements.content.remove();
    }
}