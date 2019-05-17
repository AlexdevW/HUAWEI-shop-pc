require.config({
    baseUrl : "/",
    paths : {
        "jquery": "libs/jquery/jquery-3.2.1",
        "header": "js/module/header",
        "footer": "js/module/footer",
        "tools": "libs/tools",
        "chart": "js/chart",
        "url" : "js/module/url",
        "template": "libs/art-template/template-web",
        "cookie" : "libs/jquery-plugains/jquery.cookie",
        "zoom": "libs/jquery-plugains/jquery.elevateZoom-3.0.8.min",
        "addCart": "js/module/addCart",
        "fly" : "libs/jquery-plugains/jquery.fly.min",
        "swiper": "libs/swiper/js/swiper.min"
    },

    //垫片
    shim : {
        "cookie" : {
            deps : ['jquery']
        },
        "zoom" : {
            deps : ['jquery']
        },
        "fly" : {
            deps : ['jquery']
        },
        "swiper": {
            deps : ['jquery']
        }
    }
})