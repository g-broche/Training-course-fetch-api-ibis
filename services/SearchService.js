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
            const searchString = this.domElement.input.value;
            const foundRecipes = await this.getRecipesFromSearch(searchString);
            actionOnSearch(foundRecipes);
        })
    },
    resetInputToDefaultValue() {
        this.domElement.input.value = "";
    },
    async getRecipesFromSearch(searchString) {
        return fetch(`${API_BASE_URL}${this.endpoints.getRecipesByNameSearch}${searchString}`)
            .then((response) => response.json())
            .then((data) => data.meals || [])
            .catch((error) => { alert(error); return [] })
    }
}