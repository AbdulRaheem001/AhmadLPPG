// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log("Welcom");
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
var inserbt = document.getElementById("insertData");
var searchbt = document.getElementById("view12");
var alldatabt = document.getElementById("AllData");
var todayDatabt = document.getElementById("todayDataBt");
var collectiondt = document.getElementById("collection12");

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




if (searchbt) {
    searchbt.addEventListener("click", viewData);
}

if (alldatabt) {
    alldatabt.addEventListener("click", GetAllData);
}

                // Ading data to fire base
if (inserbt) {
    inserbt.addEventListener("click", AddData);
}
var DataID = 0;
function AddData() {
    var cnicData = document.getElementById("cnic").value;
    var nameData = document.getElementById("name").value;
    var phoneData = document.getElementById("phone").value;
    var slinderindb = document.getElementById("slinder").value;
    var pricedata = document.getElementById("price").value;
    console.log(DataID);
    SearchData(cnicData, pricedata,slinderindb ,nameData, phoneData);


}
function getNewDate() {
    var d = new Date().getDate();
    var m = new Date().getMonth();
    var y = new Date().getFullYear();
    var DateToday = d + "," + m + "," + y;
    return DateToday;
}
function SearchData(cnicData, pricedata, slinderindb, nameData, phoneData) {
    const dbref = ref(db);
    var DateToday = getNewDate();

    var priceindb;
    var slinderindb;
    get(child(dbref, "Customer/" +DataID )).then((snapshot) => {
        if (snapshot.exists()) {
            priceindb = snapshot.val().Price;
            slinderindb = snapshot.val().SlinderNumber;

            slinderdata = slinderdata + "," + slinderindb;

            pricedata = parseInt(pricedata) + parseInt(priceindb);


            // writing data in database
            set(ref(db, "Customer/" + nameData), {
                TodayDate: DateToday,
                CNIC: cnicData,
                Name: nameData,
                Phone: phoneData,
                SlinderNumber: slinderdata,
                Price: pricedata

            })
                .then(() => {
                    aler("Data Store");
                })
                .catch((error) => {
                    alert("Data Store");
                });


        } else {
            set(ref(db, "Customer/" + nameData), {
                TodayDate: DateToday,
                CNIC: cnicData,
                Name: nameData,
                Phone: phoneData,
                SlinderNumber: slinderdata,
                Price: pricedata

            })
                .then(() => {
                    aler("Data Store");
                })
                .catch((error) => {
                    alert("Data Store");
                });

        }
    });


}
function viewData() {

    var cnicData = document.getElementById("nameSe").value;
    const dbref = ref(db);


    get(child(dbref, "Customer/" + cnicData)).then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById("cnic").value = snapshot.val().CNIC;
            document.getElementById("name1").value = snapshot.val().Name;
            document.getElementById("phone").value = snapshot.val().Phone;
            document.getElementById("slinder").value = snapshot.val().SlinderNumber;
            document.getElementById("price").value = snapshot.val().Price;
           
        }
        else {
            alert("Not Found");
        }
    });
}
var sr = 0;
var totalprice = 0;
var tbody = document.getElementById("tableData");
function allData(cnicdb, nameDb, phonedb, slinderdb, pricedb, todayDate0) {


    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");

    td1.innerHTML = ++sr;
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
    totalprice = parseInt(totalprice) + parseInt(pricedb);
    document.getElementById("totalPrice").value = totalprice;
}

function addItemToTable(CustomerData) {


    var sr = 0;
    tbody.innerHTML = "";

    CustomerData.forEach(element => {
        allData(element.CNIC, element.Name, element.Phone, element.SlinderNumber, element.Price, element.TodayDate);
    });
}

function GetAllData() {
    sr = 0;
    totalprice = 0;
    const dbref = ref(db);

    get(child(dbref, "Customer/")).then((snapshot) => {
        var CustomerData = [];
        snapshot.forEach(childSnapshort => {
            CustomerData.push(childSnapshort.val());


        });
        addItemToTable(CustomerData);

    });
}

//Daily Data
if (todayDatabt) {

    todayDatabt.addEventListener("click", GetTodayData);
}

function GetTodayData() {
    sr = 0;
    totalprice = 0;
    const dbref = ref(db);
    var d = new Date().getDate();
    var m = new Date().getMonth();
    var y = new Date().getFullYear();
    var todayDate = d + "," + m + "," + y;

    get(child(dbref, "Customer/")).then((snapshot) => {
        var CustomerData = [];
        snapshot.forEach(childSnapshort => {
            if (todayDate == childSnapshort.val().TodayDate) {
                CustomerData.push(childSnapshort.val());
            }
        });

        addItemToTable(CustomerData);

    });
}

if (collectiondt) {

    collectiondt.addEventListener("click", CollectionPayment);
}
function CollectionPayment() {

    var nameData = document.getElementById("name").value;
    var paymentData = document.getElementById("Payment").value;

    const dbref = ref(db);
    var CustomerData = [];
    get(child(dbref, "Customer/")).then((snapshot) => {

        snapshot.forEach(childSnapshort => {
            if (nameData == childSnapshort.val().Name) {
                CustomerData.push(childSnapshort.val());

            }


        });
        if (CustomerData) {
            CustomerData.forEach(element => {
                UpdateDB(element.CNIC, element.Name, element.Phone, element.SlinderNumber, element.Price, element.TodayDate, paymentData);
            });
        }
    });



}
function UpdateDB(cnicdb, nameDb, phonedb, slinderdb, pricedb, todayDate0, paymentData) {
    document.getElementById("PaymetBefor").value = pricedb;
    var priceindb = parseInt(pricedb) - parseInt(paymentData);
    document.getElementById("PaymentLeft").value = priceindb;
    set(ref(db, "Customer/" + nameDb), {
        TodayDate: todayDate0,
        CNIC: cnicdb,
        Name: nameDb,
        Phone: phonedb,
        SlinderNumber: slinderdb,
        Price: priceindb

    })
        .then(() => {
            aler("Data Store");
        })
        .catch((error) => {
            alert("Data Store");
        });
}