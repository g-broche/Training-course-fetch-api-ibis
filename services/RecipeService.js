const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

export const RecipeService = {
    endpoints: {
        getRecipeDetailsById: "lookup.php?i="
    },
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