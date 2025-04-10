import { CategoryService } from "./services/CategoryService.js";
import { RecipeExcerpt } from "./classes/RecipeExcerpt.js";

const recipeList = {
    domElement: document.getElementById("recipe-list"),
    recipes: [],
    setRecipe(recipes) {
        this.recipes = recipes;
    }
}

const initialize = () => {
    CategoryService.initialize();
}

initialize()
