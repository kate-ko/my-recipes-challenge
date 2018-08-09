var RecipeApp = function () {

    var recipes = [
        { 
            id: 1,
            name: 'Best Chicken Soup!', 
            image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
            ingredients: [
                { name: 'whole chicken' },
                { name: 'medium carrots'},
                { name: 'onions' },
            ] 
        }
    ];

    var $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 0;

    var createRecipe = function(name, image){
        image = 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg';
        var recipe = {
            name: name,
            image: image, 
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId ++; 

        recipes.push(recipe);
    };

    var deleteRecipe = function(currentPost) {
        var index = _getIndexOfCurrentRecipe(currentPost);
        recipes.splice(index, 1);
    }

    var _findRecipeById = function(id) {
        for (var i = 0; i < recipes.length; i += 1) {
          if (recipes[i].id === id) {
            return recipes[i];
          }
        }
      }

    var _getIndexOfCurrentRecipe = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.recipe');
        var id = $clickedPost.data().id;
        var post = _findRecipeById(id);
        return recipes.indexOf(post);
    }

    var createIngredients = function(currentPost, name){
        var index = _getIndexOfCurrentRecipe(currentPost);
        recipes[index].ingredients.push({name: name});
    };

    var _getIngredientsHTML = function(recipe){
        var recipesHTML = "";
        for (let element of recipe.ingredients) {
            recipesHTML += '<li>' + element.name + '</li>';
        }
        return recipesHTML;
    };

    var renderRecipes = function () {
        //empty recipes div
        $recipes.empty();

        for(var i = 0; i < recipes.length; i ++){
            //current recipe in iteration
            var recipe = recipes[i];

            //return HTML for all ingredients
            var ingredients = _getIngredientsHTML(recipe); //add code

            $recipes.append(
                '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' + 
                    '<h4 class="text-capitalize font-italic text-center">' + recipe.name + '</h4>' +
                    '<img class="recipe-img" src="' + recipe.image + '"/>' +
                    '<hr>' +
                    '<h5 class="font-italic font-bold text-center">ingredients</h5>' +
                    '<div class="input-group mb-3">' +
                        '<div class="input-group-prepend">' +
                            '<span class="add-ingredients input-group-text" id="basic-addon3">Add Ingredients</span>' +
                        '</div>' + 
                        '<input type="text" class="form-control" id="new-ingredient" aria-describedby="basic-addon3">' +
                        '<div class="input-group-append">' +
                        '<button class="btn btn-outline-secondary add-ingredient" type="button">Send</button>' +
                        '</div>' +
                    '</div>' +
                    '<ul class="ingredients">' + ingredients + '</ul>' +
                    '<button type="button" class="btn btn-secondary btn-lg btn-block delete-recipe">Delete recipe</button>' +
                '</div>'
            );
        }
    };



    return {
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        deleteRecipe : deleteRecipe,
        createIngredients: createIngredients
    }
};

var app = RecipeApp();
app.renderRecipes();

//--------EVENTS

//add a recipe
$('.add-recipe').on('click', function(){
    //collect input text
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();
    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});

//create ingredient
$('.recipes').on('click','.add-ingredient', function() {
    var name = $(this).closest('.recipe').find('#new-ingredient').val();
    app.createIngredients(this, name);
    app.renderRecipes();
});

$('.recipes').on('click','.delete-recipe', function() {
    app.deleteRecipe(this);
    app.renderRecipes();
});





