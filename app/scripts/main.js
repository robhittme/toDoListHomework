$(document).ready(function() {

	var myList= _.template($("#toDoTmpl").html(), listData);

	$(".toDoListContent").html(myList);

$("#newListItem").on("submit", function(e) {
  		e.preventDefault();
  		var newListItem = $(".newListItem").val();
  		// $(".toDoListContent").append(newListItem);
  		
  		var anotherNewListItem= {
  			content: newListItem,
  		};
  		listData.unshift(anotherNewListItem);
  		var myList= _.template($("#toDoTmpl").html(), listData);
  		  		$(".toDoListContent").html(myList);

});
$(".toDoListContent").on("click", function(e) {
		e.preventDefault(); 
		// console.log("yayays");
		$(this).remove($("toDoListContent").html());
})

$(".itemsLeft").append(listData.length+" items left");

});