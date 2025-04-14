const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

/**
 * Service used to manage interaction between the app and the API for a specific recipe
 */
export const RecipeService = {
    endpoints: {
        getRecipeDetailsById: "lookup.php?i="
    },
    /**
     * Use a recipe id to fetch a specific recipe from the API
     * @param {*} recipeId 
     * @returns Detailed recipe data as provided by the API
     */
    async fetchRecipeDetails(recipeId) {
        return fetch(`${API_BASE_URL}${this.endpoints.getRecipeDetailsById}${recipeId}`)
            .then((response) => response.json())
            .then((data) => data.meals[0])
            .catch((error) => {
                console.log(error)
                alert("une erreur a eu lieu en récupérant les informations de cette recette");
                return [];
            })
    },
}