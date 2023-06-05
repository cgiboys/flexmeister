$(document).ready(function () {
    $.ajax({
        url: '/server/alive', // URL för att hämta filinformation från servern
        type: 'GET',
        success: function (data) {
            var downloadButtons = '';
                if (data.alive == true) {
                    downloadButtons += '<p>Server is alive!!!!</p>';
                } else {
                    downloadButtons += '<p>Server is dead!!!!</p>';
                }
            $('#server-status').html(downloadButtons);
        },
        error: function (xhr, status, error) {
            console.error('Ett fel uppstod:', error);
        }
    });
});