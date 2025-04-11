import { RecipeExcerpt } from "./RecipeExcerpt.js";
import { StringService } from "../services/StringService.js";

export class Recipe extends RecipeExcerpt {
    category;
    area;
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
        this.area = rawRecipeData.strArea;
        this.instructions = rawRecipeData.strInstructions;
        this.video = rawRecipeData.strYoutube;
        this.ingredients = this.mergeApiIngredientsAndMeasures(rawRecipeData);
    }
    mergeApiIngredientsAndMeasures(rawData) {
        let ingredients = [];
        for (const key in rawData) {
            if (Object.prototype.hasOwnProperty.call(rawData, key)) {
                if (key.includes("strIngredient") && rawData[key].length > 0) {
                    const ingredient = rawData[key];
                    const ingredientNumber = key.split("strIngredient")[1];
                    const measure = rawData[`strMeasure${ingredientNumber}`]
                    ingredients.push({ name: ingredient, measure: measure })
                }
            }
        }
        ingredients.sort((a, b) => a.name.localeCompare(b.name))
        return ingredients;
    }
    createComponent() {
        this.domElement = document.createElement("article");
        this.domElement.className = "detailed-recipe"

        const recipeHeader = document.createElement("header");
        const metaData = document.createElement("div");
        metaData.className = "meta";
        const categorySpan = document.createElement("span");
        categorySpan.innerText = this.category;
        const areaSpan = document.createElement("span");
        areaSpan.innerText = this.area;
        metaData.append(categorySpan, areaSpan);
        const thumbnailWrapper = document.createElement("div");
        thumbnailWrapper.className = "image-wrapper";
        const thumbnail = document.createElement("img");
        thumbnail.setAttribute("alt", "illustration recette");
        thumbnail.setAttribute("src", this.thumbnail);
        thumbnailWrapper.appendChild(thumbnail);
        const title = document.createElement("h2");
        title.className = "recipe-title";
        title.innerText = this.name;
        recipeHeader.append(metaData, thumbnailWrapper, title)

        const ingredientWrapper = document.createElement("section");
        ingredientWrapper.className = "ingredients";
        const ingredientTitle = document.createElement("h3");
        ingredientTitle.innerText = "Ingrédients :";
        const ingredientList = document.createElement("ul");
        const ingredientNodes = this.ingredients.map((ingredient) => {
            const ingredientItem = document.createElement("li");
            const ingredientName = document.createElement("span");
            ingredientName.innerText = ingredient.name;
            const ingredientMeasure = document.createElement("span");
            ingredientMeasure.innerText = ingredient.measure;
            ingredientItem.append(ingredientMeasure, ingredientName);
            return ingredientItem;
        })
        ingredientList.append(...ingredientNodes);
        ingredientWrapper.append(ingredientTitle, ingredientList);

        const instructionWrapper = document.createElement("section");
        instructionWrapper.className = "instructions";
        const instructionTitle = document.createElement("h3");
        instructionTitle.innerText = "Instructions :";
        const instructions = document.createElement("div");
        instructions.className = "recipe-instructions";
        instructions.innerHTML = StringService.formatLineBreaksfromApiString(this.instructions);
        instructionWrapper.append(instructionTitle, instructions);

        this.domElement.append(recipeHeader, ingredientWrapper, instructionWrapper);
        return this.domElement;
    }
}