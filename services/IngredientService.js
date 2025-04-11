import { Ingredient } from "../classes/Ingredient.js";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

export const IngredientService = {
    endpoints: {
        getIngredientList: "list.php?i=list",
    },
    imageEndpoint: "https://www.themealdb.com/images/ingredients/",
    ingredients: [],
    async initialize() {
        this.ingredients = await this.fetchIngredientList();
        console.log(this.ingredients)
    },
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
    getIngredientByName(ingredientName) {
        return this.ingredients.find((ingredient) => ingredient.name === ingredientName)
    },
    getIngredientThumbnailPath(ingredientName) {
        const sluggifiedName = ingredientName.toLowerCase().replace(" ", "-")
        return `${this.imageEndpoint}${sluggifiedName}-small.png`
    }
}