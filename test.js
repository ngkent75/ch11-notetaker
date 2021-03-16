const uniqid = require('uniqid');

let newID = {
    name: 'Nathan',
    age: 20
}

newID.id = uniqid();

console.log(newID);

