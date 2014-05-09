Templates= {};

Templates.posts = [
"<% _.each(posts, function(posts, index, list) { %>",
"<li data-index= \"<%= index %>\" data-postsid=\"<%= posts._id %>\"><%= posts.content %> <span class= \"glyphicon glyphicon-trash deleteToDo\"</span> </li>",
        "<% }); %>"
].join("\n");

Templates.editModal = [
	"<div class=\"modal-body\">",
      "<div class=\"form-group\">",
          "<label for=\"editModal\"></label>",
          "<input type=\"text\" class=\"form-control editModal\" value=\"<%= post.content %>\">",
      "</div>",
  "</div>",
  "<div class=\"modal-footer\" data-postId=\"<%= post._id %>\">",
  	"<input id=\"editModal\" type=\"hidden\" value=\"<%= post._id %>\">",
    "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>",
    "<button type=\"button\" class=\"btn btn-primary submitupdate\">Save changes</button>",
  "</div>"
].join("\n");
