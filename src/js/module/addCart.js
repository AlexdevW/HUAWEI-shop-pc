define(["template", "header","fly","jquery"], (template, header) => {
    class AddCart {
        constructor(selector, data) {
            this.numInput = $("#num-input");
            this.container = selector;
            this.data = data;
            this.addCart();
        }

        addCart() {
            this.container.on('click', '#add-cart', e => {
                // 完成抛物线加购物车动画
                $(`<img src='${this.data.imgs[0]}' style= 'width:30px; height:30px'>`).fly({
                    start: {
                        left: e.clientX,
                        top: e.clientY
                    },
                    end: {
                        left: $("#cart-num").offset().left,
                        top: $("#cart-num").offset().top
                    },
                    onEnd: function () {
                        this.destroy(); //销毁抛物体
                        header.calcCartNum(); // 调用一次计算购物车数量的方法
                    }
                });

                let num = Number(this.numInput.val());
                //先把cart给取出来
                let cart = localStorage.getItem('cart');
                if (cart) {
                    cart = JSON.parse(cart);
                    //已经存过购物车了
                    //判断有没有当前商品
                    let index = -1;
                    if (cart.some((shop, i) => {
                        index = i;
                        return shop.id === this.data.id;
                    })) {
                        //有这条数据
                        cart[index].num += num;
                    } else {
                        //没有这条数据
                        cart.push({ ...this.data, num })
                       
                    }
                } else {
                    //购物车为空
                    //第一次加入购物车的时候只买一个    
                    cart = [{ ...this.data, num }];
                }
                //重新存cart
                localStorage.setItem('cart', JSON.stringify(cart));
                header.render();
            })
        }
    }

    return AddCart;
})