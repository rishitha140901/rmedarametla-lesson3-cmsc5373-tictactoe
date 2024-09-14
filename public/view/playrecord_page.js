import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
import { protectedView } from "./protected_view.js";
import { getAllPlayRecords } from "../controller/firestore_controller.js";
import { DEV } from "../model/constants.js";

export async function PlayRecordPageView(){
    if (!currentUser){
        root.innerHTML= await protectedView();
        return;
    }
    root.innerHTML = '<h1>Play Record page</h1';
    let playRecord;
    try{
        playRecord=await getAllPlayRecords(currentUser.email);
    }catch(e){
        if(DEV) console.log('failed to getAllPlayRecords',e);
        alert(`Failed to get play records: ${JSON.stringify(e)}`)
    }
}