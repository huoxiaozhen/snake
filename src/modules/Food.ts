// 定义食物的类
class Food{
  element:HTMLElement
  constructor(){
    this.element = document.getElementById('food')!
  }

  // 获取食物坐标
  get X(){
    return this.element.offsetLeft
  }
  get Y(){
    return this.element.offsetTop
  }
  // 修改食物的位置
  change(){
    // 生成一个随机的位置
    // 食物的位置最小是0，最大是290
    // 蛇移动一次是一格，一格的大小是10，所以就要求食物的坐标必须是整10
    let x = Math.round(Math.random()*29)*10
    let y = Math.round(Math.random()*29)*10
    this.element.style.left = x + 'px'
    this.element.style.top = y + 'px'
  }
}


export default Food