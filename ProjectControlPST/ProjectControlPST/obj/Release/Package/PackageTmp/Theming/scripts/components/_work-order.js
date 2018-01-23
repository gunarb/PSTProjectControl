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

WO.form = {
    init: function() {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }
};