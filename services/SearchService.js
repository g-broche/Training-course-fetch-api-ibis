const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"
/**
 * Service used to manage interaction between the app and the API for search of recipes by name
 */
export const SearchService = {
    domElement: {
        input: document.getElementById("recipe-search-input"),
        button: document.getElementById("recipe-search-button"),
    },
    endpoints: {
        getRecipesByNameSearch: "search.php?s="
    },
    /**
     * Initialize the service and define what action to trigger when fetching the recipe by its name,
     * it will also manage the disable status of the button based on if the input is empty.
     * @param {*} actionOnSelect callback function to execute after fetching recipes based on name
     */
    async initialize(actionOnSearch) {
        this.resetInputToDefaultValue();
        this.domElement.button.addEventListener("click", async () => {
            if (this.domElement.input.value.trim().length === 0) {
                this.toggleButton(false)
                return
            }
            const searchString = this.domElement.input.value;
            const foundRecipes = await this.getRecipesFromSearch(searchString);
            actionOnSearch(foundRecipes);


        })
        this.domElement.input.addEventListener("keydown", async (e) => {
            if (this.domElement.input.value.trim().length === 0) {
                this.toggleButton(false)
                return
            }
            if (e.key === "Enter" && this.domElement.input.value.trim().length > 0) {
                const searchString = this.domElement.input.value.trim();
                const foundRecipes = await this.getRecipesFromSearch(searchString);
                actionOnSearch(foundRecipes);
            }
        })
        this.domElement.input.addEventListener("input", () => {
            this.toggleButton(this.domElement.input.value.trim().length > 0)
        })
    },
    /**
     * Makes the input value empty
     */
    resetInputToDefaultValue() {
        this.domElement.input.value = "";
        this.toggleButton(false)
    },
    /**
     * Toggle button disabled property based on given boolean
     * @param {*} mustBeEnabled 
     */
    toggleButton(mustBeEnabled) {
        this.domElement.button.disabled = mustBeEnabled ? false : true;
    },
    /**
     * Get list of recipes from the api using a search string
     * @param {*} searchString 
     * @returns list of recipes as provided by the API
     */
    async getRecipesFromSearch(searchString) {
        return fetch(`${API_BASE_URL}${this.endpoints.getRecipesByNameSearch}${searchString}`)
            .then((response) => response.json())
            .then((data) => data.meals || [])
            .catch((error) => {
                console.log(error)
                alert(`une erreur a eu lieu en récupérant les recette pour "${searchString}"`);
                return [];
            })
    }
}