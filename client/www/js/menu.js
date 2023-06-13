function getUserNameFromCookie() {
  var cookies = document.cookie.split("; ");
  //console.log(cookies);
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    //console.log(cookie);
    if (cookie[0] === "userName") {
      //console.log(cookie[1]);
      return cookie[1];
    }
  }
  return null; // Om cookien inte hittas
}

$(document).ready(function() {
  $.ajax({
    url: '/api/menu',
    type: 'GET',
    success: function(data) {
      var downloadButtons = '';
      var curentSite = window.location.pathname.split('/').pop().split('.')[0];
      var indexFile = null;
      
      // Hitta "index" i filerna
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == 'index') {
          indexFile = data[i];
          break;
        }
      }
      
      // Lägg till "index" först i listan om det finns
      if (indexFile) {
        if (indexFile.id == curentSite) {
          downloadButtons += '<a class="menu-button active" href="' + indexFile.url + '">' + indexFile.title + '</a>';
      } else {
        downloadButtons += '<a class="menu-button" href="' + indexFile.url + '">' + indexFile.title + '</a>';
      }
      }
      
      // Bygg resten av listan
      for (var i = 0; i < data.length; i++) {
        var file = data[i];
        var fileName = file.title;
        var filePath = file.url;
        
        if (file.id !== "index") {
          if (file.id === curentSite) {
            downloadButtons += '<a class="menu-button active" href="' + filePath + '">' + fileName + '</a>';
          } else {
            downloadButtons += '<a class="menu-button" href="' + filePath + '">' + fileName + '</a>';
          }
        }
      }
      
      // Uppdatera menyn i HTML-elementet med id "menu"
      $('#menu').html(downloadButtons);
      var userName = getUserNameFromCookie();
      //console.log(userName);
      if (userName !== null) {
        $('#menu').append('<class="user-menu-contaner"> <a id="user-button" class="menu-button userName" onclick="toggleDropdown()">' + userName + '</a>');
        $('#menu').append('<div id="dropdown-menu" class="dropdown-menu">'+ 
        ' <a id="logOut-button" class="menu-button logout" onclick="logOut()">Logga ut</a> </div>');
      }
    },
    error: function(xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
    
  });
});

function clearCookie(cookieName) {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function logOut() {
  document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.getElementById("user-button").remove();
  document.getElementById("logOut-button").remove();
  window.location = "/login.html";
}

function toggleDropdown() {
  var dropdownMenu = document.getElementById("dropdown-menu");
  dropdownMenu.style.display = (dropdownMenu.style.display === "flex") ? "none" : "flex";
}
