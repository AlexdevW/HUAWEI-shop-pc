require(["config"], () => {
    require(["url","jquery","cookie"], (url) => {
        class Login {
            constructor () {
                this.usernameInput = $("#username-input")
                this.passwordInput = $("#pwd-input")
                this.btn = $("#loginBtn");
                this.state = $("#checkbox");
                this.bindEvents();
            }

            bindEvents() {
                console.log(1);
                this.btn.on("click", () => {
                    console.log(1)
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();
                    $.ajax({
                        url : url.phpBaseUrl + "user/login.php",
                        type : "post",
                        data : {username,password},
                        success : data => {
                            if(data.res_code === 1){
                                this.loginSucc(username);
                            }else{
                                alert(data.res_message)
                            }
                        },
                        dataType : 'json'
                    })
                })
            }

            loginSucc (username) {
                //存cookie
                let expires = this.state.prop("checked")? {expires:7}: {};

                expires = Object.assign({path: "/"}, expires);

                $.cookie('username',username,expires);
                
                alert("登录成功，即将跳转首页");
                location.href= "/";
            }
        }

        new Login();
    })
})