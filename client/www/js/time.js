
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
  var itemMenu = '<div class="tabel-item-buttons">' +
  '<div class="button-tabel-item back-red" onclick="buttonEditUserTime(event)">' + 'Edit' + '</div>' +
  '<div class="button-tabel-item back-red" onclick="delUserTime(event)">' + 'Del' + '</div>' +
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
          '<td data-id="0">' + data.times[i] + '</td>' +
          '<td data-id="1">' + data.dates[i] + '</td>' +
          '<td data-id="2">' + itemMenu + '</td>' +
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

function saveEditUserTime(event) {
  var row = event.target.parentNode.parentNode.parentNode;
  var buttonContainer = event.target.parentNode;
  var rowId = row.dataset.id;
  var rowTime = row.children[0];
  var rowInput = rowTime.children[0];

  //console.log(rowId);
  //console.log(rowInput);
  //console.log(row);
  $.ajax({
    url: '/server/edit-item-with-id-from-user?userId=' + userId  + 
    '&itemId=' + rowId +
    '&newTime=' + rowInput.value,
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

function buttonEditUserTime(event) {
  
  var row = event.target.parentNode.parentNode.parentNode;
  var buttonContainer = event.target.parentNode;
  var rowId = row.dataset.id;
  var rowTime = row.children[0];

  //console.log(FlexEditItim);
  var inputElement = document.createElement("input");
  var saveButton = document.createElement("div");

  // Sätta attribut för input-noden
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("name", "myInput");
  // sätt attribut för div
  saveButton.setAttribute("class", "back-green button-tabel-item");
  saveButton.setAttribute("onclick", "saveEditUserTime(event)"); 
  saveButton.textContent  = "Save";
  buttonContainer.appendChild(saveButton);
  rowTime.appendChild(inputElement);
}

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
