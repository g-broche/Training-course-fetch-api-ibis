/**
 * Class with properties and methods related to recipe excerpts used in listings
 */
export class RecipeExcerpt {
    domElement;
    id;
    name;
    thumbnail;
    callBackOnAction;
    /**
     * instanciate a new RecipeExcerpt directly from the data provided by the API response
     * @param {*} rawRecipeData 
     */
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
    /**
     * creates a dom element containing the data of the recipe
     * @returns an article dom element with the recipe excerpt
     */
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