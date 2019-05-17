require(["config"], () => {
    require(["url","jquery"], (url) => {
        class Register {
            constructor () {
                this.usernameInput = $("#username-input");
                this.passwordInput = $("#pwd-input");
                this.pwdAgainInput = $("#pwdAgain-input");
                this.phoneInput = $("#phone-input");
                this.btn = $("#btnRegister");
                this.bindEvends();
            }

            bindEvends () {
                //给注册按钮绑事件
                this.btn.on('click', () => {
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val(),
                        pwdAgain = this.pwdAgainInput.val(),
                        phonenum = this.phoneInput.val();

                        let phone = /^1[34578]\d{9}/;
                        if(!(phone.test(phonenum))){
                            alert("手机号码有误请重新输入");
                            return;
                        }
                        if(password === pwdAgain){
                            $.ajax({
                                url : url.phpBaseUrl + "user/register.php",
                                type : "post",
                                data : {username, password, phonenum},
                                success : data => {
                                    if(data.res_code === 1){
                                        alert(data.res_message+ ", 即将跳转登录页面");
                                        location.href = "login.html";
                                    }
                                },
                                dataType: 'json'
                            })
                        }else{
                            alert("两次输入的密码不同，请重新输入");
                            return;
                        }
                })
            }
        }

        new Register();
    })
})