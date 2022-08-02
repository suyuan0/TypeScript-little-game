//引入其它的类
import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./ScorePanel";

// 游戏控制器，控制其它的所有类
class GameControl {
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 分数面板
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇的移动方向(按键的方向)
    direction: string = "";
    // 创建一个属性用来记录游戏是否结束
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 2);
        this.init()
    }

    // 游戏初始化 调用后，游戏开始
    init() {
        // 键盘按下事件
        document.addEventListener("keydown", this.keydownHandler.bind(this))
        // 调用run
        this.run()
    }

    // 创建一个按下键盘的响应函数
    keydownHandler(e: KeyboardEvent) {
        // TODO 检查按下的键盘是否是上下左右
        // 修改direction属性
        this.direction = e.key
    }

    // 创建一个控制蛇移动的方法
    run() {
        /**
         * 根据方向(this.direction)，让蛇移动
         *      向上 top --
         *      向下 to ++
         *      向左 left --
         *      向右 left ++
         */
        let x = this.snake.X
        let y = this.snake.Y
        // 根据方向，让蛇移动
        switch (this.direction) {
            // 向上移动 top --
            case 'ArrowUp':
                y -= 10
                break
            // 向下移动 top ++
            case 'ArrowDown':
                y += 10
                break
            // 向左移动 left --
            case 'ArrowLeft':
                x -= 10
                break
            // 向右移动 left ++
            case 'ArrowRight':
                x += 10
                break
        }
        // 检查蛇是否吃到食物
        this.checkEat(x, y)
        // 修改蛇的坐标
        try {
            this.snake.X = x
            this.snake.Y = y
        } catch (e) {
            // 游戏结束
            alert((e as Error).message)
            this.isLive = false
            return
        }
        // 开启一个定时器，每隔一秒，让蛇移动一次
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    // 定义方法 用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.x && Y === this.food.y) {
            // 如果吃到，就把食物放到随机位置
            this.food.change()
            // 分数增加
            this.scorePanel.addScore()
            // 蛇增加一节
            this.snake.addBody()
        }
    }
}

export default GameControl
