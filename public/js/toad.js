/*
    Author: Jaco du Plooy
*/

$( document ).ready(function() {
    /*
    =================================================================================================
     Handle sign-in behaviour:
    =================================================================================================
    */

    $('#signInModal').modal({
            dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: 0.5, // Opacity of modal background
            inDuration: 100, // Transition in duration
            outDuration: 250, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute

            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                console.log(modal, trigger);
            },
            complete: function() {
            } // Callback for Modal close
        }
    );

    $('#signUpModal').modal({
            dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: 0.5, // Opacity of modal background
            inDuration: 100, // Transition in duration
            outDuration: 250, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute

            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                console.log(modal, trigger);
            },
            complete: function() {
            } // Callback for Modal close
        }
    );

    $('#addItemModal').modal({
            dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: 0.5, // Opacity of modal background
            inDuration: 100, // Transition in duration
            outDuration: 250, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute

            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                console.log(modal, trigger);
            },
            complete: function() {
            } // Callback for Modal close
        }
    );

    $('#createToadListModal').modal({
            dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: 0.5, // Opacity of modal background
            inDuration: 100, // Transition in duration
            outDuration: 250, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute

            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                console.log(modal, trigger);
            },
            complete: function() {
            } // Callback for Modal close
        }
    );

    // Create list button link listener
    $('#publishBtn').click(function () {
        // Show Modal
        $('#createToadListModal').modal('open');
    });

    // Sign Up button link listener
    $('#addItemFloatButton').click(function () {
        // Show Add Item Modal
        $('#addItemModal').modal('open');
    });

    // Add item
    $('#addItemButton').click(function () {
        // Check to see if the item box has content
        var content = $('#itemMessage').val();

        //alert("Content: " + content);

        if (content == "") {
            alert("Sorry, the message body cannot be empty.");
        }
        else {
            // Update backend
            addItemToDatabase(content);

            // Reset modal body
            $('#itemMessage').val("");

            // Close modal
            $('#addItemModal').modal('close');
        }
    });

    // Create toad list
    $('#createNewToadListButton').click(function () {
        // Check to see if the item box has content
        var content = $('#toadListName').val();

        //alert("Content: " + content);

        if (content == "") {
            alert("Sorry, the list name cannot be empty.");
        }
        else {
            // Update backend
            addNewToadListToDatabase(content);

            // Reset modal body
            $('#toadListName').val("");

            // Close modal
            $('#createToadListModal').modal('close');
        }
    });

    //Materialize.updateTextFields();
    if (isCurrentUserSignedIn()) {
        $("#showbox").animate({
            opacity: 1.0,
            }, 1000
        );
    }
    else {
        $('#signInModal').modal('open');
    }

    // Sign In button click listener 
    $('#signInButton').click(function () {
        // Handle sign in
        cusSignIn($('#email1').val(), $('#password1').val());        //call authHandler's function
    });

    // Sign Up button click listener
    $('#signUpButton').click(function () {
        // Handle sign in
        alert("Name: " + $('#name').val());
        cusCreateUser($('#email2').val(), $('#password2').val(), $('#name').val());        //call authHandler's function
    });

    // Sign Up button link listener
    $('#signUpButtonLink').click(function () {
        // Handle sign up
        $('#signInModal').modal('close');
        $('#signUpModal').modal('open');
    });

    // Sign In button link listener
    $('#signInButtonLink').click(function () {
        // Handle sign up
        $('#signUpModal').modal('close');
        $('#signInModal').modal('open');
    });

    /*
    =================================================================================================
     Handle some display behaviour:
    =================================================================================================
    */

    var width = $( document ).width() - 100;
    $("#menuBtn").css("left", -width);

    $( window ).resize(function() {
        width = $( document ).width() - 100;
        $("#menuBtn").css("left", -width);
    });

    /* Setup navbar */
    // Initialize collapse button
    $(".button-collapse").sideNav();

    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    //$('.collapsible').collapsible();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) { /* Do Stuff */ }, // A function to be called when sideNav is opened
        onClose: function(el) { /* Do Stuff */ }, // A function to be called when sideNav is closed
        }
    );

    /* Handle button hover style */
    $(".btn").mouseover(function() {
    	$(this).removeClass("light-green");
    	$(this).removeClass("darken-2");

    	$(this).addClass("lime");
    	$(this).addClass("darken-4");
    })
	.mouseout(function() {
    	$(this).removeClass("lime");
    	$(this).removeClass("darken-4");

    	$(this).addClass("light-green");
    	$(this).addClass("darken-2");
	});

    $(".btn-floating").mouseover(function() {

        if ($(this).hasClass("btn-large") || $(this).hasClass("halfway-fab")) {
            $(this).removeClass("light-green");
            $(this).removeClass("darken-2");

            $(this).addClass("lime");
            $(this).addClass("darken-4");
        }
        
    })
    .mouseout(function() {

        if ($(this).hasClass("btn-large") || $(this).hasClass("halfway-fab")) {
            $(this).removeClass("lime");
            $(this).removeClass("darken-4");

            $(this).addClass("light-green");
            $(this).addClass("darken-2");
        }

    });
});