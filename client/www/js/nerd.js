var userId = 0;

$(document).ready(function () {
    userId = getUserIdFromCookie();
    var calendarMonthLabel = document.getElementById('label-monad');
    var weekLabel = document.getElementById('label-week');
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    calendarMonthLabel.setAttribute("data-month", currentMonth);
    if (userId != null) {
        weekLabel.setAttribute("data-week", getWeek(currentDate));
        populateWeekView();
        //WeekDebugg();
        populateMonthView(currentMonth);
    } else {
        window.location = '/login.html';
    }
});

function populateWeekView() {
    var weekViewList = $('.week-view tbody');
    weekViewList.empty(); // Rensa befintligt innehåll
    var weekLabel = document.getElementById('label-week');
    var currentWeek = weekLabel.getAttribute('data-week');
    var currentDate = new Date();

    $.ajax({
        url: '/server/get-v-time-of-user?userId=' + userId +
        '&week=' + currentWeek +
        '&year=' + currentDate.getFullYear(),
        type: 'GET',
        success: function (data) {
            var weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            //console.log(weekLabel.innerText);
            weekLabel.innerText = "Vecka: " + weekLabel.getAttribute('data-week');
            //weekLabel.setAttribute("data-week", data.weekNumber);
            //console.log(weekLabel.innerText + ': ' + weekLabel.getAttribute('data-week'));
            for (var i = 0; i < data.days.length; i++) {
                // Markera aktuell dag
                
                var todayclass = "";
                //console.log(data.days[i].date + " värdet i slistan");
                //console.log(currentDate);
                var curentDateString = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, '0') + "-" + currentDate.getDate();
                //console.log(curentDateString);
                //var dataDate = new Date(data.days[i].date);
                if (curentDateString === data.days[i].date) {
                    todayclass = "current-day";
                } else {
                    //console.log(curentDateString + " is not " + data.days[i].date)
                }
                var row = '<tr data-id="' + i + '" class="' + todayclass + '">' +
                    '<td data-id="0">' + data.days[i].flexTime + '</td>' +
                    '<td data-id="1">' + data.days[i].date + '</td>' +
                    '<td data-id="1">' + weekdayNames[data.days[i].dayNumber - 1] + '</td>' +
                    '</tr>';

                weekViewList.append(row);
            }
        },
        error: function (xhr, status, error) {
            console.error('Ett fel uppstod:', error);
        }
    });
}

