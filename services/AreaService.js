const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

export const AreaService = {
    domElement: document.getElementById("area-selector"),
    endpoints: {
        getAvailableAreas: "list.php?a=list",
        getRecipesForArea: "filter.php?a="
    },
    areas: [],
    async initialize(actionOnSelect) {
        this.areas = await this.fetchAreas();
        this.fillOptions();
        this.domElement.addEventListener("change", async () => {
            const selectedArea = this.domElement.value;
            const foundRecipes = await this.getRecipesForSelectedArea(selectedArea)
            actionOnSelect(foundRecipes);
        })
    },
    async fetchAreas() {
        return fetch(`${API_BASE_URL}${this.endpoints.getAvailableAreas}`)
            .then((response) => response.json())
            .then((data) => data.meals)
            .catch((error) => { alert(error); return [] })
    },
    clearOptions() {
        this.domElement.innerHTML = "";
    },
    fillOptions() {
        this.areas.forEach((area) => {
            const newOption = document.createElement("option");
            newOption.innerText = area.strArea;
            newOption.value = area.strArea;
            this.domElement.appendChild(newOption);
        })
    },
    async getRecipesForSelectedArea(selectedArea) {
        return fetch(`${API_BASE_URL}${this.endpoints.getRecipesForArea}${selectedArea}`)
            .then((response) => response.json())
            .then((data) => data.meals || [])
            .catch((error) => { alert(error); return [] })
    }
}