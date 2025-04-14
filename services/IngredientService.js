import { Ingredient } from "../classes/Ingredient.js";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

/**
 * Service used to manage interaction between the app and the API for ingredients
 */
export const IngredientService = {
    endpoints: {
        getIngredientList: "list.php?i=list",
    },
    imageEndpoint: "https://www.themealdb.com/images/ingredients/",
    ingredients: [],
    async initialize() {
        this.ingredients = await this.fetchIngredientList();
    },
    /**
     * fetch list of ingredients from the API
     * @returns list of ingredient with an appended image path
     */
    async fetchIngredientList() {
        return fetch(`${API_BASE_URL}${this.endpoints.getIngredientList}`)
            .then((response) => response.json())
            .then((data) => {
                return data.meals.map((ingredient) => {
                    return new Ingredient({
                        id: ingredient.idIngredient,
                        name: ingredient.strIngredient,
                        description: ingredient.strDescription,
                        thumbnail: IngredientService.getIngredientThumbnailPath(ingredient.strIngredient)
                    })
                })
            })
            .catch((error) => { alert(error); return null })
    },
    /**
     * find an ingredient in the list by its name
     * @param {*} ingredientName 
     * @returns 
     */
    getIngredientByName(ingredientName) {
        return this.ingredients.find((ingredient) => ingredient.name.toLowerCase() === ingredientName.toLowerCase())
    },
    /**
     * format the expected path to the image resource for an ingredient name
     * @param {*} ingredientName 
     * @returns expected image url
     */
    getIngredientThumbnailPath(ingredientName) {
        const sluggifiedName = ingredientName.toLowerCase().replace(" ", "-")
        return `${this.imageEndpoint}${sluggifiedName}-small.png`
    }
}