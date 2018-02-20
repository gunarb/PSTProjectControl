var PC = PC || {};
PC.workOrder = {
    _prop: {},
    domainBtn: function () {
        var wrapper = $("#domains-inputs");
        var addButton = $("#btn-domains");
        var newDomain = $('#newDomain');
        var count = wrapper.data("count");

        $(addButton).click(function (e) {
            e.preventDefault();
            $(wrapper).append('<div><input name="Domains[' + count + '].domain1" type="text" class="form-control" placeholder="URL" value="' + newDomain.val() + '" /></div>');
            newDomain.val('');
            count++;
        });
    },
    targetDeviceBnt: function () {
        var wrapper = $("#targetDeviceList");
        var addButton = $("#btn-target-device");
        var newTargetDevice = $('#newTargetDevice');

        $(addButton).click(function (e) {
            e.preventDefault();

            const id = newTargetDevice.val().toLowerCase().replace(' ', '-');
            const liItem = '<li id="' + id + '"><span>' + newTargetDevice.val() +
                '</span><button onclick="PC.workOrder.Remove(' + id.toString() + ')" class="btn btn-primary"><i class="fa fa-times"></i></button></li>';
            $(wrapper).append(liItem);
            newTargetDevice.val('');
            PC.workOrder.Update();
        });
    },
    urlAffectedBtn: function () {
        var wrapper = $("#urlAffected-inputs");
        var addButton = $("#btn-urlAffected");
        var newUrlAffected = $('#newUrlAffected');
        var count = wrapper.data("count");

        $(addButton).click(function (e) {
            e.preventDefault();
            $(wrapper).append('<div><input name="EffectedUrls[' + count + '].url" type="text" class="form-control" placeholder="URL" value="' + newUrlAffected.val() + '" /></div>');
            newUrlAffected.val('');
            count++;
        });
    },
    thirdPartyURL: function () {
        var wrapper = $("#thirdParty-inputs");
        var addButton = $("#btn-thirdParty");
        var newThirdPartyUrl = $('#newThirdPartyUrl');
        var newThirdPartyUser = $('#newThirdPartyUser');
        var newThirdPartyPass = $('#newThirdPartyPass');
        var count = wrapper.data("count");

        $(addButton).click(function (e) {
            e.preventDefault();
            var newInputs = '<div><input name="ThirdPartyCredential[' + count + '].url" type="text" class="form-control" placeholder="URL" value="' + newThirdPartyUrl.val() + '" />';
            newInputs += '<input name="ThirdPartyCredential[' + count + '].userName" type="text" class="form-control" placeholder="User" value="' + newThirdPartyUser.val() + '" />';
            newInputs += '<input name="ThirdPartyCredential[' + count + '].passPCrd" type="text" class="form-control" placeholder="PassPCrd" value="' + newThirdPartyPass.val() + '" /></div>';

            $(wrapper).append(newInputs);
            newThirdPartyUrl.val('');
            newThirdPartyUser.val('');
            newThirdPartyPass.val('');
            count++;
        });
    },
    getWorkOrderId:function(contx) {
        const urlSplited = contx.baseURI.split('/');
        return parseInt(urlSplited[5]);
    },
    sendEmail: function(idWorkOrder, url) {
        $.ajax({
            url: "/WorkOrder/SendEmail",
            type: "POST",
            data: `{ 'idWorkOrder': '${idWorkOrder}', 'url': '${url}' }`,
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                console.log("email send");
            },
            error: function(e) {
                console.log(e);
            }
        });
    },
    Update: function() {
        const targetChilden = PC.workOrder._prop.targetList.children();
        var targets = "";

        for (let i = 0; i < targetChilden.length; i++) {
            targets += targetChilden[i].innerText + ";";
        }

        PC.workOrder._prop.targetDevice.val(targets);
    },
    OnSuccess: function(value) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        PC.workOrder._prop.workOrderResult.removeClass("hide");
        PC.workOrder.sendEmail(PC.workOrder.getWorkOrderId(value.context), value.context.baseURI);
    },
    OnComplete: function(value) {
        const buttonValue = value.context.ownerDocument.activeElement.value;
        const urlPdf = value.context.baseURI.replace('update', 'generatepdf');
        if (buttonValue === "ExportPdf")
            window.location.href = urlPdf;
    },
    Remove: function(id) {
        id.remove();
        PC.workOrder.Update();
    },
    setSelector: function() {
        PC.workOrder._prop.referenceJob = $('#referenceJob');
        PC.workOrder._prop.targetDevice = $('#targetDevice');
        PC.workOrder._prop.targetList = $('#targetDeviceList');
        PC.workOrder._prop.workOrderResult = $('#workOrderResult');
        PC.workOrder._prop.referencePreviousJob = $('#referencePreviousJob');
    },
    init: function() {
        PC.workOrder.setSelector();
        PC.workOrder.domainBtn();
        PC.workOrder.targetDeviceBnt();
        PC.workOrder.urlAffectedBtn();
        PC.workOrder.thirdPartyURL();
        $(document).ready(function() {
            if (PC.workOrder._prop.targetDevice.val()) {
                var needButton = this.URL.indexOf("update") > -1;
                const targets = PC.workOrder._prop.targetDevice.val().split(';');
                targets.forEach(function(item) {
                    if (item === "") return;
                    const id = item.toLowerCase().replace(' ', '-');
                    var button = needButton
                        ? '<a onclick="PC.workOrder.Remove(' + id.toString() + ')" class="fa fa-times"></a>'
                        : '';
                    const liItem = '<span id="' + id + '" class="label label-primary">' + item + button + '</span>';
                    PC.workOrder._prop.targetList.append(liItem);
                });
            }

            if (PC.workOrder._prop.referencePreviousJob.val()) {
                $.ajax({
                    url: '/WorkOrder/GetProjectName',
                    data: `{ 'id': '${PC.workOrder._prop.referencePreviousJob.val()}'}`,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        if (PC.workOrder._prop.referenceJob.is('div')) {
                            PC.workOrder._prop.referenceJob.text(data.shift().ProjectName);
                        } else {
                            PC.workOrder._prop.referenceJob.val(data.shift().ProjectName);
                        }
                    }
                });
            }
            PC.workOrder._prop.referenceJob.autocomplete({
                source: function(request, response) {
                    $.ajax({
                        url: '/WorkOrder/AutoComplete',
                        data: `{ 'prefix': '${request.term}'}`,
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            response($.map(data,
                                function(item) {
                                    return { label: item.ProjectName, value: item.ProjectName, idPN: item.UniqueId };
                                }));
                        }
                    });
                },
                select: function(e, i) {
                    PC.workOrder._prop.referencePreviousJob.val(i.item.idPN);
                },
                minLength: 1
            });
        });
    }
};
PC.workOrder.init();