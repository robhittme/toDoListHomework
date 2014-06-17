.$(document).ready(function() {
  
	var myList= _.template($("#toDoTmpl").html(), listData);

	$(".toDoListContent").html(myList);

$("#newListItem").on("submit", function(e) {
  		e.preventDefault();
  		var newListItem = $(".newListItem").val();
  		
  		var anotherNewListItem= {
  			content: newListItem
  		};
  		listData.push(anotherNewListItem);
  		var myList= _.template($("#toDoTmpl").html(), listData);
  		  		$(".toDoListContent").html(myList);
            $(".newListItem").val("");
            //adds to the array
      $(".itemsLeft").html(listData.length+" items left");


});
$(".toDoListContent").on("click", "li", function(e) {
		e.preventDefault(); 
		// console.log("yayays");
		$(this).toggleClass("checkItem");
    var currentToDos = $(".toDoListContent li").not(".checkItem");
    console.log(currentToDos.length);

$(".itemsLeft").html(currentToDos.length+" items left");

    //remove from array
    //direct to completed
    
});
$(".itemsLeft").html(listData.length+" items left");


//double click to edit
var originalTask;
var $dbleClickEdit= $(".toDoListContent");
    $dbleClickEdit.on("dblclick", "li", function() {
      
      //removing from array
      var thisIndex = $(this).closest("li").data("index");
      console.log(thisIndex);

      originalTask = $(this).text();

      listData.splice(thisIndex, 1);
      
    $(this).text("");
    $("<input type='text'>").appendTo(this).focus();

});
    $(".itemsLeft").html(listData.length+" items left");

  $(".toDoListContent").on("focusout", 'li > input', function() {

      var $this= $(this);

      var anotherNewListItem = {
        content: 
      $this.val() || originalTask
    };
      
      listData.unshift(anotherNewListItem);
      var myList= _.template($("#toDoTmpl").html(), listData);
            $(".toDoListContent").html(myList);
            $(".newListItem").val("");

  });


 $(".itemsLeft").html(listData.length+" items left");






 $(".clearBtn").on("click", function() {
     
      var removeIndex = $(this).closest("li").data("index");
      $(".checkItem").closest("li").remove();
      listData.splice(removeIndex, 1);
    var myList = _.template($("#toDoTmpl").html(), listData);
      $(".toDoListContent").html(myList);

// Keeps track of current tasks
$(".itemsLeft").html(listData.length+" items left");

 });
});