function WeekDebugg() {
    $.ajax({
        url: '/server/get-v-time-of-user?userId=' + userId,
        type: 'GET',
        success: function (data) {
            console.log(data);
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

function getNextMonth() {
    var thisMonth = document.getElementById('label-monad').dataset.month;
    if (thisMonth === "undefined") {
        thisMonth = 1;
    }
    var nextMonth = parseInt(thisMonth) + 1;
    if (nextMonth === 12) {
        nextMonth = 1;
    }
    populateMonthView(nextMonth);
}

function getPreviousMonth() {
    var thisMonth = document.getElementById('label-monad').dataset.month;
    if (thisMonth === "undefined") {
        thisMonth = 12;
    }
    var previousMouth = thisMonth - 1;
    if (previousMouth === 0) {
        previousMouth = 12;
    }
    populateMonthView(previousMouth);
}

function populateMonthView(month) {
    var calendarMonthLabel = document.getElementById('label-monad');
    var currentDate = new Date();

    $.ajax({
        url: '/server/get-m-time-of-user?userId=' + userId + 
        '&month=' + month +
        '&year=' + currentDate.getFullYear(),
        type: 'GET',
        success: function (data) {
            var calendarView = $('.month-view');
            var element = $('#tabel-month');
            element.remove();
            // Generera kalenderstrukturen
            var calendarTable = $('<table>').addClass('calendar-table');
            calendarTable.attr("id", "tabel-month");
            var calendarHeader = $('<thead>');
            var calendarBody = $('<tbody>');
            

            // skapa månads namn
            var monthNames = [
                "Januari", "Februari", "Mars", "April", "Maj", "Juni",
                "Juli", "Augusti", "September", "Oktober", "November", "December"
            ];
            calendarMonthLabel.innerText = monthNames[data.currentMonth - 1];
            calendarMonthLabel.setAttribute("data-month", data.currentMonth);

            // Skapa veckodagshuvud
            var weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];
            var headerRow = $('<tr>');
            for (var i = 0; i < 7; i++) {
                var weekdayCell = $('<th>').text(weekdayNames[i]);
                headerRow.append(weekdayCell);
            }
            calendarHeader.append(headerRow);
            calendarTable.append(calendarHeader);

            // Generera kalenderceller
            var currentMonth = data.currentMonth;
            var currentYear = data.currentYear;
            //console.log( + " "+ currentMonth + " " + currentYear)
            var totalDays = data.totalDays;
            var flexTimes = data.flexTimes;

            var currentDate = new Date(currentYear, currentMonth, 1);
            var firstDayInMonth = new Date(data.dates[i]);
            //var firstDayIndex = currentDate.getDay(); // Index för första dagen i månaden (0-6)
            var startOnMonday = -1;
            var startOnSunday = 0;
            var firstDayIndex = firstDayInMonth.getDay() + startOnMonday;
            var lastDayIndex = ((firstDayIndex + totalDays) % 7) + startOnMonday; // Index för sista dagen i månaden (0-6)
            //console.log(lastDayIndex);
            var weekRow = $('<tr>');

            // Lägg till tomma celler för dagar före första dagen i månaden
            for (var i = 0; i < firstDayIndex; i++) {
                weekRow.append($('<td>').addClass('empty-cell'));
            }

            // Lägg till dagar i månaden
            for (var i = 1; i <= totalDays; i++) {
                var dayCell = $('<td>').text(i);
                dayCell.addClass('dayCell');
                var flexTime = flexTimes[i - 1]; // Hämta flexTime-värdet för aktuell dag
                var flexTimeCell = $('<span>').text(flexTime).addClass('flex-time');
                dayCell.append(flexTimeCell);


                // Markera aktuell dag
                var currentDate = new Date();
                if (currentDate.getDate() === i && currentDate.getMonth() + 1 === currentMonth && currentDate.getFullYear() === currentYear) {
                    dayCell.addClass('current-day');
                }
                //console.log(i + " "+ currentMonth + " " + currentYear)
                //console.log(currentDate.getDate() + " "+ currentDate.getMonth() + " " + currentDate.getFullYear())

                weekRow.append(dayCell);

                // Lägg till en rad varje vecka
                if ((firstDayIndex + i) % 7 === 0) {
                    calendarBody.append(weekRow);
                    weekRow = $('<tr>');
                }
            }

            // Lägg till tomma celler efter sista dagen i månaden
            for (var i = lastDayIndex; i < 6; i++) {
                weekRow.append($('<td>').addClass('empty-cell'));
            }

            // Lägg till den sista veckoraden
            calendarBody.append(weekRow);

            // Lägg till kalenderstrukturen i HTML
            calendarTable.append(calendarBody);
            calendarView.append(calendarTable);
        },
        error: function (xhr, status, error) {
            console.error('Ett fel uppstod:', error);
        }
    });
}

function getWeek(date) {
    // Kopiera datumet för att undvika ändringar i det ursprungliga objektet
    var copiedDate = new Date(date.getTime());
    
    // Sätt veckodagen till söndag (0) för att undvika problem med veckobrytningar
    copiedDate.setUTCHours(0, 0, 0, 0);
    copiedDate.setDate(copiedDate.getDate() + 4 - (copiedDate.getDay() || 7));
    
    // Beräkna veckonumret
    var yearStart = new Date(copiedDate.getFullYear(), 0, 1);
    var weekNumber = Math.ceil((((copiedDate - yearStart) / 86400000) + 1) / 7);
    
    return weekNumber;
  }