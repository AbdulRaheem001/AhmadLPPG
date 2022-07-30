// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log("Welcom Fun");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5sMc-tL8vqLk3jf7WLdNZIvuZHBtMcUc",
    authDomain: "ahmad-work.firebaseapp.com",
    projectId: "ahmad-work",
    storageBucket: "ahmad-work.appspot.com",
    messagingSenderId: "940332141607",
    appId: "1:940332141607:web:f3dcbc17968ca94f3d5202"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();


//Inserting in DataBase

var inserbt = document.getElementById("insertData");

if (inserbt) {
    inserbt.addEventListener("click", AddData);
}

function AddData() {

    //Reading value That user enter
    var cnicData = document.getElementById("cnic").value;
    var nameData = document.getElementById("name").value;
    var phoneData = document.getElementById("phone").value;
    var slinderindb = document.getElementById("slinder").value;
    var pricedata = document.getElementById("price").value;





    WritData(1, cnicData, pricedata, slinderindb, nameData, phoneData);

}
//Set New date
function getNewDate() {
    var d = new Date().getDate();
    var m = new Date().getMonth() + 1;
    var y = new Date().getFullYear();
    var DateToday = d + "," + m + "," + y;
    return DateToday;
}
function WritData(callFrom, cnicData, pricedata, slinderindb, nameData, phoneData) {
    var DB_ID = 0;
    const dbref = ref(db);
    var DateToday = getNewDate();
    console.log(DateToday);
    get(child(dbref, "AllCustomer/")).then((snapshot) => {
        var CustomerData = [];
        snapshot.forEach(childSnapshort => {
            CustomerData.push(childSnapshort.val());
            DB_ID = DB_ID + 1;
            console.log(DB_ID);
        });
        if (callFrom) {
            console.log(DB_ID);
            set(ref(db, "AllCustomer/" + DB_ID), {
                SR: DB_ID,
                Date: DateToday,
                CNIC: cnicData,
                Name: nameData,
                Phone: phoneData,
                SlinderNumber: slinderindb,
                Price: pricedata

            })
                .then(() => {
                    aler("Data Store");
                })
                .catch((error) => {
                    alert("Data Store");
                });
        }

        else {
            console.log("Some thing bad");
        }
    });
}


//View Data From DataBase

var searchbt = document.getElementById("view12");
var alldatabt = document.getElementById("AllData");

if (searchbt) {
    totalprice = 0;
    searchbt.addEventListener("click", viewData);
   
   
}

if (alldatabt) {
    totalprice = 0;
    alldatabt.addEventListener("click", GetAllData);
}

function allData(DB_ID, cnicdb, nameDb, phonedb, slinderdb, pricedb, todayDate0) {


    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");

    td1.innerHTML = DB_ID;
    td2.innerHTML = todayDate0;
    td3.innerHTML = cnicdb;
    td4.innerHTML = nameDb;
    td5.innerHTML = phonedb;
    td6.innerHTML = slinderdb;
    td7.innerHTML = pricedb;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);


    tbody.appendChild(trow);
    if (parseInt(pricedb) > 1) {
        totalprice = parseInt(totalprice) + parseInt(pricedb);
    }
    else if (parseInt(pricedb) < 1) {
        pricedb = pricedb * (-1);
        recovery = parseInt(recovery) + parseInt(pricedb);
    }

    document.getElementById("totalRecovery").value = recovery;
    document.getElementById("totalPrice").value = totalprice;
    remaning = parseInt(totalprice) - parseInt(recovery);
    document.getElementById("totalRemaning").value = remaning;


}
var tbody = document.getElementById("tableData");
var totalprice = 0;
var recovery = 0;
var remaning = 0;
function addItemToTable(CustomerData) {
    tbody.innerHTML = "";
    totalprice = 0;
    recovery = 0;
    remaning = 0;
    totalcylinder = 0;
    receiveCylinder = 0;
    toreceive = 0;
    CustomerData.forEach(element => {

        allData(element.SR, element.CNIC, element.Name, element.Phone, element.SlinderNumber, element.Price, element.Date);
       
        if (parseInt(element.SlinderNumber) > 0) {
            toreceive = parseInt(toreceive) + parseInt(element.SlinderNumber);
        } else if (parseInt(element.SlinderNumber) < 1) {
            element.SlinderNumber = element.SlinderNumber * -1;
            receiveCylinder = parseInt(receiveCylinder) + parseInt(element.SlinderNumber);
        }
        console.log(receiveCylinder + "," + toreceive);
        totalcylinder = parseInt(toreceive) - parseInt(receiveCylinder);
        document.getElementById("totalCylinder").value = toreceive;
        document.getElementById("totalRemaningCy").value = totalcylinder ;
        document.getElementById("totalRecieve").value = receiveCylinder ;
    });

}

