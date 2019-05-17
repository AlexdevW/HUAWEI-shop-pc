define(() => {
    class Chart{
        constructor () {
            this.container = document.querySelector(".banner");
            this.lis = this.container.querySelectorAll("li");
            this.btn_l = document.querySelector(".box>.btn>.icon-fanhui");
            this.btn_r = document.querySelector(".box>.btn>.icon-gengduo");
            this.btns = document.querySelectorAll(".box>.btns>span");
            // console.log(this.btns)
            this.index = 0; //记录当前坐标
            this.lastIndex = 0; //记录上一次坐标
            this.timer = null;
            this.bindEvent();
            this.autoPlay();
        }
        
        bindEvent () {
            Array.from(this.btns).forEach((btn, i) => {
                btn.onmouseenter = () => {
                    this.index = i;
                    this.changeImg();
                    // console.log(this.btns)
                }
            })

            this.btn_r.onclick =() => {
                if(++this.index === this.btns.length) this.index = 0;
                this.changeImg();
            }

            this.btn_l.onclick = () => {
                if(--this.index < 0)this.index = this.btns.length-1;
                this.changeImg();
            }

            this.container.onmouseenter = () => {
                clearInterval(this.timer);
            }

            this.container.onmouseleave = () => {
                this.autoPlay ();
            }
        }
        changeImg () {
            this.btns[this.lastIndex].classList.remove("change");
            this.lis[this.lastIndex].classList.add("change");
            this.lis[this.indexndex].classList.remove("change");
            this.btns[this.inde].classList.add("change");
            this.lastIndex = this.index;
            // console.log(this.index, this.lastIndex)
        }

        autoPlay () {
            this.timer = setInterval(() => {
                this.btn_r.onclick();
            },2000)
        }
    }
    // return new Chart();
})