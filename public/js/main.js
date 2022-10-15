var main = function (Category, InOut) {
"use strict";
var sum = 0;
InOut.forEach(function(item){
    sum+=item.price;})
$(".outerg").text("Потрачено: " + sum);
var tabNumber = 1;
Category.forEach(function(tab){
var $b = $("<a href = \" \">");
$b.append($("<span>").text(tab.name))
$(".tabs").append($b);
var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
tabNumber++
$(tabSelector).on("click", function () {
$(".tabs span").removeClass("active");
$(this).addClass("active");
$(".content").empty();
InOut.forEach(function(item){
    if(tab.name === item.category){
        var $a = $("<div class=\"item\">")
        $a.append($("<h2>").text(item.name + "   " + item.price))
        $a.append(RedItem(item,Category,function(){
                    console.log("aaa");
                }))
        $a.append(DelItem(item,function(){
                    console.log("aaa");
                }))        
        $(".content").append($a)
        
}
})
return false;
});
$(".tabs a:nth-child(1) span").click()
})
};
var RedItem = function(item,Category,callback) {
    var $buttonRed = $("<button>");
    $buttonRed.addClass("content_order_items_item_button");
    $buttonRed.text("Редактировать");
    $buttonRed.on("click", function() {
        var $content = $("<div>"),
                $popup = $("<div>"),
                $buttonZap = $("<button>").text("Редактировать"),
                $buttonCancel = $("<button>").text("Отмена"),
                $lableName = $("<label>").text("Название услуги: "),
                $select1 = $("<select>");
                for(var i = 0;i < Category.length;i++){
                    $select1.append(($("<option>")).text(Category[i].name));
                }
                $content.addClass("content_container_popup");
                $popup.addClass("content_popup");
                $buttonZap.addClass("content_popup_button");
                $buttonCancel.addClass("content_popup_button");
            
                $buttonZap.on("click", function() {
                var name = $(".inout_name").val();
                var category = $(".inout_category").val();
                var price =$(".inout_price").val();

                if (name.trim() !== "" && price.trim() !== "") {
                    $.ajax({
                        "url": "/inout/" + item._id,
                        "type": "PUT",
                        "data": { "name": name, "price": price,"category":category },
                        success: function(responde){
                            popUpHideWithSuccess()
                        },
                        error: function(responde){
                            alert("error")
                        }
                    }).done(function(responde) {
                        console.log(responde);
                        popUpHideWithSuccess();
                    }).fail(function(err) {
                        console.log("Произошла ошибка: " + err);
                    });
                }
            })
            $buttonCancel.on("click", popUpHideWithCancel);
        $popup.append($("<input value=\""+item.name+"\" placeholder=\"Название расхода\">").addClass("inout_name"));
        $popup.append($("<input value=\""+item.price+"\" placeholder=\"Сумма расхода\">").addClass("inout_price"));
        var $select = $("<select >").addClass("inout_category")
        $select.append($("<option disabled>").text("Выберите категорию"));
        Category.forEach(function(categ){
            if(categ.name === item.category)
            $select.append($("<option selected>").text(categ.name));
            
            else
            $select.append($("<option>").text(categ.name));
    })
            $popup.append($select)
            $popup.append($buttonZap);
            $popup.append($buttonCancel);
            $content.append($popup);
            $(".container").append($content);
        return false;
    });

    return $buttonRed;
}
var DelItem = function(item, callback) {
    var $buttonDel = $("<button>");
    $buttonDel.addClass("content_order_items_item_button");
    $buttonDel.text("Удалить");

    $buttonDel.on("click", function() {
        var $content = $("<div>"),
                $popup = $("<div>"),
                $buttonZap = $("<button>").text("Удалить"),
                $lableName = $("<label>").text("Действительно удалить? "),
                $buttonCancel = $("<button>").text("Отмена");
                $content.addClass("content_container_popup");
                $popup.addClass("content_popup");
                $buttonZap.addClass("content_popup_button");
                $buttonCancel.addClass("content_popup_button");
                $buttonZap.on("click", function() {
                    $.ajax({
                        'url': '/inout/' + item._id,
                        'type': 'DELETE',
                        success: function(){
                            popUpHideWithSuccess();
                        },
                        error: function(){
                            alert("error");
                        }
                    }).done(function(responde) {
                        console.log(responde);
                        popUpHideWithSuccess();
                    }).fail(function(jqXHR, textStatus, error) {
                        console.log(error);
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    });
                })
                $buttonCancel.on("click", popUpHideWithCancel);
                $popup.append($lableName);
                $popup.append($buttonZap);
                $popup.append($buttonCancel);
                $content.append($popup);
                $(".container").append($content); 
        return false;
    });
    return $buttonDel;
}
$.getJSON("/category", function(Category) {
    $.getJSON("/inout/1r34k2",function(InOut){
        main(Category, InOut);
})
})
