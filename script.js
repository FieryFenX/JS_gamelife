var tick = 5.000;
var iter;
var timer;
var kill;
  
function purpleDown()
{
  this.style.backgroundColor = '#603060';
}

function purpleUp()
{
  this.style.backgroundColor = 'purple';
}

function desintegrate()
{
  var cell = this;
  kill = setTimeout(function(){cell.style.backgroundColor = 'white';}, 2000);
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
      cell.addEventListener('mousedown', purpleDown);
      cell.addEventListener('mouseup', purpleUp);
      cell.addEventListener('mouseover', desintegrate);
      cell.addEventListener('mouseout', nogoback);
      field.appendChild(cell);
    }
  return field;
}

function clearCells()
{
  pause();
  var field = createField();
  document.body.replaceChild(field, document.getElementById('field'));
  tick = 5;
  document.getElementById('timer').innerText = 'Timer: ' + tick.toFixed(3);
}

function iteration()
{
  tick = 5;
  var field = document.getElementById('field').cloneNode(true);
  for (var i = 0; i < 10; i++)
    for (var j = 0; j < 10; j++)
    {
      var count = 0;
      for (var ii = i-1; ii <= i+1; ii++)
        for (var jj = j-1; jj <= j+1; jj++)
          if (ii != -1 && ii != 10 && jj != -1 && jj != 10 && (ii != i || jj != j))
            if (document.getElementById(ii.toString() + jj.toString()).style.backgroundColor == 'purple')
              count++;
      var cell = field.children[i*10+j];
      cell.addEventListener('mouseover', desintegrate);
      cell.addEventListener('mouseout', nogoback);
      if (count == 3)
        cell.style.backgroundColor = 'purple';
      else if (cell.style.backgroundColor == 'purple' && count != 2)
        cell.style.backgroundColor = 'white';
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
  this.innerText = "pause";
  this.style.backgroundColor = 'blue';
  this.removeEventListener('click', game);
  this.addEventListener('click', pause);
  timer = setInterval(time, 93.5);
  iter = setInterval(iteration, 5000);
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

var clear = document.createElement('button');
clear.id = clear.innerText = "clear";
clear.addEventListener('click', clearCells);
document.body.appendChild(clear);
var start = document.createElement('button');
start.id = start.innerText = 'start';
start.addEventListener('click', game);
document.body.appendChild(start);