function GetAllData() {

    totalprice = 0;
    const dbref = ref(db);

    get(child(dbref, "AllCustomer/")).then((snapshot) => {
        var CustomerData = [];
        snapshot.forEach(childSnapshort => {
            CustomerData.push(childSnapshort.val());

        });
        console.log(CustomerData);
        addItemToTable(CustomerData);

    });
}

function viewData() {

    var name1 = document.getElementById("nameSe").value;

    const dbref = ref(db);
    console.log(name1);
    get(child(dbref, "AllCustomer/")).then((snapshot) => {
        var CustomerData = [];
        snapshot.forEach(childSnapshort => {
            if (name1 == childSnapshort.val().Name) {
                CustomerData.push(childSnapshort.val());
            }
        });
        console.log(CustomerData);
        addItemToTable(CustomerData);
        console.log(name1);
        totalcylinder = 0;
        receiveCylinder = 0;
        toreceive = 0;
        cylinderCount(0, name1);
    });
}
// Add PAyment Function

var collectiondt = document.getElementById("collection12");


if (collectiondt) {

    collectiondt.addEventListener("click", CollectionPayment);
}

function CollectionPayment() {

    var nameData = document.getElementById("name").value;
    var paymentData = document.getElementById("Payment").value;
    paymentData = paymentData * (-1);
    console.log(paymentData);
    var sr = 0;
    var DateToday = getNewDate();
    const dbref = ref(db);
    var CustomerData = [];
    get(child(dbref, "AllCustomer/")).then((snapshot) => {
        snapshot.forEach(childSnapshort => {
            sr = sr + 1;
            CustomerData.push(childSnapshort.val());
        });
        console.log(sr);
        CustomerData.forEach(element => {
            if (nameData == element.Name) {

                set(ref(db, "AllCustomer/" + sr), {
                    SR: sr,
                    Date: DateToday,
                    CNIC: element.CNIC,
                    Phone: element.Phone,
                    SlinderNumber: 0,
                    Name: nameData,
                    Price: paymentData
                }).then(() => {
                    aler("Data Store");
                })
                    .catch((error) => {
                        alert("Data Store");
                    });

            }
        });

    });
    console.log("Payment Add")
}

//Dailly Updates

var todayDatabt = document.getElementById("todayDataBt");
if (todayDatabt) {

    todayDatabt.addEventListener("click", GetTodayData);
}

function GetTodayData() {

    const dbref = ref(db);

    var todayDate = getNewDate();
    console.log(todayDate);

    get(child(dbref, "AllCustomer/")).then((snapshot) => {
        var CustomerData = [];
        snapshot.forEach(childSnapshort => {
            if (todayDate == childSnapshort.val().Date) {
                CustomerData.push(childSnapshort.val());
            }
        });
        console.log(CustomerData);
        addItemToTable(CustomerData);

    });
}

//Cylinder Receive

