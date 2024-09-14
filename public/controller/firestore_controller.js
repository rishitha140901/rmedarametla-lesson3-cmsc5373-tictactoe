import {
    getFirestore,
    collection, addDoc,

 } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

 import {app} from "./firebase_core.js"

 const TicTacToeGameCollection='tictactoe_game'
 const db = getFirestore(app);

export async function addTicTacToeGameRecord(gameRecord){
    //gameRecord ={email,winner,moves,timestamp};
    await addDoc(collection(db, TicTacToeGameCollection), gameRecord);
}