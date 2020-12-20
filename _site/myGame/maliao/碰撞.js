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
            // console.log('左右正面碰撞')

            if (maliaoLeft < zhuankuaiLefe) {
                // console.log('从左碰右壁')
            } else {
                // console.log('从右碰左壁')
            }

        } else

        //左上角
        if (maliaoLeft <= zhuankuaiLefe && maliaoTop < zhuankuaiTop) {

            if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= maliaoTop + maliaoHeight - zhuankuaiTop) {
                // console.log('脚着地')
            } else {
                // console.log('从左碰右壁')
            }

        } else

        //右上角
        if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop < zhuankuaiTop) {

            if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft >= maliaoTop + maliaoHeight - zhuankuaiTop) {
                // console.log('脚着地')
            } else {
                // console.log('从右碰左壁')
            }

        } else

        //左下角
        if (maliaoLeft <= zhuankuaiLefe && maliaoTop > zhuankuaiTop) {
            // console.log('左下角')

            if (maliaoLeft + maliaoWidth - zhuankuaiLefe >= zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                // console.log('碰头')
            } else {
                // console.log('从左碰右壁')
            }

        } else

        //右下角
        if (maliaoLeft + maliaoWidth >= zhuankuaiLefe + zhuankuaiWidth && maliaoTop > zhuankuaiTop) {

            if (zhuankuaiLefe + zhuankuaiWidth - maliaoLeft > zhuankuaiTop + zhuankuaiHeight - maliaoTop) {
                // console.log('碰头')
            } else {
                // console.log('从右碰左壁')
            }

        }


    }
}