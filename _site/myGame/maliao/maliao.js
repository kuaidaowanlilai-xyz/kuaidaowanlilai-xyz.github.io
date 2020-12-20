function Youxikaishi(id) {
    this.youxichangjing = document.querySelector(id)
    this.maliao = document.querySelector('.maliao')
    this.zhuankuai = document.querySelectorAll('.zhuankuai') //所有砖块
        // console.log(this.zhuankuai)

    this.key_SPACE = true //是否落地
    this.chuxianmogu = false //是否出现蘑菇
    this.bianda = false //马里奥是否变大

    //马里奥类名
    this.class_maliao = 'maliao'
    this.class_maliao_zuoqianjin = 'maliao_zuoqianjin'
    this.class_maliao_you = 'maliao_you'
    this.class_maliao_youqianjin = 'maliao_youqianjin'


    this.jianpandianji()
    this.zhonglixitong(this.maliao) //马里奥 重力
    this.wenhao() //马里奥 碰撞 问号砖块
    this.moguHua() //马里奥 碰撞 蘑菇、花 砖块
    this.caitaFunction(this.maliao) //马里奥 碰撞 砖块

    this.chimogu() //吃蘑菇
    this.xiaoguai() //小怪

}

//让马里奥运动起来
Youxikaishi.prototype.jianpandianji = function() {
    let _this = this
    this.qianjinSudu = 4 //前进速度
    let qianjinJuli = 250 //前进距离
        // this.maliao.style.left = `${qianjinJuli}px`

    //D键
    let key_D = true
    let yundongdingshiqi_D //运动定时器 D
    let qianjinDingshiqi_D //前进定时器 D

    //A键
    let key_A = true
    let yundongdingshiqi_A //运动定时器 A
    let qianjinDingshiqi_A //前进定时器 A

    //SPACE键
    this.key_SPACE = true //变成全局变量
    let yundongdingshiqi_SPACE //运动定时器 SPACE
    let qianjinDingshiqi_SPACE //前进定时器 SPACE


    //键盘按下
    document.addEventListener('keydown', e => {
        e = e || window.event
            // console.log(e.keyCode)


        //按 的是D键 68
        if (e.keyCode == 68) {
            // console.log('按的是D键')
            if (key_D) {
                key_D = false

                //定时器启动前的动作
                _this.maliao.className = _this.class_maliao //初始化类名
                _this.maliao.classList.toggle(_this.class_maliao_zuoqianjin) //切换类名
                    // _this.maliao.style.left = `${qianjinJuli}px`

                //打开 运动 定时器
                yundongdingshiqi_D = setInterval(function() {
                    _this.maliao.classList.remove(_this.class_maliao_you) //删除 maliao_you 类名//不管有没有都删
                    _this.maliao.classList.toggle(_this.class_maliao_zuoqianjin) //切换类名
                }, 150)

                //前进需要定时器写//前进定时器
                qianjinDingshiqi_D = setInterval(function() {
                    qianjinJuli = _this.maliao.offsetLeft
                    qianjinJuli += _this.qianjinSudu
                        // console.log(_this.youxichangjing.offsetLeft)
                    if (-_this.youxichangjing.offsetLeft > _this.youxichangjing.offsetWidth - window.innerWidth - 10) {
                        _this.maliao.style.left = `${qianjinJuli}px`
                    } else if (qianjinJuli < 700 - _this.youxichangjing.offsetLeft) {
                        _this.maliao.style.left = `${qianjinJuli}px`
                    } else {
                        _this.maliao.style.left = `${qianjinJuli}px`
                        _this.youxichangjing.style.left = `${_this.youxichangjing.offsetLeft - _this.qianjinSudu}px`
                    }

                }, 20)
            }
        }

        //按 的是A键 65
        if (e.keyCode == 65) {
            // console.log('按的是A键')
            if (key_A) {
                key_A = false

                //定时器启动前的动作
                _this.maliao.className = _this.class_maliao //初始化类名
                _this.maliao.classList.add(_this.class_maliao_you) //添加类名
                _this.maliao.classList.toggle(_this.class_maliao_youqianjin) //切换类名
                    // _this.maliao.style.left = `-${qianjinJuli}px`

                //打开 运动 定时器
                yundongdingshiqi_A = setInterval(function() {
                    _this.maliao.classList.add(_this.class_maliao_you) //添加 maliao_you 类名//不管有没有都添加
                    _this.maliao.classList.toggle(_this.class_maliao_youqianjin) //切换类名
                }, 150)

                //前进需要定时器写//前进定时器
                qianjinDingshiqi_A = setInterval(function() {
                    qianjinJuli = _this.maliao.offsetLeft
                    qianjinJuli -= _this.qianjinSudu
                    if (qianjinJuli < -_this.youxichangjing.offsetLeft) {
                        qianjinJuli = -_this.youxichangjing.offsetLeft
                    }
                    if (qianjinJuli < 700) {
                        _this.maliao.style.left = `${qianjinJuli}px`
                    } else {
                        _this.maliao.style.left = `${qianjinJuli}px` //马里奥
                            // _this.youxichangjing.style.left = `-${qianjinJuli - 700}px` //背景
                    }

                }, 20)
            }
        }

        //按 的是SPACE键 32
        if (e.keyCode == 32) {
            // console.log('按的是SPACE键')
            if (this.key_SPACE) {
                this.key_SPACE = false
                this.v = -9 //初速度
            }

        }


    })

    //键盘抬起
    document.addEventListener('keyup', e => {
        e = e || window.event
            // console.log(e.keyCode)

        //抬 的是D键 68
        if (e.keyCode == 68) {
            key_D = true
            clearInterval(yundongdingshiqi_D) //关闭 运动 定时器
            clearInterval(qianjinDingshiqi_D) //关闭 前进 定时器
            _this.maliao.className = _this.class_maliao //初始化类名
        }

        //抬 的是A键 65
        if (e.keyCode == 65) {
            key_A = true
            clearInterval(yundongdingshiqi_A) //关闭 运动 定时器
            clearInterval(qianjinDingshiqi_A) //关闭 前进 定时器
            _this.maliao.className = _this.class_maliao //初始化类名
            _this.maliao.classList.add(_this.class_maliao_you) //添加类名
        }

        //抬 的是SPACE键 32
        if (e.keyCode == 32) {
            // console.log('SPACE抬起')
            // this.v = 0
        }


    })
}

