<?php
/**
 * Configure Standard Twig Variables
 *
 * @author Josh Hughes (hughesjd@missouri.edu), Undergraduate Studies, University of Missouri
 * @copyright 2015 Curators of the University of Missouri
 * @version 3.0.0
 */

// Set timezone
date_default_timezone_set('America/Chicago');

// Make sure attributes container is set
if (!isset($aryAttributes)) {
    $aryAttributes = array();
}

// Setup caching
$aryTwigOptions = array(
    'autoreload'    => true,
    'cache'         => __DIR__ . '/../../twig-cache'
);

// Site options
$aryAttributes['site'] = array(
    'apple_mask_icon_color'     => '#000000',
    'base_url_dev'              => '',
    'base_url'                  => '',
    'detected_hostname'         => $_SERVER['HTTP_HOST'],
    'facebook_url'              => '',
    'flickr_url'                => '',
    'hostname'                  => '',
    'ms_tile_color'             => '#f1b82d',
    'name'                      => '',
    'published_by'              => '',
    'published_by_link'         => '',
    'search_action_path'        => 'search/',
    'search_enabled'            => true,
    'search_field_name'         => 'q',
    'site_icon_color'           => 'gold',
    'short_name'                => '',
    'twitter_username'          => '',
    'typekit_id'                => '',
    'viewport'                  => 'width=device-width, initial-scale=1.0',
    'year'                      => date('Y')
);

// Development options (use base_url_dev and disable cache)
if ($aryAttributes['site']['hostname'] != $aryAttributes['site']['detected_hostname']) {
    $aryAttributes['site']['base_url'] = $aryAttributes['site']['base_url_dev'];
    $aryTwigOptions = array();
}

// Asset url
$aryAttributes['site']['asset_url'] = $aryAttributes['site']['base_url'];

// Main navigation
$aryAttributes['site']['navigation_items'] = array(
    array('link' => $aryAttributes['site']['base_url'] . '', 'title' => 'Link 1'),
    array('link' => $aryAttributes['site']['base_url'] . '', 'title' => 'Link 2'),
    array('link' => $aryAttributes['site']['base_url'] . '', 'title' => 'Link 3')
);

// Set current page value
$aryAttributes['page']['current_page'] = $aryAttributes['site']['base_url'] . basename($_SERVER['PHP_SELF'], '.php');