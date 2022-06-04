var main = function(UserMoney){
    $(".user").on("click",function(){
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Войти"),
        $buttonCancle = $("<button>").text("Отмена");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonZap.on("click", function() {
            var username = $(".input_login").val(),
            password = $(".input_password").val();
            console.log(username);
                        if (username.trim() !== "" && password.trim() !== "") {
                            for (var i = 0; i < UserMoney.length; i++) {
                                if(UserMoney[i].login === username && UserMoney[i].password === password) {
                                    $.ajax({
                                        'url': '/user/' + username,
                                        'type': 'GET'
                                    }).done(function(responde) {
                                        window.location.replace('user/'+username + '/' + 'main.html');
                                    }).fail(function(jqXHR, textStatus, error) {
                                        console.log(error);
                                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                                    });
                                }
                            }
                        }
                    })
            $buttonCancle.on("click", popUpHideWithCancle);
            $popup.append($("<input placeholder=\"Логин\">").addClass("input_login"));
            $popup.append($("<input type=\"password\" placeholder=\"Пароль\">").addClass("input_password"));
            $popup.append($buttonZap);
            $popup.append($buttonCancle);
            $content.append($popup);
            $(".main").append($content);
        return false;
    })
}
var popUpHideWithCancle = function(){
    $(".content_container_popup").remove();
    }
    
var popUpHideWithSuccess =  function(){
    $(".content_popup").empty()
    $(".content_popup").append($("<label>").addClass("sucscess").text("Success!"));
    setTimeout(() => {
    $(".content_container_popup").remove();
    location.reload();
    }, 3000);
    };
$.getJSON("/user_money",function(UserMoney){
    main(UserMoney);
})
