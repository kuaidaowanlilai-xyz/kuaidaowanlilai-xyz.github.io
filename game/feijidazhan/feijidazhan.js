function Feijidazhan(id) {
    this.ele = document.querySelector(id)
    this.feiji = this.ele.querySelector('.feiji')
    this.shibai = this.ele.querySelector('.shibai')
    this.jifenban = this.ele.querySelector('.jifenban')
        // console.log(this.jifenban)

    this.genzongshubiao()
    this.shengchengdiji()
    this.zuzhixuanzhong()
    this.pengzhuangshijian()
    this.lunbo()
        // this.dijifashezidan()

    // console.log('傻吊张盖')

}


//跟踪鼠标
Feijidazhan.prototype.genzongshubiao = function() {

    //监测鼠标位置
    this.ele.addEventListener('mousemove', e => {
        e = e || window.event

        this.shubiaoX = e.pageX - this.ele.offsetLeft - 25
        this.shubiaoY = e.pageY - this.ele.offsetTop - 25
            // console.log(x, y)

        // move(this.feiji, {
        //     top: y,
        //     left: x
        // }, () => {})

        this.feiji.style.top = this.shubiaoY + 'px'
        this.feiji.style.left = this.shubiaoX + 'px'

    })

    //生成zidan函数 
    _this = this

    function shengchengzidan(shubiaoX2, shubiaoY2) {

        let zidan = document.createElement('p')

        // zidan.style.width = 7 + 'px'
        // zidan.style.height = 14 + 'px'
        // zidan.style.backgroundColor = 'blue'
        // zidan.style.position = 'absolute'

        zidan.className = 'zidan'
        zidan.style.top = shubiaoY2 + 'px'
        zidan.style.left = shubiaoX2 - 3 + 'px'
        _this.ele.appendChild(zidan)

        //zidan飞行定时器
        let dingshiqi
        dingshiqi = setInterval(() => {

            //zidan飞行速度
            let zidanfeixingsudu = 10
            zidan.style.top = zidan.offsetTop - zidanfeixingsudu + 'px'

            if (zidan.offsetTop < 0) {
                clearInterval(dingshiqi)
                _this.ele.removeChild(zidan)
            }

        }, 20)

    }


    //监测按下抬起移出
    let zidongfashe = null
    this.ele.addEventListener('mousedown', e => {
        // console.log('按下')
        e = e || window.event

        clearInterval(zidongfashe) //重启定时器

        // shengchengzidan(this.shubiaoX + 25, this.shubiaoY - 5)


        //自动发射zidan

        zidongfashe = setInterval(() => {
            shengchengzidan(this.shubiaoX + 25, this.shubiaoY - 5)
        }, 200)

    })
    this.ele.addEventListener('mouseup', e => {
        // console.log('抬起')
        e = e || window.event
        clearInterval(zidongfashe)
    })

}

//生成敌机
Feijidazhan.prototype.shengchengdiji = function() {

    //随机数
    function suijishu(n1, n2) {
        return Math.floor(Math.random() * (n2 - n1 + 1)) + n1
    }

    //生成敌机的函数
    _this = this

    function dijihanshu() {
        let diji = document.createElement('p')
        diji.className = 'diji'
        diji.style.left = suijishu(0, _this.ele.clientWidth - 50) + 'px'
        diji.style.top = -500 + 'px' //调整
        diji.style.backgroundImage = `url(./img/Dship${suijishu(1,8)}.png)`
        _this.ele.appendChild(diji)

        //随机左右及随机左右飞行速度
        let zuoYou = 0
        if (suijishu(1, 100) > 50) {
            zuoYou = suijishu(1, 5) //左右飞行速度
        } else {
            zuoYou = -suijishu(1, 5)
        }

        //随机向下速度
        let dijifeixingsudu
        dijifeixingsudu = suijishu(1, 5)


        //敌机 飞行 定时器
        let dijifeixing = null
        dijifeixing = setInterval(() => {

            //敌机左右飞
            diji.style.left = diji.offsetLeft + zuoYou + 'px'
                // console.log(_this.ele.offsetWidth)
            if (diji.offsetLeft < 0 || diji.offsetLeft + diji.offsetWidth > _this.ele.offsetWidth) {
                zuoYou = -zuoYou
            }

            //敌机向下飞行速度
            diji.style.top = diji.offsetTop + dijifeixingsudu + 'px'

            //删除飞出边界的敌机
            if (diji.offsetTop > _this.ele.clientHeight) {
                clearInterval(dijifeixing)
                _this.ele.removeChild(diji)
            }

        }, 20)

    }

    //每 几 秒生成一架敌机
    setInterval(() => {
        let shuliang = suijishu(1, 6)
        for (var i = 0; i <= shuliang; i++) {
            dijihanshu()
        }
    }, 2000)

}


//实时监测碰撞事件
Feijidazhan.prototype.pengzhuangshijian = function() {

    let defen = 0 //得分
    let boo = true //判断失败与否

    setInterval(() => {
        let dijis = this.ele.querySelectorAll('p.diji')
        let zidans = this.ele.querySelectorAll('p.zidan')

        //重新获取飞机位置
        let feiji = this.ele.querySelector('.feiji')
            // console.log(feiji.offsetTop)

        for (let i = 0; i < dijis.length; i++) {

            for (let j = 0; j < zidans.length; j++) {
                if (zidans[j].offsetTop < dijis[i].offsetTop + dijis[i].offsetHeight && zidans[j].offsetTop > dijis[i].offsetTop && zidans[j].offsetLeft + zidans[j].offsetWidth > dijis[i].offsetLeft && zidans[j].offsetLeft < dijis[i].offsetLeft + dijis[i].offsetWidth) {
                    //子弹命中敌机
                    this.ele.removeChild(zidans[j])
                    this.ele.removeChild(dijis[i])

                    if (boo) {
                        defen += 1
                        this.jifenban.innerText = `得分：${defen}`
                    }

                }
            }

            if (feiji.offsetTop < dijis[i].offsetTop + dijis[i].offsetHeight && feiji.offsetTop + feiji.offsetHeight > dijis[i].offsetTop && feiji.offsetLeft + feiji.offsetWidth > dijis[i].offsetLeft && feiji.offsetLeft < dijis[i].offsetLeft + dijis[i].offsetWidth) {
                // console.log('飞机与敌机相撞')
                feiji.style.backgroundImage = 'url(./img/baozha.png)'
                this.shibai.style.display = 'block'
                    // this.ele.removeEventListener('mousemove', () => {})
                boo = false
            }

        }

    }, 20)
}





//阻止选中
Feijidazhan.prototype.zuzhixuanzhong = function() {
    // 取消选中状态
    document.addEventListener('selectstart', function(e) {
        e = e || window.event
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            e.returnValue = false
        }
    })
}

//背景轮播
Feijidazhan.prototype.lunbo = function() {
    let toptop = 0
    setInterval(() => {
        toptop += 5
        this.ele.style.backgroundPosition = `0px ${toptop}px`
    }, 20)
}