var cylinder = document.getElementById("cylinderRe");
if (cylinder) {

    cylinder.addEventListener("click", CollectionCylinder);
}
var totalcylinder = 0;
var receiveCylinder = 0;
var toreceive = 0;
function CollectionCylinder() {
    totalcylinder = 0;
    receiveCylinder = 0;
    toreceive = 0;
    var nameData = document.getElementById("name").value;
    var cylinderIn = document.getElementById("Cylinder").value;
    cylinderIn = cylinderIn * (-1);
    console.log(cylinderIn);
    var sr = 0;
    var DateToday = getNewDate();
    const dbref = ref(db);
    var CustomerData = [];
    var check = 0;
    get(child(dbref, "AllCustomer/")).then((snapshot) => {
        snapshot.forEach(childSnapshort => {
            sr = sr + 1;
            CustomerData.push(childSnapshort.val());
        });
        console.log(sr);
        CustomerData.forEach(element => {
            if (nameData == element.Name) {
                if (check == 0) {
                    check = 1;
                    set(ref(db, "AllCustomer/" + sr), {
                        SR: sr,
                        Date: DateToday,
                        CNIC: element.CNIC,
                        Phone: element.Phone,
                        SlinderNumber: cylinderIn,
                        Name: nameData,
                        Price: 0
                    }).then(() => {
                        aler("Data Store");
                    })
                        .catch((error) => {
                            alert("Data Store");
                        });
                }

            }
        });

    });
    console.log("cylinder Add");
    cylinderCount(cylinderIn, nameData);
}
function cylinderCount(cylinderIn, nameData) {
    var CusData = [];
console.log("in fUnction" + cylinderIn);
    const dbref = ref(db);
    get(child(dbref, "AllCustomer/")).then((snapshot) => {
        snapshot.forEach(childSnapshort => {
            CusData.push(childSnapshort.val());
        });
        CusData.forEach(element => {
            if (nameData == element.Name) {
                if (parseInt(element.SlinderNumber) > 0) {
                    toreceive = parseInt(toreceive) + parseInt(element.SlinderNumber);
                } else if (parseInt(element.SlinderNumber) < 1) {
                    element.SlinderNumber = element.SlinderNumber * -1;
                    receiveCylinder = parseInt(receiveCylinder) + parseInt(element.SlinderNumber);
                }
                console.log(receiveCylinder + "," + toreceive);
                totalcylinder = parseInt(toreceive) - parseInt(receiveCylinder);
                document.getElementById("totalCylinder").value = toreceive;
                document.getElementById("totalRemaningCy").value = parseInt(totalcylinder) + parseInt(cylinderIn);
                document.getElementById("totalRecieve").value = parseInt(receiveCylinder) - parseInt(cylinderIn);
            };
        });

    });
}

// This code is for add new user 
//Code Starded
// var user1 = document.getElementById("user1");

// if (user1) {
//     user1.addEventListener("click", adduser);
// }

// function adduser(){
//     var emailData = document.getElementById("email").value;
//     var passData = document.getElementById("password").value;
//     console.log(emailData + " => " + passData );
//     set(ref(db, "User/" + emailData), {
//         Email: emailData,
//         Password: passData

//     });
// }
//Add new user Code Ended


//login 

var logcheck = false;
var loginbt = document.getElementById("loginbt");
if (loginbt) {
    loginbt.addEventListener("click", adminModule);
}

function adminModule() {
    console.log("in Admin function");
    var emailData = document.getElementById("email").value;
    var passData = document.getElementById("password").value;
    const dbref = ref(db);
    var passdb;
    var emaildb;
    console.log("on line 56");

    get(child(dbref, "User/" + emailData)).then((snapshot) => {
        if (snapshot.exists()) {

            emaildb = snapshot.val().Email;
            passdb = snapshot.val().Password;

            if (passdb = passData && emailData == emaildb) {
                logcheck = true;
                console.log("Log in success Ful");
                window.location.href = "./home.html";
                console.log(logcheck);
            } else {
                console.log("Password Or Email incorrect");
            }


        }
        else {
            alert("Email Not Found");
        }
    });

}
