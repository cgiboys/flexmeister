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
    },
    error: function(xhr, status, error) {
      console.error('Ett fel uppstod:', error);
    }
  });
});