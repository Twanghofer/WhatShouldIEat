<?php
include "classes.php";
include "functions.php";

//get all urls
// $urls = array(
//     'https://www.allrecipes.com/recipe/256021/ultimate-tofu-breakfast-burrito-bowls/',
// );

$url = $_GET['url'];
echo ConvertRecipe($url);

function ConvertRecipe($url)
{
    $domain = getDomain($url);

    $recipe = new Recipe();

    switch ($domain) {
        case 'allrecipes.com':
            $recipe = Convert_AllRecipesCOM($url);
            break;

        default:
            return;
            break;
    }

    $recipe->url = $url;

    // echo "URL: " . $recipe->url;
    // echo "<br>";
    // echo "Title: " . $recipe->name;
    // echo "<br>";
    // echo "Category: " . $recipe->category;
    // echo "<br>";
    // echo "Desc: " . $recipe->description;
    // echo "<br>";
    // echo "Img: " . Count($recipe->images);
    // echo "<br>";
    // echo "Rate: " . $recipe->rating . " / 5";
    // echo "<br>";
    // echo "Time: " . $recipe->time;


    return json_encode(
        array(
            'name' => $recipe->name,
            'category' => $recipe->category,
            'description' => $recipe->description,
            'time' => $recipe->time,
            'rating' => $recipe->rating,
            'url' => $recipe->url,
            'images' => $recipe->images,
        )
    );
}

function Convert_AllRecipesCOM($url)
{
    $html = file_get_contents($url);
    //Create a new DOMDocument object.
    $htmlDom = new DOMDocument;
    //Load the HTML string into our DOMDocument object.
    @$htmlDom->loadHTML($html);

    $recipe = new Recipe();

    $recipe->name = GetAllTagsWithClass($htmlDom, "h1", "headline heading-content")[0]->textContent;

    $recipe->description = GetAllTagsWithClass($htmlDom, "div", "recipe-summary")[0]->textContent;

    $recipe->images = GetAllImgs($htmlDom, "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2", $recipe->name);

    $recipe->rating = floatval(getMetaTagWithName("og:rating", $htmlDom));

    $time = getInnerTag($html, '"totalTime": "', '"recipeYield"', true);
    $timeHours = getInnerTag($time, "DT", "H");
    $timeMinutes = intval(getInnerTag($time, "H", "M"));
    $recipe->time = $timeHours + $timeMinutes / 60;

    $recipe->category = getInnerTag($html, '"channel": "', '"category"', true);

    return $recipe;
}
