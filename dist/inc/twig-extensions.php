<?php
/**
 * Custom extensions for Twig
 *
 * @author Josh Hughes (hughesjd@missouri.edu), Undergraduate Studies, University of Missouri
 * @copyright 2015 Curators of the University of Missouri
 * @version 3.0.0
 */

/**
 * Creates a list of URLs used by a menu link and any child links it might have, with infinite depth
 *
 * @param array $aryMenuItem Menu item
 * @return array List of URLs
 */
function menuItemLinkList($aryMenuItem)
{
    $aryLinkList = array();
    
    if ((isset($aryMenuItem['link'])) && (trim($aryMenuItem['link']) != '')) {
        $aryLinkList[] = $aryMenuItem['link'];
        
        // Recursively process child links
        if ((isset($aryMenuItem['children'])) && (!empty($aryMenuItem['children']))) {
            foreach ($aryMenuItem['children'] as $aryChildMenuItem) {
                $aryLinkList = array_merge($aryLinkList, menuItemLinkList($aryChildMenuItem));
            }
        }
    }
    
    return $aryLinkList;
}

/**
 * Determine previous and next page in navigation
 *
 * @param array $aryMenu Associative array of menu items. Each item can have the following properties:
 *      - string link URL of the link
 *      - string title Text for the link
 *      - array children Child link items (with the same definition).
 * @param string $strCurrentPage Current page url. $aryMenu will be searched for this to determine the previous/next link
 * @param boolean $boolIncludeChildLinks (Optional) Whether to search child links too. Defaults to true
 * @return array With two keys, 'previous' and 'next', containing the menu item array for each
 */
function menuPreviousAndNextPage($aryMenu, $strCurrentPage, $boolIncludeChildLinks = true)
{
    $aryPreviousMenuItem = $aryNextMenuItem = null;
    
    if (!empty($aryMenu)) {
        
        // Start by flattening the menu array so it's no longer hierarchical
        $aryLinkList = menuFlattenHierarchy($aryMenu, $boolIncludeChildLinks);
        
        // Find the current page
        for ($i = 0; $i < count($aryLinkList); $i++) {
            if ((isset($aryLinkList[$i]['link'])) && ($aryLinkList[$i]['link'] == $strCurrentPage)) {
                if (isset($aryLinkList[$i - 1])) {
                    $aryPreviousMenuItem = $aryLinkList[$i - 1];
                }
                
                if (isset($aryLinkList[$i + 1])) {
                    $aryNextMenuItem = $aryLinkList[$i + 1];
                }
                break;
            }
        }
    }
    
    return array(
        'previous'  => $aryPreviousMenuItem,
        'next'      => $aryNextMenuItem
    );
}

/**
 * Flattens a nav item array so it isn't hierarchical
 *
 * @param array $aryMenu Associative array of menu items. Each item can have the following properties:
 *      - string link URL of the link
 *      - string title Text for the link
 *      - array children Child link items (with the same definition).
 * @param boolean $boolIncludeChildLinks (Optional) Whether to recursively search child links. Defaults to true
 * @return array Menu items without hierarchy
 */
function menuFlattenHierarchy($aryMenu, $boolIncludeChildLinks = true)
{
    $aryLinkList = array();
    
    if (!empty($aryMenu)) {
        foreach ($aryMenu as $aryMenuItem) {
            $aryLinkList[] = $aryMenuItem;
            
            // Pull in child links
            if (($boolIncludeChildLinks === true) && (isset($aryMenuItem['children'])) && (!empty($aryMenuItem['children']))) {
                $aryChildLinkList = menuFlattenHierarchy($aryMenuItem['children']);
                $aryLinkList = array_merge($aryLinkList, $aryChildLinkList);
            }
        }
    }
    
    return $aryLinkList;
}