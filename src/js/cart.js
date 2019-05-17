require(["config"], () => {
    require(["header", "template", "footer"], (header, template) => {
        class Cart {
            constructor() {
                this.init();
                this.islogin();
            }

            init() {
                let cart = localStorage.getItem("cart");
                if (cart) {
                    cart = JSON.parse(cart);
                    $(".empty").hide();
                    $(".result").show();
                    //渲染列表
                    this.render(cart);
                } else {
                    $(".empty").show();
                    $(".result").hide();
                }
            }

            islogin() {
                let  state = $.cookie("username");
                if(state){
                    $(".login").hide();
                }else{
                    $(".login").show();
                }
            }

            render(cart) {
                $("#cart-container").html(template("cart-template", { cart }));
                this.isFloat();
                this.calcMoney(cart);
                this.CheckBtn();
                this.calcMoney()
                this.bindEvents(cart);
            }

            isFloat() {
                $(".price").each(function (index, item) {
                    item.innerHTML = Number(item.innerHTML).toFixed(2);
                });

                $(".discount").each(function (index, item) {
                    item.innerHTML = Number(item.innerHTML).toFixed(2);
                })
            }


            // 绑定事件
            bindEvents(cart) {
                let _this = this;

                //增加数量
                $(".add-num").on('click', function () {
                    _this.changeQuantity(cart, this, +1 );
                });

                //减少数量
                $(".reduce-num").on('click', function () {
                    _this.changeQuantity(cart, this, -1)
                })

                //input更改数量
                $(".num-input").on('change', function () {
                    _this.changeQuantity(cart, this);
                })

                //单个删除按钮
                $(".btn-del").on('click', function () {
                    _this.delBtn(this);
                    header.render();
                })

                //多选删除按钮
                $("#del-btn").on('click', function () {
                    _this.delAllBtn();
                    header.render();
                })

            }

            //数量更改事件处理函数
            changeQuantity(cart, input, tips) {
                let pruduct = $(input).closest(".product"),
                    price = pruduct.find(".price").html(),
                    discount = pruduct.find(".discount").html(),
                    id = pruduct.attr("data-id"),
                    quantity = pruduct.find(".num-input").val()-0,
                    _this = this;
                    if(tips)quantity += tips;
                    if(quantity === 0)return;
                    pruduct.find(".num-input").val(quantity)
                    $(cart).each((index, item) => {
                    if (item.id == id) {
                        item.num = quantity;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        price = (item.num * item.price).toFixed(2);
                        discount = (item.originalPrice * item.num).toFixed(2);
                        pruduct.find(".price").html(price);
                        pruduct.find(".discount").html(discount);
                        _this.calcMoney(cart);
                        header.calcCartNum();
                    }
                })

                header.render();
            }

            // 多选框事件
            CheckBtn() {
                let length = $(".btn").length,
                    _this = this;

                $(".btn").on("click", function () {
                    length += this.checked ? +1 : -1;


                    if (length >= $(".btn").length) {
                        $(".checkboxall")[0].checked = $(".checkboxall")[1].checked = true;
                    } else {
                        $(".checkboxall")[0].checked = $(".checkboxall")[1].checked = false;
                    }
                    _this.calcMoney()
                })

                $(".checkboxall").on('click', function () {
                    if (this.checked) {
                        $(".checkboxall")[0].checked = $(".checkboxall")[1].checked = true;
                        length = $(".btn").length;
                        $(".btn").each(function (index, item) {
                            item.checked = true;
                        })

                    } else {
                        $(".checkboxall")[0].checked = $(".checkboxall")[1].checked = false;
                        length = 0;
                        $(".btn").each(function (index, item) {
                            item.checked = false;
                        })
                    }
                    _this.calcMoney();
                })
            }

            // 删除按钮事件
            delBtn(input) {
                if (confirm("你确定要删除吗？")) {
                    let cart = localStorage.getItem("cart"),
                        product = input.closest(".product"),
                        id = Number($(product).attr("data-id"));
                    product.remove();
                    cart = JSON.parse(cart);
                    let newArr = cart.filter((item) => {
                        return item.id !== id;
                    })
                    if (newArr.length === 0) {
                        localStorage.clear();
                        $(".empty").show();
                        $(".result").hide();
                    } else {
                        localStorage.setItem("cart", JSON.stringify(newArr));
                    }
                    this.calcMoney();
                    header.render();
                }
            }

            //多选删除按钮事件
            delAllBtn() {
                let _this = this,
                    i = 0;
                $(".btn").each(function (index, item) {
                    if (item.checked) i++;
                })
                if (i <= 0) {
                    alert("请选择要删除的商品");
                } else {
                    if (confirm("你确定要删除吗？")) {
                        $(".btn").each(function (index, item) {
                            if (item.checked) {
                                i++;
                                let cart = localStorage.getItem("cart"),
                                    product = this.closest(".product"),
                                    id = Number($(product).attr("data-id"));
                                product.remove();
                                cart = JSON.parse(cart);
                                let newArr = cart.filter((item) => {
                                    return item.id !== id;

                                })
                                console.log(newArr)
                                if (newArr.length === 0) {
                                    localStorage.clear();
                                    $(".empty").show();
                                    $(".result").hide();
                                } else {
                                    localStorage.setItem("cart", JSON.stringify(newArr));
                                }
                                _this.calcMoney();
                                header.render();
                                header.calcCartNum();

                            }
                        })
                    }
                }

            }


            //总价计算
            calcMoney() {
                let cart = localStorage.getItem("cart");
                cart = JSON.parse(cart);
                let okbtn = $(".btn").filter((index, item) => {
                    return item.checked === true;
                })

                let pruduct = $(okbtn).parent(),
                    total = 0,
                    totalcount = 0,
                    n = 0;

                pruduct.each((index, item) => {
                    total += Number($(item).find(".price").html());
                    totalcount += Number($(item).find(".discount").html());
                    n += Number($(item).find(".num-input").val());
                })
                $(".total").html(total.toFixed(2));
                $(".totalcount").html(totalcount.toFixed(2));
                $(".num").html(n);
            }
        }
        new Cart();
    })
})