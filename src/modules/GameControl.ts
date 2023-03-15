import Food from "./Food"
import ScorePanel from "./ScorePanel"
import Snake from "./Snake"

// 游戏控制前，控制其他所有的类
class GameControl{
  snake:Snake
  food:Food
  scorePanel:ScorePanel
  // 蛇的移动方向
  direction: string = 'ArrowRight'
  // 创建一个属性用来记录游戏是否结束
  isLive:Boolean = true
  constructor(){
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    this.init()
  }

  // 游戏初始化
  init(){
    // 绑定键盘按键按下的事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.run()
  }
  /* ArrowUp   Up
  *  ArrowDown Down
  *  ArrowLeft Left
  *  ArrowRight Right
  */
  keydownHandler(event: KeyboardEvent){
    this.direction = event.key
  }

  // 创建一个控制蛇移动的方法
  /* 根据方向（this.direction）来改变蛇的方向
  *   向上  top 减少
  *   向下  top 增加
  *   向左  left 减少
  *   向右  left 增加
  */
  run(){
    // 获取蛇现在坐标
    let X = this.snake.X
    let Y = this.snake.Y
    switch(this.direction){
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break
      case 'ArrowRight':
      case 'Right':
        X += 10
        break
    }
    // 检查蛇是否吃到食物
    this.checkEat(X,Y)
    // 修改蛇的X和Y的值
    try {
      this.snake.X = X
      this.snake.Y = Y
    }catch (e){
      // 进入到catch，说明出现了异常，游戏结束
      alert(e.message + 'GAME OVER!')
      // 讲isLive设置为false
      this.isLive = false
    }
    

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level -1) * 30)
  }

  // 定义一个方法，用来检查蛇是否吃到食物
  checkEat(X:number,Y:number){
    if(X === this.food.X && Y === this.food.Y){
      console.log('吃到食物了')
      // 食物的位置改变
      this.food.change()
      // 分数增加
      this.scorePanel.addScore()
      // 蛇增加一节
      this.snake.addBody()
    }
  }
}

export default GameControl