//重力系统
Youxikaishi.prototype.zhonglixitong = function(Duixiang) {
    // Duixiang = this.maliao

    this.v = 0 //初速度//需全局变量
    this.g = 0.2 //加速度
    setInterval(() => {
        let juli = Duixiang.offsetTop //马里奥头顶Top值

        this.v += this.g
        juli += this.v

        if (juli > 800) {
            juli = 800
            this.key_SPACE = true //是否落地
        }

        Duixiang.style.top = `${juli}px`

    }, 20)

}

//踩踏 块块检测
Youxikaishi.prototype.caitaFunction = function(yidongkuaikuai) {
    let _this = this

    //所有砖块
    this.zhuankuai = document.querySelectorAll('.zhuankuai')

    setInterval(() => {

        for (let i = 0; i < this.zhuankuai.length; i++) {
            pengzhuang(this.zhuankuai[i])
        }

    }, 20)


    function pengzhuang(Zhuankuai) {

        //马里奥(运动对象)信息
        let maliaoLeft = yidongkuaikuai.offsetLeft
        let maliaoTop = yidongkuaikuai.offsetTop
        let maliaoHeight = yidongkuaikuai.offsetHeight
        let maliaoWidth = yidongkuaikuai.offsetWidth

        //砖块信息
        let zhuankuaiLefe = Zhuankuai.offsetLeft
        let zhuankuaiTop = Zhuankuai.offsetTop
        let zhuankuaiHeight = Zhuankuai.offsetHeight
        let zhuankuaiWidth = Zhuankuai.offsetWidth

        //检测碰撞//以马里奥为基准
        let A = maliaoLeft + maliaoWidth > zhuankuaiLefe //右
        let B = maliaoLeft < zhuankuaiLefe + zhuankuaiWidth //左
        let C = maliaoTop + maliaoHeight > zhuankuaiTop //下
        let D = maliaoTop < zhuankuaiTop + zhuankuaiHeight //上
            // console.log(A, B, C, D)

        if (A && B && C && D) {
            // console.log('碰撞了')

            //上下正面碰撞
            if (maliaoLeft > zhuankuaiLefe && maliaoLeft + maliaoWidth < zhuankuaiLefe + zhuankuaiWidth) {

                if (maliaoTop < zhuankuaiTop) {
                    // console.log('脚着地')
                    _this.v = 0
                    yidongkuaikuai.style.top = `${zhuankuaiTop - maliaoHeight}px` //矫正 陷入 问题
                    _this.key_SPACE = true //是否落地
                } else {
                    // console.log('碰头')
                    _this.v = 0
                    yidongkuaikuai.style.top = `${zhuankuaiTop + zhuankuaiHeight}px` //矫正 陷入 问题

                    if (Zhuankuai.getAttribute('jianying') != 'true' && _this.bianda && maliaoLeft + maliaoWidth / 2 > zhuankuaiLefe && maliaoLeft + maliaoWidth / 2 < zhuankuaiLefe + zhuankuaiWidth) {
                        //变大的马里奥顶，删除砖块
                        _this.youxichangjing.removeChild(Zhuankuai)
                    }

                }

            } else

            //左右正面碰撞
            if (maliaoTop >= zhuankuaiTop && maliaoTop + maliaoHeight <= zhuankuaiTop + zhuankuaiHeight) {
                // console.log('左右正面碰撞')

                if (maliaoLeft < zhuankuaiLefe) {
                    // console.log('从左碰右壁')
                    yidongkuaikuai.style.left = `${zhuankuaiLefe - maliaoWidth}px` //矫正 陷入 问题
                } else {
                    // console.log('从右碰左壁')
                    yidongkuaikuai.style.left = `${zhuankuaiLefe + zhuankuaiWidth}px` //矫正 陷入 问题
                }

            } else

            //左上角
            if (maliaoLeft <= zhuankuaiLefe && maliaoTop < zhuankuaiTop) {

                if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= maliaoTop + maliaoHeight - zhuankuaiTop) {
                    // console.log('脚着地')
                    _this.v = 0
                    yidongkuaikuai.style.top = `${zhuankuaiTop - maliaoHeight}px` //矫正 陷入 问题
                    _this.key_SPACE = true //是否落地
                } else {
                    // console.log('从左碰右壁')
                    yidongkuaikuai.style.left = `${zhuankuaiLefe - maliaoWidth  - 9}px` //矫正 陷入 问题
                }

            } else

            //右上角
            if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop < zhuankuaiTop) {

                if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft >= maliaoTop + maliaoHeight - zhuankuaiTop) {
                    // console.log('脚着地')
                    _this.v = 0
                    yidongkuaikuai.style.top = `${zhuankuaiTop - maliaoHeight}px` //矫正 陷入 问题
                    _this.key_SPACE = true //是否落地
                } else {
                    // console.log('从右碰左壁')
                    yidongkuaikuai.style.left = `${zhuankuaiLefe + zhuankuaiWidth + 9}px` //矫正 陷入 问题
                }

            } else

            //左下角
            if (maliaoLeft <= zhuankuaiLefe && maliaoTop > zhuankuaiTop) {
                // console.log('左下角')

                if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                    // console.log('碰头')
                    _this.v = 0
                    yidongkuaikuai.style.top = `${zhuankuaiTop + zhuankuaiHeight}px` //矫正 陷入 问题

                    if (Zhuankuai.getAttribute('jianying') != 'true' && _this.bianda && maliaoLeft + maliaoWidth / 2 > zhuankuaiLefe && maliaoLeft + maliaoWidth / 2 < zhuankuaiLefe + zhuankuaiWidth) {
                        //变大的马里奥顶，删除砖块
                        _this.youxichangjing.removeChild(Zhuankuai)
                    }

                } else {
                    // console.log('从左碰右壁')
                    yidongkuaikuai.style.left = `${zhuankuaiLefe - maliaoWidth - 9}px` //矫正 陷入 问题
                }

            } else

            //右下角
            if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop > zhuankuaiTop) {

                if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft > zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                    // console.log('碰头')
                    _this.v = 0
                    yidongkuaikuai.style.top = `${zhuankuaiTop + zhuankuaiHeight}px` //矫正 陷入 问题

                    if (Zhuankuai.getAttribute('jianying') != 'true' && _this.bianda && maliaoLeft + maliaoWidth / 2 > zhuankuaiLefe && maliaoLeft + maliaoWidth / 2 < zhuankuaiLefe + zhuankuaiWidth) {
                        //变大的马里奥顶，删除砖块
                        _this.youxichangjing.removeChild(Zhuankuai)
                    }

                } else {
                    // console.log('从右碰左壁')
                    yidongkuaikuai.style.left = `${zhuankuaiLefe + zhuankuaiWidth + 9}px` //矫正 陷入 问题
                }

            }

        }

    }

}




