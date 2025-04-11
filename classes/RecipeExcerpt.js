export class RecipeExcerpt {
    domElement;
    id;
    name;
    thumbnail;
    callBackOnAction;
    constructor({ strMeal, strMealThumb, idMeal }, actionOnClick) {
        this.id = idMeal;
        this.name = strMeal;
        this.thumbnail = strMealThumb;
        this.callBackOnAction = actionOnClick
    }
    getDomElement() {
        return this.domElement;
    }
    getId() {
        return this.id;
    }
    createComponent() {
        this.domElement = document.createElement("article");
        const thumbnailWrapper = document.createElement("div");
        thumbnailWrapper.className = "image-wrapper";
        const thumbnail = document.createElement("img");
        thumbnail.setAttribute("alt", "illustration recette");
        thumbnail.setAttribute("src", this.thumbnail);
        thumbnailWrapper.appendChild(thumbnail);
        const title = document.createElement("h3");
        title.className = "clamp";
        title.innerText = this.name;
        this.domElement.append(thumbnailWrapper, title);
        this.domElement.addEventListener("click", () => {
            this.callBackOnAction(this.id);
        })
        return this.domElement;
    }
}