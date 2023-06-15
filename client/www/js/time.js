
var userId = 0;
$(document).ready(function () {
  userId = getUserIdFromCookie();
  if (userId != null) {
    UppdateraTabel();
  } else {
    window.location = '/login.html';
  }
});

function UppdateraTabel() {
  getUserTime();
  getTotalFlexTimeOfUser();
}

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
  var itemMenu = '<div class="itemMenuButton">' +
  '<div class="button-del-time" onclick="delUserTime(event)">' + 'Del' + '</div>' +
  '</div>';
  $.ajax({
    url: '/server/get-alltime-of-user?userId=' + userId,
    type: 'GET',
    success: function (data) {
      var tableBody = $('#time-table-body');
      //var userName = '<a class="menu-button userName">' + data.username + '</a>'
      tableBody.empty(); // Rensa befintligt innehåll


      for (var i = 0; i < data.times.length; i++) {
        var row = '<tr data-id="' + i +'">' +
          '<td>' + data.times[i] + '</td>' +
          '<td>' + data.dates[i] + '</td>' +
          '<td>' + itemMenu + '</td>' +
          '</tr>';

        tableBody.append(row);
      }
    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
};

function addUserTime(time, date) {
  //console.log(time + " : " + date);
  $.ajax({
    url: '/server/add-time-to-user?userId=' + userId  + 
    '&time=' + time,
    type: 'GET',
    success: function (data) {
      if (data == 1) {
        console.log('user not found');
      }
    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
  UppdateraTabel();
};

function delUserTime(event) {
  //console.log(time + " : " + date);
  var rowId = event.target.parentNode.parentNode.parentNode.dataset.id;
  //console.log(event.target.parentNode.parentNode.parentNode.dataset.id);
  $.ajax({
    url: '/server/del-item-with-id-from-user?userId=' + userId  + 
    '&itemId=' + rowId,
    type: 'GET',
    success: function (data) {
      if (data == 1) {
        console.log('user not found');
      } else if (data == 2) {
        console.log('item not found');
      }
    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
  UppdateraTabel();
};

function buttonAddUserTime() {
  var input = document.getElementById("timeInput");

  addUserTime(input.value);
  togglePopup(false);
}

function togglePopup(negative) {
  var popup = document.getElementById("popup");
  if (popup.classList.contains('hidden')) {
    popup.classList.remove('hidden');
  } else {
    popup.classList.add('hidden');
  }
  if (negative) {
    document.getElementById("timeInput").value = -1;
  } else {
    document.getElementById("timeInput").value = 1;
  }
}

function getTotalFlexTimeOfUser() {
  $.ajax({
    url: '/server/get-total-flex-time-of-user?userId=' + userId,
    type: 'GET',
    success: function (data) {
      //console.log(data);
      var flexTotalLabel = $('#flexTotal');
      var felxCount = $('#flexCounters');
      if (data > 0) {
        flexTotalLabel.text("+" + data + "H");
        felxCount.addClass("back-green");
      } else {
        flexTotalLabel.text(data + "H");
        felxCount.addClass("back-read");
      }
    },
    error: function (xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
}