//问号砖块
Youxikaishi.prototype.wenhao = function() {
    let _this = this

    //所有问号砖块
    this.wenhao = document.querySelectorAll('.wenhao')
        // console.log(this.wenhao)

    setInterval(() => {

        for (let i = 0; i < this.wenhao.length; i++) {
            pengzhuang(this.wenhao[i])
        }

    }, 20)

    function pengzhuang(Zhuankuai) {

        //碰撞后要干的事
        function wenhaoPengtou() {
            Zhuankuai.style.backgroundImage = 'url(./img/wuwenhao.png)'
        }


        //马里奥信息
        let maliaoLeft = _this.maliao.offsetLeft
        let maliaoTop = _this.maliao.offsetTop
        let maliaoHeight = _this.maliao.offsetHeight
        let maliaoWidth = _this.maliao.offsetWidth

        //砖块信息
        let zhuankuaiLefe = Zhuankuai.offsetLeft
        let zhuankuaiTop = Zhuankuai.offsetTop
        let zhuankuaiHeight = Zhuankuai.offsetHeight
        let zhuankuaiWidth = Zhuankuai.offsetWidth

        //检测碰撞//以马里奥为基准
        let A = maliaoLeft + maliaoWidth > zhuankuaiLefe //右
        let B = maliaoLeft < zhuankuaiLefe + zhuankuaiWidth //左
        let C = maliaoTop + maliaoHeight > zhuankuaiTop //下
        let D = maliaoTop < zhuankuaiTop + zhuankuaiHeight //上
            // console.log(A, B, C, D)

        if (A && B && C && D) {
            // console.log('碰撞了')

            //上下正面碰撞
            if (maliaoLeft > zhuankuaiLefe && maliaoLeft + maliaoWidth < zhuankuaiLefe + zhuankuaiWidth) {

                if (maliaoTop > zhuankuaiTop) {
                    // console.log('碰头')
                    wenhaoPengtou()
                        // if (maliaoLeft + maliaoWidth / 2 > zhuankuaiLefe && maliaoLeft + maliaoWidth / 2 < zhuankuaiLefe + zhuankuaiWidth) {}
                }

            } else

            //左下角
            if (maliaoLeft <= zhuankuaiLefe && maliaoTop > zhuankuaiTop) {

                if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                    // console.log('碰头')
                    wenhaoPengtou()
                }

            } else

            //右下角
            if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop > zhuankuaiTop) {

                if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft > zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                    // console.log('碰头')
                    wenhaoPengtou()
                }

            }

        }
    }

}


