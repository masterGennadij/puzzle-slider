
var container = document.getElementById('container'),
    dices = document.getElementsByClassName('dice'),
    dice = document.getElementById('dice'),
    elementToDrag = null,
    offX, 
    offY,
    containerCords = container.getBoundingClientRect(),
    diceStartCords = {},
    diceEndCords = {};
document.body.onmouseup = releaseElement;
container.onmousemove = dragElement;
for (var i = 0; i < dices.length; i++) {
  dices[i].onmousedown = captureElement;  
}
diceReset();
button.onclick = diceReset;
button2.onclick = diceSort;
button3.onclick = check;
function captureElement(event) { 
  if (!elementToDrag) {
     elementToDrag = event.currentTarget;
     offX = event.offsetX; 
     offY = event.offsetY; 
     return false;
  }
}  
function releaseElement() { 
    elementToDrag = null;
} 
function dragElement(event) { 
      if (elementToDrag){     
          elementToDrag.style.left = (event.pageX -  offX - containerCords.left)+'px'; 
          elementToDrag.style.top = (event.pageY - offY -  containerCords.top)+'px'; 
          if (event.pageX - offX < containerCords.left) {
            elementToDrag.style.left = 0+'px';
          }
          if (event.pageX - offX+ dice.clientWidth >= containerCords.right) {
            elementToDrag.style.left= 320 - dice.clientWidth+'px';
          }
          if (event.pageY - offY < containerCords.top) {
            elementToDrag.style.top = 0+'px';
          }
          if (event.pageY - offY + dice.clientWidth >= containerCords.bottom) {
            elementToDrag.style.top= 320 - dice.clientWidth+'px';
          }
          rightControl(elementToDrag);
          leftControl(elementToDrag);
          topControl(elementToDrag);
          bottomControl(elementToDrag);  
          checkPosition(elementToDrag, event);        
    }
}
function rightControl(elementToDrag) {
  var elementToDragCords = elementToDrag.getBoundingClientRect(),
      centerX = elementToDragCords.right+1,
      centerY = elementToDragCords.top+(dice.clientWidth/2),
      elemCords = document.elementFromPoint(centerX, centerY);
  if (elemCords.classList[0] == 'dice') {
      var rightCords = elemCords.getBoundingClientRect();            
      elementToDrag.style.left = rightCords.left-containerCords.left-dice.clientWidth+'px';
  }
}
function leftControl(elementToDrag) {
  var elementToDragCords = elementToDrag.getBoundingClientRect(),
      centerX = elementToDragCords.left-1,
      centerY = elementToDragCords.top+(dice.clientWidth/2),
      elemCords = document.elementFromPoint(centerX, centerY);
  if (elemCords.classList[0]  == 'dice') {
     var leftCords = elemCords.getBoundingClientRect();
     elementToDrag.style.left = leftCords.left-containerCords.left+dice.clientWidth+'px';
  }
}
function topControl(elementToDrag) {
  var elementToDragCords = elementToDrag.getBoundingClientRect(),
      centerX = elementToDragCords.left+(dice.clientWidth/2),
      centerY = elementToDragCords.top-1,
      elemCords = document.elementFromPoint(centerX, centerY);
  if (elemCords.classList[0]  == 'dice') {
      var topCords = elemCords.getBoundingClientRect();
      elementToDrag.style.top = topCords.top-containerCords.top+dice.clientWidth+'px';
  }
}
function bottomControl(elementToDrag) {
  var elementToDragCords = elementToDrag.getBoundingClientRect(),
      centerX = elementToDragCords.left+(dice.clientWidth/2),
      centerY = elementToDragCords.bottom+1,
      elemCords = document.elementFromPoint(centerX, centerY);
  if (elemCords.classList[0]  == 'dice') {
      var bottomCords = elemCords.getBoundingClientRect();
      elementToDrag.style.top = bottomCords.top-containerCords.top-dice.clientWidth+'px';
  }
}
function diceReset() {
  var leftSort=0, topSort=0;
  for (var i = 0; i < dices.length; i++) {
    dices[i].style.left = leftSort+'px';
    dices[i].style.top = topSort+'px';
    leftSort+=80;
    if (i==3||i==7||i==11) {
      leftSort=0;
      topSort+=80;
    }
    diceStartCords[i] = dices[i].getBoundingClientRect();
  }
}
function diceSort(){
  var used = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,];
  function compareRandom(a, b) { //мешаем массив случайным образом
    return Math.random() - 0.5;
  }
  used.sort(compareRandom);
  for (var i = 0; i < 15; i++ ) {
    dices[used[i]].style.left = diceStartCords[i].left - containerCords.left+'px';
    dices[used[i]].style.top = diceStartCords[i].top - containerCords.top+'px';
  }
}
function check() {  //Проверка на правильность 
  var countFail=[];
  for (var i = 0; i < 15; i++) {
    diceEndCords[i] = dices[i].getBoundingClientRect();
  }
  for (var i = 0, j=0; i < 15; i++ ) {
    if (diceEndCords[i].left==diceStartCords[i].left&&diceEndCords[i].top==diceStartCords[i].top) j++;
  }
  (j==15)?alert('Верно! Вы выиграли!'):alert('Ошибка! Подумайте еще.');
}

function checkPosition(elementToDrag, event) {
  if (document.elementFromPoint(event.pageX, event.pageY)!=elementToDrag)
    releaseElement();

}
window.onresize = function(){
 containerCords = container.getBoundingClientRect();
}