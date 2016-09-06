/*
    All scripts are belong to us.
 */

(function calendarMaker() {
  var calendar = document.querySelector('.simple-calendar');
  var today = new Date();
  var dayName = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];
  var monthName = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  var now = {
    yyyy: today.getFullYear(),
    mm: today.getMonth(),
    dd: today.getDate(),
    day: today.getDay()
  };
  var initVal = {
    yyyy: now.yyyy,
    mm: now.mm,
    dd: now.dd
  };
  
  /* Get the total days in a given month of the year */  
  function daysInTheMonth(yyyy, mm) {
    return new Date(yyyy, mm+1, 0).getDate();
  }
  
  /* Get the starting day of the month (mon, tues, etc.) */  
  function dayOfTheWeekInTheMonth(yyyy, mm) {
    return new Date(yyyy, mm, 1).getDay();
  }  
  
  /* Interactivity with days */  
  function doSomethingWithDay(e) {
    /* if you need to do something when user click on days */
  }  
  
  /* Create the calendar controller */  
  function moreCalender(el) {
    var ctrl = document.createElement('div');
    ctrl.className = "calendar-ctrl";   
    
    var prev = document.createElement('span');
    prev.className = "prev";
    prev.textContent = "prev";
    
    var next = document.createElement('span');
    next.className = "next";
    next.textContent = "next";
    
    var reset = document.createElement('span');
    reset.className = "reset";
    reset.textContent = "today";
    
    ctrl.appendChild(prev);
    ctrl.appendChild(reset);      
    ctrl.appendChild(next);    
    
    ctrl.onclick = function(Event) {
      prevNextReset(Event);
    };
        
    el.appendChild(ctrl);
  }
  
  /* Interactivity to see prev, next month or reset */  
  function prevNextReset(e) {
    var el = e.target || e.srcElement;
    
    if(/prev/.test(el.className)) {
      now.mm--;
      if(now.mm < 0) {
        now.mm = 11;
        now.yyyy--;
      }      
    } else if(/next/.test(el.className)) {
      now.mm++;     
      if(now.mm > 11) {
        now.mm = 0;
        now.yyyy++;
      }       
    } else if(/reset/.test(el.className)) {
      now.mm = initVal.mm;     
      now.yyyy = initVal.yyyy;      
    }
    
    insertDaysToCalendar();
  }    
  
  /* Make the days for the calendar */  
  function makeDays(date, day, cn) {
    var dayLabel = document.createElement('small');
    dayLabel.className = "day-label";
    dayLabel.textContent = dayName[day];
    
    var dayContainer = document.createElement('div');
    dayContainer.className = "day-container";
    dayContainer.appendChild(dayLabel);
    dayContainer.innerHTML += date;
    
    var days = document.createElement('div');
    days.className = "day";
    if(cn) days.className += " " + cn;
    if(date === initVal.dd && now.mm === initVal.mm && now.yyyy === initVal.yyyy) days.className += " today";
    days.appendChild(dayContainer);
    
    days.onclick = function(Event) {
      /* if you need to do something when user click on days */
      doSomethingWithDay(Event);
    }
    
    return days;
  }
  
  /* Populate the calendar with days */  
  function insertDaysToCalendar() {
    calendar.innerHTML = "";
    
    var startingDay = dayOfTheWeekInTheMonth(now.yyyy, now.mm);
    var daysInMonth = daysInTheMonth(now.yyyy, now.mm);  
    
    var monthLabel = document.createElement('div');
    monthLabel.className = "month-label";
    monthLabel.innerHTML = monthName[now.mm] + " <small>" + now.yyyy + "</small>";
    calendar.appendChild(monthLabel);
    
    var calendarContainer = document.createElement('div');
    calendarContainer.className = "calendar-container";
    
    var totalDaysToRender = (startingDay + daysInMonth) % 7;
    
    totalDaysToRender = !!totalDaysToRender ? 7 - totalDaysToRender + daysInMonth : totalDaysToRender + daysInMonth;      
    
    var day = 0;
    
    for(var i=1 - startingDay, max=totalDaysToRender; i<=max; i++) {
      var dateToWrite, cn = false;
      if(i < 1 || i > daysInMonth) {
        dateToWrite = "";
        cn = "skip";
      } else {
        dateToWrite = i;
      }      
      calendarContainer.appendChild(makeDays(dateToWrite, day % 7, cn));
      day++;
    }
    
    calendar.appendChild(calendarContainer);
    moreCalender(monthLabel);
  }
  
  /* Initialize the calender with today's date */
  insertDaysToCalendar();
   
})();