//蘑菇、花 砖块
Youxikaishi.prototype.moguHua = function() {
    let _this = this

    //所有 蘑菇&花 砖块
    this.moguHua = document.querySelectorAll('.moguHua')
        // console.log(this.moguHua)

    setInterval(() => {

        for (let i = 0; i < this.moguHua.length; i++) {
            pengzhuang(this.moguHua[i])
        }

    }, 20)

    //顶
    function pengzhuang(Zhuankuai) {

        //出现花 函数
        function chuxianhua() {
            console.log('出现花')

            let huaTop = Zhuankuai.offsetTop
            let huaLeft = Zhuankuai.offsetLeft
            let hua = document.createElement('div')
            hua.className = 'hua'
            hua.style.top = `${huaTop}px`
            hua.style.left = `${huaLeft}px`
            _this.youxichangjing.appendChild(hua)

            //上浮
            let huafuqi = setInterval(() => {
                huaTop -= 1.4
                if (huaTop < Zhuankuai.offsetTop - 40) {
                    huaTop = Zhuankuai.offsetTop - 40
                    clearInterval(huafuqi)
                }
                hua.style.top = `${huaTop}px`
            }, 20)

        }


        //出现蘑菇的函数
        function chuxianmogu() {
            // console.log('出现蘑菇')

            _this.chuxianmogu = true

            let moguTop = Zhuankuai.offsetTop
            let moguLeft = Zhuankuai.offsetLeft
            _this.mogu = document.createElement('div')
            let mogu = _this.mogu
            mogu.className = 'hongmogu'
            mogu.style.top = `${moguTop}px`
            mogu.style.left = `${moguLeft}px`
            _this.youxichangjing.appendChild(mogu)

            //上浮
            let mogufuqi = setInterval(() => {
                moguTop -= 1.4
                if (moguTop < Zhuankuai.offsetTop - 40) {
                    moguTop = Zhuankuai.offsetTop - 40
                    clearInterval(mogufuqi)

                    //调用 蘑菇碰撞块块检测/前进 函数
                    pengzhuangMogu()
                }
                mogu.style.top = `${moguTop}px`
            }, 20)



            //蘑菇碰撞块块检测/前进 函数
            function pengzhuangMogu() {
                //所有砖块
                // this.zhuankuai
                // console.log(_this.zhuankuai)

                //蘑菇前进速度
                let qianjinSudu_mogu = 2

                setInterval(() => {

                    //下降
                    moguTop += 2
                    mogu.style.top = `${moguTop}px`

                    //前进/后退
                    moguLeft += qianjinSudu_mogu
                    mogu.style.left = `${moguLeft}px`


                    for (let i = 0; i < _this.zhuankuai.length; i++) {
                        pengzhuang_mogu(_this.zhuankuai[i])
                    }

                }, 20)

                //蘑菇碰撞块块检测
                function pengzhuang_mogu(Zhuankuai) {

                    //马里奥(运动对象(蘑菇))信息
                    let maliaoLeft = mogu.offsetLeft
                    let maliaoTop = mogu.offsetTop
                    let maliaoHeight = mogu.offsetHeight
                    let maliaoWidth = mogu.offsetWidth

                    //砖块信息
                    let zhuankuaiLefe = Zhuankuai.offsetLeft
                    let zhuankuaiTop = Zhuankuai.offsetTop
                    let zhuankuaiHeight = Zhuankuai.offsetHeight
                    let zhuankuaiWidth = Zhuankuai.offsetWidth

                    //检测碰撞//以马里奥为基准
                    let A = maliaoLeft + maliaoWidth > zhuankuaiLefe //右
                    let B = maliaoLeft < zhuankuaiLefe + zhuankuaiWidth //左
                    let C = maliaoTop + maliaoHeight > zhuankuaiTop //下
                    let D = maliaoTop < zhuankuaiTop + zhuankuaiHeight //上
                        // console.log(A, B, C, D)

                    if (A && B && C && D) {
                        // console.log('碰撞了')
                        // mogu.style.top = `${zhuankuaiTop - 40}px`
                        // moguTop = zhuankuaiTop - 40





                        //上下正面碰撞
                        if (maliaoLeft > zhuankuaiLefe && maliaoLeft + maliaoWidth < zhuankuaiLefe + zhuankuaiWidth) {

                            if (maliaoTop < zhuankuaiTop) {
                                // console.log('脚着地')

                                mogu.style.top = `${zhuankuaiTop - 40}px`
                                moguTop = zhuankuaiTop - 40

                            }

                        } else

                        //左右正面碰撞
                        if (maliaoTop >= zhuankuaiTop && maliaoTop + maliaoHeight <= zhuankuaiTop + zhuankuaiHeight) {
                            // console.log('左右正面碰撞')

                            if (maliaoLeft < zhuankuaiLefe) {
                                // console.log('从左碰右壁')
                                qianjinSudu_mogu = -2
                            } else {
                                // console.log('从右碰左壁')
                                qianjinSudu_mogu = 2
                            }

                        } else

                        //左上角
                        if (maliaoLeft <= zhuankuaiLefe && maliaoTop < zhuankuaiTop) {

                            if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= maliaoTop + maliaoHeight - zhuankuaiTop) {
                                // console.log('脚着地')
                                mogu.style.top = `${zhuankuaiTop - 40}px`
                                moguTop = zhuankuaiTop - 40
                            } else {
                                // console.log('从左碰右壁')
                                qianjinSudu_mogu = -2
                            }

                        } else

                        //右上角
                        if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop < zhuankuaiTop) {

                            if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft >= maliaoTop + maliaoHeight - zhuankuaiTop) {
                                // console.log('脚着地')
                                mogu.style.top = `${zhuankuaiTop - 40}px`
                                moguTop = zhuankuaiTop - 40
                            } else {
                                // console.log('从右碰左壁')
                                qianjinSudu_mogu = 2
                            }

                        } else

                        //左下角
                        if (maliaoLeft <= zhuankuaiLefe && maliaoTop > zhuankuaiTop) {
                            // console.log('左下角')

                            if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                                // console.log('碰头')
                            } else {
                                // console.log('从左碰右壁')
                                qianjinSudu_mogu = -2
                            }

                        } else

                        //右下角
                        if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop > zhuankuaiTop) {

                            if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft > zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                                // console.log('碰头')
                            } else {
                                // console.log('从右碰左壁')
                                qianjinSudu_mogu = 2
                            }

                        }



                    }
                }
            }


        }


        //碰撞后要干的事
        function wenhaoPengtou() {
            // console.log(Zhuankuai.getAttribute('kepengzhuang'))
            if (Zhuankuai.getAttribute('kepengzhuang') === 'true') {
                Zhuankuai.style.backgroundImage = 'url(./img/wuwenhao.png)'
                Zhuankuai.setAttribute('kepengzhuang', 'false')

                if (!_this.bianda) { //没变大

                    //调用 出现蘑菇 函数
                    chuxianmogu()
                } else { //变大

                    //调用出现 花 函数
                    chuxianhua()
                }

            }
        }

        //马里奥信息
        let maliaoLeft = _this.maliao.offsetLeft
        let maliaoTop = _this.maliao.offsetTop
        let maliaoHeight = _this.maliao.offsetHeight
        let maliaoWidth = _this.maliao.offsetWidth

        //砖块信息
        let zhuankuaiLefe = Zhuankuai.offsetLeft
        let zhuankuaiTop = Zhuankuai.offsetTop
        let zhuankuaiHeight = Zhuankuai.offsetHeight
        let zhuankuaiWidth = Zhuankuai.offsetWidth

        //检测碰撞//以马里奥为基准
        let A = maliaoLeft + maliaoWidth > zhuankuaiLefe //右
        let B = maliaoLeft < zhuankuaiLefe + zhuankuaiWidth //左
        let C = maliaoTop + maliaoHeight > zhuankuaiTop //下
        let D = maliaoTop < zhuankuaiTop + zhuankuaiHeight //上
            // console.log(A, B, C, D)

        if (A && B && C && D) {
            // console.log('碰撞了蘑菇花')

            //上下正面碰撞
            if (maliaoLeft > zhuankuaiLefe && maliaoLeft + maliaoWidth < zhuankuaiLefe + zhuankuaiWidth) {

                if (maliaoTop > zhuankuaiTop) {
                    // console.log('碰头')
                    wenhaoPengtou()
                        // if (maliaoLeft + maliaoWidth / 2 > zhuankuaiLefe && maliaoLeft + maliaoWidth / 2 < zhuankuaiLefe + zhuankuaiWidth) {}
                }

            } else

            //左下角
            if (maliaoLeft <= zhuankuaiLefe && maliaoTop > zhuankuaiTop) {

                if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                    // console.log('碰头')
                    wenhaoPengtou()
                }

            } else

            //右下角
            if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop > zhuankuaiTop) {

                if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft > zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                    // console.log('碰头')
                    wenhaoPengtou()
                }

            }

        }

    }

}

