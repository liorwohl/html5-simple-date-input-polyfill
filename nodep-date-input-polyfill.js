import './nodep-date-input-polyfill.scss';

class Picker {
  constructor(input) {
    this.theInput = input;
    this.thePicker = null;
    this.pickerDate = new Date();
    this.pickerDate.setHours(0,0,0,0);
    
    this.inputDate = new Date(this.pickerDate.getTime());

    this.getDateFromInput();
    this.createPicker();
  }

  // Update selectedDate with the date from the input, return true if changed.
  getDateFromInput() {
    if(!this.theInput.value) {
      return false;
    }
    
    const possibleNewDate = new Date(this.theInput.value.replace(/-/g, `/`));
    if(
      Date.parse(this.theInput.value)
      && possibleNewDate.toDateString() !== this.pickerDate.toDateString()
    ) {
      this.pickerDate = possibleNewDate;
      this.inputDate = new Date(possibleNewDate.getTime());
      return true;
    }
  }

  // Create the picker html and events.
  createPicker() {
    // The picker div.
    this.thePicker = document.createElement(`date-input-polyfill`);
    this.thePicker.style.display = `none`;
    document.body.appendChild(this.thePicker);

    // The year and month selects inside the picker.
    this.createYearAndMonthSelects();

    // The days table inside the picker.
    this.createMonthTable();

    // Open the picker when the input get focus,
    // also on various click events to capture it in all corner cases.
    const showPicker = ()=> {
      const rekt = this.theInput.getBoundingClientRect();
      this.thePicker.style.top = `${
        rekt.top + rekt.height
        + document.documentElement.scrollTop + document.body.scrollTop
      }px`;
      this.thePicker.style.left = `${
        rekt.left
        + document.documentElement.scrollLeft + document.body.scrollLeft
      }px`;
      this.thePicker.style.display = `block`;
    };
    this.theInput.addEventListener(`focus`, showPicker);
    this.theInput.addEventListener(`mouseup`, showPicker);
    this.theInput.addEventListener(`mousedown`, showPicker);

    // Update the picker if the date changed manually in the input.
    this.theInput.addEventListener(`keyup`, ()=> {
      if(this.getDateFromInput()) {
        this.updateSelects();
      }
    });

    // Close the picker when clicking outside of the input or picker.
    document.addEventListener(`click`, e=> {
      if(
        e.target !== this.theInput
        && e.target !== this.thePicker
        && e.target.parentNode !== this.thePicker
        && e.target.parentNode.parentNode !== this.thePicker
      ) {
        this.thePicker.style.display = `none`;
      }
    });
  }

  // Create the year and month selects html.
  createYearAndMonthSelects() {
    // The year selector inside the picker.
    const yearSelect = this.createRangeSelect(
      new Date().getFullYear() - 80,
      new Date().getFullYear() + 20,
      this.pickerDate.getFullYear()
    );
    yearSelect.className = `yearSelect`;
    this.thePicker.appendChild(yearSelect);
    yearSelect.addEventListener(`change`, ()=> {
      this.pickerDate.setYear(yearSelect.value);
      this.createMonthTable();
      this.theInput.focus();
    });

    // The month selector inside the picker.
    const monthsNames = [
      `January`, 
      `February`, 
      `March`, 
      `April`, 
      `May`, 
      `June`, 
      `July`, 
      `August`, 
      `September`, 
      `October`, 
      `November`, 
      `December`
    ];
    const monthSelect = this.createRangeSelect(0, 11, this.pickerDate.getMonth(), monthsNames);
    monthSelect.className = `monthSelect`;
    this.thePicker.appendChild(monthSelect);
    monthSelect.addEventListener(`change`, ()=> {
      this.pickerDate.setMonth(monthSelect.value);
      this.createMonthTable();
      this.theInput.focus();
    });
  }

  // Update the year and month selects with the right selected value (if date changed externally).
  updateSelects() {
    this.thePicker.querySelector(`.yearSelect`).value  = this.pickerDate.getFullYear();
    this.thePicker.querySelector(`.monthSelect`).value = this.pickerDate.getMonth();
    this.createMonthTable();
  }

