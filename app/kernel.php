<?php

use Silex\Application;

$kernel = new Application();

$kernel->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));

$kernel->get('/accessibilite', function() use ($kernel){
    return $kernel['twig']->render('accessibility.html.twig');
});

$kernel->get('/', function() use ($kernel){

    $works = json_decode(file_get_contents(__DIR__.'/works.json'));
    $categories = json_decode(file_get_contents(__DIR__.'/categories.json'), true);
    
    foreach ($works as $work) {
        $map = array();
        foreach ($work->categories as $category) {
            if ($category != 'all') {
                $map[] = $categories[$category];
            } 
        }
        $work->category = implode(' / ', $map);
    }

    return $kernel['twig']->render('home.html.twig', array(
        'works' => $works
    ));
});

return $kernel;