var categEdit = function(Category) {
    $(".btnEdit").on("click", function() {
        var $content = $("<div>"),
            $popup = $("<div>"),
            $buttonZap = $("<button>").text("Изменить"),
            $buttonCancel = $("<button>").text("Отмена");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancel.addClass("content_popup_button");

        $buttonZap.on("click", function() {
                var category = $(".inout_category").val();
                category_name = $(".inout_category_name").val();
                $.ajax({
                        "url": "/category/" + category,
                        "type": "PUT",
                        "data": { "name": category_name},
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

        })
        $buttonCancel.on("click", popUpHideWithCancel);
        var $select = $("<select>").addClass("inout_category");
        $select.append($("<option selected disabled>").text("Выберите категорию"));
        Category.forEach(function(categ){
            $select.append($("<option>").text(categ.name));
        })
        $popup.append($select);
        $popup.append($("<input placeholder=\"Новое название категории\">").addClass("inout_category_name"));
        $popup.append($buttonZap);
        $popup.append($buttonCancel);
        $content.append($popup);
        $(".cont").append($content);
        return false;
    })
}
var popUpHideWithCancel = function() {
    $(".content_container_popup").remove();
}

var popUpHideWithSuccess = function() {
    $(".content_popup").empty()
    $(".content_popup").append($("<label>").addClass("sucscess").text("Success!"));
    setTimeout(() => {
        $(".content_container_popup").remove();
        location.reload();
    }, 3000);
};

$.getJSON("/category", function(Category) {
        categEdit(Category);
})
