<?php
/**
 * Example page
 *
 * @author Josh Hughes (hughesjd@missouri.edu), Undergraduate Studies, University of Missouri
 * @copyright 2015 Curators of the University of Missouri
 * @version 3.0.0
 */

// Page attributes
$aryAttributes = array(
    'current_page'  => 'dir/page',
    'title'         => 'Title of Page'
);

// Start output buffering
ob_start();
?>

<p>Content goes here.</p>

<?php
// Get contents
$aryAttributes['content'] = ob_get_clean();

// Load and setup Twig
require_once 'inc/twig-config.php';
require_once 'inc/twig-extensions.php';
require_once 'inc/twig-setup.php';
print $objTwig->render('main-template.html', $aryAttributes);
?>