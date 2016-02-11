<?php
/**
 * Google Search Appliance Results
 *
 * @author Josh Hughes (hughesjd@missouri.edu), Undergraduate Studies, University of Missouri
 * @copyright 2015 Curators of the University of Missouri
 * @version 3.0.0
 *
 * @param string $strSitesearch (Optional) Domain to limit search to
 * @return string HTML search results
 */
function mizzouGSAResults($strSitesearch = '')
{
    // Default params
    $strGSAQuery     = 'http://search.missouri.edu/search?';
    $arySearchParams = array(
    	'site'            	                    => 'default_collection',
    	'client'          	                    => 'wc_basic',
    	'output'          	                    => 'xml_no_dtd',
    	'sitesearch'   		                    => $strSitesearch
    );
    
    // Set sensible defaults
	$arySearchResults = array(
    	'search_results_query_string'           => '',
    	'search_results_spelling_suggestions'   => array(),
    	'search_results_keymatches'             => array(),
    	'search_results_number_of_results'      => 0,
    	'search_results_range_start'            => 0,
    	'search_results_range_end'              => 0,
    	'search_results'                        => array(),
    	'search_results_page'                   => 1,
    	'search_results_number_of_pages'        => 1
	);
    
    if ((isset($_GET['q'])) and (trim($_GET['q']) != '')) {
        
    	// Add search inputs to query array, and store it in return array
    	$arySearchParams['q'] = $arySearchResults['search_results_query_string'] = urldecode(strip_tags($_GET['q']));
    	
    	// Page numbers
    	if ((isset($_GET['page'])) && (isAnInteger($_GET['page']))) {
        	$arySearchResults['search_results_page'] = intval($_GET['page']);
        	$arySearchParams['start'] = ($arySearchResults['search_results_page'] - 1) * 10;
    	}
    	
        // Build out URL string
    	$strGSAQuery .= http_build_query($arySearchParams);
    
    	// Get results
    	$strXMLContents = file_get_contents($strGSAQuery);
    	    	
    	if (($strXMLContents) && ($strXMLContents != '')) {
        	
        	// Disable default XML error handling
        	libxml_use_internal_errors(true);
        	
            // Convert to SimpleXML
            try {
                $objXML = new SimpleXMLElement($strXMLContents);
            } catch (Exception $objException) {
                $objXML = false;
            }
        	
        	if ($objXML) {
            	
            	// Query string
            	if ($objXML->Q) {
                	$arySearchResults['search_results_query_string'] = (string)$objXML->Q;
            	}
            	
            	// Spelling suggestions
            	if (($objXML->Spelling) && (count($objXML->Spelling->Suggestion) > 0)) {
                	foreach ($objXML->Spelling->Suggestion as $objSpellingRow) {
                        if ($objSpellingRow->attributes()) {
                            if ($objSpellingRow->attributes()->q) {
                                $arySearchResults['search_results_spelling_suggestions'][] = urldecode((string)$objSpellingRow->attributes()->q);
                            }
                        }
                    }
            	}
            	
            	// Keymatches
            	if (($objXML->Synonyms) && (count($objXML->Synonyms->OneSynonym) > 0)) {
                	foreach ($objXML->Synonyms->OneSynonym as $objKeymatchRow) {
                        if ($objKeymatchRow->attributes()) {
                            if ($objKeymatchRow->attributes()->q) {
                                $arySearchResults['search_results_keymatches'][] = urldecode((string)$objKeymatchRow->attributes()->q);
                            }
                        }
                    }
            	}
            	
            	if ($objXML->RES) {
                	
                	// Number of results
                	if ($objXML->RES->M) {
                    	$arySearchResults['search_results_number_of_results'] = (int)$objXML->RES->M;
                	}
                	
                	if ($objXML->RES->attributes()) {
        
                    	// Start result
                    	if ($objXML->RES->attributes()->SN) {
                        	$arySearchResults['search_results_range_start'] = (int)$objXML->RES->attributes()->SN;
                    	}
                    	
                    	// End result
                    	if ($objXML->RES->attributes()->EN) {
                        	$arySearchResults['search_results_range_end'] = (int)$objXML->RES->attributes()->EN;
                    	}
                	}
                	
                	// Results
                	if (($objXML->RES->R) && (count($objXML->RES->R) > 0)) {
                    	foreach ($objXML->RES->R as $objResultRow) {
                            
                            // Must have title
                            if ($objResultRow->T) {
                                
                                // Defaults
                                $strSummary = $strURL = $strSize = '';
                                $boolIndent = false;
                            	
                            	// Summary
                            	if ($objResultRow->S) {
                                	$strSummary = (string)$objResultRow->S;
                            	}
                            	
                            	// URL
                            	if ($objResultRow->U) {
                                	$strURL = (string)$objResultRow->U;
                            	}
                            	
                            	// Document size
                            	if (($objResultRow->HAS) && ($objResultRow->HAS->C) && ($objResultRow->HAS->C->attributes()) && ($objResultRow->HAS->C->attributes()->SZ)) {
                                	$strSize = (string)$objResultRow->HAS->C->attributes()->SZ;
                            	}
                            	
                            	// Indented
                            	if (($objResultRow->attributes()) && ($objResultRow->attributes()->L) && ((int)$objResultRow->attributes()->L == 2)) {
                                	$boolIndent = true;
                            	}
                            	
                            	// Format result
                            	$aryResult = array(
                                	'title'     => (string)$objResultRow->T,
                                	'summary'   => $strSummary,
                                	'url'       => $strURL,
                                	'size'      => $strSize,
                                	'indent'    => $boolIndent
                            	);
                            	
                            	// Fix title and summary
                            	foreach (array('title', 'summary') as $strField) {
                                	$aryResult[$strField] = str_replace('<b>...</b>', '...', $aryResult[$strField]);
                                	$aryResult[$strField] = preg_replace('/<([\/]*)b>/si', '<$1mark>', $aryResult[$strField]);
                                	$aryResult[$strField] = strip_tags($aryResult[$strField], '<mark><i><em>');
                            	}
                            	
                            	// Store result
                            	$arySearchResults['search_results'][] = $aryResult;
                        	}
                    	}
                	}        	
            	}            	
        	}
    	}
    }
    
    // Settle number of pages
    $intNumberOfPages = ceil($arySearchResults['search_results_number_of_results']/10);
    if ($intNumberOfPages > 0) {
        $arySearchResults['search_results_number_of_pages'] = $intNumberOfPages;
    }
    
    // Make sure current page is not too high
    if ($arySearchResults['search_results_page'] > $arySearchResults['search_results_number_of_pages']) {
        $arySearchResults['search_results_page'] = $arySearchResults['search_results_number_of_pages'];
    }
    
    return $arySearchResults;
}

/**
 * Confirms whether a variable is an integer or an integer string
 *
 * @param mixed $mxdInput Variable to test
 * @return boolean Whether the variable is an integer or not
 */
function isAnInteger($mxdInput)
{
	return (ctype_digit(strval($mxdInput)));
}