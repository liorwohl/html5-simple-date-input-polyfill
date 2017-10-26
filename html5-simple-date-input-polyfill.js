function calendarExtender (theInput) {

  var self = this;

  this.theInput = theInput;
  this.container = null;
  this.theCalDiv = null;
  this.selectedDate = new Date();

  this.init = function () {
    this.getDateFromInput();
    this.createCal();
  };

  //update selectedDate with the date from the input, return true if changed
  this.getDateFromInput = function () {
    if (this.theInput.value) {
      var possibleNewDate = new Date(this.theInput.value);
      if (Date.parse(this.theInput.value) && possibleNewDate.toDateString() !== this.selectedDate.toDateString()) {
        this.selectedDate = possibleNewDate;
        return true;
      }
    }
    return false;
  };

  //create the calendar html and events
  this.createCal = function () {
    //creating a container div around the input, the calendar will also be there
    this.container = document.createElement('div');
    this.container.className = 'calendarContainer';
    this.container.style.display = 'inline-block';
    this.theInput.parentNode.replaceChild(this.container, this.theInput);
    this.container.appendChild(this.theInput);

    //the calendar div
    this.theCalDiv = document.createElement('div');
    this.theCalDiv.className = 'calendar';
    this.theCalDiv.style.display = 'none';
    this.container.appendChild(this.theCalDiv);

    //the year and month selects inside the calendar
    this.creathYearAndMonthSelects();

    //the days table inside the calendar
    this.createMonthTable();

    //open the calendar when the input get focus, also on various click events to capture it in all corner cases
    this.theInput.addEventListener('focus', function () { self.theCalDiv.style.display = ''; });
    this.theInput.addEventListener('mouseup', function () { self.theCalDiv.style.display = ''; });
    this.theInput.addEventListener('mousedown', function () { self.theCalDiv.style.display = ''; });

    //update the calendar if the date changed manually in the input
    this.theInput.addEventListener('keyup', function () {
      if (self.getDateFromInput()) {
        self.updateSelecteds();
      }
    });

    //close the calendar when clicking outside of the input or calendar
    document.addEventListener('click', function (e) {
      if (e.target.parentNode !== self.container &&
          e.target.parentNode.parentNode !== self.container &&
          e.target.parentNode.parentNode !== self.theCalDiv
      ) {
        self.theCalDiv.style.display = 'none';
      }
    });
  };

  //create the year and month selects html
  this.creathYearAndMonthSelects = function () {
    //the year selector inside the calendar
    var yearSelect = this.createRangeSelect(new Date().getFullYear() - 80, new Date().getFullYear() + 20, this.selectedDate.getFullYear());
    yearSelect.className = 'yearSelect';
    this.theCalDiv.appendChild(yearSelect);
    yearSelect.onchange = function () {
      self.selectedDate.setYear(this.value);
      self.selectDate();
      self.createMonthTable();
      self.theInput.focus();
    };

    //the month selector inside the calendar
    var monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthSelect = this.createRangeSelect(0, 11, this.selectedDate.getMonth(), monthsNames);
    monthSelect.className = 'monthSelect';
    this.theCalDiv.appendChild(monthSelect);
    monthSelect.onchange = function () {
      self.selectedDate.setMonth(this.value);
      self.selectDate();
      self.createMonthTable();
      self.theInput.focus();
    };
  };

  //update the year and month selects with the right selected value (if date changed externally)
  this.updateSelecteds = function () {
    this.theCalDiv.querySelector('.yearSelect').value  = this.selectedDate.getFullYear();
    this.theCalDiv.querySelector('.monthSelect').value = this.selectedDate.getMonth();
    this.createMonthTable();
  };

  //create the days table
  this.createMonthTable = function () {
    var year = this.selectedDate.getFullYear(); //get the year (2015)
    var month = this.selectedDate.getMonth(); //get the month number (0-11)
    var startDay = new Date(year, month, 1).getDay(); //first weekday of month (0-6)
    var maxDays = new Date(this.selectedDate.getFullYear(), month + 1, 0).getDate(); //get days in month (1-31)

    //if there was a table before, remove it
    var oldTables = this.theCalDiv.getElementsByTagName('table');
    if (oldTables.length > 0) {
      this.theCalDiv.removeChild(oldTables[0]);
    }

    //the table and header for the month days
    var theTable = document.createElement('table');
    theTable.innerHTML = '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    this.theCalDiv.appendChild(theTable);

    //create the days cols according to the selected month days
    var aRow;
    var aCell;
    for (var cellNum = 0; cellNum < maxDays + startDay; cellNum++) {

      //crate a table row in the begining and after each 7 cells
      if (cellNum % 7 === 0) {
        aRow = theTable.insertRow(-1);
      }

      aCell = aRow.insertCell(-1);

      if (cellNum + 1 > startDay) {

        var dayNum = cellNum + 1 - startDay;
        aCell.innerHTML = dayNum;
        if (dayNum === this.selectedDate.getDate()) {
          aCell.className = 'selected';
        }

        //when clicking on a day in the days table
        aCell.addEventListener('click', function () {

          //mark the dey with 'selected' css class
          self.theCalDiv.querySelector('.selected').className = '';
          this.className = 'selected';

          self.selectedDate.setDate(parseInt(this.innerHTML));
          self.selectDate();
          self.theInput.focus();
        });
      }
    }
  };

  //copy the selected date to the input field
  this.selectDate = function () {

    var monthText = this.selectedDate.getMonth() + 1;
    if (monthText < 10) {
      monthText = '0' + monthText;
    }

    var dayText = this.selectedDate.getDate();
    if (dayText < 10) {
      dayText = '0' + dayText;
    }

    this.theInput.value = '' + this.selectedDate.getFullYear() + '-' + monthText + '-' + dayText + '';

    //make angular see the change
    var fakeEvent = document.createEvent('KeyboardEvent');
    fakeEvent.initEvent("change", true, false);
    this.theInput.dispatchEvent(fakeEvent);
  };

  //helper function to create html select tags
  this.createRangeSelect = function (min, max, selected, namesArray) {
    var aOption;
    var curNum;
    var theText;

    var theSelect = document.createElement('select');

    for (curNum = min; curNum <= max; curNum++) {
      aOption = document.createElement('option');
      theSelect.appendChild(aOption);

      if (namesArray) {
        theText = namesArray[curNum - min];
      } else {
        theText = curNum;
      }

      aOption.text = theText;
      aOption.value = curNum;

      if (curNum === selected) {
        aOption.selected = true;
      }
    };

    return theSelect;
  }

  this.init();
}

//return false if the browser dont support input[type=date]
function checkDateInputSupport () {
  var input = document.createElement('input');
  input.setAttribute('type','date');

  var notADateValue = 'not-a-date';
  input.setAttribute('value', notADateValue);

  return !(input.value === notADateValue);
}

//will add the calendarExtender to all inputs in the page
function addcalendarExtenderToDateInputs () {
  //get and loop all the input[type=date]s in the page that dont have "haveCal" class yet
  var dateInputs = document.querySelectorAll('input[type=date]:not(.haveCal)');
  [].forEach.call(dateInputs, function (dateInput) {
    //call calendarExtender function on the input
    new calendarExtender(dateInput);
    //mark that it have calendar
    dateInput.classList.add('haveCal');
  });
}

//run the above code on any <input type='date'> in the document, also on dynamically created ones
//check if type=date is supported or if not mobile, they have built-in support for type='date'
if (!checkDateInputSupport() && typeof window.orientation === 'undefined') {
  addcalendarExtenderToDateInputs();
  //this is also on mousedown event so it will capture new inputs that might joined to the dom dynamically
  document.querySelector('body').addEventListener('mousedown', function (event) {
    addcalendarExtenderToDateInputs();
  });
}