//检测马里奥吃蘑菇
Youxikaishi.prototype.chimogu = function() {
    let _this = this

    setInterval(() => {
        if (_this.chuxianmogu) {
            pengzhuang_mogu(_this.mogu)
        }
    }, 20)

    function pengzhuang_mogu(Zhuankuai) {

        //马里奥(运动对象(马里奥))信息
        let maliaoLeft = _this.maliao.offsetLeft
        let maliaoTop = _this.maliao.offsetTop
        let maliaoHeight = _this.maliao.offsetHeight
        let maliaoWidth = _this.maliao.offsetWidth

        //砖块(蘑菇)信息
        let zhuankuaiLefe = Zhuankuai.offsetLeft
        let zhuankuaiTop = Zhuankuai.offsetTop
        let zhuankuaiHeight = Zhuankuai.offsetHeight
        let zhuankuaiWidth = Zhuankuai.offsetWidth

        //检测碰撞//以马里奥为基准
        let A = maliaoLeft + maliaoWidth > zhuankuaiLefe //右
        let B = maliaoLeft < zhuankuaiLefe + zhuankuaiWidth //左
        let C = maliaoTop + maliaoHeight > zhuankuaiTop //下
        let D = maliaoTop < zhuankuaiTop + zhuankuaiHeight //上
            // console.log(A, B, C, D)

        if (A && B && C && D) {
            // console.log('吃蘑菇')

            //删除蘑菇
            _this.youxichangjing.removeChild(_this.mogu)

            //马里奥变大
            _this.class_maliao = 'maliao_D'
            _this.class_maliao_zuoqianjin = 'maliao_zuoqianjin_D'
            _this.class_maliao_you = 'maliao_you_D'
            _this.class_maliao_youqianjin = 'maliao_youqianjin_D'
            _this.maliao.className = _this.class_maliao //初始化类名
            _this.key_SPACE = true //是否落地/此刻判定为落地,可再次起跳
            _this.bianda = true //马里奥变大了

        }
    }
}

