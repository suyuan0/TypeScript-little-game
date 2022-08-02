class Snake {
    // 表示蛇头的元素
    head: HTMLElement
    // 蛇的身体（包括蛇头）
    bodies: HTMLCollection
    // 获取蛇的容器
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div')!
        this.bodies = this.element.getElementsByTagName('div')
    }

    // 获取蛇的坐标（蛇头）
    get X() {
        return this.head.offsetLeft
    }

    // 获取蛇的Y轴坐标
    get Y() {
        return this.head.offsetTop
    }

    set X(value) {
        // 如果蛇的X坐标和value相等，则不执行任何操作
        if (this.X === value) return
        // 判断X值的合法范围0-290之间
        if (value < 0 || value > 290) {
            throw new Error('哈哈哈哈,我没了!!!')
        }
        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之不能向左掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('水平方向发生了掉头')
            // 如果发生了掉头，则不执行任何操作
            if (value > this.X) {
                // 如果新值value大于旧值X，则说明蛇在向右走，不能向左掉头
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.left = value + 'px'
        // 检查有没有撞到身体
        this.checkHeadBody()
    }

    set Y(value) {
        // 如果蛇的Y坐标和value相等，则不执行任何操作
        if (this.Y === value) return
        // 判断Y值的合法范围0-290之间
        if (value < 0 || value > 290) {
            throw new Error('哈哈哈哈,我没了!!!')
        }
        // 修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之不能向上掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // console.log('垂直方向发生了掉头')
            // 如果发生了掉头，则不执行任何操作
            if (value > this.Y) {
                // 如果新值value大于旧值Y，则说明蛇在向下走，不能向上掉头
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.top = value + 'px'
        // 检查有没有撞到身体
        this.checkHeadBody()
    }

    // 设置蛇增加身体的方法
    addBody() {
        // 向element中添加一个div
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    // 添加一个蛇身体移动的方法
    moveBody() {
        /**
         *  将后边的身体设置为前边身体的位置
         *      举例子
         *          第4节 = 第3节的位置
         *          第3节 = 第2节的位置
         *          第2节 = 蛇头的位置
         */
        // 遍历获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 检查头部是否撞到身体
    checkHeadBody() {
        // 获取所有的身体，检查蛇头是否和身体重合
        for (let i = 1; i < this.bodies.length; i++) {
            // 如果蛇头和身体重合，则游戏结束
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 游戏结束
                throw new Error('哎呦,你干嘛~~~')
            }
        }
    }
}

export default Snake
