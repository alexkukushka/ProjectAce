var categAdd = function(Category) {
    $(".btnAdd").on("click", function() {
        var $content = $("<div>"),
            $popup = $("<div>"),
            $buttonZap = $("<button>").text("Добавить"),
            $buttonCancel = $("<button>").text("Отмена");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancel.addClass("content_popup_button");

        $buttonZap.on("click", function() {
                var category = $(".inout_category").val();
                if (category.trim() !== "") {
                    var newCategory = {
                        "name":category
                        }                    
                    $.post("/category",newCategory,function(result) {
                    console.log(result);
                    }).done(function(responde) {
                    console.log(responde);
                    popUpHideWithSuccess();
                    }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    if (jqXHR.status === 501) {
                    alert("Произошла ошибка!");
                    } else {
                    alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    }
                    })
                } else {
                    alert("Некорректный ввод!");
                }

        })
        $buttonCancel.on("click", popUpHideWithCancel);

        $popup.append($("<input placeholder=\"Название категории\">").addClass("inout_category"));
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
        categAdd(Category);
})
