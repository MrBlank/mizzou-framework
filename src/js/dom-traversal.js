/**
 * DOM traversal: Previous, next, parent, and child nodes
 *
 * Usage:
 *
 * var objExample = document.getElementById('example');
 * return domTraversal('children', objExample, 'LI');  // Returns object of all child LI tags of #example
 * return domTraversal('children', objExample);        // Returns object of all child tags of #example
 * return domTraversal('parent', objExample, 'DIV');   // Returns parent div of #example
 * return domTraversal('parent', objExample);          // Returns immediate parent of #example
 * return domTraversal('previous', objExample, 'LI');  // Returns previous sibling LI tag of #example
 * return domTraversal('previous', objExample);        // Returns previous sibling of #example
 * return domTraversal('next', objExample, 'LI');      // Returns next sibling LI tag of #example
 * return domTraversal('next', objExample);            // Returns next sibling of #example
 *
 * @author Josh Hughes (hughesjd@missouri.edu), Undergraduate Studies, University of Missouri
 * @copyright 2015 Curators of the University of Missouri
 * @version 3.0.0
 *
 * @param string strDirection Type of traversal (Can be 'children', 'parent', 'previous', or 'next')
 * @param object objNode Reference node
 * @param string strTagName If set, it limits the selected node(s) to the given tag
 * @return object Requested node or array of nodes
 */
function domTraversal(strDirection, objNode, strTagName) {
    // Make sure strTagName is set to something
    if (typeof strTagName !== 'undefined') {
        strTagName = strTagName.toUpperCase();
    } else {
        strTagName = null;
    }
    
    // Child nodes (will walk through and select the relevant nodes)
    if (strDirection === 'children') {
        var objSelectedChildNodes = [];
        var objChildNodes = objNode.childNodes;
        if (objChildNodes.length > 0) {
            for (var i = 0; i < objChildNodes.length; i++) {
                if ((objChildNodes[i].nodeType === 1) && ((objChildNodes[i].nodeName === strTagName) || (strTagName === null))) {
                    objSelectedChildNodes.push(objChildNodes[i]);
                }
            }
        }
        return objSelectedChildNodes;
        
    // Parent, previous, and next nodes
    } else {
        var objCurrentNode = objNode;
        do {
            if (strDirection === 'parent') {
                objCurrentNode = objCurrentNode.parentNode;
            } else if (strDirection === 'previous') {
                objCurrentNode = objCurrentNode.previousSibling;
            } else { // next
                objCurrentNode = objCurrentNode.nextSibling;
            }
        } while ((objCurrentNode && objCurrentNode.nodeType !== 1) || (strTagName !== null && objCurrentNode !== null && objCurrentNode.nodeName !== strTagName));
        
        return objCurrentNode;
    }
}