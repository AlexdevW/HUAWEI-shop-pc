define(["tools"], (tools) => {
    class Footer {
        constructor () {
            this.container = document.querySelector("footer");
            this.load();
        }

        load () {
            tools.ajaxGetPromise("/html/module/footer.html", null, false).then(data => {
                this.container.innerHTML = data;
            })
        }
    }
    return new Footer();
})