<h1 class="test"></h1>
<script>
    var urls = ['https://www.allrecipes.com/recipe/256021/ultimate-tofu-breakfast-burrito-bowls/',
        'https://www.allrecipes.com/recipe/68436/vegan-brownies/',
        'https://www.allrecipes.com/recipe/245208/blueberry-smoothie-bowl/',
        'https://www.allrecipes.com/recipe/21528/pesto-pizza/',
        'https://www.allrecipes.com/recipe/85452/homemade-black-bean-veggie-burgers/',
        'https://www.allrecipes.com/recipe/257368/lentil-tacos/',
        'https://www.allrecipes.com/recipe/11786/hearty-vegetable-lasagna/',
    ];
    var url = 'get-recipes.php?';

    var recipes = [];
    for (let i = 0; i < urls.length; i++) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let recipe = JSON.parse(this.responseText);
                recipes.push(recipe);

                console.log(recipe["name"]);
            }
        };

        xmlHttp.open("GET", url + "url=" + urls[i], true);
        xmlHttp.send(null);
    }
</script>