/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
//  document.getElementById("ttv").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  //document.getElementById("ttv").style.marginLeft = "0";
}

function Register() {
  if (!document.getElementById('fname').value ||
   !document.getElementById('lname').value ||
    !document.getElementById('username').value ||
     !document.getElementById('password').value ||
     !document.getElementById('c_password').value) {
    alert("Form was not filled out correctly");
    return;
  }
  var first_name = document.getElementById('fname').value;
  var last_name = document.getElementById('lname').value;
  var username = document.getElementById('username').value;

  if ((document.getElementById('password').value) == (document.getElementById('c_password').value)) {
    var password = document.getElementById('password').value;
  }
  else {
    document.getElementById('errlbl').innerHTML = 'Passwords do not match';
    return;
  }
  var db = PouchDB('test');
//store information in PouchDB database
  db.put({
  _id: username,
  username: username,
  FirstName: first_name,
  LastName: last_name,
  Password: password,
  Goals: []
}, function(err, response) {
  if (err) {
    if (err["status"] == "409") {
      console.log("Dupe :b");
      document.getElementById('errlbl').innerHTML = 'The username you want to use is already in use';
    }
    return console.log(err); }
  console.log("dupe?");
  location.href = "login.html";
});
//location.href = "login.html";

}

function Login() {
  db  = PouchDB("test");
  document.getElementById('errlbl').innerHTML = "";
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  if (username == "") {
    alert('username field empty');
  }
//  console.log(username);
  db.get(username).then(function (doc) {
     if (doc['Password'] != password) {
       document.getElementById('errlbl').innerHTML = "Password entered is incorrect"
       document.getElementById('password').value = "";
     }
     else if (doc['Password'] == password) {
         localStorage.setItem("f_name", doc["FirstName"]);
         localStorage.setItem("l_name", doc["LastName"]);
         localStorage.setItem("username", doc["username"]);
         localStorage.setItem("loggedin", "yes");
         location.href = "home.html";

     }
  }).catch(function (err) {
    console.log(err);
    if (err['status'] == "404") {
      document.getElementById('errlbl').innerHTML = "Username entered is incorrect";
      document.getElementById('username').value = "";
      document.getElementById('password').value = "";
}
});


}

function forlater() {
  function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

}
function showupw() {
  var x = document.getElementById("upw");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }

}

function upload() {
  db = PouchDB("test");
  username = localStorage.getItem("username");
  db.get(username).then(function (doc) {
  document.getElementById('ufn').innerHTML = doc.FirstName;
  document.getElementById('uln').innerHTML = doc.LastName;
  document.getElementById('upw').value = doc.Password;
});

}

function homeload() {
    document.getElementById('wel_user').innerHTML = "Welcome "+ localStorage.getItem("username");
  }

function SaveGoal() {
  db  = PouchDB("test");
  var goalname = document.getElementById('Gname').value;
  var goalamount = document.getElementById('Gamount').value;
  var savings = document.getElementById('C_savings').value;
  var goaltype = document.getElementById('Gtype').value;
  var goaldate = document.getElementById('months').value +" "+document.getElementById('days').value + " " + document.getElementById('years').value;
  var completed = document.getElementById('completed').value;

  if (!goalname || !goalamount || !savings || !goaltype || !goaldate || isNaN(parseInt(goalamount))) {
    alert("Fields not filled out properly");
    return;
  }

  var goal = [goalname, goalamount, savings, goaltype, goaldate, completed];

  var username = localStorage.getItem("username");

  db.get(username).then(function (doc) {
  // update their document
  doc.Goals.push(goal);
  // put them back
  return db.put(doc);
}).then(function () {
  // fetch again
  return db.get(username);
}).then(function (doc) {
  console.log(doc);
  alert("Goal saved");
  document.getElementById('Gname').value = "";
  document.getElementById('Gamount').value = "";
  document.getElementById('C_savings').value = "";
  document.getElementById('Gtype').selectedIndex = 0;
  document.getElementById('months').selectedIndex = 0;
  document.getElementById('days').selectedIndex = 0;
  document.getElementById('years').selectedIndex = 0;
  document.getElementById('completed').selectedIndex = 0;


});

}

function Days(value) {
//  var month = document.getElementById('months').value;
  var defaultyear= 2020;
  options = document.getElementById('days');
  options.innerHTML ="";
  if (document.getElementById('years').value == "year") {
    document.getElementById('years').selectedIndex = "1";
    var year = document.getElementById('years').value;
  }
  else {
    var year = document.getElementById('years').value;
  }
  if (value=="Jan" || value=="Mar" || value=="May" || value=="Jul" || value=="Aug" || value=="Oct" || value=="Dec") {
    for (var i = 1; i <= 31; i++) {
        var row = document.createElement("option");
        var rowtext = document.createTextNode(i);
        row.appendChild(rowtext);
        options.appendChild(row);
  }
}
  else if (value=="Apr" || value=="Jun" || value== "Sep" || value == "Nov") {
    for (var i = 1; i <= 30; i++) {
        var row = document.createElement("option");
        var rowtext = document.createTextNode(i);
        row.appendChild(rowtext);
        options.appendChild(row);
  }


  }
  else if (value=="Feb") {
    if (parseInt(year)%4 == 0 ) {
      for (var i = 1; i <=29 ; i++) {
          var row = document.createElement("option");
          var rowtext = document.createTextNode(i);
          row.appendChild(rowtext);
          options.appendChild(row);
    }
  }
  else if (parseInt(year)%4 != 0 ){
    for (var i = 1; i <=28 ; i++) {
        var row = document.createElement("option");
        var rowtext = document.createTextNode(i);
        row.appendChild(rowtext);
        options.appendChild(row);
      }
  }}

}

