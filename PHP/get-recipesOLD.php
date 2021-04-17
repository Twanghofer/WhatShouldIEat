<?php
//get all urls
$urls = array(
    'https://www.allrecipes.com/recipe/256021/ultimate-tofu-breakfast-burrito-bowls/',
    'https://www.allrecipes.com/recipe/68436/vegan-brownies/',
    'https://www.allrecipes.com/recipe/245208/blueberry-smoothie-bowl/',
    'https://www.allrecipes.com/recipe/21528/pesto-pizza/',
    'https://www.allrecipes.com/recipe/85452/homemade-black-bean-veggie-burgers/',
    'https://www.allrecipes.com/recipe/257368/lentil-tacos/',
    'https://www.allrecipes.com/recipe/11786/hearty-vegetable-lasagna/',

);

function GetJSONObject($urls)
{
    $output = array("[");

    //get all outputs
    for ($i = 0; $i < count($urls); $i++) {
        $recipeData = ConvertRecipe($urls[$i]);
        if ($i < count($urls) - 1) {
            $recipeData  .= "\n,";
        }

        array_push($output, $recipeData);
    }
    array_push($output, "];");

    return $output;
}

function ConvertRecipe($url)
{
    $html = file_get_contents($url);

    //Create a new DOMDocument object.
    $htmlDom = new DOMDocument;

    //Load the HTML string into our DOMDocument object.
    @$htmlDom->loadHTML($html);

    //GET ALL DATA FROM RECIPE
    $title = GetHTMLTag($html, '<h1 class="headline heading-content">', "</h1>");

    $description = GetHTMLTag($html, '<div class="recipe-summary margin-8-bottom">', "</div>");
    $description = GetHTMLTag($description, '<p class="margin-0-auto">', "</p>");

    $images = GetAllImgsWithUrl("https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2", $title, $htmlDom);

    $rating = floatval(GetMetaTagWithName("og:rating", $htmlDom));
    $maxRating = intval(GetMetaTagWithName("og:rating_scale", $htmlDom));

    $time = GetHTMLTag($html, '"totalTime": "', '"recipeYield"', true);
    $timeHours = GetHTMLTag($time, "DT", "H");
    $timeMinutes = intval(GetHTMLTag($time, "H", "M"));
    $timeTotal = $timeHours + $timeMinutes / 60;

    $category = GetHTMLTag($html, '"channel": "', '"category"', true);

    // echo "Title: " .$title;
    // echo "<br>";
    // echo "Desc: " .$description;
    // echo "<br>";
    // echo "Desc: " .$images[0];
    // echo "<br>";
    // echo "Desc: " .$rating . "/" , $maxRating;
    // echo "<br>";
    // echo $timeTotal;
    // echo "<br>";
    // echo $category;

    return json_encode(
        array(
            'name' => $title,
            'category' => $category,
            'description' => $description,
            'time' => $timeTotal,
            'rating' => $rating,
            'url' => $url,
            'images' => $images,
        )
    );
}



function GetHTMLTag($html, $startString, $endString, $cleanAll = false)
{
    $startPos = strpos($html, $startString) + strlen($startString);
    $length =  strpos($html, $endString) - (strpos($html, $startString) + strlen($startString));
    $output = substr($html, $startPos, $length);

    if ($cleanAll) {
        $output = str_replace('"', "", $output);
        $output = str_replace(':', "", $output);
        $output = str_replace(',', "", $output);
        $output = stripslashes($output);
        $output = trim($output);
    }

    return $output;
}

function GetAllImgs($htmlDom)
{
    $imageTags = $htmlDom->getElementsByTagName('img');

    //Create an array to add extracted images to.
    $extractedImages = array();

    //Loop through the image tags that DOMDocument found.
    foreach ($imageTags as $imageTag) {

        //Get the src attribute of the image.
        $imgSrc = $imageTag->getAttribute('src');
        $imgSrc = stripslashes($imgSrc);



        //Get the alt text of the image.
        $altText = $imageTag->getAttribute('alt');

        //Add the image details to our $extractedImages array.
        $extractedImages[] = new Image($imgSrc, $altText);
    }

    return $extractedImages;
}

function GetAllImgsWithUrl($link, $alt, $htmlDom)
{
    $imgs = array();
    foreach (GetAllImgs($htmlDom) as $img) {
        if (str_contains($img->src, $link) && str_contains($img->alt, $alt)) {
            array_push($imgs, $img->src);
        }
    }
    return $imgs;
}


function GetMetaTagWithName($name, $htmlDom)
{
    $metaTags = $htmlDom->getElementsByTagName('meta');
    $content = "";

    //Loop through the image tags that DOMDocument found.
    foreach ($metaTags as $metaTag) {
        if ($metaTag->getAttribute('name') === $name) {
            $content =  $metaTag->getAttribute('content');
        }
    }

    return $content;
}


class Image
{
    public $src;
    public $alt;


    public function __construct($src, $alt)
    {
        $this->src = $src;
        $this->alt = $alt;
    }
}

class Recipe
{
    public $name;
    public $category;
    public $description;
    public $time;
    public $rating;
    public $url;
    public $images;

    public function __construct($name, $category, $description, $time, $rating, $url, $images = array())
    {
        $this->name = $name;
        $this->category = $category;
        $this->description = $description;
        $this->time = $time;
        $this->rating = $rating;
        $this->url = $url;
        $this->images = $images;
    }
}
