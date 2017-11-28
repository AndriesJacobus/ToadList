/*
    Author: Jaco du Plooy
*/

/*
=================================================================================================
 List Object handler:
=================================================================================================
*/
var toadLists = [];

function addToadList (id, name) {
	// Add to list
	if (toadLists.length == 0) {
		// First list: set list banner name

		$("#listBannerName").html(name);
	}

	toadLists.push(new ToadList(id, name));

	// Add to view
	var add = 	"<li id = '" + id + "'>";
    add +=		"<a id = 'listName' class='waves-effect hoverable' href='#!'>" + name + "</a>"
    add +=      "<div class='divider'></div>"
    add +=      "</li>";

	$("#slide-out").append(add);
}

function updateToadList (id, name) {
	//First check if list exists
	var currList = null;
	for (var list in toadLists) {
		if (list.id == id) {
			currList = list;
		}
	}

	if (currList == null) {
		// The list was not found, add new list
		addToadList(id, name);
		return;
	}

	/* Else: The list exists, so simply update: */

	// Update view
	$("#" + id + "").children("#listName").html(name);

	//Update list
	currList.name = name;
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
 Item Object handler:
=================================================================================================
*/
var items = [];

function addToItemsIfOwner(itemId, listId, contentId) {

	getListOwner (itemId, listId, contentId);
}

function getListOwner (itemId, listId, contentId) {
	//Check to see if list to which the item belongs is owned by the current user
	listsRef.child(listId).on("value", function(snapshot){

	    if (snapshot.val().owner == uid) {

			// Item is owned by current user, add to list
			addItem(itemId, listId, contentId);
		}

	}, function (errorObject) {
    	console.log("the read failed: " + errorObject.code); 
	});
}

function addItem (id, list, contentId) {
	// Add to items

	// Show right message
    if (items.length == 0) {
        // First time adding item. Hide old message:
        $("#noItemsYet").animate({
            opacity: 0.0,
            }, 1000
        );
        $("#noItemsYet").css("display", "none");

        // Show new message
        $("#normalItemGreeting").css("display", "block");
        $("#normalItemGreeting").animate({
            opacity: 1.0,
            }, 1000
        );
    }

	items.push(new Item(id, list, contentId));

	// Get item content and add to list of content
	contentRef.child(contentId).on("value", function(snapshot){

	    //alert("Item content: " + snapshot.val());
	    itemContents.push(new ItemContent(contentId, snapshot.val()));

	    // If the current list is correct
	    //alert("List: " + list);
	    if (toadLists[0].id == list) {
			// Add to view
		    var add = 	"<div id = '" + id + "'>"
		    add +=			"<br/>"
		    add +=			"<p>"
			add +=				"<a id = 'checkItem' class='waves-effect hoverable' style = 'margin: 10px;'>"
		    add +=					"<input id='" + contentId + "' type='checkbox'/>"
			add +=					"<label for='" + contentId + "'>" + snapshot.val() + "</label>"
		    add +=				"</a>"
			add +=			"</p>"
		    add +=		"</div>"

			$("#listItemContent").append(add);
	    }

	}, function (errorObject) {
    	console.log("the read failed: " + errorObject.code); 
	});
}

function updateItem () {
	//
}

function deleteItem () {
	//
}


/*
=================================================================================================
 ItemContent Object handler:
=================================================================================================
*/
var itemContents = [];

function updateItemContent () {
	//
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
	constructor(id, contentId, list) {
		this.id = id;
		this.contentId = contentId;
		this.list = list;
	}

	equals(compare) {
		return (this.id == compare.id);
	}
}

// Item Obj:
class ItemContent {
	constructor(id, message) {
		this.id = id;
		this.message = message;
	}

	equals(compare) {
		return (this.id == compare.id);
	}
}