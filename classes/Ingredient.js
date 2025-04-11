export class Ingredient {
    id;
    name;
    description;
    thumbnail;
    domElement = null;
    constructor({ id, name, description, thumbnail }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
    }
    createComponent() {
        this.domElement = document.createElement("div");
        this.domElement.className = "ingredient-details";
        const ingredientTitle = document.createElement("h4");
        ingredientTitle.innerText = this.name;
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "image-wrapper";
        const image = document.createElement("img");
        console.log(this.thumbnail)
        image.setAttribute("src", this.thumbnail);
        image.setAttribute("alt", `image ${this.name}`);
        imageWrapper.appendChild(image);
        const description = document.createElement("p");
        description.innerText = this.description;
        this.domElement.append(imageWrapper, ingredientTitle, description);
        return this.domElement;
    }
}