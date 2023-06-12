
$(document).ready(function () {
  var userId = getUserIdFromCookie();
  if (userId != null) {
    getUserTime(userId);
  }
});

function getUserIdFromCookie() {
  var cookies = document.cookie.split("; ");
  //console.log(cookies);
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    //console.log(cookie);
    if (cookie[0] === "userId") {
      //console.log(cookie[1]);
      return cookie[1];
    }
  }
  return null; // Om cookien inte hittas
}

function getUserTime(inUserId) {
  $.ajax({
    url: '/server/get-alltime-of-user?userId=' + inUserId,
    type: 'GET',
    success: function (data) {
      var tableBody = $('#time-table-body');
      var flexTotalH1 = $('#flexTotal');
      var felxCount = $('#flexCount');
      //var menuUserIndikater = $('#menu');
      //var userName = '<a class="menu-button userName">' + data.username + '</a>'
      tableBody.empty(); // Rensa befintligt innehåll
      var flexTotal = 0;

      for (var i = 0; i < data.times.length; i++) {
        flexTotal += data.times[i];
        var row = '<tr>' +
          '<td>' + data.times[i] + '</td>' +
          '<td>' + data.dates[i] + '</td>' +
          '</tr>';

        tableBody.append(row);
      }
      if (flexTotal > 0) {
        flexTotalH1.text("+" + flexTotal + "H");
        felxCount.addClass("back-green");
      } else {
        flexTotalH1.text("-" + flexTotal + "H");
        felxCount.addClass("back-read");
      }
      //menuUserIndikater.append(userName);
    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
};

function addUserTime() {
  var flexTime = document.getElementById("timeInput").value
  $.ajax({
    url: '/server/add-time-to-user?userId=' + inUserId,
    type: 'GET',
    success: function (data) {

    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
};