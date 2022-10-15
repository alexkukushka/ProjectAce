var main1 = function(Category) {
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
                var name = $(".inout_name").val(),
                    price = $(".inout_price").val(),
                    category = $(".inout_category").val();
                if (name.trim() !== "" && price.trim() !== "") {
                    var newInout = {
                        "name":name,
                        "owner":location.href.split("/")[4],
                        "price":price,
                        "category":category
                        }                    
                    $.post("/inout",newInout,function(result) {
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
                    alert("Некорректный вход!");
                }

        })
        $buttonCancel.on("click", popUpHideWithCancel);

        $popup.append($("<input placeholder=\"Название расхода\">").addClass("inout_name"));
        $popup.append($("<input placeholder=\"Сумма расхода\">").addClass("inout_price"));
        var $select = $("<select >").addClass("inout_category")
        $select.append($("<option selected disabled>").text("Выберите категорию"));
        Category.forEach(function(categ){
            $select.append($("<option>").text(categ.name));
    })
        $popup.append($select);
        $popup.append($buttonZap);
        $popup.append($buttonCancel);
        $content.append($popup);
        $(".container").append($content);
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
        main1(Category);
})
