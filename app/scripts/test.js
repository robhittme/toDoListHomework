
$(function() {
 
    myToDo.init();
 
});
var dataURL = "http://tiy-fee-rest.herokuapp.com/collections/robhittme";
var myToDo = {
        init: function() {
          this.initStyling();
          this.initEvents();
        },
        initStyling: function() {
          this.renderToDo();
        },

        initEvents: function() {
          $("#newListItem").on("submit", this.addToDoItem);
          $(".toDoListContent").on("click", ".deleteToDo", this.checkToDo);
          $(".toDoListContent").on("dblclick", "li", this.dblClickItem);
          $("#editModal").on("click", ".submitupdate", function(e) {
            e.preventDefault();
            var postId= $(this).closest(".modal-footer").data("postid");
            console.log(postId);
            myToDo.updatePost(postId);
          });
        },

        //this is adding everything

        addToDoItem: function(e) {
          e.preventDefault();
          var newListItem = $(".newListItem").val();
          var anotherNewListItem= {
            content:newListItem
          };
          // posts.push(anotherNewListItem);
          myToDo.addToDo(anotherNewListItem);
          myToDo.renderToDo();
                $(".newListItem").val("");
          //adds to the array
        },

        addToDo: function(newToDo) {
          var todoItem= newToDo;
          $.ajax({
            url: dataURL,
            type: 'POST',
            data: todoItem,
            error: function() {
            },
            success: function(data, dataType, jqXHR) {
                myToDo.renderToDo();
                $(".itemsLeft").html(posts.length+" items left");
 
           }
          });
        },

        //these are all the removing functions


        checkToDo: function(e) {
          e.preventDefault();
          var postId = $(this).closest("li").data("postsid"); 
          $(this).closest("li").toggleClass("checkItem");
          myToDo.removeToDo(postId); 
          // console.log(postsid);//what should I put here to get it to work properly.  It is saying it is undefined.
          var currentToDos = $(".toDoListContent li").not(".checkItem");
          $(".itemsLeft").html(currentToDos.length+" items left");

        },

        // clearCompleted: function() {  // why is this not working anymore?
        //   $(".checkItem").closest("li").remove();
        //   var removeIndex = $(this).closest("li").data("index");
        //   posts.splice(removeIndex, 1);
        //   // myToDo.removeToDo();
        //   var myList = _.template($("#toDoTmpl").html(), posts);
        //   $(".toDoListContent").html(myList);
        //   // Keeps track of current tasks
        //   $(".itemsLeft").html(posts.length+" items left");
        // },

        removeToDo: function(id) {
          $.ajax({
            url: "http://tiy-fee-rest.herokuapp.com/collections/robhittme/" + id,
            type: 'DELETE',
            // data: 'data',
            error: function() {
            },
            success: function(data) {
              myToDo.renderToDo();
            }
          });
        },

        // editing and updating functions


        dblClickItem: function() {
          var postId = $(this).data("postsid"); 
          $("#editModal").modal();
          myToDo.renderModalPostDetail(postId);
          $(".itemsLeft").html(posts.length+" items left");
          // myToDo.updatePost("todoid");
        },

        // addEditItem: function() {
        //   var $this= $(this);
        //   var anotherNewListItem = {
        //     content: $this.val() || originalTask
        //   };
        //   var myList= _.template($("#toDoTmpl").html(), posts);
        //   $(".toDoListContent").html(myList);
        //   $(".newListItem").val("");
        //   $(".itemsLeft").html(posts.length+" items left");
        // },

        updatePost: function(postId) {
          console.log("work in update method");
          var id = postId;
              var editModal = {
                content: $(".editModal").val()
              };
          $.ajax({
            url: "http://tiy-fee-rest.herokuapp.com/collections/robhittme/" + id,
            type: "PUT",
            data: editModal, 
            error: function(jqXHR, status, error) {
              alert("couldn't add post: " + error);
            },
            success: function(data, dataType, jqXHR) {
              console.log("in edit post");
              $("#editModal").modal("hide");
              myToDo.renderToDo();  
            }
          });

        },

        render: function($el, template, data) {
            var tmpl = _.template(template, data);
            $el.html(tmpl);
        },

        renderToDo: function() {

          $.ajax({
            url: "http://tiy-fee-rest.herokuapp.com/collections/robhittme",
            type: "GET",
            dataType: "json",
            error: function(jqXHR, status, error) {
            },
            success: function(data, dataType, jqXHR) {
              var posts = window.posts = data; // have to make global for underscore to work
              myToDo.render($(".toDoListContent"), Templates.posts, posts);
                        $(".itemsLeft").html(posts.length+" items left");

            }
          });
        },

        renderModalPostDetail: function(postId) {
          $.ajax({
            url: "http://tiy-fee-rest.herokuapp.com/collections/robhittme/" + postId,
            type: "GET",
            dataType: "json",
            error: function(jqXHR, status, error) {
            },
            success: function(data, dataType, jqXHR) {   
              var post = window.post = data; // have to make global for underscore to work
              myToDo.render($("#editPostForm"),Templates.editModal, post);
            }
          });

        },
};


