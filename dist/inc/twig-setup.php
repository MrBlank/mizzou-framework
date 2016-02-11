<?php
/**
 * Twig Setup
 *
 * Usage:
 * 
 * require_once('twig-setup.php');
 * print $objTwig->render('main-template.html', $aryAttributes);
 *
 * @author Josh Hughes (hughesjd@missouri.edu), Undergraduate Studies, University of Missouri
 * @copyright 2015 Curators of the University of Missouri
 * @version 3.0.0
 */

// Make sure options array is set
if (!isset($aryTwigOptions)) {
    $aryTwigOptions = array();
}

// Load Twig and setup environment
require_once(__DIR__ . '/Twig/Autoloader.php');
if (file_exists(__DIR__ . '/twig-extensions.php')) {
    require_once(__DIR__ . '/twig-extensions.php');
}

Twig_Autoloader::register();
$objTwigLoader = new Twig_Loader_Filesystem(__DIR__ . '/templates');
$objTwig = new Twig_Environment($objTwigLoader, $aryTwigOptions);
$objTwig->addExtension(new Twig_Extension_StringLoader());

// Custom extensions
$aryCustomFilters = array(
    'menu_item_link_list' => 'menuItemLinkList',
    'menu_previous_next_page' => 'menuPreviousAndNextPage',
    'menu_flatten_hierarchy' => 'menuFlattenHierarchy'
);

foreach ($aryCustomFilters as $strFilterName => $strFilterFunctionName) {
    if (function_exists($strFilterFunctionName)) {
        $objTwig->addFilter($strFilterName, new Twig_Filter_Function($strFilterFunctionName));
    }
}