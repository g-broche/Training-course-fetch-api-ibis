const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

export const CategoryService = {
    domElement: document.getElementById("category-selector"),
    endpoints: {
        getAvailableCategories: "categories.php",
        getRecipesForCategory: "filter.php?c="
    },
    categories: [],
    async initialize(actionOnSelect) {
        this.categories = await this.fetchCategories();
        this.fillOptions();
        this.domElement.addEventListener("change", () => {
            actionOnSelect(this.getRecipesForSelectedCategory);
        })
    },
    async fetchCategories() {
        return fetch(`${API_BASE_URL}${this.endpoints.getAvailableCategories}`)
            .then((response) => response.json())
            .then((data) => data.categories)
            .catch((error) => { alert(error); return [] })
    },
    clearOptions() {
        this.domElement.innerHTML = "";
    },
    fillOptions() {
        this.categories.forEach((category) => {
            const newOption = document.createElement("option");
            newOption.innerText = category.strCategory;
            newOption.value = category.strCategory;
            this.domElement.appendChild(newOption);
        })
    },
    async getRecipesForSelectedCategory(selectedCategory) {
        return fetch(`${API_BASE_URL}${this.endpoints.getRecipesForCategory}${selectedCategory}`)
            .then((response) => response.json())
            .then((data) => data.categories)
            .catch((error) => { alert(error); return [] })
    }
}