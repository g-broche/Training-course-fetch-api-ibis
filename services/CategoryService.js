const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

/**
 * Service used to manage interaction between the app and the API for categories of recipe
 */
export const CategoryService = {
    domElement: document.getElementById("category-selector"),
    endpoints: {
        getAvailableCategories: "categories.php",
        getRecipesForCategory: "filter.php?c="
    },
    categories: [],
    /**
     * Initialize the service which will get the category list from the API to fill the select and also
     * define what action to trigger when fetching the recipe list by a category.
     * @param {*} actionOnSelect callback function to execute after fetching recipes based on category
     */
    async initialize(actionOnSelect) {
        this.resetInputToDefaultValue()
        this.categories = await this.fetchCategories();
        this.fillOptions();
        this.domElement.addEventListener("change", async () => {
            const selectedCategory = this.domElement.value;
            const foundRecipes = await this.getRecipesForSelectedCategory(selectedCategory)
            actionOnSelect(foundRecipes);
        })
    },
    /**
     * fetch list of categories from the API
     * @returns 
     */
    async fetchCategories() {
        return fetch(`${API_BASE_URL}${this.endpoints.getAvailableCategories}`)
            .then((response) => response.json())
            .then((data) => data.categories)
            .catch((error) => { alert(error); return [] })
    },
    /**
     * Fills the select input related to this service with all options based on this service category list
     */
    fillOptions() {
        this.categories.forEach((category) => {
            const newOption = document.createElement("option");
            newOption.innerText = category.strCategory;
            newOption.value = category.strCategory;
            this.domElement.appendChild(newOption);
        })
    },
    /**
     * reset select to its placeholder option
     */
    resetInputToDefaultValue() {
        this.domElement.selectedIndex = 0
    },
    /**
     * Get list of recipes from the api using a refence category
     * @param {*} selectedCategory 
     * @returns list of recipe as provided by the API
     */
    async getRecipesForSelectedCategory(selectedCategory) {
        return fetch(`${API_BASE_URL}${this.endpoints.getRecipesForCategory}${selectedCategory}`)
            .then((response) => response.json())
            .then((data) => data.meals || [])
            .catch((error) => {
                console.log(error)
                alert("une erreur a eu lieu en récupérant les informations");
                return [];
            })
    }
}