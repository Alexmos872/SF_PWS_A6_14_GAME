const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let divSelector = "slot-11";

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый

  if ($("#"+divSelector).hasClass("target") === true) {
  $("#"+divSelector).removeClass("target");
  divSelector_label = divSelector + "-label";
  var div_02  =  document.getElementById(divSelector_label);
  div_02.textContent="Уже случилось: " + hits;
  }

  divSelector = randomDivId();
  divSelector_label = divSelector + "-label";

  $("#"+divSelector).addClass("target");


  var div_02  =  document.getElementById(divSelector_label);
  div_02.textContent=divSelector;

  // TODO: помечать target текущим номером
  // DONE FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1) {
  firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // DONE FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#ROW_01").addClass("d-none");
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // DONE FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

$(document).ready(init);