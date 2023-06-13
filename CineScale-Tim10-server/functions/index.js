const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var admin = require("firebase-admin");
var serviceAccount = require("./cinescale-cfad0-firebase-adminsdk-y3c14-da0596a9f5.json");
var models = require('./models.js')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = admin.firestore();

app.get('/film', async (request, response) => {
  let id = (
    typeof request.query.id !== 'undefined'
      ? request.query.id
      : null
  )
  let order = {
    orderAttr: (
      typeof request.query.orderAttr !== 'undefined'
        ? request.query.orderAttr
        : null
    ),
    orderType: (
      typeof request.query.orderDesc !== 'undefined'
        ? 'desc'
        : 'asc'
    )
  }
  let zanr = (
    typeof request.query.zanr !== "undefined" ? request.query.zanr : null
  )
  let name = (
    typeof request.query.name !== "undefined" ? request.query.name : null
  )
  
  models.get(db, 'film', id, order, zanr, name) // pass name to the get function
    .then(res => {
      return response.send(res)
    }).catch((error) => {
      return response.send(error)
    })
  });
  

app.get('/serija', async (request, response) => {
  let id = (
    typeof request.query.id !== 'undefined'
      ? request.query.id
      : null
  )
  let order = {
    orderAttr: (
      typeof request.query.orderAttr !== 'undefined'
        ? request.query.orderAttr
        : null
    ),
    orderType: (
      typeof request.query.orderDesc !== 'undefined'
        ? 'desc'
        : 'asc'
    )
  }
  let zanr = (
    typeof request.query.zanr !== "undefined" ? request.query.zanr : null
  )
  models.get(db, 'serija', id, order, zanr)
    .then(res => {
      return response.send(res)
    }).catch((error) => {
      return response.send(error)
    })
});

app.post('/film', async (req, res) => {
  try {
    const {naziv, redatelj, zanr, godinaIzlaska} = req.query
    const result = await db.collection('film').doc().set({
      naziv: naziv,
      redatelj: redatelj,
      zanr: zanr,
      godinaIzlaska: godinaIzlaska
    })
    res.status(201).json({ message: 'Document created successfully', id: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/serija', async (req, res) => {
  try {
    const {naziv, redatelj, zanr, godinaIzlaska, brojEpizoda} = req.query
    const result = await db.collection('serija').doc().set({
      naziv: naziv,
      redatelj: redatelj,
      zanr: zanr,
      godinaIzlaska: godinaIzlaska,
      brojEpizoda: brojEpizoda
    })
    res.status(201).json({ message: 'Document created successfully', id: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/film', async (req, res) => {
  let id = (
    typeof req.query.id !== 'undefined'
      ? req.query.id
      : null
  )
  try {
    const {naziv, redatelj, zanr, godinaIzlaska} = req.query
    const result = await db.collection('film').doc(id).update({
      naziv: naziv,
      redatelj: redatelj,
      zanr: zanr,
      godinaIzlaska: godinaIzlaska,
    })
    res.status(201).json({ message: 'Document changet successfully', id: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/serija', async (req, res) => {
  let id = (
    typeof req.query.id !== 'undefined'
      ? req.query.id
      : null
  )
  try {
    const {naziv, redatelj, zanr, godinaIzlaska, brojEpizoda} = req.query
    const result = await db.collection('serija').doc(id).update({
      naziv: naziv,
      redatelj: redatelj,
      zanr: zanr,
      godinaIzlaska: godinaIzlaska,
      brojEpizoda: brojEpizoda
    })
    res.status(201).json({ message: 'Document changet successfully', id: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/film', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
    db.collection('film').doc(request.query.id).delete()
      .then(function () {
        return response.send(
          "Document successfully deleted!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error removing document: " + error
        )
      })
  } else {
    return response.send(
      "A parameter id is not set. " +
      "A document is not deleted!"
    )
  }
})

app.delete('/serija', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
    db.collection('serija').doc(request.query.id).delete()
      .then(function () {
        return response.send(
          "Document successfully deleted!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error removing document: " + error
        )
      })
  } else {
    return response.send(
      "A parameter id is not set. " +
      "A document is not deleted!"
    )
  }
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});