// 定义计分牌的类
class ScorePanel{
  score = 0
  level = 1
  ScoreEle: HTMLElement
  LevelEle: HTMLElement

  // 设置一个变量限制等级
  maxLevel:number
  // 设置一个变量表示多少分升级
  upScore:number
  constructor(maxLevel:number = 10,upScore:number=10){
    this.ScoreEle = document.getElementById('score')!
    this.LevelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 加分
  addScore(){
    this.ScoreEle.innerHTML = ++this.score + ''
    // 判断分数是多少，每10分升一级
    if(this.score % this.upScore === 0){
      this.levelUp()
    }
  }
  // 提升等级
  levelUp(){
    if(this.level < this.maxLevel){
      this.LevelEle.innerHTML = ++this.level + ''
    }
  }
}

export default ScorePanel