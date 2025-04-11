import { CategoryService } from "./services/CategoryService.js";
import { RecipeExcerpt } from "./classes/RecipeExcerpt.js";
import { ModalService } from "./services/ModalService.js";
import { RecipeService } from "./services/RecipeService.js";

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

const initialize = () => {
    document.body.appendChild(ModalService.createModalStructure())
    ModalService.initialize();
    CategoryService.initialize(async (recipeExcerpts) => {
        const instancedRecipeExcerpts = recipeExcerpts.map((it) => {
            return new RecipeExcerpt(it, async (recipeId) => {
                const recipeDetails = await RecipeService.fetchRecipeDetails(recipeId)
                console.log("found recipe", recipeDetails)
                // create recipe element
                const testDiv = document.createElement("div")
                testDiv.innerText = recipeDetails.strInstructions
                ModalService.appendContent(testDiv)
                ModalService.show()
            })
        });
        recipeList.fillAndDisplay(instancedRecipeExcerpts);
    });
}

initialize();
