# Training-course Ibis
This repo is part of a training course and is related to a brief about OOP, asynchronous function, and API consumption ([themealdb API](https://www.themealdb.com/api.php)) in the context of a proof of concept for a nutrition and recipe oriente app in vanilla javascript.

## Features
* Through the use of provided inputs, a user can get a scrollable list of matching recipes based on the active filter and an call to the API. Inactive filters are cleared when an other filter is used.
* Clicking on a recipe on the list will open a modal window displaying the details of the clicked recipe after this data was fetched from the API based on the recipe's id.
* Hovering on an ingredient of the recipe will show an additionnal window with details about the ingredient.
* Designed in mobile first, the app is responsive to accommodate larger screen sizes.

## Separation of concern
the Javascript code is separated in three separate type of scripts.
* main.js : It is the core of the javascript logic of the app and orchestrates the interactions between services, classes representing an entity and the management of the list of recipes.
* services : Services will focus on handling data fetching from the api and interacting with main.js to display the informations requested by the user's actions.
* entity classes : These class are more focused on parsing the data received by the API to create instantiable entities. Each of this class also comes with its own "createComponent" method with the purpose of creating a dom HTMLElement representing the information of the entity to then have it appended to the DOM and be displayed when required by main.js or an appropriate service.