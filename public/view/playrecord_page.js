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
    const response = await fetch('/view/templates/playrecord_page_template.html',
        {cache:'no-store'}
    );
    const divWrapper=document.createElement('div');
    divWrapper.innerHTML=await response.text();
    divWrapper.classList.add('m-4','p-4')
    root.innerHTML='';
    root.appendChild(divWrapper);

    


    let playRecords;
    try{
        playRecords=await getAllPlayRecords(currentUser.email);
    }catch(e){
        if(DEV) console.log('failed to getAllPlayRecords',e);
        alert(`Failed to get play records: ${JSON.stringify(e)}`)
    }

    const tbody = divWrapper.querySelector('tbody');
    playRecords.forEach(record => tbody.appendChild(buildOnePlayRecordView(record)));


}
function buildOnePlayRecordView(record){
    const tr = document.createElement('tr');
    tr.innerHTML=`
    <td>
      ${record.winner}
    </td>
    <td>
      ${record.moves}
    </td>
    <td>
      ${new Date(record.timestamp).toLocaleString()}
    </td>
    `;
    return tr;
}