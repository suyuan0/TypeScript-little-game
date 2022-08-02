// 定义表示记分牌的类
class ScorePanel {
    // score 和 level 用来记录分数的等级
    score = 0
    level = 1
    scoreSpan: HTMLElement
    levelSpan: HTMLElement
    // 设置一个等级上限变量
    maxLevel: number
    // 设置一个变量表示多少分升级
    upScore: number

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreSpan = document.getElementById('score')!
        this.levelSpan = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    // 设置一个加分的方法
    addScore() {
        // 分数自增
        this.scoreSpan.innerHTML = ++this.score + ''
        // 判断分数
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    // 提升等级的方法
    levelUp() {
        // 等级上限
        if (this.level < this.maxLevel) {
            // 等级自增
            this.levelSpan.innerHTML = ++this.level + ''
        }
    }
}

export default ScorePanel
