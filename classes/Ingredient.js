/**
 * Class containing the properties relative to an ingredient
 */
export class Ingredient {
    id;
    name;
    description;
    thumbnail;
    domElement = null;
    /**
     * instanciate a new ingredient
     * @param {*} param0 for the thumbnail url use the formatting "https://www.themealdb.com/images/ingredients/name-of-ingredient-small.png"
     */
    constructor({ id, name, description, thumbnail }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
    }
    /**
     * creates a dom element with data pertaining to this ingredient
     * @returns a div dom element containing all the nodes to display
     */
    createComponent() {
        this.domElement = document.createElement("div");
        this.domElement.className = "ingredient-details";
        const ingredientTitle = document.createElement("h4");
        ingredientTitle.innerText = this.name;
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "image-wrapper";
        const image = document.createElement("img");
        image.setAttribute("src", this.thumbnail);
        image.setAttribute("alt", `image pour ${this.name} non fournie`);
        imageWrapper.appendChild(image);
        const description = document.createElement("p");
        description.innerText = this.description;
        this.domElement.append(imageWrapper, ingredientTitle, description);
        return this.domElement;
    }
}