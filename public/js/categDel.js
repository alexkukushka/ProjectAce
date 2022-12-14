var categDel = function(Category) {
    $(".btnDel").on("click", function() {
        var $content = $("<div>"),
            $popup = $("<div>"),
            $buttonZap = $("<button>").text("Удалить"),
            $buttonCancel = $("<button>").text("Отмена");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancel.addClass("content_popup_button");

        $buttonZap.on("click", function() {
                var category = $(".inout_category").val();
                console.log(category);
                $.ajax({
                        'url': '/category/' + category,
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
        var $select = $("<select>").addClass("inout_category");
        $select.append($("<option selected disabled>").text("Выберите категорию"));
        Category.forEach(function(categ){
            $select.append($("<option>").text(categ.name));
        })
        $popup.append($select);
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
        categDel(Category);
})
