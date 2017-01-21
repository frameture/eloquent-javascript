function byTagName(node, tagName) {
  var nodesByTag = [];
  tagName = tagName.toUpperCase();

  function checkChild(array, node) {
    if (node == null)
      return;
    if (node.tagName == tagName)
      array.push(node)

    var children = node.childNodes;  
    for (var i = 0; i < children.length ;i++)
      checkChild(array, children[i]);
  }
  checkChild(nodesByTag, node); // Start recursion.
  return nodesByTag;
}