/* Some code to facilitate element behaviour */

$( document ).ready(function() {

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