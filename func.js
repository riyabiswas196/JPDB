$("#roll").focus();

function saveRecNo2LS(jsonObj) {
    var lvdata = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvdata.rec_no);
}

function getRollAsJsonObj() {
    var roll = $("#roll").val();
    var jsonStr = {
        id: roll
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#studName").val(record.studName);
    $("#cls").val(record.class);
    $("#dob").val(record.dob);
    $("#address").val(record.address);
    $("#enrDate").val(record.enrDate);
}

function resetForm() {
    $("#roll").val("")
    $("#studName").val("");
    $("#cls").val("");
    $("#dob").val("");
    $("#address").val("");
    $("#enrDate").val("");
    $("#roll").prop("disabled", false);
    $("#Save").prop("disabled", true);
    $("#Update").prop("disabled", true);
    $("#Reset").prop("disabled", true);
    $("#roll").focus();
}

function validateData() {
    var roll, studName, cls, dob,address,enrDate;
    roll = $("#roll").val("")
    studName = $("#studName").val("");
    cls = $("#cls").val("");
    dob = $("#dob").val("");
    address = $("#address").val("");
    enrDate = $("#enrDate").val("");

    if (roll === "") {
        alert("Roll number Missing");
        $("#roll").focus();
        return "";
    }

    if (studName === "") {
        alert("Student Name Missing");
        $("#studName").focus();
        return "";
    }

    if (cls === "") {
        alert("Class Missing");
        $("#cls").focus();
        return "";
    }

    if (dob === "") {
        alert("Birthdate Missing");
        $("#dob").focus();
        return "";
    }

    if (address === "") {
        alert("Address Missing");
        $("#address").focus();
        return "";
    }

    if (enrDate === "") {
        alert("Enrollment Date Missing");
        $("#enrDate").focus();
        return "";
    }

    var jsonStrObj = {
        rollno: roll,
        name: studName,
        studclasss: cls,
        birthdate: dob,
        studaddress: address,
        studenrDate: enrDate    };
    return JSON.stringify(jsonStrObj);
}

function getroll() {
    var rollnoJsonObj = getRollAsJsonObj();
    var getRequest = createGET_BY_KEYRequest("90931330|-31949322710474205|90950574", "SCHOOL-DB", "STUDENT-TABLE", rollnoJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({ async: true });
    if (resJsonObj.status === 400) {
        $("#Save").prop("disabled", false);
        $("#Update").prop("disabled", false);
        $("#studName").focus();
    }
    else if (resJsonObj.status === 200) {
        $("#roll").prop("disabled", true);
        fillData(resJsonObj);

        $("#Update").prop("disabled", false);
        $("#Reset").prop("disabled", false);
        $("#studName").focus();
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }

    var putRequest = createPUTRequest("90931330|-31949322710474205|90950574", jsonStrObj, "SCHOOL-DB", "STUDENT-TABLE");
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({ async: true });
    alert(JSON.stringify(resJsonObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#roll").focus();
}

function updateData() {
    $("#Update").prop("disabled", true);
    jsonChg = validateData();

    var updateRequest = createUPDATERecordRequest("90931330|-31949322710474205|90950574",jsonChg, "SCHOOL-DB", "STUDENT-TABLE", localStorage.getItem("recno"));
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetForm();
    $("#roll").focus();
}
