/*
    Author: Jaco du Plooy
*/

// Initialize Firebase:
var config = {
    apiKey: "AIzaSyDVU2n4xCxj6hILQMKfyVkDJfuy3bVahj4",
    authDomain: "toadlist.firebaseapp.com",
    databaseURL: "https://toadlist.firebaseio.com",
    projectId: "toadlist",
    storageBucket: "",
    messagingSenderId: "1079184138203"
};
firebase.initializeApp(config);

// Setup default accounts
var defaultAuth = firebase.auth();
var defaultDatabase = firebase.database();

// Setup authentification
init();		//Calls authHandler's setup function

// Declare database reference objects
var userRef, listsRef, itemRef, contentRef;

// Called when a user is logged in or out. Either stops or starts event listeners
function startStopDataTransference (start) {
	if (!start) {
		// Request is to stop data transference
		userRef = null;
		listsRef = null;
		itemRef = null;
		contentRef = null;
	}
	else
	{
		if (isCurrentUserSignedIn()) {
			//alert("Hello " + email + "! Welcome to your ToadList!");		//Say hello

			$('#signInModal').modal('close');
			$('#signUpModal').modal('close');

       		// Animate page fade in
			$("#showbox").animate({
	            opacity: 1.0,
	            }, 1000
	        );

			// Getting  References
			userRef = defaultDatabase.ref('users/');

				// Handle User objects
				userRef.on('child_added', function(data) {
					if (data.key == uid) {
						//Our user was found
						name = data.val().name;
						//alert("Your name is: " + name);
					}
				});

				userRef.on('child_changed', function(data) {
					if (data.key == uid) {
						//Our user was updated
						name = data.val().name;
					}
				});

				userRef.on('child_removed', function(data) {
					// Users removed
					alert("Sorry, your account has been suspended.\nPlease contact us for more information.");
					cusSignOut();																//Calls authHandler's sign out function
				});

			listsRef = defaultDatabase.ref('ToadLists/');

				// Handle List objects
				listsRef.on('child_added', function(data) {
					if (data.val().owner == uid) {
						// List for our user
						addToadList(data.key, data.val().name);									//Calls objectHandler's function
					}
				});

				listsRef.on('child_changed', function(data) {
					if (data.val().owner == uid) {
						// List for our user
						updateToadList(data.key, data.val().name);								//Calls objectHandler's function
					}
				});

				listsRef.on('child_removed', function(data) {
					if (data.val().owner == uid) {
						// List for our user
						removeList(data.key);													//Calls objectHandler's function
					}
				});

			itemRef = defaultDatabase.ref('Items/');

				// Handle Item objects
				itemRef.on('child_added', function(data) {
					// Getting all original users
					addToItemsIfOwner(data.key, data.val().list, data.val().contentId);			//Calls objectHandler's function
				});

				itemRef.on('child_changed', function(data) {
					// Update users
					updateItem(data.key, data.val().list, data.val().contentId);				//Calls objectHandler's function
				});

				itemRef.on('child_removed', function(data) {
					// Users removed
					removeItem(data.key);														//Calls objectHandler's function
				});

			contentRef = defaultDatabase.ref('content/');

				// Handle Content objects

				// Probably not needed, done implicitly via addItem()
				contentRef.on('child_added', function(data) {
					// Getting all original users 
				});

				contentRef.on('child_changed', function(data) {
					// Update users
					updateItemContent(data.key, data.val());												//Calls objectHandler's function
				});

				// Again: Probably not needed, done implicitly via addItem()
				contentRef.on('child_removed', function(data) {
					// Users removed
				});
		}
	}
}