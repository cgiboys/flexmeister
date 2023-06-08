
$(document).ready(function () {
});

function getUserTime(inUserId) {
    $.ajax({
      url: '/server/get-alltime-of-user?userId=' + inUserId,
      type: 'GET',
      success: function (data) {
        var tableBody = $('#time-table-body');
        //var menuUserIndikater = $('#menu');
        //var userName = '<a class="menu-button userName">' + data.username + '</a>'
        tableBody.empty(); // Rensa befintligt innehåll
        
        for (var i = 0; i < data.times.length; i++) {
          var row = '<tr>' +
            '<td>' + data.times[i] + '</td>' +
            '<td>' + data.dates[i] + '</td>' +
            '</tr>';
            
          tableBody.append(row);
        }
        //menuUserIndikater.append(userName);
      },
      error: function (xhr, status, error) {
        console.error('Ett fel uppstod:', error);
      }
    });
  };