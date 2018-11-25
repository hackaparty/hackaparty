import example from '../games/example/playground'
import snake from '../games/snake/playground'
import rabbitHead from '../games/rabbitHead/playground'
import reaction from '../games/reaction/playground'

let urlParameters = window.location.search.substr(1).split('=');
let gameStr = "";
if(urlParameters.length >= 2){
  gameStr = urlParameters[1];
}

switch (gameStr) {
  case "snake":
    new snake();
    break;
  case "rabbitHead":
    new rabbitHead();
    break;
  case "reaction":
    new reaction();
    break;
  case "snake":
      new snake();
      break;
  default:
    new example();
    break;
}
