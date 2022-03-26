const { setMedicationRequest } = require("./medication")
const { callFunction } = require("./index");
const { setCondition } = require("./condion");
class excute {

    medicationrequest = async () => {
        await callFunction();
        await setMedicationRequest();
    }

    conditon = async ()=>{
        await callFunction();
        await setCondition();
    }
}




// new excute().medicationrequest();
new excute().conditon()