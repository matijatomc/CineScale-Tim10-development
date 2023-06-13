<template>
  <div id="indexpage" style="display: flex; flex-direction: column; align-items: center;">
    <div class="search-container" style="margin: 20px;">
      <input type="text" v-model="searchInput" placeholder="Search for a movie" style="padding: 5px; width: 300px;"/>
      <button @click="search" style="padding: 5px 10px; margin-left: 10px;">Search</button>
    </div>
    <div class="content" style="display: flex; flex-direction: column; align-items: center; width: 80%;">
      <div v-for="(item, index) in searchResults" :key="index" style=" background-color: lightgray; border: 1px solid black; border-radius: 8px; padding: 20px; margin: 10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); width: 100%;">
        <h2 style="margin-bottom: 10px;">{{ item.naziv }}</h2>
        <p><strong>Director:</strong> {{ item.redatelj }}</p>
        <p><strong>Genre:</strong> {{ item.zanr }}</p>
        <p><strong>Year:</strong> {{ item.godinaIzlaska }}</p>
        <button @click="getMovieDetails(item.id)" style="padding: 5px 10px; margin-top: 10px;">Get details</button>

        <div v-if="selectedMovie && selectedMovieId === item.id" style=" background-color: #b5b1b1; border: 1px solid black; border-radius: 8px; padding: 20px; margin-top: 10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">
          <h3>Selected Movie Reviews:</h3>
          <div v-for="(review, index) in selectedMovie" :key="index">
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

export default {
  data () {
    return {
      searchInput: '',
      searchResults: [],
      selectedMovie: null,
      selectedMovieId: null
    }
  },
  methods: {
    async fetchAllMovies () {
      try {
        const response = await axios.get('http://localhost:3000/film')
        this.searchResults = response.data.map(item => ({ id: item.id, ...item.data }))
      } catch (error) {
        console.error('Error fetching all movies:', error)
      }
    },
    async search () {
      try {
        const response = await axios.get('http://localhost:3000/film?naziv=' + this.searchInput)
        this.searchResults = response.data.map(item => ({ id: item.id, ...item.data }))
      } catch (error) {
        console.error('Error searching:', error)
      }
    },
    async getMovieDetails (id) {
      try {
        const response = await axios.get('http://localhost:3000/film?id=' + id)
        this.selectedMovie = response.data.map(item => item.data)
        this.selectedMovieId = id
      } catch (error) {
        console.error('Error getting movie details:', error)
      }
    }
  },
  created () {
    this.fetchAllMovies()
  }
}
</script>
