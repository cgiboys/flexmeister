
var userId = 0;
$(document).ready(function () {
  userId = getUserIdFromCookie();
  if (userId != null) {
    getUserTime();
  } else {
    window.location = '/login.html';
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

function getUserTime() {
  $.ajax({
    url: '/server/get-alltime-of-user?userId=' + userId,
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
  var flexTime = document.getElementById("timeInput").value;
  console.log(flexTime);
  $.ajax({
    url: '/server/add-time-to-user?userId=' + userId,
    type: 'GET',
    success: function (data) {

    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
};

function togglePopup() {
  var popup = document.getElementById("popup");
  if (popup.classList.contains('hidden')) {
    popup.classList.remove('hidden');
  } else {
    popup.classList.add('hidden');
  }
}

