function calanderExtender (theInput) {

  var self = this;

  this.theInput = theInput;
  this.container = null;
  this.theCalDiv = null;
  this.selectedDate = new Date();

  this.init = function () {
    if (this.theInput.value) {
      this.selectedDate = new Date(this.theInput.value);
    }
    this.createCal();
  };

  //create the calendar html and events
  this.createCal = function () {

    //creating a container div around the input, the calendar will also be there
    this.container = document.createElement('div');
    this.container.className = 'calanderContainer';
    this.container.style.display = 'inline-block';
    this.theInput.parentNode.replaceChild(this.container, this.theInput);
    this.container.appendChild(this.theInput);

    //the calendar itself
    this.theCalDiv = document.createElement('div');
    this.theCalDiv.className = 'calander';
    this.theCalDiv.style.display = 'none';
    this.container.appendChild(this.theCalDiv);

    //the year selector inside the calendar
    var yearSelect = this.createRangeSelect(this.selectedDate.getFullYear() - 80, this.selectedDate.getFullYear() + 20, this.selectedDate.getFullYear());
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
    this.theCalDiv.appendChild(monthSelect);
    monthSelect.onchange = function () {
      self.selectedDate.setMonth(this.value);
      self.selectDate();
      self.createMonthTable();
      self.theInput.focus();
    };

    //the days table inside the calendar
    this.createMonthTable();

    //open the calendar when the input get focus
    this.theInput.addEventListener('focus', function () {
      self.theCalDiv.style.display = '';
    });

    //close the calendar when clicking outside of the input or calendar
    document.addEventListener('click', function (e) {
      if (e.target.parentNode !== self.container &&
        e.target.parentNode.parentNode !== self.container
      ) {
        self.theCalDiv.style.display = 'none';
      }
    });
  };

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
        aCell.innerHTML = cellNum + 1 - startDay;
        aCell.addEventListener('click', function () {
          self.selectedDate.setDate(parseInt(this.innerHTML));
          self.selectDate();
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

//run the above code on any <input type='date'> in the document, also on dynamically created ones 
//check if not mobile, they have built-in support for type='date'
if (typeof window.orientation === 'undefined') {
  //this is on mousedown event so it will capture new inputs that might joined to the dom
  document.querySelector('body').addEventListener('mousedown', function (event) {
    //get and loop all the new input[type=date]s
    var dateInputs = document.querySelectorAll('input[type=date]:not(.havCal)');
    [].forEach.call(dateInputs, function (dateInput) { 
      //call datepickr function on the input
      new calanderExtender(dateInput);
      //mark that it have calendar
      dateInput.classList.add('havCal');
    });
  });
}