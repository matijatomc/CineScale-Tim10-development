const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors()); 
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
  let naziv = (
    typeof request.query.naziv !== "undefined" ? request.query.naziv : null
  )
  models.get(db, 'film', id, order, naziv)
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
  let naziv = (
    typeof request.query.naziv !== "undefined" ? request.query.naziv : null
  )
  models.get(db, 'serija', id, order, naziv)
    .then(res => {
      return response.send(res)
    }).catch((error) => {
      return response.send(error)
    })
});

app.get('/recenzije', async (req, res) => {
  const korisnikUID = req.query.korisnikUID;

  if (!korisnikUID) {
    return res.status(400).json({ error: 'korisnikUID parameter is required.' });
  }

  const allCollections = ['film', 'serija'];
  const reviews = [];

  for (const collection of allCollections) {
    const moviesOrSeriesSnapshot = await db.collection(collection).get();

    for (const doc of moviesOrSeriesSnapshot.docs) {
      const movieOrSeriesId = doc.id;
      const movieOrSeriesName = doc.data().naziv; // assuming there is a 'name' field in the document
      const reviewsSnapshot = await db.collection(collection)
                                      .doc(movieOrSeriesId)
                                      .collection('recenzije')
                                      .where('korisnikUID', '==', korisnikUID)
                                      .get();

      reviewsSnapshot.forEach(reviewDoc => {
        const review = reviewDoc.data();
        review.movieOrSeriesId = movieOrSeriesId;
        review.movieOrSeriesName = movieOrSeriesName; // Add the movie or series name to the review
        reviews.push(review);
      });
    }
  }

  if (reviews.length === 0) {
    return res.status(404).json({ error: 'No reviews found for the provided UID.' });
  }

  res.json(reviews);
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