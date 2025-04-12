import { CategoryService } from "./services/CategoryService.js";
import { RecipeExcerpt } from "./classes/RecipeExcerpt.js";
import { ModalService } from "./services/ModalService.js";
import { RecipeService } from "./services/RecipeService.js";
import { Recipe } from "./classes/Recipe.js";
import { AreaService } from "./services/AreaService.js";
import { SearchService } from "./services/SearchService.js";
import { IngredientService } from "./services/IngredientService.js";

const recipeList = {
    domElement: document.getElementById("recipe-list"),
    recipeExcerpts: [],
    setRecipeExcerpts(recipeExcerpts) {
        this.recipeExcerpts = recipeExcerpts;
    },
    clearList() {
        this.domElement.innerHTML = "";
    },
    createMessage(message, className = null) {
        const messageElement = document.createElement("p");
        if (className) {
            messageElement.className = className;
        }
        messageElement.innerText = message;
        return messageElement;
    },
    renderErrorMessage(message) {
        this.clearList();
        this.domElement.appendChild(this.createMessage(message, "error"))
    },
    renderList() {
        this.recipeExcerpts.forEach((recipe) => {
            this.domElement.appendChild(recipe.createComponent());
        })
    },
    fillAndDisplay(recipeExcerpts) {
        if (!recipeExcerpts || recipeExcerpts.length === 0) {
            this.renderErrorMessage(`Aucun résultat trouvé pour cette recherche`)
            return;
        }
        this.setRecipeExcerpts(recipeExcerpts);
        this.clearList();
        this.renderList();
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


/*
    TO DO :

        fonts

        design

        responsive


 */