var WO = WO || {};

// domainBtn insert input
WO.domainBtn = {
    init: function () {
        var count = 1;
        var wrapper = $("#domains-inputs");
        var addButton = $("#btn-domains");
        var newDomain = $('#newDomain');

        $(addButton).click(function (e) {
            e.preventDefault();
            $(wrapper).append('<input id="new-domain-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newDomain.val() + '" />');
            newDomain.val('');
            count++;
        });
    }
};
WO.domainBtn.init();

// urlAffectedBtn insert input
WO.urlAffectedBtn = {
    init: function () {
        var count = 1;
        var wrapper = $("#urlAffected-inputs");
        var addButton = $("#btn-urlAffected");
        var newUrlAffected = $('#newUrlAffected');

        $(addButton).click(function (e) {
            e.preventDefault();
            $(wrapper).append('<input id="new-urlAffected-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newUrlAffected.val() + '" />');
            newUrlAffected.val('');
            count++;
        });
    }
};
WO.urlAffectedBtn.init();

// thirdPartyURL insert input
WO.thirdPartyURL = {
    init: function () {
        var count = 1;
        var wrapper = $("#thirdParty-inputs");
        var addButton = $("#btn-thirdParty");
        var newThirdPartyUrl = $('#newThirdPartyUrl');
        var newThirdPartyUser = $('#newThirdPartyUser');
        var newThirdPartyPass = $('#newThirdPartyPass');

        $(addButton).click(function (e) {
            e.preventDefault();
            var newInputs = '<input id="new-thirdPartyURL-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newThirdPartyUrl.val() + '" />';
            newInputs += '<input id="new-thirdPartyUser-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newThirdPartyUser.val() + '" />';
            newInputs += '<input id="new-thirdPartyPass-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newThirdPartyPass.val() + '" />';

            $(wrapper).append(newInputs);
            newThirdPartyUrl.val('');
            newThirdPartyUser.val('');
            newThirdPartyPass.val('');
            count++;
        });
    }
};
WO.thirdPartyURL.init();