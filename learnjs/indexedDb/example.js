/**
 * Created by plter on 6/26/16.
 */

// Let us open our database
var DBOpenRequest = window.indexedDB.open("toDoList", 5);
var db;

DBOpenRequest.onsuccess = function (event) {
    // note.innerHTML += '<li>Database initialised.</li>';

    console.log("Database initialised.");

    // store the result of opening the database in the db variable.
    db = DBOpenRequest.result;
};

// This event handles the event whereby a new version of the database needs to be created
// Either one has not been created before, or a new version number has been submitted via the
// window.indexedDB.open line above
DBOpenRequest.onupgradeneeded = function (event) {
    var db = event.target.result;

    db.onerror = function (event) {
        note.innerHTML += '<li>Error loading database.</li>';
    };

    // Create an objectStore for this database

    var objectStore = db.createObjectStore("toDoList", {keyPath: "taskTitle"});

    // define what data items the objectStore will contain

    objectStore.createIndex("hours", "hours", {unique: false});
    objectStore.createIndex("minutes", "minutes", {unique: false});
    objectStore.createIndex("day", "day", {unique: false});
    objectStore.createIndex("month", "month", {unique: false});
    objectStore.createIndex("year", "year", {unique: false});

    objectStore.createIndex("notified", "notified", {unique: false});

    // note.innerHTML += '<li>Object store created.</li>';

    console.log("Object store created.");
};

// Create a new item to add in to the object store
var newItem = [
    {taskTitle: "Walk dog", hours: 19, minutes: 30, day: 24, month: 'December', year: 2013, notified: "no"}
];

// open a read/write db transaction, ready for adding the data
// var transaction = db.transaction(["toDoList"], "readwrite");
//
// // report on the success of opening the transaction
// transaction.oncomplete = function (event) {
//     // note.innerHTML += '<li>Transaction opened for task addition.</li>';
//     console.log("Transaction opened for task addition.");
// };
//
// transaction.onerror = function (event) {
//     // note.innerHTML += '<li>Transaction not opened due to error. Duplicate items not allowed.</li>';
//     console.log("Transaction not opened due to error. Duplicate items not allowed.");
// };
//
// // create an object store on the transaction
// var objectStore = transaction.objectStore("toDoList");
// // add our newItem object to the object store
// var objectStoreRequest = objectStore.add(newItem[0]);
//
// objectStoreRequest.onsuccess = function (event) {
//     note.innerHTML += '<li>New item added to database.</li>';
// };