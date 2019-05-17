require(["config"], () => {
    require(["url","template","addCart","header","footer","zoom"], (url,template,addCart,header) => {
        class Detail {
            constructor () {
                this.init();
            }

            init () {
                //从url取到id， 携带id请求详情数据，渲染详情页
                let id = Number(location.search.slice(4));

                this.id = id;
                $.get(url.rapBaseUrl + "detail/get", {id}, res => {
                    if(res.res_code === 1) {
                        let {data} = res.res_body;

                        data = {...data, id};

                        this.render(data);

                    }
                })
            }


            render (data) {
                $("#detail-container").html(template("detail-template", {data}));
                this.zoom();
                this.borderSwitch();
                this.changeQuantity();
                new addCart($("#detail-container"),data);
            }

            borderSwitch () {
                let navBox =  $("#product-img>ul>li>a"),
                    lastIndex = 0;
                    navBox[lastIndex].className = "bor";
                    Array.from(navBox).forEach(function (item, index) {
                        item.onclick = function () {
                            navBox[lastIndex].classList.remove("bor")
                            navBox[index].classList.add("bor");
                            lastIndex = index;
                        }
                    })
            }

            zoom () {
                $(".zoom-img").elevateZoom({
                    gallery: 'product-img',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize: '1',
                    borderColor: '#888'
                });
            }

            changeQuantity () {
                let num = Number($("#num-input").val());
                $("#add-num").on('click', () => {
                    $("#num-input").val(++num);
                });

                $("#reduce-num").on('click', () => {
                    if(num <= 1)return;
                    $("#num-input").val(--num);
                });

            }
        }

        new Detail();
    })
})
