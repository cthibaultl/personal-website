<?php

require_once __DIR__.'/../vendor/autoload.php';
$kernel = require_once __DIR__.'/../app/kernel.php';
$kernel['debug'] = true;
$kernel->run();