function yearchanged() {
  var month = document.getElementById('months').value;
  Days(month);
}

function load() {
  x = document.getElementById('errlbl');
  x.style.display = "none";
  if (!localStorage.getItem("username") ) {
    location.href = "login.html";
  }
}

function viewgoal() {
  db  = PouchDB("test");
  body = document.getElementById('tbody');
  body.innerHTML = "";
  var username = localStorage.getItem('username');
  var content;

  db.get(username, function(err, doc) {
  if (err) { return console.log(err); }

     content = doc["Goals"];
     console.log(content.length);
     for (var i = 0; i < content.length; i++) {
         var row = document.createElement("tr");
         var rowdata = content[i];
         console.log(i);
         var rowtd = document.createElement('td');
         var rowtext = document.createTextNode(i+1);
         rowtd.appendChild(rowtext);
         row.appendChild(rowtd);
         for (var j = 0; j < rowdata.length; j++) {
            //  console.log(i);
              var rowtd = document.createElement('td');
              var rowtext = document.createTextNode(rowdata[j]);
              rowtd.appendChild(rowtext);
              row.appendChild(rowtd);
         }
         body.appendChild(row);
     }
});


}

function Calculate() {
  document.getElementById('notfilled').innerHTML = "";
  document.getElementById('not1').innerHTML = "";
  document.getElementById('not2').innerHTML = "";
  var amount = document.getElementById('amount').value;
  var percent = document.getElementById('percent').value;

  if (!amount || !percent) {
    document.getElementById('notfilled').innerHTML = "Fields not filled out properly";
    return;
  }else {


  if (isNaN(parseFloat(amount))) {
    document.getElementById('not1').innerHTML = "This is not a number";
    return;
  }
  if (isNaN(parseFloat(percent))) {
    document.getElementById('not2').innerHTML = "This is not a number";
    return;
  }
}
  amount = parseFloat(amount);
  percent = parseFloat(percent);

  var result = amount * (percent/100);
  console.log(result);
  document.getElementById('C_amount').value = result;

}

function Clear() {
  document.getElementById('notfilled').innerHTML = "";
  document.getElementById('not1').innerHTML = "";
  document.getElementById('not2').innerHTML = "";
  document.getElementById('amount').value = "";
  document.getElementById('percent').value = "";
  document.getElementById('C_amount').value = "";
}

function notloggedin() {
  if (localStorage.getItem("username") == null) {
    location.href = "login.html";
  }

}

function logout() {
  localStorage.removeItem("l_name");
  localStorage.removeItem("f_name");
  localStorage.removeItem("password");
  localStorage.removeItem("loggedin");
}

function check1() {
  document.getElementById('fname').checked = true;
}
function check2() {
  document.getElementById('lname').checked = true;
}
function check3() {
  document.getElementById('password').checked = true;
}

function updateprofile() {
  var db = PouchDB('test');
  var selected;
  if (!document.getElementById('cvalue').value) {
    alert("Fieldsn not filled out correctly");
    return;
  }
  var value = document.getElementById('cvalue').value;
  var username = localStorage.getItem("username");
  var fname = document.getElementById('fname').checked;
  var lname = document.getElementById('lname').checked;
  var password = document.getElementById('password').checked;


  if (fname) {
    db.get(username).then(function (doc) {
  // update their password
  doc.FirstName = value;
  // put them back
  return db.put(doc);
}).then(function () {
  // fetch mittens again
  return db.get(username);
}).then(function (doc) {
  console.log(doc);
  alert("First name changed");
  document.getElementById('cvalue').value = "";
  location.reload();
});
  }

  if (lname) {
    db.get(username).then(function (doc) {
  // update their password
  doc.LastName = value;
  // put them back
  return db.put(doc);
}).then(function () {
  // fetch mittens again
  return db.get(username);
}).then(function (doc) {
  console.log(doc);
  alert("Last name changed");
  document.getElementById('cvalue').value = "";
  location.reload();
});
  }
  if (password) {
    db.get(username).then(function (doc) {
  // update their password
  doc.Password = value;
  // put them back
  return db.put(doc);
}).then(function () {
  // fetch mittens again
  return db.get(username);
}).then(function (doc) {
  console.log(doc);
  alert("Password changed");
  document.getElementById('cvalue').value = "";
  location.reload();
});
  }


}
/* -------------------------Calendar-----------------------
Credit - https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d
*/
/*
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

*/
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    db  = PouchDB("test");
    var dict = {"Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec":11  };
    var username = localStorage.getItem("username");

    db.get(username).then(function (doc) {
      var tempvar = doc;
      localStorage.setItem("goals", JSON.stringify(tempvar))
   });
   var goal = JSON.parse(localStorage.getItem("goals"));
   goals = goal.Goals;
   console.log(goals);

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                cell = document.createElement("td");

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                }

                cellText = document.createTextNode(date);

                for (var z = 0; z < goals.length; z++) {
                  var datestring = goals[z][4].split(" ");
                  var gmonth = dict[datestring[0]];
                  var gday = parseInt(datestring[1]);
                  var gyear = parseInt(datestring[2]);

                  if (date == gday && month == gmonth && year == gyear) {
                    console.log("correct");
                    cellText = document.createTextNode(date+ '\n'+goals[z][0]);
                    cell.classList.add("bg-info");
                    break;
                  }

            }

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}


// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
  // ------------------------------------- Calendar -------------------------------->
