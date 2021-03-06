/*
  new Saolei(id, parameter)
  id: 加载扫雷的dom的id
  parameter(选填): {
    line: 行数,
    column: 列数,
    num: 雷的数量,
    width: dom的宽度,
    height: dom的高度,
  }
*/
function Saolei(id, parameter) {
  let saoleiDiv = document.querySelector(id) //传入的dom
  let saoleiArrObj = [] //渲染页面所需要的数据
  //旗子base64
  let flags = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAC6ElEQVRIS72WT0gUcRTHv++3u7NFEEGCEO4aoe64CR06FEFISFDRpUNBQadOYV2i6BKpixUsVEJolwhCMMKDWZSHsksgRR4qTHddK3ZWksjAQtOZ2ZkXs7k1m+vujO76g7nM7733+b7v788MwcUYC0qtBJqRFbXDRVreUHJT4A8YLQx+zkRd4aTW5ybfHrsicLYAge4I8M1aRRt1K2BV4EXYFAhdclJrdwMvBTjDI8YrJtyQFa3XiYCSgW2wBx4gUsz+coDBwCyA6/WK1rpc92UB22AjACL57C83OKuh1wO02u1fK3BGAANtWfvXBszogZci8mc1/u8OcLL3F2OyN5fTFALeMFO7nFIf/Z9Tro5/ALgqK1p07XY14y68FLXbmg9eyo6HwIjKKa3fyVKsGkzAjAlE6xXtmhNgSTYXAd26Li41TC0obqCZu91Ngm1XD4PERTm58MJN/uq+x8yNckrft1Kga6sTQSmcBo4Rc6MhcE7y6R9rJ/BzpQKWtfpDlW+Xl3AURAcYCABIEyHBJs+DKMTARgIUMA0RjHuhVPqlGxFLwImtvt0mUwczKgH0MpkPjV/p9w3fMJtZ40WrR8KQ/HPenQaLI4AlEG9h8hU5pQ87EZADHg/6D5vgx0x0QVtQb+/4ijl7ETvY/v5dJTZI6/ynBZvnicSpuqT6pBg8BxwLSoZh8p7tk/rrfInLgbOx1vJ4BA3JiuZxDI4FJcuuE3JSs6zLO4qBraRYtdQHRk+xf6+/Hcer/QfZ5LNySjtUCGzNFfqliQWkpyToViipDhTqOsfqsaCU8DAu16W0+8Wsyjc/HpCOG4RIvaLVFsvPAccD3r1MohPgQa8pOmsm1YliBaz5iSp/TVqYzQA1EZvNTo7WkuMU34IKeHwtTHQGjAEBdJPgGOne6RnMf7dAm7B+M/vSFWySbAInQWgg5n4YelvoC6adiC14V48G/fsFuAnANttj1f2UfUzQYFhRnzmB2WN+A+46RS69UAGXAAAAAElFTkSuQmCC`
  //问号
  let wenhao = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAB60lEQVRIS+2Wv2tVQRCFv/MfWChEEQSrQBCEKJpOsZCQgFiYyiqBiJ3aKqgIYhchgfxAOy3URlJIikBSCRYRCxEsFEWxEAURS+HIwA28vLd7775rrMzAVjsz35uZM/uuKDTbw8BR4BhwCNgL7APeV+cj8BmYlfS9Ka2aHGwfBi4C002+1f07YC6OpN+5mFqw7UvAdWBXIbTT7SUwKulrKjYLth0VLrYAdoYsSzpTDLY9Ajz/S+hm+IykK925khXbfgycy4A3gAfAJ+AXcAAI4dVp4LikF535esC2DwIhkJQtA1OSvnVfVqpfAXYnAm9KutEEjpk8TQT/BEYkvcmNoBLjTOL+oaTzTeBrwK2SX52oOnb7SyK2R2SpVj8CJhLBY5Ke1QnO9ilgNeFzVdLtporHgYHq7AHixNymJX1oAN8HJhM+ZyVtGV/jy1W6UjV7vyHpSNE6lcLCz/Z+IPb0cibugqSlbQXbjl2/A8QKpqxnjTadWrfadig/NiBlP4CA3s11rxXY9r14SDJJo63zkl7VjaxvsO3TQLxQKZuQ9KREI23AuWoHJb0tgYZPG/BrYKgLsCApPhaKrQ3YiewnJa0XU1tWvOVfpoKt/3NwP1Vtq6r/L7DtE8Bapuq+BNaXqnfAXS3faXXt5v0BDZ2vHxygMwUAAAAASUVORK5CYII=`
  //处理默认参数
  let defaultParameter = {
    line: 10,
    column: 10,
    num: 10,
    width: 400,
    height: 400,
  }
  Object.keys(parameter).forEach(key => {
    defaultParameter[key] = parameter[key]
  })

  //初始化dom
  saoleiDiv.innerHTML = ''
  let defaultStyles = {
    width: `${defaultParameter.width}px`,
    height: `${defaultParameter.height}px`,
    border: `2px solid #999`,
    position: `relative`,
    userSelect: `none`,
  }
  Object.keys(defaultStyles).forEach(key => {
    saoleiDiv.style[key] = defaultStyles[key]
  })

  /* 创建10×10的数组对象
    {
      X: 0, //坐标X
      Y: 0, //坐标Y
      content: 0, //内容
      state: 'OFF', //区块状态: 'OFF'关闭, 'ON'打开, 'ON2'打开(靠内部), 'Q'已插旗, 'WH'问号
      dom: undefined, //对应的dom节点
    }
  */
  for (let Y = 0; Y < defaultParameter.line; Y++) {
    for (let X = 0; X < defaultParameter.column; X++) {
      saoleiArrObj.push({
        X: X,
        Y: Y,
        state: 'OFF',
        content: 0,
        dom: undefined,
      })
    }
  }

  //随机给数组赋值 num 个9 (9即是雷)
  for (let i = 0; i < defaultParameter.num; i++) {
    let suiji = Math.floor(Math.random() * (defaultParameter.line * defaultParameter.column))
    while (true) {
      if (saoleiArrObj[suiji].content == 9) {
        suiji = Math.floor(Math.random() * (defaultParameter.line * defaultParameter.column))
      } else {
        break
      }
    }
    saoleiArrObj[suiji].content = 9
  }

  //把9周围加一
  for (let i = 0; i < saoleiArrObj.length; i++) {
    if (saoleiArrObj[i].content >= 9) { //可能被加一后大于9
      let X = saoleiArrObj[i].X
      let Y = saoleiArrObj[i].Y
      /*
        i 的周围
        X-1,Y-1
        X,Y-1
        X+1,Y-1
        X-1,Y
        x+1,Y
        X-1,Y+1
        X,Y+1
        X+1,Y+1
      */
      for (let j = 0; j < saoleiArrObj.length; j++) {
        let coordinates = `${saoleiArrObj[j].X},${saoleiArrObj[j].Y}`
        if (
          coordinates == `${X - 1},${Y - 1}` ||
          coordinates == `${X},${Y - 1}` ||
          coordinates == `${X + 1},${Y - 1}` ||
          coordinates == `${X - 1},${Y}` ||
          coordinates == `${X + 1},${Y}` ||
          coordinates == `${X - 1},${Y + 1}` ||
          coordinates == `${X},${Y + 1}` ||
          coordinates == `${X + 1},${Y + 1}`
        ) {
          saoleiArrObj[j].content += 1
        }
      }
    }
  }

  //处理 0 和 9
  for (let i = 0; i < saoleiArrObj.length; i++) {
    if (saoleiArrObj[i].content >= 9) {
      saoleiArrObj[i].content = '雷'
    }
    else if (saoleiArrObj[i].content == 0) {
      saoleiArrObj[i].content = ''
    }
  }

  //渲染区块与写入dom数据
  let pageDom = document.createDocumentFragment()
  for (let i = 0; i < saoleiArrObj.length; i++) {
    let fanggeDom = document.createElement('p')
    let domStyle = {
      margin: `1px`,
      width: `${saoleiDiv.clientWidth / defaultParameter.column - 2}px`,
      height: `${saoleiDiv.clientHeight / defaultParameter.line - 2}px`,
      textAlign: `center`,
      color: `rgb(207, 102, 102)`,
      backgroundColor: `#007acc`,
      float: `left`,
      borderRadius: `2px`,
      cursor: `pointer`,
      lineHeight: `${saoleiDiv.clientHeight / defaultParameter.line - 2}px`,
      fontSize: `${saoleiDiv.clientHeight / defaultParameter.line - 2 - 10}px`,
    }
    Object.keys(domStyle).forEach(key => {
      fanggeDom.style[key] = domStyle[key]
    })
    fanggeDom.className = 'saolei_fangge'
    fanggeDom.innerHTML = `<span style="display:none;">${saoleiArrObj[i].content}</span>`
    pageDom.appendChild(fanggeDom)
    saoleiArrObj[i].dom = fanggeDom
  }
  saoleiDiv.appendChild(pageDom)

  //点击事件 (打开区块)
  saoleiDiv.addEventListener('click', saoleikaishi)
  //=>点击函数
  function saoleikaishi(e) {
    e = e || window.event
    let target = e.target || e.srcElement
    if (target.nodeName === 'P') {
      let targetIndex
      for (let i = 0; i < saoleiArrObj.length; i++) {
        if (saoleiArrObj[i].dom === target) {
          targetIndex = i
        }
      }
      if (targetIndex == undefined) {//可能等于0
        //关闭点击事件
        saoleiDiv.removeEventListener('click', saoleikaishi)
        return
      }
      if (saoleiArrObj[targetIndex].state == 'OFF') {
        target.firstElementChild.style.display = 'inline'
        target.style.backgroundColor = 'rgb(109, 164, 247)'
        saoleiArrObj[targetIndex].state = 'ON'

        //游戏失败
        if (saoleiArrObj[targetIndex].content === '雷') {
          //循环显示所有雷
          for (let i = 0; i < saoleiArrObj.length; i++) {
            if (saoleiArrObj[i].content === '雷') {
              saoleiArrObj[i].dom.style.backgroundColor = 'rgb(109, 164, 247)'
              saoleiArrObj[i].dom.style.backgroundImage = ``
              saoleiArrObj[i].dom.querySelector('span').style.display = 'inline'
            }
          }
          //关闭点击事件
          saoleiDiv.removeEventListener('click', saoleikaishi)
          //关闭右击事件
          saoleiDiv.removeEventListener('contextmenu', contextmenuFun)
          //写入‘游戏失败’页面
          let youxijieshuDiv = document.createElement('div')
          youxijieshuDiv.innerText = '游戏失败'
          let youxijieshuDivStyle = {
            width: '200px',
            height: '70px',
            backgroundColor: 'rgba(252, 120, 120, 0.8)',
            position: 'absolute',
            top: 'calc(50% - 35px - 10px)',
            left: 'calc(50% - 100px)',
            zIndex: '10',
            borderRadius: '20px',
            textAlign: 'center',
            lineHeight: '70px',
            fontSize: '40px',
          }
          Object.keys(youxijieshuDivStyle).forEach(key => {
            youxijieshuDiv.style[key] = youxijieshuDivStyle[key]
          })
          saoleiDiv.appendChild(youxijieshuDiv)
        }//游戏失败 end

        //打开周围空白
        //数据中的‘雷’对应dom数组中的雷，减少dom操作，提高性能
        //定时器
        else if (!saoleiArrObj[targetIndex].content) {
          let polling = setInterval(() => {
            let domPool = []
            for (let i = 0; i < saoleiArrObj.length; i++) {
              if (!saoleiArrObj[i].content && saoleiArrObj[i].state == 'ON') {
                domPool.push(saoleiArrObj[i])
              }
            }
            if (!domPool.length) {
              clearInterval(polling)
              victoryFun() //游戏胜利
            }
            for (let i = 0; i < domPool.length; i++) {
              let X = domPool[i].X
              let Y = domPool[i].Y
              /*
                周围: (X-1,Y-1) (X,Y-1) (X+1,Y-1) (X-1,Y) (x+1,Y) (X-1,Y+1) (X,Y+1) (X+1,Y+1)
              */
              for (let j = 0; j < saoleiArrObj.length; j++) {
                let coordinates = `${saoleiArrObj[j].X},${saoleiArrObj[j].Y}`
                if (
                  coordinates == `${X - 1},${Y - 1}` ||
                  coordinates == `${X},${Y - 1}` ||
                  coordinates == `${X + 1},${Y - 1}` ||
                  coordinates == `${X - 1},${Y}` ||
                  coordinates == `${X + 1},${Y}` ||
                  coordinates == `${X - 1},${Y + 1}` ||
                  coordinates == `${X},${Y + 1}` ||
                  coordinates == `${X + 1},${Y + 1}`
                ) {
                  if (saoleiArrObj[j].state == 'OFF') {
                    saoleiArrObj[j].dom.firstElementChild.style.display = 'inline'
                    saoleiArrObj[j].dom.style.backgroundColor = 'rgb(109, 164, 247)'
                    saoleiArrObj[j].state = 'ON'
                  }
                }
              }
              domPool[i].state = 'ON2'
            }
          }, 20)
        }//打开周围空白 end

        //判断是否游戏胜利
        victoryFun()
        function victoryFun() {
          let fanggeOFF = saoleiArrObj.length //未打开的区块
          for (let i = 0; i < saoleiArrObj.length; i++) {
            if (saoleiArrObj[i].state == 'ON' || saoleiArrObj[i].state == 'ON2') {
              fanggeOFF -= 1
            }
          }
          if (fanggeOFF == defaultParameter.num) {
            //关闭点击事件
            saoleiDiv.removeEventListener('click', saoleikaishi)
            //关闭右击事件
            saoleiDiv.removeEventListener('contextmenu', contextmenuFun)
            //写入‘游戏胜利’页面
            let youxijieshuDiv = document.createElement('div')
            youxijieshuDiv.innerText = '游戏胜利'
            let youxijieshuDivStyle = {
              width: '200px',
              height: '70px',
              backgroundColor: 'rgba(252, 120, 120, 0.8)',
              position: 'absolute',
              top: 'calc(50% - 35px - 10px)',
              left: 'calc(50% - 100px)',
              zIndex: '10',
              borderRadius: '20px',
              textAlign: 'center',
              lineHeight: '70px',
              fontSize: '40px',
            }
            Object.keys(youxijieshuDivStyle).forEach(key => {
              youxijieshuDiv.style[key] = youxijieshuDivStyle[key]
            })
            saoleiDiv.appendChild(youxijieshuDiv)
          }
        }//判断是否游戏胜利 end
      }

    }
  }

  //阻止默认的右键菜单
  saoleiDiv.oncontextmenu = function () { return false; }
  //右击事件
  saoleiDiv.addEventListener('contextmenu', contextmenuFun)
  //=>右击函数
  function contextmenuFun(e) {
    e = e || window.event
    let target = e.target || e.srcElement
    if (target.nodeName === 'P') {
      let targetIndex
      for (let i = 0; i < saoleiArrObj.length; i++) {
        if (saoleiArrObj[i].dom === target) {
          targetIndex = i
        }
      }
      if (targetIndex == undefined) {//可能等于0
        //关闭右击事件
        saoleiDiv.removeEventListener('contextmenu', contextmenuFun)
        return
      }
      if (saoleiArrObj[targetIndex].state == 'OFF') {//插旗
        saoleiArrObj[targetIndex].state = 'Q'
        saoleiArrObj[targetIndex].dom.style.backgroundImage = `url('${flags}')`
        saoleiArrObj[targetIndex].dom.style.backgroundPosition = `center`
        saoleiArrObj[targetIndex].dom.style.backgroundSize = `66%`
        saoleiArrObj[targetIndex].dom.style.backgroundRepeat = `no-repeat`
      }
      else if (saoleiArrObj[targetIndex].state == 'Q') {//打问号
        saoleiArrObj[targetIndex].state = 'WH'
        saoleiArrObj[targetIndex].dom.style.backgroundImage = `url('${wenhao}')`
        saoleiArrObj[targetIndex].dom.style.backgroundPosition = `center`
        saoleiArrObj[targetIndex].dom.style.backgroundSize = `66%`
        saoleiArrObj[targetIndex].dom.style.backgroundRepeat = `no-repeat`
      }
      else if (saoleiArrObj[targetIndex].state == 'WH') {//恢复默认状态
        saoleiArrObj[targetIndex].state = 'OFF'
        saoleiArrObj[targetIndex].dom.style.backgroundImage = ``
      }
    }
  }
}


