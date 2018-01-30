function createWorkOrder() {
    var workOrder = { idTypeRequest: 1, idProjectStatus: 1 };
    $.ajax({
        type: 'POST',
        url: 'api/PstProjectControlInfo/TestMethod',
        data: JSON.stringify(workOrder),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function () { console.log('New project added'); },
        error: function (msg) { console.log("Error!! " + msg); }
    });
}