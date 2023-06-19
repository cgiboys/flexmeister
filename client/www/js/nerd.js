var userId = 0;

$(document).ready(function () {
  userId = getUserIdFromCookie();
  if (userId != null) {
    populateWeekView();
    populateMonthView();
  } else {
    window.location = '/login.html';
  }
});

function populateWeekView() {
  var weekViewList = $('.week-view tbody');
  weekViewList.empty(); // Rensa befintligt innehåll

  $.ajax({
    url: '/server/get-v-time-of-user?userId=' + userId,
    type: 'GET',
    success: function (data) {
      for (var i = 0; i < data.times.length; i++) {
        var row = '<tr data-id="' + i +'">' +
          '<td data-id="0">' + data.times[i] + '</td>' +
          '<td data-id="1">' + data.dates[i] + '</td>'+
          '</tr>';

        weekViewList.append(row);
      }
    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
}

function populateMonthView() {
  var monthViewList = $('.month-view tbody');
  monthViewList.empty(); // Rensa befintligt innehåll

  $.ajax({
    url: '/server/get-m-time-of-user?userId=' + userId,
    type: 'GET',
    success: function (data) {
      for (var i = 0; i < data.times.length; i++) {
        var row = '<tr data-id="' + i +'">' +
          '<td data-id="0">' + data.times[i] + '</td>' +
          '<td data-id="1">' + data.dates[i] + '</td>' +
          '</tr>';

        monthViewList.append(row);
      }
    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
}

function getUserIdFromCookie() {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    if (cookie[0] === "userId") {
      return cookie[1];
    }
  }
  return null; // Om cookien inte hittas
}

function getTotalFlexTimeOfUser() {
  $.ajax({
    url: '/server/get-total-flex-time-of-user?userId=' + userId,
    type: 'GET',
    success: function (data) {
      var flexTotalLabel = $('#flexTotal');
      var felxCount = $('#flexCounters');
      if (data > 0) {
        flexTotalLabel.text("+" + data + "H");
        felxCount.addClass("back-green");
        felxCount.removeClass("back-red");
      } else {
        flexTotalLabel.text(data + "H");
        felxCount.addClass("back-red");
        felxCount.removeClass("back-green");
      }
    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
}