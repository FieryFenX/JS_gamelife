const tick_length = 1.000;
var tick;
var iter;
var timer;
var kill;

function rise()
{
  this.className = "rising";
}

function live()
{
  this.className = "alive";
}

function desintegrate()
{
  var cell = this;
  kill = setTimeout(function(){cell.className = 'dead';}, 2000);
}

function nogoback()
{
  clearTimeout(kill);
}

function createField()
{
  var field = document.createElement('section');
  field.id = 'field';
  for (var i = 0; i < 10; i++)
    for (var j = 0; j < 10; j++)
    {
      var cell = document.createElement('div');
      cell.id = i.toString() + j.toString();
      cell.className = "dead";
      cell.addEventListener('mousedown', rise);
      cell.addEventListener('mouseup', live);
      cell.addEventListener('mouseover', desintegrate);
      cell.addEventListener('mouseout', nogoback);
      field.appendChild(cell);
    }
  return field;
}

function cellsNear(i,j)
{
  var count = 0;
  for (var ii = i-1; ii <= i+1; ii++)
    for (var jj = j-1; jj <= j+1; jj++)
      if (ii != -1 && ii != 10 && jj != -1 && jj != 10 && (ii != i || jj != j))
        if (document.getElementById(ii.toString() + jj.toString()).className == "alive")
          count++;
  return count;
}

function clearCells()
{
  pause();
  var field = createField();
  document.body.replaceChild(field, document.getElementById('field'));
  tick = tick_length;
  document.getElementById('timer').innerText = 'Timer: ' + tick.toFixed(3);
}

function iteration()
{
  tick = tick_length;
  var field = document.getElementById('field').cloneNode(true);
  for (var i = 0; i < 10; i++)
    for (var j = 0; j < 10; j++)
    {
      var count = cellsNear(i,j);
      var cell = field.children[i*10+j];
      cell.addEventListener('mouseover', desintegrate);
      cell.addEventListener('mouseout', nogoback);
      if (count == 3)
        cell.className = "alive";
      else if (cell.className == "alive" && count != 2)
        cell.className = "dead";
    }
  document.body.replaceChild(field, document.getElementById('field'));
}

function time()
{
  tick -= 0.100;
  if (tick > 0)
    document.getElementById('timer').innerText = 'Timer: ' + tick.toFixed(3);
}

function game()
{
  for (var i = 0; i < 10; i++)
    for (var j = 0; j < 10; j++)
    {
      var cell = document.getElementById(i.toString() + j.toString());
      cell.removeEventListener('mousedown', rise);
      cell.removeEventListener('mouseup', live);
    }
  tick = tick_length;
  this.innerText = "pause";
  this.style.backgroundColor = 'blue';
  this.removeEventListener('click', game);
  this.addEventListener('click', pause);
  iter = setInterval(iteration, tick_length*1000);
  timer = setInterval(time, 93.5);
}

function pause()
{
  var button = document.getElementById('start');
  button.innerText = "start";
  button.style.backgroundColor = 'green';
  button.removeEventListener('click', pause);
  button.addEventListener('click', game);
  clearInterval(iter);
  clearInterval(timer);
}

var field = createField();
document.body.appendChild(field);

document.getElementById('timer').innerText = "Timer: " + tick_length.toFixed(3);
var clear = document.createElement('button');
clear.id = clear.innerText = "clear";
clear.addEventListener('click', clearCells);
document.body.appendChild(clear);
var start = document.createElement('button');
start.id = start.innerText = 'start';
start.addEventListener('click', game);
document.body.appendChild(start);