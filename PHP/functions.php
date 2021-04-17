<?php

function getDomain($url)
{
    $pieces = parse_url($url);
    $domain = isset($pieces['host']) ? $pieces['host'] : '';
    if (preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs)) {
        return $regs['domain'];
    }
    return FALSE;
}

function getDOMInnerHTML(DOMNode $element)
{
    $innerHTML = "";
    $children  = $element->childNodes;

    foreach ($children as $child) {
        $innerHTML .= $element->ownerDocument->saveHTML($child);
    }

    return $innerHTML;
}

function getInnerTag($tag, $startString, $endString, $cleanAll = false)
{
    $startPos = strpos($tag, $startString) + strlen($startString);
    $length =  strpos($tag, $endString) - (strpos($tag, $startString) + strlen($startString));
    $output = substr($tag, $startPos, $length);

    if ($cleanAll) {
        $output = str_replace('"', "", $output);
        $output = str_replace(':', "", $output);
        $output = str_replace(',', "", $output);
        $output = stripslashes($output);
        $output = trim($output);
    }

    return $output;
}

function getMetaTagWithName($name, $htmlDom)
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

function GetAllTagsWithClass($htmlDom, $tag, $class)
{
    $tags = $htmlDom->getElementsByTagName($tag);

    //Create an array to add extracted images to.
    $classTags = array();

    //Loop through the image tags that DOMDocument found.
    foreach ($tags as $tag) {

        //Get the src attribute of the image.
        $tagClass = $tag->getAttribute('class');

        if (str_contains($tagClass, $class)) {
            array_push($classTags, $tag);
        }
    }

    return $classTags;
}

function GetAllImgs($htmlDom, $src = null, $alt = null)
{
    $imageTags = $htmlDom->getElementsByTagName('img');

    //Create an array to add extracted images to.
    $allImages = array();

    //Loop through the image tags that DOMDocument found.
    foreach ($imageTags as $imageTag) {

        //Get the src attribute of the image.
        $imgSrc = $imageTag->getAttribute('src');
        $imgSrc = stripslashes($imgSrc);

        //Get the alt text of the image.
        $altText = $imageTag->getAttribute('alt');

        //Add the image details to our $extractedImages array.
        $allImages[] = new Image($imgSrc, $altText);
    }

    $extractedImages = array();

    if ($src && $alt) {
        foreach ($allImages as $img) {
            if (str_contains($img->src, $src) && str_contains($img->alt, $alt)) {
                array_push($extractedImages, $img->src);
            }
        }
    } else if ($src) {
        foreach ($allImages as $img) {
            if (str_contains($img->src, $src)) {
                array_push($extractedImages, $img->src);
            }
        }
    } else if ($alt) {
        foreach ($allImages as $img) {
            if (str_contains($img->alt, $alt)) {
                array_push($extractedImages, $img->src);
            }
        }
    } else {
        $extractedImages = $allImages;
    }

    return $extractedImages;
}
