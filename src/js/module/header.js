define(["template","jquery","cookie"], (template) => {
    function Header() {
        this.container = $("header");
        this.load().then(() => {
            this.render();
            this.isLogin();
            this.calcCartNum();
            this.bindEvents();
        });
    }

    //对象合并
    $.extend(Header.prototype, {
        //ES6对象增强写法
        load() {
            // console.log($("#after-login"))
            return new Promise(resolve => {
                // 将header.html加载到container里
                this.container.load("/html/module/header.html", () => {
                    //load异步执行结束后的代码
                    resolve();
                });
            })
        },

        bindEvents () {
           

            this.logout.on("click", () => {
                if(confirm("你确定要退出吗？")){
                    $.removeCookie("username",{path: "/"});
                    this.loginBtn.show();
                    this.afterLogin.hide();
                    $("#islogin").show();
                 }
            })
        },

        isLogin () {
            this.loginBtn = $("#login-btn");
            this.afterLogin = $("#after-login");    
            this.nameSpan = $("#name");
            this.logout = $("#exit")
            let username = $.cookie("username");
            if(username) {
                this.loginBtn.hide();
                this.afterLogin.show();
                this.nameSpan.html(username);
                $("#islogin").hide();
            }
        },

        calcCartNum () {
            let cart = localStorage.getItem("cart");
            let num = 0;
            //计算总数量
            if(cart){
                cart = JSON.parse(cart);
                num = cart.reduce ((n, shop) => {
                    n += shop.num;
                    return n;
                }, 0);
            }
            $("#cart-num").html(num);
        },

        render () {
            let cart = localStorage.getItem("cart");
            if(cart){
                cart = JSON.parse(cart);
                $("#container").html(template("template-box", {cart}));
                $("#empty").hide();
                $("#data").show();
                this.calcMoney();
            }else{
                $("#empty").show();
                $("#data").hide();
            }

            $(".cart-check").on('click', () => {
                this.calcMoney ();
             })
        },
        calcMoney () {
            let price = 0;
            $(".cart-check").each((index, item) => {
                if(item.checked===true){
                price +=  Number($(item).parent().find(".price-h").html()) * Number($(item).parent().find(".num-h").html());
                }
            })
            $("#Money").html(price.toFixed(2));
        }
    })

   return new Header();
})