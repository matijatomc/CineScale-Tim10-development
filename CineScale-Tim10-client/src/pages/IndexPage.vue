<template>
   <div id="indexpage">
    <div class="search-container" align="center">
      <input type="text" v-model="searchInput" placeholder="Search for a movie or TV show" />
      <button @click="search">Search</button>
    </div>
    <div class="content">
      <div v-for="(item, index) in searchResults" :key="index">
        <!-- Display the search results -->
        <p>{{ item.naziv }}</p>
        <p>{{ item.redatelj }}</p>
        <!-- add more fields as needed -->
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
      searchResults: []
    }
  },
  methods: {
    async search () {
  try {
    // Send a request to the Express server
    const responseFilm = await axios.get('http://localhost:3000/film?name=' + this.searchInput)
    const dataFilm = responseFilm.data

    const responseSerija = await axios.get('http://localhost:3000/serija?name=' + this.searchInput)
    const dataSerija = responseSerija.data

    // Update the search results
    this.searchResults = [...dataFilm, ...dataSerija]
  } catch (error) {
    console.error('Error searching:', error)
  }
}

  }
}
</script>
