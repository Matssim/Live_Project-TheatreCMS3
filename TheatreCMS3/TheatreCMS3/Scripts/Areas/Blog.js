//VIEW AUTHOR DETAILS FUNCTION

//Uses the jQuery attribute "starts with selector to identify the Author Details buttons for each partial view/BlogAuthor object 
$("[id^=authorDetailsBtn]").on('click',function () {
    //Establishes the local authorId variable for each iteration(Blog Author) using the .data() method to call on each data-
    // element with the "author-id" addition (i.e. each element with the data-author-id attribute), then assigns its HTML value
    // to the variable.
    var authorId = $(this).data('author-id');
    //Concatenates the section id to the id of each iteration(Blog Author) and adds/removes classes to show the Author Details
    // section and hide the Blog Posts section
    $("#authorDetails-" + authorId).addClass("blog_author-details-show_content").removeClass("blog_author-details-hide_content");
    $("#blogPosts-" + authorId).addClass("blog_author-details-hide_content").removeClass("blog_author-details-show_content");
    //Concatenates the section id to the id of each iteration(Blog Author) and adds/removes classes to color the Author Details
    // button green(active) and Blog Posts button gray(inactive)
    $("#authorDetailsBtn-" + authorId).addClass("btn-success").removeClass("btn-dark");
    $("#blogPostsBtn-" + authorId).addClass("btn-dark").removeClass("btn-success");
});


// VIEW BLOG POSTS FUNCTION

//Uses the jQuery attribute "starts with selector to identify the Blog Posts buttons for each partial view/BlogAuthor object
$("[id^=blogPostsBtn]").on('click', function () {
    //Establishes the local authorId variable for each iteration(Blog Author) using the .data() method to call on each data-
    // element with the "author-id" addition (i.e. each element with the data-author-id attribute), then assigns its HTML value
    // to the variable.
    var authorId = $(this).data('author-id');
    //Concatenates the section id to the id of each iteration(Blog Author) and adds/removes classes to show the Blog Posts
    // section and hide the Author Details section
    $("#blogPosts-" + authorId).addClass("blog_author-details-show_content").removeClass("blog_author-details-hide_content");
    $("#authorDetails-" + authorId).addClass("blog_author-details-hide_content").removeClass("blog_author-details-show_content");
    //Concatenates the section id to the id of each iteration(Blog Author) and adds/removes classes to color the Blog Posts
    // button green(active) and Author Details button gray(inactive)
    $("#blogPostsBtn-" + authorId).addClass("btn-success").removeClass("btn-dark");
    $("#authorDetailsBtn-" + authorId).addClass("btn-dark").removeClass("btn-success");
});


// DELETE BLOG AUTHOR MODAL

//Uses the jQuery attribute "starts with selector to identify the delete modal buttons for each partial view/BlogAuthor object
$("[id^=deleteModalBtn]").on('click', function () {
    //Establishes the local authorId variable for each iteration(Blog Author) using the .data() method to call on each data-
    // element with the "author-id" addition (i.e. each element with the data-author-id attribute), then assigns its HTML value
    // to the variable.
    var authorId = $(this).data('author-id');
    //Concatenates the section id to the id of each iteration(Blog Author) and adds/removes classes to show the delete modal
    $("#delete_modal-" + authorId).addClass("blog_author-index-delete_modal").removeClass("blog_author-index-hide_modal");
});

//Uses the jQuery attribute "starts with selector to identify the close modal buttons for each partial view/BlogAuthor modal
$("[id^=closeModalBtn]").on('click', function () {
    //Establishes the local authorId variable for each iteration(Blog Author) using the .data() method to call on each data-
    // element with the "author-id" addition (i.e. each element with the data-author-id attribute), then assigns its HTML value
    // to the variable.
    var authorId = $(this).data('author-id');
    //Concatenates the section id to the id of each iteration(Blog Author) and adds/removes classes to hide the delete modal
    $("#delete_modal-" + authorId).addClass("blog_author-index-hide_modal").removeClass("blog_author-index-delete_modal");
});

//Uses the jQuery attribute "starts with selector to identify the confirm deletion buttons for each partial view/BlogAuthor modal
$("[id^=confirmDeleteBtn]").on('click', function () {
    //Establishes the local authorId variable for each iteration(Blog Author) using the .data() method to call on each data-
    // element with the "author-id" addition (i.e. each element with the data-author-id attribute), then assigns its HTML value
    // to the variable.
    var authorId = $(this).data('author-id');
    //Sends an asynchronous POST request to the ModalDelete controller method, passing in the BlogAuthor id as an argument, which
    // prompts that object to be identified and deleted without reloading the view. 
    $.ajax({
        url: window.location.origin + "/BlogAuthor/ModalDelete",
        type: 'POST',
        data: { id: authorId },
        //Based on the ModalDelete method's JSON return value, if the operation was successfull a jQuery function is performed on
        // the BlogAuthor object's entire section. If not, an alert window with an error message is promted to the browser
        success: function () {
            $('#blogAuthor-' + authorId).fadeOut(2000);
        },
        error: function () {
            alert("An error occurred while deleting the author.");
        }
    });
    //Concatenates the section id to the id of each iteration(Blog Author) and adds/removes classes to hide the delete modal
    $('#delete_modal-' + authorId).addClass("blog_author-index-hide_modal").removeClass("blog_author-index-delete_modal");
});
