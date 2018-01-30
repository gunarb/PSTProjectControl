var Pr = Pr || {};

Pr.preferences = {
    moveItems: function (origin, destination) {
        $(origin).find(':selected').appendTo(destination);
    },
    moveAllItems: function (origin, destination) {
        $(origin).children().appendTo(destination);
    },
    init: function() {
        $('#left').click(function () {
            Pr.preferences.moveItems('#assetsDestination', '#assetsOring');
        });
        $('#right').on('click', function () {
            Pr.preferences.moveItems('#assetsOring', '#assetsDestination');
        });
    }
};
Pr.preferences.init();

Pr.form = {
    init: function () {
        //$('html, body').animate({ scrollTop: 0 }, 'fast');
        alert("Preferences updated!");
    }
};

Pr.SelectedIndexChanged = {
    init: function () {
        //$('html, body').animate({ scrollTop: 0 }, 'fast');
        var typeRequest = $('#TypeRequest :selected').text();
        alert("On changed!" + typeRequest);
    }
};