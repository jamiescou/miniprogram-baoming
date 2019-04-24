
/* eslint-disable */
export function randomColor(min, max) {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}
/**绘制验证码图片**/
export function drawPic(that, codeKey) {
  const ctx = wx.createCanvasContext('canvas')
  /**绘制背景色**/
  ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
  ctx.fillRect(0, 0, 90, 28)
  /**绘制文字**/
  var arr;
  var text = '';
  var str = codeKey;
  for (var i = 0; i < str.length; i++) {
      var txt = str[i];
      ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
      ctx.font = randomNum(20, 26) + 'px SimHei'; //随机生成字体大小
      var x = 5 + i * 20;
      var y = randomNum(20, 25);
      var deg = randomNum(-20, 20);
      //修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 5, 0);
      text = text + txt;
      //恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
  }
  /**绘制干扰线**/
  for (var i = 0; i < 4; i++) {
      ctx.strokeStyle = randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(randomNum(0, 90), randomNum(0, 28));
      ctx.lineTo(randomNum(0, 90), randomNum(0, 28));
      ctx.stroke();
  }
  /**绘制干扰点**/
  for (var i = 0; i < 20; i++) {
      ctx.fillStyle = randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(randomNum(0, 90), randomNum(0, 28), 1, 0, 2 * Math.PI);
      ctx.fill();
  }
  ctx.draw(false, function() {
      // that.formData.idCardKey = text
  });
}
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}