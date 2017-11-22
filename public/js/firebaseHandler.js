
/*
=================================================================================================
 Initialize Firebase:
=================================================================================================
*/

var config = {
    apiKey: "AIzaSyDVU2n4xCxj6hILQMKfyVkDJfuy3bVahj4",
    authDomain: "toadlist.firebaseapp.com",
    databaseURL: "https://toadlist.firebaseio.com",
    projectId: "toadlist",
    storageBucket: "",
    messagingSenderId: "1079184138203"
};
firebase.initializeApp(config);

// Getting 
var defaultDatabase = firebase.database();
var commentsRef = defaultDatabase.ref('ToadLists/');

// Handle db object
commentsRef.on('child_added', function(data) {
	addToadList(data.key, data.val().name);
});

commentsRef.on('child_changed', function(data) {
	updateToadList(data.key, data.val().name);
});

commentsRef.on('child_removed', function(data) {
	//deleteComment(postElement, data.key);
});

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
    add +=		"<a class='waves-effect hoverable' href='#!'>" + name + "</a>"
    add +=      "<div class='divider'></div>"
    add +=      "</li>";

	$("#slide-out").append(add);
}

function updateToadList (id, name) {
	// Update view
	$("#" + id + "").append(add);

	//Update list
	for (var list in toadLists) {
		if (list.id == id) {
			list.name = name;
		}
	}
}

/*
=================================================================================================
 Stored objects:
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