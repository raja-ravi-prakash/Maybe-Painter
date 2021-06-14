var can = document.getElementById("can");
var cont = can.getContext("2d");
var isCon = false;
var shapes = [];
var drm = true;
var str = true;
var color = "#000000";
var cur = -1;

cont.canvas.width = window.innerWidth;
cont.canvas.height = window.innerHeight;

function updateFrame() {
  shapes.forEach((el) => {
    cont.strokeStyle = el.color;
    cont.fillStyle = el.color;
    if (el.type) cont.strokeRect(el.x, el.y, el.width, el.height);
    else cont.fillRect(el.x, el.y, el.width, el.height);
  });
}

function addRect(x, y) {
  shapes.push({
    x: x - can.offsetLeft,
    y: y - can.offsetTop,
    width: 0,
    height: 0,
    type: str,
    color: color,
  });
  cur = shapes.length - 1;
}

function modeChanged() {
  let m = document.getElementsByTagName("select")[0].value;

  if (m == "drag") drm = false;
  else drm = true;
}

function strokeChanged() {
  let m = document.getElementsByTagName("select")[1].value;

  if (m == "fill") str = false;
  else str = true;
}

function colorChanged() {
  color = document.getElementsByTagName("input")[0].value;
}

function updateRect(x, y) {
  shapes[cur].width = x - shapes[cur].x;
  shapes[cur].height = y - shapes[cur].y;
}

function dragRect(x, y) {
  if (cur != -1) {
    shapes[cur].x = x;
    shapes[cur].y = y;
  }
}

function detectRect(cx, cy) {
  cur = -1;
  for (let i = 0; i < shapes.length; i++) {
    let { x, y, width, height } = shapes[i];
    let flag = false;

    if (cx >= x && cx <= x + width && cy >= y && cy <= y + height) flag = true;

    if (flag) {
      cur = i;
      break;
    }
  }
}

can.addEventListener("pointerdown", function (e) {
  isCon = true;
  if (drm) addRect(e.clientX, e.clientY);
  else detectRect(e.clientX, e.clientY);
});

can.addEventListener("pointermove", function (e) {
  if (isCon) {
    cont.clearRect(0, 0, can.width, can.height);
    var x = e.clientX - can.offsetLeft;
    var y = e.clientY - can.offsetTop;
    if (drm) updateRect(x, y);
    else dragRect(x, y);
    requestAnimationFrame(updateFrame);
  }
});

can.addEventListener("pointerup", function (e) {
  isCon = false;
});
