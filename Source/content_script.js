walk(document.body);

function walk(node) {
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	if (node.tagName && (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea')) {
		return;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) {
	var match
		, re = /\.\s+([A-Z])/g
		, n = textNode

	while ((match = re.exec(n.nodeValue)) != null) {
		var splitIdx = match.index + (match.index !== n.nodeValue.length ? 1 : 0) // Get the space
		var newNode = n.splitText(splitIdx)
		n.parentElement.insertBefore(document.createElement('br'), newNode)
		n = newNode
		console.log(n, match, match.index, newNode, re.exec(newNode.nodeValue), re.exec(n.nodeValue))
	}
}


