# Live Project - TheatreCMS3
In this project I worked on a team to develop an interactive website, for managing the content and productions for a theatre/acting company. The project is divided into functional areas, where I was assigned to the blog area, working primarily on the BlogAuthor section during my sprint. As the name suggest, this section is a CMS, where users who are not necessarily tech savvy can manage the profiles of contributors to the site’s blog.  

The project is built using ASP.NET MVC and the Entity framework and there were essentially 3 main objectives to building the BlogAuthor section: 
* [Setting up the BlogAuthor model and CRUD pages](#model-and-crud-pages) 
* [Creating a profile card UI structure](#profile-card-ui)  
* [Setting up partial views and an asynchronous delete modal on the index page](#partial-views-and-async-delete-modal)

These objectives had to be completed within the confines of the project’s predetermined styling, naming conventions and file structure.


## Model and CRUD pages 
Jump to: [Page Top](#live-project---theatrecms3) | [Profile Card UI](#profile-card-ui) | [Partial views and async delete modal](#partial-views-and-async-delete-modal)
In addition to an Id/primary key property, the BlogAuthor object tracks 3 required properties: the author’s name, bio and the date that they joined, and an optional property for when they left.  

    public class BlogAuthor
    {
        public int BlogAuthorId { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public DateTime Joined { get; set; }
        public DateTime? Left { get; set; }
    } 

I tied the <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Models/BlogAuthor.cs">BlogAuthor model</a> to the project’s <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Models/IdentityModels.cs">Identity Models<a> and used the Entity framework package to scaffold the <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Create.cshtml">Create</a>, <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Delete.cshtml">Delete</a>, <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Details.cshtml">Details</a>, <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Edit.cshtml">Edit</a> and <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Index.cshtml">Index</a> pages.  

For the front-end on the CRUD pages, I built most of the required structure with Bootstrap’s flexbox grid structure, adding a few <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Content/Areas/Blog.css">Custom CSS</a> classes to align the pages with the project’s color palette.   

    .blog_author-create_edit-container {
        background-color: #F04D44;
        border-radius: 3vw;
        margin: 5vw;
        padding: 3%;
    }
    
    .blog_author-create_edit-name_bio_input {
        min-width: 100px;
    }
    
    .blog_author-create_edit-btn_container {
        margin-top: 3vw;
    }
    
    .blog_author-create_edit-btn {
        color: white;
        text-decoration: none;
    }
    
    .blog_author-create_edit-warning_text {
        color: white;
    }

For the <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Create.cshtml">Create</a> and <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Edit.cshtml">Edit</a> views, I also adjusted the type value for the Joined and Left properties’ input fields to “date”, so they present a more user friendly datepicker interface. For the Edit view, I also introduced some razor syntax to the values of these fields, to make sure the fields populated on initial load.  

```html
    <div class="form-row d-flex justify-content-center">
        <div class="form-group">
            @Html.LabelFor(model => model.Joined, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                <input type="date" class="form-control" name="Joined" value="@(Model.Joined.ToString("yyyy-MM-dd"))" />
                @Html.ValidationMessageFor(model => model.Joined, "", new { @class = "blog_author-create_edit-warning_text" })
            </div>
        </div>
        <div class="form-group">
            @Html.LabelFor(model => model.Left, htmlAttributes: new { @class = "control-label col-md-2" })
            <div class="col-md-10">
                <input type="date" class="form-control" name="Left" value="@(Model.Left.HasValue ? Model.Left.Value.ToString("yyyy-MM-dd") : string.Empty)" />
                @Html.ValidationMessageFor(model => model.Left, "", new { @class = "blog_author-create_edit-warning_text" })
            </div>
        </div>
    </div> 
```

## Profile Card UI 
Jump to: [Page Top](#live-project---theatrecms3) | [Model and CRUD pages](#model-and-crud-pages) | [Partial views and async delete modal](#partial-views-and-async-delete-modal)

I was tasked with building an author card structure for the Details and Delete views, with specific requirements for social media buttons, positioning of the contents, and the ability to toggle between author details and their blog posts (which would later be connected with the separate Blog Posts section to display in the card). There were also requirements to add icons to the buttons and functional styling changes that indicates which section for the card that the user is viewing.  

![AUTHOR CARD DEMO](https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/PresentationMaterials/AuthorCardDemo-ezgif.com-video-to-gif-converter.gif) 

For the UI structure and button styling for the card I used Bootstrap and for the icons, I deployed classes from the fontawesome library. I added a few <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Content/Areas/Blog.css">Custom CSS</a> classes to align the pages with the project’s color palette, override font-styling for links etc. I also used custom CSS to enable the toggle functionality. Specifically, I added <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Scripts/Areas/Blog.js">jQuery</a>, triggered by the buttons, to add/remove classes that determine whether certain sections are shown/hidden and how buttons are styled.  

    //VIEW AUTHOR DETAILS FUNCTION
    $("[id^=authorDetailsBtn]").on('click',function () {
        var authorId = $(this).data('author-id');
        $("#authorDetails-" + authorId).addClass("blog_author-details-show_content").removeClass("blog_author-details-hide_content");
        $("#blogPosts-" + authorId).addClass("blog_author-details-hide_content").removeClass("blog_author-details-show_content");
        $("#authorDetailsBtn-" + authorId).addClass("btn-success").removeClass("btn-dark");
        $("#blogPostsBtn-" + authorId).addClass("btn-dark").removeClass("btn-success");
    });
    
    //VIEW BLOG POSTS FUNCTION
    $("[id^=blogPostsBtn]").on('click', function () {
        var authorId = $(this).data('author-id');
        $("#blogPosts-" + authorId).addClass("blog_author-details-show_content").removeClass("blog_author-details-hide_content");
        $("#authorDetails-" + authorId).addClass("blog_author-details-hide_content").removeClass("blog_author-details-show_content");
        $("#blogPostsBtn-" + authorId).addClass("btn-success").removeClass("btn-dark");
        $("#authorDetailsBtn-" + authorId).addClass("btn-dark").removeClass("btn-success");
    });

Profile card CSHTML:

```html
    <div class="container blog_author-details-main_container" id="blogAuthor-@Model.BlogAuthorId">
    
        <div class="row justify-content-md-center">
            <div class="col-md-auto blog_author-details-nav_container">
                @*Assigns an id to both the buttons and a data-attribute based on the model id for each object*@
                <button class="btn btn-success" id="authorDetailsBtn-@Model.BlogAuthorId" data-author-id="@Model.BlogAuthorId">Author Details</button>
                <button class="btn btn-dark" id="blogPostsBtn-@Model.BlogAuthorId" data-author-id="@Model.BlogAuthorId">Blog Posts</button>
            </div>
        </div>
    
        <div class="row blog_author-details-content_container">
            <div class="col">
                <img src="\Content\images\placeholder.jpg" />
            </div>
            <div class="col d-flex flex-column blog_author-details-show_content" id="authorDetails-@Model.BlogAuthorId">
                <div class="row align-items-center">
                    <div class="col justify-content-md-left">
                        <h3>@Html.DisplayFor(model => model.Name)</h3>
                    </div>
                    <div class="col-md-auto justify-content-md-right">
                        <a href="https://www.facebook.com" class="blog_author-details-social_btn"><i class="fab fa-facebook fa-lg"></i></a>
                        <a href="https://www.instagram.com" class="blog_author-details-social_btn"><i class="fab fa-instagram fa-lg"></i></a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-auto">@Html.DisplayFor(model => model.Bio)</div>
                </div>
                <div class="blog_author-details-date_container">
                    <div class="row">
                        <div class="col-md-auto">
                            <h6>Joined Date</h6>
                            @Html.DisplayFor(model => model.Joined)
                        </div>
                        <div class="col-md-auto">
                            <h6>Left Date</h6>
                            @Html.DisplayFor(model => model.Left)
                        </div>
                        <div class="col d-flex justify-content-end blog_author-details-btn_container">
                            <a href="@Url.Action("Edit", new { id = Model.BlogAuthorId })" class="btn btn-success text-nowrap"><i class="fas fa-edit fa-sm"></i> Edit</a>
                            <a class="blog_author-index-btn btn btn-danger" id="deleteModalBtn-@Model.BlogAuthorId" data-author-id="@Model.BlogAuthorId"><i class="fas fa-trash-alt fa-lg"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col d-flex flex-column blog_author-details-hide_content" id="blogPosts-@Model.BlogAuthorId">
                <div class="row align-items-center">
                    <p>(Implement in future stories)</p>
                </div>
                <div class="row blog_author-details-date_container">
                    <div class="col d-flex justify-content-end blog_author-details-btn_container">
                        <a href="@Url.Action("Edit", new { id = Model.BlogAuthorId })" class="btn btn-success text-nowrap"><i class="fas fa-edit fa-sm"></i> Edit</a>
                        <a class="blog_author-index-btn btn btn-danger" id="deleteModalBtn-@Model.BlogAuthorId" data-author-id="@Model.BlogAuthorId"><i class="fas fa-trash-alt fa-lg"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
```

## Partial views and async delete modal 
Jump to: [Page Top](#live-project---theatrecms3) | [Model and CRUD pages](#model-and-crud-pages) | [Profile Card UI](#profile-card-ui)

For the final user stories in the blog author section, I was tasked with making the index page present the list of authors in their respective profile cards, as designed for the <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Details.cshtml">Details</a> and <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Delete.cshtml">Delete</a> views, instead of the standard table structure, created in the Entity scaffold. I accomplished this by creating a partial view and replacing most of the contents of the <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Views/BlogAuthor/Index.cshtml">index</a> view with a C# foreach statement, that iterates over each author in the database and passes them as parameters for renditions of the partial view.  

```html
    @foreach (var item in Model)
    {
        <div>
            @Html.Partial("_BlogAuthor", item)
        </div>
    }
```

I was also tasked with making an interactive modal, that would allow the user to delete authors from the index page without leaving or reloading the site. Another requirement was for the deleted author card to fade out.  

![ASYNC DELETE MODAL DEMO](https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/PresentationMaterials/DeleteModalDemo-ezgif.com-video-to-gif-converter.gif)

I accomplished this by writing <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Scripts/Areas/Blog.js">jQuery and an AJAX function</a>, as well as a modal in the partial view and a <a href="https://github.com/Matssim/Live_Project-TheatreCMS3/blob/main/TheatreCMS3/TheatreCMS3/Areas/Blog/Controllers/BlogAuthorController.cs">JSON controller class</a>. I used the same jQuery principles to hide/show the delete modal that I used to toggle between the author details/blog posts in the profile cards. 

Delete modal CSHTML:

```html
    <div id="delete_modal-@Model.BlogAuthorId" class="blog_author-index-hide_modal">
        <div class="blog_author-index-delete_content">
            <div class="row justify-content-md-center">
                <h3>Are you sure you want to delete @Html.DisplayFor(model => model.Name)?</h3>
            </div>
            <div class="row justify-content-md-center">
                <div class="col-md-auto justify-content-md-right blog_author-details-btn_container">
                    <div id="confirmDeleteBtn-@Model.BlogAuthorId" data-author-id="@Model.BlogAuthorId" class="btn btn-danger">Delete</div>
                    <div id="closeModalBtn-@Model.BlogAuthorId" data-author-id="@Model.BlogAuthorId" class="col-md-auto btn btn-dark">Cancel</div>
                </div>
            </div>
        </div>
    </div> 
```
  
Controller method:

    [HttpPost]
    public JsonResult ModalDelete(int id)
    {
        var blogAuthor = db.BlogAuthors.Find(id);
        if (blogAuthor == null)
        {
            return Json(new { success = false });
        }
        db.BlogAuthors.Remove(blogAuthor);
        db.SaveChanges();
        return Json(new { success = true });
    }
    
Open/close modal jQuery
    
    $("[id^=deleteModalBtn]").on('click', function () {
        var authorId = $(this).data('author-id');
        $("#delete_modal-" + authorId).addClass("blog_author-index-delete_modal").removeClass("blog_author-index-hide_modal");
    });
    
    $("[id^=closeModalBtn]").on('click', function () {
        var authorId = $(this).data('author-id');
        $("#delete_modal-" + authorId).addClass("blog_author-index-hide_modal").removeClass("blog_author-index-delete_modal");
    });

Initially, I had some issues with getting the AJAX function to work. By using breakpoints in Visual Studio, I identified that the controller method wasn’t being called and by inspecting the console in the browser, I noticed the URL property was not being generated correctly. This was due to my initial code following Razor syntax, i.e.

    url: '@Url.Action("ModalDelete", "BlogAuthor")',
    
However, since Razor is evaluated on the server side and JavaScript runs on the client side the data did not process correctly. I fixed this bug by changing the URL to JavaScript as shown in the final code below:

    $("[id^=confirmDeleteBtn]").on('click', function () {
        var authorId = $(this).data('author-id');
        $.ajax({
            url: window.location.origin + "/BlogAuthor/ModalDelete",
            type: 'POST',
            data: { id: authorId },
            success: function () {
                $('#blogAuthor-' + authorId).fadeOut(2000);
            },
            error: function () {
                alert("An error occurred while deleting the author.");
            }
        });
        $('#delete_modal-' + authorId).addClass("blog_author-index-hide_modal").removeClass("blog_author-index-delete_modal");
    }); 
    
Jump to: [Page Top](#live-project---theatrecms3) | [Model and CRUD pages](#model-and-crud-pages) | [Profile Card UI](#profile-card-ui) | [Partial views and async delete modal](#partial-views-and-async-delete-modal)
