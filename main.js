import { CategoryService } from "./services/CategoryService.js";
import { RecipeExcerpt } from "./classes/RecipeExcerpt.js";
import { ModalService } from "./services/ModalService.js";

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
        console.log(recipeExcerpts)
        this.setRecipeExcerpts(recipeExcerpts);
        this.clearList();
        this.render();
    }
}

const initialize = () => {
    document.body.appendChild(ModalService.createModalStructure())
    ModalService.initialize();
    CategoryService.initialize(async (recipeExcerpts) => {
        const instancedRecipeExcerpts = recipeExcerpts.map((it) => new RecipeExcerpt(it));
        recipeList.fillAndDisplay(instancedRecipeExcerpts);
    });
}

initialize();
