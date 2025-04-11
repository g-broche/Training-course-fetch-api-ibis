import { RecipeExcerpt } from "./RecipeExcerpt";

export class Recipe extends RecipeExcerpt {
    domElement;
    id;
    name;
    thumbnail;
    category;
    country;
    instructions;
    ingredients;
    video;
    constructor(rawRecipeData) {
        super({
            strMeal: rawRecipeData.strMeal,
            strMealThumb: rawRecipeData.strMealThumb,
            idMeal: rawRecipeData.idMeal
        })
        this.category = rawRecipeData.strCategory;
        this.instructions = rawRecipeData.strInstructions;
        this.video = rawRecipeData.strYoutube;
        this.ingredients = this.mergeApiIngredientsAndMeasures(rawRecipeData)
        console.log("instanced recipe", this)
    }
    mergeApiIngredientsAndMeasures(rawData) {
        let ingredients = [];
        for (const key in rawData) {
            if (Object.prototype.hasOwnProperty.call(rawData, key)) {
                if (key.includes("strIngredient") && rawData[key].length > 0) {
                    const ingredient = rawData[key];
                    const ingredientNumber = key.split("strIngredient")[1];
                    const measure = rawData[`strMeasure${ingredientNumber}`]
                    console.log(`found key ${key} got ingredient ${ingredient} with number index ${ingredientNumber} which relates to key strMeasure${ingredientNumber} with a value of ${measure}`)
                    ingredients.push({ name: ingredient, measure: measure })
                }
            }
        }
        ingredients.sort((a, b) => a.name.LocalCompare(b))
        console.log(`result of ingredient parsing`, ingredients)
        return ingredients;
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
        return this.domElement;
    }
}