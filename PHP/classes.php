<?php


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
    public $images = array();

    public function __construct()
    {
    }
}
