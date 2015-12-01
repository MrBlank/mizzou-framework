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
 * @version 1.2
 */

// Class manipulation object
var objClassManipulation = new ClassManipulation();

/**
 * Toggle visibility of menu
 */
function toggleNavVisibility()
{
    objClassManipulation.toggleClass(domTraversal('parent', this), 'hide-nav');
    return false;
}

/**
 * Adds the menu button element and sets up the toggle effect
 *
 * @param string strSelector Selector to apply to (i.e. 'nav' or '.menu')
 * @param string strCloneToSelector (Optional) Selector to clone the nav to
 * @param string strMenuTitle (Optional) Text node for the menu button. Defaults to 'Menu'
 * @param string strMenuTag (Optional) Type of tag to wrap around the text node. Defaults to 'h2'
 */
function setupNavMenuButton(strSelector, strCloneToSelector, strMenuTitle, strMenuTag)
{
    // Setup variables
    var objClonedElement, objElements, objElementsToCloneTo, objHTMLTag, objLinks, objMenuBlock, objMenuBlockHeader;
    
    // Set default for menu title
    if (typeof strMenuTitle === 'undefined') {
        strMenuTitle = 'Menu';
    }
    
    // Set default for menu tag
    if (typeof strMenuTag === 'undefined') {
        strMenuTag = 'h2';
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
            
            // Create <div class="menu-button" tabindex="0">Menu</div>
            objMenuBlock = document.createElement('div');
            objClassManipulation.addClass(objMenuBlock, 'menu-button');
            objMenuBlockHeader = document.createElement(strMenuTag);
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
            
            // Add a class to the element hiding the menu (if the element doesn't have an "open-by-default" class
            if (!objClassManipulation.hasClass(objElements[i], 'open-by-default')) {
                objClassManipulation.addClass(objElements[i], 'hide-nav');
            }
        }
        
        // Add 'has-menu-button' class to <html> tag
        objHTMLTag = document.getElementsByTagName('html');
        if (objHTMLTag.length > 0) {
            objClassManipulation.addClass(objHTMLTag[0], 'has-menu-button');
        }
    }
}