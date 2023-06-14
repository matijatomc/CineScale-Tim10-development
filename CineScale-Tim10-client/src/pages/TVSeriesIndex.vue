<template>
  <div id="indexpage" style="display: flex; flex-direction: column; align-items: center;">
    <div class="search-container" style="margin: 20px;">
      <input type="text" v-model="searchInput" placeholder="Search for a TVSeries" style="padding: 5px; width: 300px;"/>
      <button @click="search" style="padding: 5px 10px; margin-left: 10px;">Search</button>
    </div>
    <div class="content" style="display: flex; flex-direction: column; align-items: center; width: 80%;">
      <div v-for="(item, index) in searchResults" :key="index" style=" background-color: lightgray; border: 1px solid black; border-radius: 8px; padding: 20px; margin: 10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); width: 100%;">
        <h2 style="margin-bottom: 10px;">{{ item.naziv }}</h2>
        <p><strong>Director:</strong> {{ item.redatelj }}</p>
        <p><strong>Genre:</strong> {{ item.zanr }}</p>
        <p><strong>Year:</strong> {{ item.godinaIzlaska }}</p>
        <p><strong>Nuber of episodes:</strong> {{ item.brojEpizoda }}</p>

        <button v-if="userId" @click="showAddReviewForm(item.id)" style="padding: 5px 10px; margin-top: 10px; float: right;">Add review</button>
        <div v-if="addReviewTVSeriesId === item.id"
          style="clear: both; background-color: #b5b1b1; border: 1px solid black; border-radius: 8px; padding: 20px; margin-top: 10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">
          <h3>Add a review:</h3>
          <p><strong>Comment:</strong></p>
          <textarea v-model="newReview.komentar" style="width: 100%; height: 100px;"></textarea>
          <p><strong>Rating:</strong></p>
          <input v-model="newReview.ocjena" type="number" min="1" max="10" style=" width: 50px;"><br>
          <button @click="addReview(item.id, item.naziv)" style="padding: 5px 10px; margin-top: 10px;">Confirm</button>
          <button @click="hideAddReviewForm()" style="padding: 5px 10px; margin-left: 5px; margin-top: 10px;">Cancel</button>
        </div>

        <button @click="getTVSeriesDetails(item.id)" style="padding: 5px 10px; margin-top: 10px;">Show reviews</button>
        <div v-if="selectedTVSeries && selectedTVSeriesId === item.id" style=" background-color: #b5b1b1; border: 1px solid black; border-radius: 8px; padding: 20px; margin-top: 10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">
          <h3>Selected TV series Reviews:</h3>
          <div v-for="(review, index) in selectedTVSeries" :key="index">
            <p><strong>User ID:</strong> {{ review.korisnikUID }}</p>
            <p><strong>Comment:</strong> {{ review.komentar }}</p>
            <p><strong>Rating:</strong> {{ review.ocjena }}</p>
            <br><br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getAuth } from 'firebase/auth'

export default {
  data () {
    return {
      searchInput: '',
      searchResults: [],
      selectedTVSeries: null,
      selectedTVSeriesId: null,
      addReviewTVSeriesId: null,
      newReview: {
        komentar: '',
        ocjena: ''
      },
      userId: null
    }
  },
  methods: {
    async fetchAllTVSeries () {
      try {
        const response = await axios.get('http://localhost:3000/serija')
        this.searchResults = response.data.map(item => ({ id: item.id, ...item.data }))
      } catch (error) {
        console.error('Error fetching all TV series:', error)
      }
    },
    async search () {
      try {
        const response = await axios.get('http://localhost:3000/serija?naziv=' + this.searchInput)
        this.searchResults = response.data.map(item => ({ id: item.id, ...item.data }))
      } catch (error) {
        console.error('Error searching:', error)
      }
    },
    async getTVSeriesDetails (id) {
      try {
        const response = await axios.get('http://localhost:3000/serija?id=' + id)
        this.selectedTVSeries = response.data.map(item => item.data)
        this.selectedTVSeriesId = id
      } catch (error) {
        console.error('Error getting TV series details:', error)
      }
    },
    showAddReviewForm (id) {
      this.addReviewTVSeriesId = id
      this.newReview = {
        komentar: '',
        ocjena: ''
      }
    },
    async addReview (id, name) {
      if (!this.newReview.komentar || !this.newReview.ocjena) {
        alert('Both comment and rating are required.')
        return
      }
      try {
        await axios.post('http://localhost:3000/recenzije?collection=serija&movieOrSeriesId=' + id + '&komentar=' + this.newReview.komentar + '&ocjena=' + this.newReview.ocjena + '&korisnikUID=' + this.userId)
        this.addReviewTVSeriesId = null
        this.getTVSeriesDetails(id)
      } catch (error) {
        console.error('Error adding review:', error)
      }
    },
    hideAddReviewForm (id) {
      this.addReviewTVSeriesId = id
      this.newReview = {
        komentar: '',
        ocjena: ''
      }
    }
  },
  created () {
    this.fetchAllTVSeries()
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        this.userId = user.uid
      } else {
        console.log('No user is signed in')
      }
    })
  }
}
</script>
