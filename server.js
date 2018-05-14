const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

// - Create route for creating new users

app.post("/create", function(req, res){
  let user = req.body;
  if (fs.readFileSync('./storage.json', 'utf-8') == "") {
    var storageArr = [];
  }else{
    var storageArr = JSON.parse(fs.readFileSync('./storage.json', 'utf-8'))
  }
  storageArr.push(user);
  let storageStr = JSON.stringify(storageArr)
  fs.writeFileSync("./storage.json", storageStr);
  res.send(storageArr)
})


// - Get route for getting all users

app.get('/userlist', function(req, res) {
  let nameList = JSON.parse(fs.readFileSync('./storage.json', 'utf-8'))
  res.json(nameList)
})

// - Get route for getting a user by name - Stretch changed to ID
app.get('/:id', function(req, res) {
  let userObj = JSON.parse(fs.readFileSync('./storage.json', 'utf-8'))
  userObj.forEach(function(person) {
    if (person.id == Number(req.params.id)) {
      res.json(person)
      return
    };
  });
  res.sendStatus(400);
});
// - Update route for updating a user by name - Stretch changed to ID
app.patch('/update/:id', function(req, res) {
  let user = req.body;
  let userObj = JSON.parse(fs.readFileSync('./storage.json', 'utf-8'))
  for (let i = 0; i < userObj.length; i++) {
      if (userObj[i].id == Number(req.params.id)) {
        userObj.splice(i,1,user)
        let userStr = JSON.stringify(userObj)
        fs.writeFileSync("./storage.json", userStr);
        res.send(userObj)
      };
  }
});
// - Delete route for deleting a user by name - Stretch updated to ID
app.delete('/delete/:id', function(req, res) {
  let userObj = JSON.parse(fs.readFileSync('./storage.json', 'utf-8'))
  for (let i = 0; i < userObj.length; i++) {
      if (userObj[i].id == Number(req.params.id)) {
        userObj.splice(i,1)
        let userStr = JSON.stringify(userObj)
        fs.writeFileSync("./storage.json", userStr);
        res.send(userObj)
      };
  }
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

// ### Stretch:
// Add an id field to the object and use that instead of name for all of your routes.
