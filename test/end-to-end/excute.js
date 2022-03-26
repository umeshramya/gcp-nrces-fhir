const { setMedicationRequest } = require("./medication")
const { callFunction } = require("./index")
class excute {

    medicationrequest = async () => {
        await callFunction();
        await setMedicationRequest();
    }
}




new excute().medicationrequest();