/**
 * Class manipulation object
 *
 * Usage:
 *
 * var objClassManipulation = new ClassManipulation();
 * var objExample = document.getElementById('example');
 * objClassManipulation.addClass(objExample, 'class');        // Adds .class to #example
 * objClassManipulation.toggleClass(objExample, 'class');     // Removes .class from #example
 * objClassManipulation.toggleClass(objExample, 'class');     // Adds .class to #example
 * objClassManipulation.removeClass(objExample, 'class');     // Removes .class from #example
 * return objClassManipulation.hasClass(objExample, 'class'); // Returns true
 *
 * @author Josh Hughes (hughesjd@missouri.edu), Undergraduate Studies, University of Missouri
 * @copyright 2015 Curators of the University of Missouri
 * @version 3.0.0
 */

function ClassManipulation() {}

ClassManipulation.prototype =
{
    /**
     * Checks to see if a node has a given class
     *
     * @param object objNode Node to check
     * @param string strTargetClass The given class
     * @return boolean Whether or not the class is present
     */
    hasClass: function(objNode, strTargetClass)
    {
        var aryTest = objNode.className.match(new RegExp('(\\s|^)' + strTargetClass + '(\\s|$)'));
        return (aryTest !== null);
    },

    /**
     * Adds a class to a node
     *
     * @param object objNode Node to affect
     * @param string strTargetClass The class to add
     */
    addClass: function(objNode, strTargetClass)
    {
        if (!this.hasClass(objNode, strTargetClass)) {
            objNode.className += ' ' + strTargetClass;
        }
        objNode.className = this.trim(objNode.className);
    },
    
    /**
     * Removes a class from a node
     *
     * @param object objNode Node to affect
     * @param string strTargetClass The class to remove
     */
    removeClass: function(objNode, strTargetClass)
    {
        if (this.hasClass(objNode, strTargetClass)) {
            var objRegexp = new RegExp('(\\s|^)' + strTargetClass + '(\\s|$)');
            objNode.className = objNode.className.replace(objRegexp, ' ');
        }
        objNode.className = this.trim(objNode.className);
    },

    /**
     * Toggles a class on a node
     *
     * @param object objNode Node to affect
     * @param string strTargetClass The class to toggle
     */
    toggleClass: function(objNode, strTargetClass)
    {
        if (!this.hasClass(objNode, strTargetClass)) {
            objNode.className += ' ' + strTargetClass;
        } else {
            var objRegexp = new RegExp('(\\s|^)' + strTargetClass + '(\\s|$)');
            objNode.className = objNode.className.replace(objRegexp, ' ');
        }
        objNode.className = this.trim(objNode.className);
    },

    /**
     * Trims a given string
     *
     * @param string strToTrim String to trim
     * @return string Trimmed string
     */
    trim: function(strToTrim)
    {
        return strToTrim.replace(/^\s+|\s+$/g,'');
    }
};