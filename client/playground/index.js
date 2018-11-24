import example from '../games/example/playground'
//import snake from '../games/snake/playground'
import rabbitHead from '../games/rabbitHead/playground'
import reaction from '../games/reaction/playground'

let urlParameters = window.location.search.substr(1).split('=');
let gameStr = "";
if(urlParameters.length >= 2){
  gameStr = urlParameters[1];
}

switch (gameStr) {
  case "rabbitHead":
    new rabbitHead();
    break;
  case "reaction":
    new reaction();
    break;
  default:
    new example();
    break;
}
