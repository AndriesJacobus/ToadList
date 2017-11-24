/*
    Author: Jaco du Plooy
*/

/*
=================================================================================================
 Objects handler:
=================================================================================================
*/
var toadLists = [];

function addToadList (id, name) {
	// Add to list
	toadLists.push(new ToadList(id, name));

	// Add to view
	var add = 	"<li id = '" + id + "'>";
    add +=		"<a id = 'listName' class='waves-effect hoverable' href='#!'>" + name + "</a>"
    add +=      "<div class='divider'></div>"
    add +=      "</li>";

	$("#slide-out").append(add);
}

function updateToadList (id, name) {
	// Update view
	$("#" + id + "").children("#listName").html(name);

	//Update list
	for (var list in toadLists) {
		if (list.id == id) {
			list.name = name;
		}
	}
}

function deleteList (id) {
	// Update view
	$("#" + id + "").remove();

	//Update list
	for (var i = 0; i < toadLists.length; i++) {
		if (list.id == id) {
    		array.splice(i, 1);
		}
	}
}

/*
=================================================================================================
 Classes:
=================================================================================================
*/

// List Obj:
class ToadList {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

	equals(compare) {
		return (this.id == compare.id);
	}
}

// Item Content Obj:
class Item {
	constructor(id, message) {
		this.id = id;
		this.message = message;
	}

	equals(compare) {
		return (this.id == compare.id);
	}
}

// Item Obj:
class ItemContent {
	constructor(id, contentId, listId) {
		this.id = id;
		this.contentId = contentId;
		this.listId = listId;
	}

	equals(compare) {
		return (this.id == compare.id);
	}
}