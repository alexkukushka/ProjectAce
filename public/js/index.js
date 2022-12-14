var main = function(UserMoney) {
    $(".user").on("click", function() {
        var $content = $("<div>"),
            flag = false,
            $popup = $("<div>"),
            $buttonZap = $("<button>").text("Войти"),
            $buttonCancle = $("<button>").text("Отмена"),
            $buttonReg = $("<p>").text("Нет аккаунта? Зарегистрировать");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonReg.addClass("content_popup_reg");

        $buttonZap.on("click", function() {
            if (flag === false) {
                var username = $(".input_login").val(),
                    password = $(".input_password").val(),
                    mode;
                console.log(username);
                if (username.trim() !== "" && password.trim() !== "") {
                    for (var i = 0; i < UserMoney.length; i++) {
                        if (UserMoney[i].login === username && UserMoney[i].password === password) {
                        mode = UserMoney[i].mode;
                        console.log(mode);
                            $.ajax({
                                'url': '/user/' + username,
                                'type': 'GET'
                            }).done(function(responde) {
                                if(mode === "person") window.location.replace('user/' + username + '/' + 'main.html');     
                                else if(mode === "manager") window.location.replace('user/' + username + '/' + 'manager.html');
                                else if(mode === "admin") window.location.replace('user/' + username + '/' + 'admin.html');      
                            }).fail(function(jqXHR, textStatus, error) {
                                console.log(error);
                                alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                            });
                        }
                    }
                } else {
                    alert("Некорректный вход!");
                }
            } else {
                var login = $(".input_login").val(),
                    password = $(".input_password").val();
                if (login.trim() !== "" && password.trim() !== "") {
                    var newUser = {
                        "login": login,
                        "password": password,
                        "mode":"person"
                    };
                    $.post("/user_money", newUser, function(result) {}).done(function(responde) {
                        popUpHideWithSuccess();
                    }).fail(function(jqXHR, textStatus, error) {
                        if (jqXHR.status === 501) {
                            alert("Произошла ошибка!");
                        } else {
                            alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                        }
                    });
                }
            }

        })
        $buttonReg.on("click", function() {
            if (flag) {
                flag = false;
                $buttonReg.text("Нет аккаунта? Зарегистрировать");
                $buttonZap.text("Войти");
                $buttonCancle.show();


            } else {
                "use strict"
                flag = true;
                $buttonReg.text("Назад");
                $buttonZap.text("Регистрация");
                $buttonCancle.hide();

            }
            return false;
        })


        $buttonCancle.on("click", popUpHideWithCancle);

        $popup.append($("<input placeholder=\"Логин\">").addClass("input_login"));
        $popup.append($("<input type=\"password\" placeholder=\"Пароль\">").addClass("input_password"));
        $popup.append($buttonZap);
        $popup.append($buttonCancle);
        $popup.append($buttonReg);
        $content.append($popup);
        $(".main").append($content);
        return false;
    })
}
var popUpHideWithCancle = function() {
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



$.getJSON("/user_money", function(UserMoney) {
    var uri = window.location.toString();
	if (uri.indexOf("?") > 0) {
	    var clean_uri = uri.substring(0, uri.indexOf("?"));
	    window.history.replaceState({}, document.title, clean_uri);
	}
    main(UserMoney);
})
