class Snake{
  element:HTMLElement
  head: HTMLElement
  bodies: HTMLCollection
  constructor(){
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')!
    this.bodies = this.element.getElementsByTagName('div')
  }

  // 获取蛇头的坐标
  get X(){
    return this.head.offsetLeft
  }
  get Y(){
    return this.head.offsetTop
  }
  // 设置蛇头的坐标
  set X(value:number){
    if(this.X === value ) return
    // X的值的合法范围0-290之间
    if(value < 0 || value > 290) {
      // 说明蛇撞墙了
      throw new Error('蛇撞墙了')
    }

    // 修改X时，蛇在向左移动时不能向右调头，反之亦然
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
      // 水平方向调头，让蛇向相反方向继续移动
      if(value > this.X){
        // 如果新值value大于旧值X，说明蛇在向右走，此时发生调头，应该继续让蛇向左走
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    // 检查有没有撞到自己
    this.checkHeadBody()
  }
  set Y(value:number){
    if(this.Y === value ) return
    // Y的值的合法范围0-290之间
    if(value < 0 || value > 290) {
      // 说明蛇撞墙了
      throw new Error('蛇撞墙了')
    }
    // 修改Y时，蛇在向左移动时不能向右调头，反之亦然
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
      // 水平方向调头，让蛇向相反方向继续移动
      if(value > this.Y){
        // 如果新值value大于旧值X，说明蛇在向右走，此时发生调头，应该继续让蛇向左走
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    // 检查有没有撞到自己
    this.checkHeadBody()
  }

  // 蛇增加身体的方法
  addBody(){
    this.element.insertAdjacentHTML("beforeend", '<div></div>')
  }
  // 蛇身体移动的方法
  moveBody(){
    // 将后边身体设置为前边身体的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }
  // 检查蛇头是否撞到身体的方法
  checkHeadBody(){
    // 获取所有的身体，检查是否和舌头的坐标发生重叠
    
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        // 说明蛇头撞到了身体
        throw new Error('撞到自己了~~')
      }
      
    }
  }
}


export default Snake