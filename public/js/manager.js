var main = function(Category){
    var $ul = $("<ul>");
    Category.forEach(function(item){
    $ul.append($("<li>").append($("<h3>").text(item.name)));
})
    $(".cont").append($ul);
}
$.getJSON("/category", function(Category) {
    main(Category);
})
