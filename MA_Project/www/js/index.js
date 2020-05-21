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

  db.put({
  _id: username,
  username: username,
  FirstName: first_name,
  LastName: last_name,
  Password: password
}, function(err, response) {
  if (err) {
    if (err["status"] == "409") {
      console.log("Dupe :b");
      document.getElementById('errlbl').innerHTML = 'The username you want to use is already in use';
    }
    return console.log(err); }
  console.log("dupe?");
});

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
     if (doc['password'] != password) {
       document.getElementById('errlbl').innerHTML = "Password entered is incorrect"
       document.getElementById('password').value = "";
     }
     else if (doc['password'] == password) {
         localStorage.setItem("f_name", doc["FirstName"]);
         localStorage.setItem("l_name", doc["LastName"]);
         localStorage.setItem("username", doc["username"]);
         location.href = "home.html"

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
