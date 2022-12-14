var bdayInput = document.querySelector("#bday-input");
var showBtn = document.querySelector("#show-btn");
var resultDiv = document.querySelector("#message");
var noticeBox = document.querySelector("#notice");
var xBtn = document.querySelector("#x-btn");

xBtn.addEventListener("click", () => {
  noticeBox.style.display = "none";
});

showBtn.addEventListener("click", clickHandler);

function reverseString(str) {
  return str.split("").reverse().join("");
}

function isStringPalindrome(str) {
  var reversedString = reverseString(str);
  return str === reversedString;
}

function getDateAsString(date) {
  var dateInStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}

function getDateInAllFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
  var dateFormatList = getDateInAllFormats(date);
  var palindromeList = [];

  for (var i = 0; i < dateFormatList.length; i++) {
    var result = isStringPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = getDateAsString(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  var previousDate = getPreviousDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = getDateAsString(previousDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}

function clickHandler(e) {
  var bdayString = bdayInput.value;
  console.log("heyy");
  console.log(bdayInput.value);
  console.log(bdayString === "");

  resultDiv.style.display = "block";

  if (bdayString === "") {
    resultDiv.innerHTML = "<b>Please select a date first.</b>";
    resultDiv.style.color = "red";
  } else {
    resultDiv.style.color = "greenyellow";
    var dateArr = bdayString.split("-");
    var yyyy = dateArr[0];
    var mm = dateArr[1];
    var dd = dateArr[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };

    var dateStr = getDateAsString(date);
    var list = checkPalindromeForAllDateFormats(dateStr);
    var isPlaindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPlaindrome = true;
        break;
      }
    }

    if (!isPlaindrome) {
      const [ctr1, nextDate] = getNextPalindromeDate(date);
      const [ctr2, prevDate] = getPreviousPalindromeDate(date);

      if (ctr1 > ctr2) {
        resultDiv.innerHTML = `The nearest plaindrome date is <b> ${prevDate.day}-${prevDate.month}-${prevDate.year}</b>, you missed it by <b> ${ctr2} </b> days.`;
      } else {
        resultDiv.innerHTML = `The nearest plaindrome date is <b> ${nextDate.day}-${nextDate.month}-${nextDate.year}</b>, you missed it by  <b>${ctr1} </b> days.`;
      }
    } else {
      resultDiv.innerHTML = "<b>Yay! Your birthday is a palindrome ????</b>";
    }

    // resultDiv.innerHTML = "heyy";
  }
}
