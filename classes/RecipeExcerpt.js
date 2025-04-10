export class RecipeExcerpt {
    domElement;
    id;
    name;
    thumbnail;
    constructor({ strMeal, strMealThumb, idMeal }) {
        this.id = this.idMeal;
        this.name = strMeal;
        this.strMealThumb = this.thumbnail;
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
        thumbnail.setAttribute("src", this.strMealThumb);
        thumbnailWrapper.appendChild(thumbnail);
        const title = document.createElement("h3");
        this.domElement.append(thumbnailWrapper, title)
    }
}