import { CategoryService } from "./services/CategoryService.js";
import { RecipeExcerpt } from "./classes/RecipeExcerpt.js";
import { ModalService } from "./services/ModalService.js";
import { RecipeService } from "./services/RecipeService.js";
import { Recipe } from "./classes/Recipe.js";
import { AreaService } from "./services/AreaService.js";
import { SearchService } from "./services/SearchService.js";

const recipeList = {
    domElement: document.getElementById("recipe-list"),
    recipeExcerpts: [],
    setRecipeExcerpts(recipeExcerpts) {
        this.recipeExcerpts = recipeExcerpts;
    },
    clearList() {
        this.domElement.innerHTML = "";
    },
    render() {
        this.recipeExcerpts.forEach((recipe) => {
            this.domElement.appendChild(recipe.createComponent());
        })
    },
    fillAndDisplay(recipeExcerpts) {
        this.setRecipeExcerpts(recipeExcerpts);
        this.clearList();
        this.render();
    }
}

const displayListFromResults = async (recipeExcerpts) => {
    const instancedRecipeExcerpts = recipeExcerpts.map((it) => {
        return new RecipeExcerpt(it, async (recipeId) => {
            const recipeDetails = await RecipeService.fetchRecipeDetails(recipeId)
            const recipe = new Recipe(recipeDetails)
            ModalService.appendContent(recipe.createComponent())
            ModalService.show()
        })
    });
    recipeList.fillAndDisplay(instancedRecipeExcerpts);
}


const initialize = () => {
    document.body.append(...ModalService.createModalStructure());
    ModalService.initialize();
    CategoryService.initialize((recipeExcerpts) => {
        AreaService.resetInputToDefaultValue()
        SearchService.resetInputToDefaultValue()
        displayListFromResults(recipeExcerpts)
    });
    AreaService.initialize((recipeExcerpts) => {
        CategoryService.resetInputToDefaultValue()
        SearchService.resetInputToDefaultValue()
        displayListFromResults(recipeExcerpts)
    });
    SearchService.initialize((recipeExcerpts) => {
        AreaService.resetInputToDefaultValue()
        CategoryService.resetInputToDefaultValue()
        displayListFromResults(recipeExcerpts)
    });
}

initialize();
