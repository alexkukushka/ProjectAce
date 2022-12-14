var admin = function(Users) {
    "use strict";

    var $content = $("<div>"),
    $content2 = $("<div>"),
    $content3 = $("<div>");
    $content2.addClass("content_order_items_item_name");
    $content3.addClass("content_order_items_item_client");
    $content.addClass("content_order_items");
    var $content1 = $("<div>");
    $content1.addClass("content_order_items_item");
    $content2.append($("<h3>").text("Логин"));
    $content2.append($("<h3>").text("Пароль"));
    $content3.append($("<h3>").text("Роль"));
    $content1.append($content2);
    $content1.append($content3);
    $content.append($content1);
    for (var i = 0; i < Users.length; i++) {
        if(Users[i].login === location.href.split("/")[4] || Users[i].mode === "person") continue;
        var $elem = $("<div>"),
        $name = $("<div>"),
        $client = $("<div>"),
        $manager = $("<div>");

        $elem.addClass("content_order_items_item");
        $name.addClass("content_order_items_item_name");
        $client.addClass("content_order_items_item_client");
        $manager.addClass("content_order_items_item_manager");
        $elem.append($name);
        $elem.append($client);
        $elem.append($manager);
        $content.append($elem);
        $name.append($("<p>").text(Users[i].login));
        $name.append($("<p>").text(Users[i].password));
        $client.append($("<p>").text(Users[i].mode));
        $manager.append(RedManager(Users[i]));
        $manager.append(DelManager(Users[i]));
        }
    $(".conte").append($content);
};

var RedManager = function(manager, callback) {
    var $buttonRed = $("<button>").attr("href", "manager/" + manager._id);
    $buttonRed.addClass("content_order_items_item_button");
    $buttonRed.text("Редактировать");

    $buttonRed.on("click", function() {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Сохранить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Введите логин: "),
        $lablePName = $("<label>").text("Введите пароль: "),
        $lableFName = $("<label>").text("Введите роль: "),
        $select1 = $("<select>");
        $select1.append(($("<option class = \"option1\">")).text("admin"));
        $select1.append(($("<option class = \"option2\">")).text("manager"));
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
    
        $buttonZap.on("click", function() {
        var login = $(".content_popup_input_login").val(),
        password = $(".content_popup_input_password").val(),
        mode = $(".content_popup_input_mode").val();
        if (login.trim() !== "" && password.trim() !== "") {
            $.ajax({
                'url': '/user_money/' + manager.login,
                'type': 'PUT',
                'data': { "login":login,"password":password, "mode":mode},
                success: function(responde){
                    popUpHideWithSuccess();
                },
                error: function(responde){
                    alert("error");
                }
            }).done(function(responde) {
                console.log(responde);
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
            })
        }
    });
    
        $buttonCancle.on("click", popUpHideWithCancle);
        $popup.append($lableName);
        $popup.append($("<input>").addClass("content_popup_input_login"));
        $popup.append($lablePName);
        $popup.append($("<input>").addClass("content_popup_input_password"));
        $popup.append($lableFName);
        $popup.append($select1.addClass("content_popup_input_mode"));
        $popup.append($buttonZap);
        $popup.append($buttonCancle);
        $content.append($popup);
        $(".conte").append($content);
        $(".content_popup_input_login").attr("value", manager.login);
        $(".content_popup_input_password").attr("value", manager.password);
        if(manager.mode === "admin") $(".option1").attr("selected","");
        else if(manager.mode === "manager") $(".option2").attr("selected","");
    })

    return $buttonRed;
}


var DelManager = function(manager, callback) {
    var $buttonDel = $("<button>").attr("href", "manager/" + manager.login);
    $buttonDel.addClass("content_order_items_item_button");
    $buttonDel.text("Удалить");

    $buttonDel.on("click", function() {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Удалить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Точно удалить?");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonZap.on("click", function() {
                $.ajax({
                    'url': '/user_money/' + manager.login,
                    'type': 'DELETE',
                    success: function(responde){
                        popUpHideWithSuccess();
                    },
                    error: function(responde){
                        alert("error");
                    }
                }).done(function(responde) {
                    console.log(responde);
                    popUpHideWithSuccess();
                }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                })})
            $buttonCancle.on("click", popUpHideWithCancle);
            $popup.append($lableName);
            $popup.append($buttonZap);
            $popup.append($buttonCancle);
            $content.append($popup);
            $(".conte").append($content);
        return false;
    });
    return $buttonDel;
}
    
 var popUpHideWithCancle = function(){
    $(".content_container_popup").remove();
    }
    
 var popUpHideWithSuccess =  function(){
    $(".content_popup").empty();
    $(".content_popup").append($("<label>").addClass("sucscess").text("Успешно!"));
    setTimeout(() => {
    $(".content_container_popup").hide();
    location.reload();
    }, 3000);
    };
$(document).ready(function() {
    $.getJSON("/user_money", function(Users) {
        admin(Users);
    });
});
