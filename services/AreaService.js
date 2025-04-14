const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

/**
 * Service used to manage interaction between the app and the API for area of origin of the recipes
 */
export const AreaService = {
    domElement: document.getElementById("area-selector"),
    endpoints: {
        getAvailableAreas: "list.php?a=list",
        getRecipesForArea: "filter.php?a="
    },
    areas: [],
    /**
     * Initialize the service which will get area list from the API to fill the select and also
     * define what action to trigger when fetching the recipe list by an area.
     * @param {*} actionOnSelect callback function to execute after fetching recipes based on area
     */
    async initialize(actionOnSelect) {
        this.resetInputToDefaultValue();
        this.areas = await this.fetchAreas();
        this.fillOptions();
        this.domElement.addEventListener("change", async () => {
            const selectedArea = this.domElement.value;
            const foundRecipes = await this.getRecipesForSelectedArea(selectedArea);
            actionOnSelect(foundRecipes);
        })
    },
    /**
     * fetch list of areas from the API
     * @returns 
     */
    async fetchAreas() {
        return fetch(`${API_BASE_URL}${this.endpoints.getAvailableAreas}`)
            .then((response) => response.json())
            .then((data) => data.meals)
            .catch((error) => {
                console.log(error)
                alert("une erreur a eu lieu en récupérant les origines géographiques des recettes");
                return [];
            })
    },
    /**
     * Fills the select input related to this service with all options based on this service area list
     */
    fillOptions() {
        this.areas.forEach((area) => {
            const newOption = document.createElement("option");
            newOption.innerText = area.strArea;
            newOption.value = area.strArea;
            this.domElement.appendChild(newOption);
        })
    },
    /**
     * reset select to its placeholder option
     */
    resetInputToDefaultValue() {
        this.domElement.selectedIndex = 0;
    },
    /**
     * Get list of recipes from the api using a refence area
     * @param {*} selectedArea 
     * @returns list of recipe as provided by the API
     */
    async getRecipesForSelectedArea(selectedArea) {
        return fetch(`${API_BASE_URL}${this.endpoints.getRecipesForArea}${selectedArea}`)
            .then((response) => response.json())
            .then((data) => data.meals || [])
            .catch((error) => {
                console.log(error)
                alert(`une erreur a eu lieu en récupérant les recette pour ${selectedArea}`);
                return [];
            })
    }
}