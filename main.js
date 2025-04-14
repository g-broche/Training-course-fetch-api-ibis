import { CategoryService } from "./services/CategoryService.js";
import { RecipeExcerpt } from "./classes/RecipeExcerpt.js";
import { ModalService } from "./services/ModalService.js";
import { RecipeService } from "./services/RecipeService.js";
import { Recipe } from "./classes/Recipe.js";
import { AreaService } from "./services/AreaService.js";
import { SearchService } from "./services/SearchService.js";
import { IngredientService } from "./services/IngredientService.js";

/**
 * Object encompassing the logic for managing the display of the list of recipes 
 */
const recipeList = {
    domMessage: document.getElementById("message-feedback"),
    domElement: document.getElementById("recipe-list"),
    recipeExcerpts: [],
    setRecipeExcerpts(recipeExcerpts) {
        this.recipeExcerpts = recipeExcerpts;
    },
    clearList() {
        this.domMessage.innerHTML = "";
        console.log(this.domMessage.innerText)
        this.domElement.innerHTML = "";
    },
    renderErrorMessage(message) {
        this.domMessage.innerText = message;
    },
    renderList() {
        this.recipeExcerpts.forEach((recipe) => {
            this.domElement.appendChild(recipe.createComponent());
        })
    },
    fillAndDisplay(recipeExcerpts) {
        this.clearList();
        if (!recipeExcerpts || recipeExcerpts.length === 0) {
            this.renderErrorMessage(`Aucun résultat trouvé pour cette recherche`)
            return;
        }
        this.setRecipeExcerpts(recipeExcerpts);
        this.renderList();
    }
}

/**
 * Function that will take in the list of recipe data as provided by the API to then
 * convert them into Recipe instance and add the results into the dom.
 * @param {*} recipeExcerpts 
 */
const displayListFromResults = async (recipeExcerpts) => {
    try {
        const instancedRecipeExcerpts = recipeExcerpts.map((it) => {
            return new RecipeExcerpt(it, async (recipeId) => {
                const recipeDetails = await RecipeService.fetchRecipeDetails(recipeId)
                const recipe = new Recipe(recipeDetails)
                ModalService.appendContent(recipe.createComponent())
                ModalService.show()
            })
        });
        recipeList.fillAndDisplay(instancedRecipeExcerpts);
    } catch (error) {
        recipeList.clearList();
        recipeList.renderErrorMessage("Une erreur a eu lieu durant le traitement de la requête");
        console.log(error);
    }

}

/**
 * Initializes the multiple services used in app and providing them with their callbacks
 * to call when their respective action is triggered
 */
const initialize = () => {
    document.body.append(...ModalService.createModalStructure());
    ModalService.initialize();
    CategoryService.initialize((recipeExcerpts) => {
        AreaService.resetInputToDefaultValue();
        SearchService.resetInputToDefaultValue();
        displayListFromResults(recipeExcerpts);
    });
    AreaService.initialize((recipeExcerpts) => {
        CategoryService.resetInputToDefaultValue();
        SearchService.resetInputToDefaultValue();
        displayListFromResults(recipeExcerpts);
    });
    SearchService.initialize((recipeExcerpts) => {
        AreaService.resetInputToDefaultValue();
        CategoryService.resetInputToDefaultValue();
        displayListFromResults(recipeExcerpts);
    });
    IngredientService.initialize();
}

initialize();