  // Create the days table.
  createMonthTable() {
    const year = this.pickerDate.getFullYear(); // Get the year (2015).
    const month = this.pickerDate.getMonth(); // Get the month number (0-11).
    const startDay = new Date(year, month, 1).getDay(); // First weekday of month (0-6).
    const maxDays = new Date(
      this.pickerDate.getFullYear(), 
      month + 1, 
      0
    ).getDate(); // Get days in month (1-31).

    // If there was a table before, remove it.
    const oldTables = this.thePicker.getElementsByTagName(`table`);
    if(oldTables.length > 0) {
      this.thePicker.removeChild(oldTables[0]);
    }

    // The table and header forthe month days.
    const theTable = document.createElement(`table`);
    theTable.innerHTML = `
      <tr>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
      </tr>
    `;
    this.thePicker.appendChild(theTable);

    // Create the days cols according to the selected month days.
    let aRow;
    const aDate = new Date(this.pickerDate.getTime());
    for(let cellNum = 0; cellNum < maxDays + startDay; cellNum++) {
      // Create a table row in the begining and after each 7 cells.
      if(cellNum % 7 === 0) {
        aRow = theTable.insertRow(-1);
      }

      const aCell = aRow.insertCell(-1);

      if(cellNum + 1 > startDay) {

        const dayNum = cellNum + 1 - startDay;
        aCell.innerHTML = dayNum;
        
        aDate.setDate(dayNum);
        if(aDate.getTime() === this.inputDate.getTime()) {
          aCell.className = `selected`;
        }

        // When clicking on a day in the days table.
        aCell.addEventListener(`click`, ()=> {
          // Mark the dey with `selected` css class.
          this.thePicker.querySelector(`.selected`).className = ``;
          aCell.className = `selected`;

          this.pickerDate.setDate(parseInt(aCell.innerHTML));
          this.selectDate();
          this.theInput.focus();
        });
      }
    }
  }

  // Copy the selected date to the input field.
  selectDate() {
    let monthText = this.pickerDate.getMonth() + 1;
    if(monthText < 10) {
      monthText = `0` + monthText;
    }

    let dayText = this.pickerDate.getDate();
    if(dayText < 10) {
      dayText = `0` + dayText;
    }

    this.inputDate = new Date(this.pickerDate.getTime());
    this.theInput.value = `${this.pickerDate.getFullYear()}-${monthText}-${dayText}`;

    // Make angular see the change.
    const fakeEvent = document.createEvent(`KeyboardEvent`);
    fakeEvent.initEvent(`change`, true, false);
    this.theInput.dispatchEvent(fakeEvent);
  }

  // Helper function to create html select tags.
  createRangeSelect(min, max, selected, namesArray) {
    const theSelect = document.createElement(`select`);

    for(let curNum = min; curNum <= max; curNum++) {
      let theText;
      
      const aOption = document.createElement(`option`);
      theSelect.appendChild(aOption);

      if(namesArray) {
        theText = namesArray[curNum - min];
      } else {
        theText = curNum;
      }

      aOption.text = theText;
      aOption.value = curNum;

      if(curNum === selected) {
        aOption.selected = true;
      }
    };

    return theSelect;
  }
  
  // Return false if the browser does not support input[type="date"].
  static checkDateInputSupport() {
    const input = document.createElement(`input`);
    input.setAttribute(`type`, `date`);
  
    const notADateValue = `not-a-date`;
    input.setAttribute(`value`, notADateValue);
  
    return !(input.value === notADateValue);
  }
  
  // Will add the Picker to all inputs in the page.
  static addPickerToDateInputs() {
    // Get and loop all the input[type="date"]s in the page that do not have `.hasPicker` yet.
    const dateInputs = document.querySelectorAll(`input[type="date"]:not(.hasPicker)`);
    [].forEach.call(dateInputs, dateInput=> {
      // Call Picker function on the input.
      new Picker(dateInput);
      // Mark that it have picker.
      dateInput.classList.add(`hasPicker`);
    });
  }
}

// Run the above code on any <input type="date"> in the document, also on dynamically created ones.
// Check if type="date" is supported.
if(!Picker.checkDateInputSupport()) {
  Picker.addPickerToDateInputs();
  // This is also on mousedown event so it will capture new inputs that might
  // be added to the DOM dynamically.
  document.querySelector(`body`).addEventListener(`mousedown`, e=> {
    Picker.addPickerToDateInputs();
  });
}
