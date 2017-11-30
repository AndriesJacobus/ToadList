/*
    Author: Jaco du Plooy
*/

/*
=================================================================================================
 List Object handler:
=================================================================================================
*/
var toadLists = [];
var currentListOpen;

function changeCurrentListTo(id) {
	currentListOpen = id;

	// Update items shown
	hideList(id);
}

function addToadList (id, name) {
	// Add to list
	if (toadLists.length == 0) {
		// First list: set list banner name
		currentListOpen = id;
		$("#listBannerName").html(name);
	}

	toadLists.push(new ToadList(id, name));

	var idText = String('"' + "showList('" + String(id) + "')" + '"');
	//var clickTrue = String('"' + "event.preventDefault(); " + "flipCheckedFor ('" + String(id) + "', true)" + '"');

	// Add to view
	var add = 	"<li id = '" + id + "'>";
    add +=		"<a id = 'listName' class='waves-effect hoverable' onclick = " + idText + ">" + name + "</a>"
    add +=      "<div class='divider'></div>"
    add +=      "</li>";

	$("#slide-out").append(add);
}

function showList(listId) {
	//alert("Here: " + listId);
	if (currentListOpen != listId) {
		changeCurrentListTo(listId);
	}
}

function updateToadList (id, name) {
	//alert("updateToadList: " + id + ", " + name + ". ListLength: " + toadLists.length);

	//First check if list exists
	var currList = null;
	for (var i = 0; i < toadLists.length; i++) {
		var list = toadLists[i];

		if (list.id == id) {
			currList = list;
			break;
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
	$("#listBannerName").html(name);

	//Update list
	currList.name = name;
}

function removeList (id) {
	// Update view
	$("#" + id + "").remove();

	//Update list
	for (var i = 0; i < toadLists.length; i++) {
		list = toadLists[i];
		if (list.id == id) {
    		toadLists.splice(i, 1);
    		break;
		}
	}
}

function addNewToadListToDatabase (_name) {
	/* Get Date */
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();

	if(dd < 10){
	    dd = '0' + dd;
	} 
	if(mm < 10){
	    mm = '0' + mm;
	}

	var today = dd+'/'+mm+'/'+yyyy;

	/* Create new List */
	var newListRef = listsRef.push({
		dateCreated: "" + today + "",
		name: "" + _name + "",
		owner: "" + uid + ""
	});

	Materialize.toast("List Created: " + _name, 2000, 'rounded');
}

function deleteList (id) {
	// Delete list from database
}

/*
=================================================================================================
 Item Object handler:
=================================================================================================
*/
var items = [];

function addToItemsIfOwner(itemId, listId, contentId) {
	//alert("Here 2: " + itemId + ", " + listId + ", " + contentId);
	getListOwner (itemId, listId, contentId);
}

function getListOwner (itemId, listId, contentId) {
	//Check to see if list to which the item belongs is owned by the current user
	listsRef.child(listId).once("value", function(snapshot){
		//alert("Here 2");

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
    if ($("#noItemsYet").css("display") == "block" && list == currentListOpen) {
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

	items.push(new Item(id, contentId, list));

	// Get item content and add to list of content if the current list is correct
    contentRef.child(contentId).once("value", function(snapshot){

	    //alert("Item content: " + snapshot.val());
	    itemContents.push(new ItemContent(contentId, snapshot.val()));

		// Add item with message to view
		if (currentListOpen == list) {

			//Get checked value
			itemRef.child(id).once("value", function(itemRefData){

				var checked = itemRefData.val().checked;
				var clickTrue = String('"' + "event.preventDefault(); " + "flipCheckedFor ('" + String(id) + "', true)" + '"');
				var clickFalse = String('"' + "event.preventDefault(); " + "flipCheckedFor ('" + String(id) + "', false)" + '"');

				var add = 	"<div id = '" + id + "'>"
			    add +=			"<br/>"
			    add +=			"<p>"

			    if (checked) {
			    	// checked="checked"
					add +=			"<a id = 'checkItem' class='waves-effect hoverable' style = 'margin: 10px;' onclick = " + clickFalse + ">"
			    	add +=				"<input id='" + contentId + "in' type='checkbox' checked='checked'/>"
			    }
			    else
			    {
					add +=			"<a id = 'checkItem' class='waves-effect hoverable' style = 'margin: 10px;' onclick = " + clickTrue + ">"
			    	add +=				"<input id='" + contentId + "in' type='checkbox'/>"
			    }

				add +=					"<label id='" + contentId + "lbl' for='" + contentId + "in'>" + snapshot.val() + "</label>"
			    add +=				"</a>"
				add +=			"</p>"
			    add +=		"</div>"

				$("#listItemContent").append(add);
			    
			}, function (errorObject) {
		    	console.log("the read failed: " + errorObject.code); 
			});
    	}
	}, function (errorObject) {
    	console.log("the read failed: " + errorObject.code); 
	});
}

function updateItem (itemId, listId, contentId) {
	//First check if Item exists
	var currItem = null;
	for (var i = 0; i < items.length; i++) {
		var item = items[i];

		if (item.id == itemId) {
			currItem = item;
			break;
		}
	}

	if (currItem == null) {
		// The list was not found, add new list
		addToItemsIfOwner(itemId, listId, contentId);
		return;
	}

	// Item exists in list. Make sure list is owned by current user
	listsRef.child(listId).once("value", function(snapshot){
		//alert("Here 2");

	    if (snapshot.val().owner == uid) {
	    	var needsFreshAdd = false;

			// Item is owned by current user. Update item content
			if (currItem.list != listId) {
				// The message list changed. Update view required
			    // Check that the current list is correct
			    if (currentListOpen == listId) {
			    	// Add the item content to the view
		    		needsFreshAdd = true;
			    }
			    else {
		    		// Item needs to be removed from view
					removeItemFromView (itemId);
			    }

				currItem.list = listId;
			}

			// Check that the current list is correct
		    if (currentListOpen == listId) {
				contentRef.child(contentId).once("value", function(snapshot){

					if (needsFreshAdd) {
						// Add content to view freshly
						addContentToView(itemId, contentId, snapshot.val());
					}
					else {
						// Update existing content view
				    	$("#" + contentId + "lbl").html(snapshot.val());

						//Get checked value
						itemRef.child(itemId).once("value", function(itemRefData){

							var checked = itemRefData.val().checked;
							var clickTrue = String("flipCheckedFor ('" + String(itemId) + "', true)");
							var clickFalse = String("flipCheckedFor ('" + String(itemId) + "', false)");

						    if (checked) {
						    	$("#" + contentId + "in").prop('checked', true);

						    	// Update onclick
						    	$("#" + contentId + "in").parent().attr("onclick", "event.preventDefault(); " + clickFalse);
						    }
						    else {
						    	$("#" + contentId + "in").prop('checked', false);

						    	// Update onclick
						    	$("#" + contentId + "in").parent().attr("onclick", "event.preventDefault(); " + clickTrue);
						    }
						    
						}, function (errorObject) {
					    	console.log("the read failed: " + errorObject.code); 
						});
					}

				    // Update itemContent
				    currItem.contentId = contentId;

				}, function (errorObject) {
			    	console.log("the read failed: " + errorObject.code); 
				});
		    }
		    else {
		    	// Item needs to be removed from view
				removeItemFromView (itemId);
		    }
		}
		else {
			// Item is NOT owned by current user. Remove item from list and view
			removeItem (itemId);
		}

	}, function (errorObject) {
    	console.log("the read failed: " + errorObject.code); 
	});
}

function removeItem (itemId) {
	// Remove from view
	$("#" + itemId + "").remove();
	var currIitemContentId = null;

	// Remove Item from list
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (item.id == itemId) {
			currIitemContentId = item.contentId;
    		items.splice(i, 1);
    		break;
		}
	}

	if (currIitemContentId != null) {
		// Item was found. Remove Item Content from list
		for (var i = 0; i < itemContents.length; i++) {
			var itemContent = itemContents[i];
			if (itemContent.id == currIitemContentId) {
				// Found item content
	    		itemContents.splice(i, 1);
	    		break;
			}
		}
	}
}

function removeItemFromView (itemId) {
	// Remove from view
	$("#" + itemId + "").remove();
}

function addContentToView(itemId, contentId, message) {
	// Add item with message to view
	//alert("HERE: " + itemId + ", " + contentId + ", " +  message);

	//Get checked value
	itemRef.child(itemId).once("value", function(itemRefData){

		var checked = itemRefData.val().checked;
		var clickTrue = String('"' + "event.preventDefault(); " + "flipCheckedFor ('" + String(itemId) + "', true)" + '"');
		var clickFalse = String('"' + "event.preventDefault(); " + "flipCheckedFor ('" + String(itemId) + "', false)" + '"');

	    var add = 	"<div id = '" + itemId + "'>"
	    add +=			"<br/>"
	    add +=			"<p>"

	    if (checked) {
	    	// checked="checked"
			add +=			"<a id = 'checkItem' class='waves-effect hoverable' style = 'margin: 10px;' onclick = " + clickFalse + ">"
	    	add +=				"<input id='" + contentId + "in' type='checkbox' checked='checked'/>"
	    }
	    else
	    {
			add +=			"<a id = 'checkItem' class='waves-effect hoverable' style = 'margin: 10px;' onclick = " + clickTrue + ">"
	    	add +=				"<input id='" + contentId + "in' type='checkbox'/>"
	    }

		add +=					"<label id='" + contentId + "lbl' for='" + contentId + "in'>" + message + "</label>"
	    add +=				"</a>"
		add +=			"</p>"
	    add +=		"</div>"

		$("#listItemContent").append(add);
	    
	}, function (errorObject) {
    	console.log("the read failed: " + errorObject.code); 
	});
}

function flipCheckedFor (itemId, newChecked) {
	var itemToUpdate = itemRef.child(itemId);
	itemToUpdate.update({
	  "checked": newChecked
	});
}

function deleteItem (itemId) {
	// Delete from database
}

function hideList(id) {
	// Hide current list being shown

	// Hide old view
	$("#mainListView").animate({
        opacity: 0.0,
        }, 250
        , function () {
        	/* Update view */

        	var currListHasItems = false;

		    // Remove old content
			for (var i = 0; i < items.length; i++) {
				var tempItem = items[i];

				if (tempItem.list != currentListOpen) {
					//alert("Calling remove for " + tempItem.id);
					removeItemFromView(tempItem.id);
				}
				else if (!currListHasItems) {
					currListHasItems = true;
				}
			}

			// Show proper message
			if (currListHasItems) {
			    if ($("#noItemsYet").css("display") == "block") {

			        $("#noItemsYet").animate({
			            opacity: 0.0,
			            }, 10
			        );
			        $("#noItemsYet").css("display", "none");

			        // Show new message
			        $("#normalItemGreeting").css("display", "block");
			        $("#normalItemGreeting").animate({
			            opacity: 1.0,
			            }, 10
			        );
			    }
			}
			else {

			    if ($("#normalItemGreeting").css("display") == "block") {

			        $("#normalItemGreeting").animate({
			            opacity: 0.0,
			            }, 10
			        );
			        $("#normalItemGreeting").css("display", "none");

			        // Show new message
			        $("#noItemsYet").css("display", "block");
			        $("#noItemsYet").animate({
			            opacity: 1.0,
			            }, 10
			        );
			    }
			}

		    // Get list obj
		    var currList = null;
		    for (var i = 0; i < toadLists.length; i++) {
				var list = toadLists[i];

				if (list.id == currentListOpen) {
					currList = list;
		    		break;
				}
			}

			if (currList != null) {
				// Update name
		    	$("#listBannerName").html(currList.name);

		    	// Get items and add item content to view
		    	for (var i = 0; i < items.length; i++) {
					var item = items[i];

					//alert("Item: " + item.id + ", " + item.list + ", " + item.contentId)
					if (item.list == currentListOpen) {

						// Find content message
						var contentMessage = null;

						for (var i = 0; i < itemContents.length; i++) {
							var itemContent = itemContents[i];
							//alert("ItemContent: " + itemContent.id + ", " + itemContent.message);

							if (itemContent.id == item.contentId) {
								// Found item content
								//alert("Inside: " + itemContent.message);
					    		contentMessage = itemContent.message;
					    		break;
							}
						}

						// Add item to view
						if (contentMessage != null) {
							addContentToView(item.id, item.contentId, contentMessage);
						}

			    		//break;		// Don't break, rather continue
					}
				}
			}

			// Show updated view
			$("#mainListView").animate({
		        opacity: 1.0,
		        }, 500
		    );
        }
    );
}

function addItemToDatabase(contentMessage) {
	/* First add new content */
	var newItemContentRef = contentRef.push(contentMessage);
	//newItemContentRef.set(contentMessage);

	// Get contentId
	var currContentId = newItemContentRef.key;

	/* Create new Item for Item Content */
	var newItemRef = itemRef.push({
		contentId: "" + currContentId + "",
		list: "" + currentListOpen + ""
	});
	//newItemRef.set(contentMessage);
}

/*
=================================================================================================
 ItemContent Object handler:
=================================================================================================
*/
var itemContents = [];

function updateItemContent (contentId, message) {
	// Get list that item belongs to
	var listId = null;
	for (var i = 0; i < items.length; i++) {
		var item = items[i];

		if (item.contentId == contentId) {
			listId = item.list;
			break;
		}
	}

	if (listId != null && currentListOpen == listId) {
		// List is owned by current user. Update view required
	    $("#" + contentId + "lbl").html(message);
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