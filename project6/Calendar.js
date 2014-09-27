function Calendar (elementID) {
    // these are labels for the days of the week
    cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // these are human-readable month name labels, in order
    cal_months_labels = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
    
    // these are the days of the week for each month, in order
    cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    this.elementID = elementID;
    this.element = document.getElementById(elementID);

    Calendar.prototype.prev = function(){
        this.date = prevMonth(this.date);
        this.render(this.date);
    }

    Calendar.prototype.next = function(){
        this.date = nextMonth(this.date);
        this.render(this.date);
    }

    prevMonth = function(date){
        var month = date.getMonth();
        var year = date.getFullYear();
        if (month === 0) {
            month = 11;
            year -= 1;
        } else {
            month -= 1;
        }
        var day = date.getDate();
        if (day > cal_days_in_month[month])
            day = cal_days_in_month;
        var dateStr = cal_months_labels[month] + " " + day + ", " + year;
        return new Date(dateStr);
    }

    nextMonth = function(date){
        var month = date.getMonth();
        var year = date.getFullYear();
        if (month === 11) {
            month = 0;
            year += 1;
        } else {
            month += 1;
        }
        var day = date.getDate();
        if (day > cal_days_in_month[month])
            day = cal_days_in_month;
        var dateStr = cal_months_labels[month] + " " + day + ", " + year;
        return new Date(dateStr);
    }

    Calendar.prototype.render = function(date){
        this.date = date;
        var month = date.getMonth();
        var date_day = date.getDate();   // Date in the month 1-31.
        var day = date.getDay();        // Sunday or what. 0-6.
        var year = date.getFullYear();

        var monthStr = cal_months_labels[month];
        var daysInMonth = cal_days_in_month[month];
        if (month === 1){
            if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0){
                daysInMonth = 29;
            }
        }

        
        var lastMonth = (month - 1) < 0 ? 11 : (month - 1);
        var lastmonth_daysInMonth = cal_days_in_month[lastMonth];
        var lastmonth_year = year;
        if (month - 1 < 0){
            lastmonth_year = year - 1;
        }
        else if (month - 1 === 1){
            if ((lastmonth_year % 4 === 0 && lastmonth_year % 100 != 0) || lastmonth_year % 400 === 0){
                lastmonth_daysInMonth = 29;
            }
        }

        // For the date string line.
        var html = "<h1>" + monthStr + " " + date_day + ", " + year + "</h1>";
        
        // For the Sun, Mon ... line.
        html += "<table><tr>";
        for (var i = 0; i < cal_days_labels.length; i++) {
            html += "<th> " + cal_days_labels[i] + " </th>";
        };
        html += "</tr><tr>"

        // For the previous month line. The elements should be greyed out.
        var firstday_day = (day - (date_day - 1) % 7) % 7;
        // Javascript return -3 % 7 = -3. Instead, we want 4.
        if (firstday_day < 0) {
            firstday_day += 7;
        }
        for (var i = -firstday_day; i < 0; i++) {
            html += "<td class='grey-out'> " + (lastmonth_daysInMonth + i + 1) + " </td>";
        };

        for (var i = 0; i < daysInMonth; i++) {
            if ((firstday_day + i) % 7 === 0){
                html += "<tr>";
            }
            if ((i + 1) === date_day){
                html += "<td class='highlight'>" + (i + 1) + "</td>";
            } else {
                html += "<td class='normal'> " + (i + 1) + " </td>";
            }
            // This is the last of that line, close with </tr>
            if ((firstday_day + i) % 7 === 6){
                html += "</tr>";
            }
        };

        for (var i = 0; (daysInMonth + i + firstday_day) % 7 !== 0; i++) {
            html += "<td class='grey-out'> " + (i + 1) + "</td>";
            if ((daysInMonth + i + firstday_day) % 7 === 6){
                html += "</tr>";
            }
        };

        html += "</table>"
        this.element.innerHTML = html;
    }
}