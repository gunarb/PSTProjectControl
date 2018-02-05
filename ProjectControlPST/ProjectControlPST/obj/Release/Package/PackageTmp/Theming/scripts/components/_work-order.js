var WO = WO || {};

// domainBtn insert input
WO.domainBtn = {
    init: function () {
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
    }
};
WO.domainBtn.init();

// urlAffectedBtn insert input
WO.urlAffectedBtn = {
    init: function () {
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
    }
};
WO.urlAffectedBtn.init();

// thirdPartyURL insert input
WO.thirdPartyURL = {
    init: function () {
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
            newInputs += '<input name="ThirdPartyCredential[' + count + '].password" type="text" class="form-control" placeholder="Password" value="' + newThirdPartyPass.val() + '" /></div>';

            $(wrapper).append(newInputs);
            newThirdPartyUrl.val('');
            newThirdPartyUser.val('');
            newThirdPartyPass.val('');
            count++;
        });
    }
};
WO.thirdPartyURL.init();

WO.OnSuccess = {
    init: function() {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $('#workOrderResult').removeClass("hide");
    }
};

WO.OnComplete = {
    init: function(value) {
        const buttonValue = value.context.ownerDocument.activeElement.value;
        const urlPdf = value.context.baseURI.replace('update', 'generatepdf');
        if (buttonValue === "ExportPdf")
            window.location.href = urlPdf;
    }
};

$(document).ready(function() {
    var referenceJobAutoComplete = $('#referenceJob');
    var referenceJobHide = $('#referencePreviousJob');

    if (referenceJobHide.val()) {
        $.ajax({
            url: '/WorkOrder/GetProjectName',
            data: "{ 'id': '" + referenceJobHide.val() + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (referenceJobAutoComplete.is('div')) {
                    referenceJobAutoComplete.text(data.shift().ProjectName);
                } else {
                    referenceJobAutoComplete.val(data.shift().ProjectName);
                }
            }
        });
    }

    referenceJobAutoComplete.autocomplete({
        source: function (request, response) {
            $.ajax({
                url: '/WorkOrder/AutoComplete',
                data: "{ 'prefix': '" + request.term + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.ProjectName, value: item.ProjectName, idPN: item.UniqueId };
                    }));
                }
            });
        },
        select: function (e, i) {
            referenceJobHide.val(i.item.idPN);
        },
        minLength: 1
    });
});