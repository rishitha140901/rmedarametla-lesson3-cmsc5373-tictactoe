import { GameState } from "../model/tictactoe_game.js";
import { game, updateWindow } from "../view/home_page.js";
export function onclickBoardButton(e){
    
    const pos= parseInt(e.currentTarget.value[3])
    game.play(pos);
    game.setWinner();
    if (game.winner!=null){
        game.gameState=GameState.DONE;
    } else{
        game.changeTurn();
    }
    updateWindow();


}

export function onclickNewGame(e){
   
    game.reset();
    game.gameState = GameState.PLAYING;
    updateWindow();
}