//小怪
Youxikaishi.prototype.xiaoguai = function() {
    let _this = this

    this.guai = document.querySelectorAll('.guai')
        // console.log(this.guai)

    for (let i = 0; i < this.guai.length; i++) {

        //怪前进速度
        let guai_qianjinSudu = 1


        //左右脚切换
        setInterval(() => {
            this.guai[i].classList.toggle('guai_Q')
        }, 400)

        //检测碰撞
        setInterval(() => {

            //前进
            let guai_qianjin = this.guai[i].offsetLeft - guai_qianjinSudu
            this.guai[i].style.left = `${guai_qianjin}px`

            for (let j = 0; j < this.zhuankuai.length; j++) {
                pengzhuang_guai(this.zhuankuai[j], this.guai[i])
            }

        }, 20)




        // 怪 碰撞块块检测
        function pengzhuang_guai(Zhuankuai, yundongduixiang) {


            //马里奥(运动对象(毒蘑菇))信息
            let maliaoLeft = yundongduixiang.offsetLeft
            let maliaoTop = yundongduixiang.offsetTop
            let maliaoHeight = yundongduixiang.offsetHeight
            let maliaoWidth = yundongduixiang.offsetWidth

            //砖块信息
            let zhuankuaiLefe = Zhuankuai.offsetLeft
            let zhuankuaiTop = Zhuankuai.offsetTop
            let zhuankuaiHeight = Zhuankuai.offsetHeight
            let zhuankuaiWidth = Zhuankuai.offsetWidth

            //检测碰撞//以马里奥为基准
            let A = maliaoLeft + maliaoWidth > zhuankuaiLefe //右
            let B = maliaoLeft < zhuankuaiLefe + zhuankuaiWidth //左
            let C = maliaoTop + maliaoHeight > zhuankuaiTop //下
            let D = maliaoTop < zhuankuaiTop + zhuankuaiHeight //上
                // console.log(A, B, C, D)

            if (A && B && C && D) {
                // console.log('碰撞了')

                //上下正面碰撞
                if (maliaoLeft > zhuankuaiLefe && maliaoLeft + maliaoWidth < zhuankuaiLefe + zhuankuaiWidth) {

                    if (maliaoTop < zhuankuaiTop) {
                        // console.log('脚着地')
                    } else {
                        // console.log('碰头')
                    }

                } else

                //左右正面碰撞
                if (maliaoTop >= zhuankuaiTop && maliaoTop + maliaoHeight <= zhuankuaiTop + zhuankuaiHeight) {
                    console.log('左右正面碰撞')

                    guai_qianjinSudu = -guai_qianjinSudu

                    if (maliaoLeft < zhuankuaiLefe) {
                        // console.log('从左碰右壁')
                    } else {
                        // console.log('从右碰左壁')
                    }

                } else

                //左上角
                if (maliaoLeft <= zhuankuaiLefe && maliaoTop < zhuankuaiTop) {
                    // console.log('左上角')

                    if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= maliaoTop + maliaoHeight - zhuankuaiTop) {
                        // console.log('脚着地')
                    } else {
                        // console.log('从左碰右壁')
                    }

                } else

                //右上角
                if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop < zhuankuaiTop) {
                    // console.log('右上角')

                    if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft >= maliaoTop + maliaoHeight - zhuankuaiTop) {
                        // console.log('脚着地')
                    } else {
                        // console.log('从右碰左壁')
                    }

                } else

                //左下角
                if (maliaoLeft <= zhuankuaiLefe && maliaoTop > zhuankuaiTop) {
                    console.log('左下角')

                    if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                        // console.log('碰头')
                    } else {
                        // console.log('从左碰右壁')
                    }

                } else

                //右下角
                if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop > zhuankuaiTop) {
                    console.log('右下角')

                    if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft > zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                        // console.log('碰头')
                    } else {
                        // console.log('从右碰左壁')
                    }

                }


            }
        }

    }
}