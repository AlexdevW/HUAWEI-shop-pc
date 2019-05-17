require(["config"], () => {
    require(["url", "template", "swiper", "header", "footer", "chart", "jquery"], (url, template, swiper) => {
        class Index {
            constructor() {
                this.bindEvents();
                this.getType();
                this.search();
                this.banner();
                this.noticeChange ();
            }

            bindEvents() {
                //使用事件委托给登录按钮绑事件
                $("header").on('click', "#login-btn", () => {
                    // console.log(1);
                })
                
                //顶部广告条关闭
                $(".icon-guanbi").on('click', () => {
                    $('.nav-header').hide();
                    console.log(1)
                })

                
            }

            //获取分类数据
            getType() {
                //ajax请求
                $.get(url.rapBaseUrl + 'index/type', data => {
                    // console.log(data);
                    if (data.res_code === 1) {
                        // let data = data.res_body;
                        this.renderType(data.res_body.list, data.res_body.sideview, data.res_body.column, data.res_body.menu);
                    }
                })
            }

            //首页轮播图
            banner() {
                var mySwiper = new swiper('.swiper-container', {
                    autoplay: true,

                    loop: true, // 循环模式选项
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },

                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-btn-prev',
                        prevEl: '.swiper-btn-next'
                    }
                })
            }

            search() {
                //搜索框功能

                $("#search-box").on('keyup', function () {
                    let keywords = $("#search-box").val();
                    $.getJSON('https://suggest.taobao.com/sug?code=utf-8&callback=?&q=' + keywords, data => {
                        let spinner = data.result;
                        let spinner_html = template("spinner-template", { spinner });
                        $("#spinner-container").html(spinner_html);
                        $("body").on('click', () => {
                            $("#spinner-container>ul").addClass("ac");
                        })
                    })
                })
            }

            //渲染template内容
            renderType(list, img, column, menu) {
                // console.log(list);
                // console.log(template)

                let column_html = template("column-template", { column });
                $("#column-container").html(column_html);

                let list_html = template("list-template", { img, list });
                $("#list-container").html(list_html);

                let menu_html = template("menu-template", { menu });
                $("#menu-container").html(menu_html);

                this.switching ();
            }

            //商品切换
            switching () {
                let n= 0,
                    wh = $("#menu-container").width();

                if($("#switch").position().left <= 0){
                    $("#btn-l").hide();
                }

                $("#switch li").each((index, item) => {
                    if(index % 5 == 4){ 
                        $(item).css("margin-right",0)
                    }
                } )

                //商品切换r
                $("#btn-r").on('click', () => {
                     $("#switch").css("left",-wh*++n+"px");
                   $("#btn-l").show();
                   if(n >= $("#switch li").length/5-1){
                       $("#btn-r").hide();
                   }
                })

                //商品切换l
                $("#btn-l").on('click', () => {
                    $("#switch").css("left",-wh*--n+"px")
                    $("#btn-r").show();

                    if(parseInt($("#switch")[0].style.left)  >= 0){
                        $("#btn-l").hide();
                    }
                })
            }

            //公告栏切换
            noticeChange () {
                let hg = $("#Notice li").height(),
                    n = 0;
                setInterval(() => {
                    $("#Notice").css("transition", "top .5s");
                    if(n >= $("#Notice li").length-1){
                        $("#Notice").css("transition", "none");
                        $("#Notice").css("top", 0);
                        n=-1;
                    }
                    $("#Notice").css("top", -hg*++n +"px") 
                }, 2000);
                
            }
        }
        new Index();
    })
})