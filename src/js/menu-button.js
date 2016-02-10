/**
 * Setup a hamburger-style menu button
 *
 * Usage:
 *
 * setupNavMenuButton('nav');
 * setupNavMenuButton('#additional-menu', '#mobile-menu', 'Show Menu', 'h3');
 *
 * @author Josh Hughes (hughesjd@missouri.edu), Undergraduate Studies, University of Missouri
 * @copyright 2015 Curators of the University of Missouri
 * @version 3.0.0
 */

// Class manipulation object
var objClassManipulation = new ClassManipulation();

/**
 * Toggle visibility of menu
 *
 * @param object objEvent Event
 */
function toggleNavVisibility(objEvent)
{
    objEvent.preventDefault();
    objClassManipulation.toggleClass(domTraversal('parent', this), 'nav--hide');
    return false;
}

/**
 * Adds the menu button element and sets up the toggle effect
 *
 * @param string strSelector Selector to apply to (i.e. 'nav' or '.menu')
 * @param string strCloneToSelector (Optional) Selector to clone the nav to
 * @param string strMenuTitle (Optional) Text node for the menu button. Defaults to 'Menu'
 */
function setupNavMenuButton(strSelector, strCloneToSelector, strMenuTitle)
{
    // Setup variables
    var objClonedElement, objElements, objElementsToCloneTo, objHTMLTag, objLinks, objMenuBlock, objMenuBlockHeader;
    
    // Set default for menu title
    if (typeof strMenuTitle === 'undefined') {
        strMenuTitle = 'Menu';
    }
    
    // Grab matching elements
    objElements = document.querySelectorAll(strSelector);
    
    if (objElements.length > 0) {
        for (var i = 0; i < objElements.length; i++) {
            
            // Clone nav
            if ((typeof strCloneToSelector !== 'undefined') && (strCloneToSelector !== false)) {
                objElementsToCloneTo = document.querySelectorAll(strCloneToSelector);
    
                if (objElementsToCloneTo.length > 0) {
                    objClonedElement = objElements[i].cloneNode(true);
                    
                    for (var intClones = 0; intClones < objElementsToCloneTo.length; intClones++) {
                        objElementsToCloneTo[intClones].appendChild(objClonedElement);
                    }
                }
            }
            
            // Create <a href="#" class="nav__mobile-menu-button"><span class="nav__mobile-menu-button__header">Menu</span></a>
            objMenuBlock = document.createElement('a');
            objMenuBlock.href = '#';
            objClassManipulation.addClass(objMenuBlock, 'nav__mobile-menu-button');
            objMenuBlockHeader = document.createElement('span');
            objClassManipulation.addClass(objMenuBlockHeader, 'nav__mobile-menu-button__header');
            objMenuBlockHeader.appendChild(document.createTextNode(strMenuTitle));
            objMenuBlock.appendChild(objMenuBlockHeader);
            objMenuBlock.tabIndex = 0;
            
            // Set click and enter key toggles
            if (objMenuBlock.addEventListener) {        
                objMenuBlock.addEventListener('click', toggleNavVisibility);
                objMenuBlock.addEventListener('keydown', function(objEvent) {
                    if (objEvent.keyCode == 13) {
                        toggleNavVisibility.call(objMenuBlock);
                    } 
                });
            } else {
                objMenuBlock.attachEvent('onclick', function() {
                    toggleNavVisibility.call(objMenuBlock);
                });
                objMenuBlock.attachEvent('onkeydown', function(objEvent) {
                    if (objEvent.keyCode == 13) {
                        toggleNavVisibility.call(objMenuBlock);
                    } 
                });
            }
            
            // Insert the element
            objElements[i].insertBefore(objMenuBlock, objElements[i].firstChild);
            
            // Add a class to the element hiding the menu (if the element doesn't have an "nav--open-by-default" class
            if (!objClassManipulation.hasClass(objElements[i], 'nav--open-by-default')) {
                objClassManipulation.addClass(objElements[i], 'nav--hide');
            }
        }
        
        // Add 'has-menu-button' class to <html> tag
        objHTMLTag = document.getElementsByTagName('html');
        if (objHTMLTag.length > 0) {
            objClassManipulation.addClass(objHTMLTag[0], 'has-menu-button');
        }
    }
}