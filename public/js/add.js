var add = function(Category) {
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
                var login = $(".inout_name").val(),
                    password = $(".inout_price").val(),
                    mode = $(".inout_category").val();
                if (login.trim() !== "" && password.trim() !== "") {
                    var newInout = {
                        "login":login,
                        "password":password,
                        "mode":mode
                        }                    
                    $.post("/user_money",newInout,function(result) {
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

        $popup.append($("<input placeholder=\"Логин:\">").addClass("inout_name"));
        $popup.append($("<input placeholder=\"Пароль:\">").addClass("inout_price"));
        var $select = $("<select >").addClass("inout_category")
        $select.append($("<option selected disabled>").text("Выберите категорию"));
        $select.append($("<option>").text("admin"));
        $select.append($("<option>").text("manager"));
        $popup.append($select);
        $popup.append($buttonZap);
        $popup.append($buttonCancel);
        $content.append($popup);
        $(".conte").append($content);
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

add();
