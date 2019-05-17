//列表页的业务逻辑
require(["config"], () => {
    require(["url", "template", "header", "footer"], (url, template) => {
        class List {
            constructor() {
                this.requestData();
            }

            //请求数据
            requestData() {
                //发送ajaxs数据请求

                $.ajax({
                    url: url.rapBaseUrl + "list/get",
                    type: "get",
                    dataType: "json",
                    success: data => {
                        if(data.res_code === 1)this.render(data.res_body.list);
                    }
                })
            }

            //根据ajax数据渲染页面
            render (list) {
                let html = template("list-template",{list});
                $("#list-container").html(html);
            }

        }

        new List();
    })
})
