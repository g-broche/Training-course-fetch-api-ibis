const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

export const SearchService = {
    domElement: {
        input: document.getElementById("recipe-search-input"),
        button: document.getElementById("recipe-search-button"),
    },
    endpoints: {
        getRecipesByNameSearch: "search.php?s="
    },
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
    resetInputToDefaultValue() {
        this.domElement.input.value = "";
    },
    toggleButton(mustBeEnabled) {
        this.domElement.button.disabled = mustBeEnabled ? false : true;
    },
    async getRecipesFromSearch(searchString) {
        return fetch(`${API_BASE_URL}${this.endpoints.getRecipesByNameSearch}${searchString}`)
            .then((response) => response.json())
            .then((data) => data.meals || [])
            .catch((error) => { alert(error); return [] })
    }
}