/*
    Author: Jaco du Plooy
*/

// Declare user vars:
var user, email, uid, name;

// Init the auth vars:
function init () {
	//Initialise user object
	user = firebase.auth().currentUser;

	if (user != null) {
		// name = user.displayName;				//only works with google implementation
		email = user.email;
		uid = user.uid;

		startStopDataTransference(true);		//CallsfirebaseHandler's function
	}
	else {
		user = null;
		name = null;
		email = null;
		uid = null;

		startStopDataTransference(false);		//CallsfirebaseHandler's function
	}
}

// See if user currently signed in:
function isCurrentUserSignedIn () {
	return (user != null);
}

// Handle user authentification (Sign in with email and password):
function cusSignIn (email, password) {
	defaultAuth.signInWithEmailAndPassword(email, password).then(function() {
		// Successful.
		init();
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		alert("Error: " + errorMessage);
	});
}

// Handle user creation (New email and password):
function cusCreateUser (email, password, _name) {
	defaultAuth.createUserWithEmailAndPassword(email, password).then(function() {
		// Successful.
		name = _name;
		addNewUserToDb(email, _name);

		init();
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		alert("Error: " + errorMessage);
	});
}

// Add new user entry to db
function addNewUserToDb (email, _name) {
	user = firebase.auth().currentUser;

	if (user != null) {
		uid = user.uid;

		defaultDatabase.ref('users/' + uid).set({
			name: _name
		});
	}
}

// Handle user logout:
function cusSignOut () {
	defaultAuth.signOut().then(function() {
		// Sign-out successful.
		init();
		location.reload();
	}).catch(function(error) {
		// An error happened.
		var errorCode = error.code;
		var errorMessage = error.message;
		//alert("Error " + errorCode + ": " + errorMessage);
	});
}