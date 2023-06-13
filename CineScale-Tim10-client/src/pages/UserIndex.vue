<template>
  <div id="indexpage" style="display: flex; flex-direction: column; align-items: center;">
    <h2>My Reviews:</h2>
    <div class="content" style="display: flex; flex-direction: column; align-items: center; width: 80%;">
      <div v-for="(review, index) in userReviews" :key="index" style=" background-color: lightgray; border: 1px solid black; border-radius: 8px; padding: 20px; margin: 10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); width: 100%;">
        <h4 style="margin-bottom: 10px;">{{ review.movieOrSeriesName }}</h4>
        <p><strong>Comment:</strong> {{ review.komentar }}</p>
        <p><strong>Rating:</strong> {{ review.ocjena }}</p>
        <div>
          <button @click="editReview(review.id)" style="margin-bottom: 10px;">Edit</button>
          <button @click="deleteReview(review.id)">Delete</button>
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
      userReviews: [],
      userId: null
    }
  },
  async created () {
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, get the UID
        this.userId = user.uid
        await this.fetchUserReviews()
      } else {
        // No user is signed in
        console.log('No user is signed in')
      }
    })
  },
  methods: {
    async fetchUserReviews () {
      if (this.userId) {
        try {
          const response = await axios.get('http://localhost:3000/recenzije?korisnikUID=' + this.userId)
          const data = response.data

          this.userReviews = data.map(item => ({ movieId: item.movieId, ...item }))
        } catch (error) {
          console.error('Error fetching user reviews:', error)
        }
      } else {
        console.log('No user is logged in to fetch reviews.')
      }
    },
    async editReview (id) {
      // Your code to edit the review
    },
    async deleteReview (id) {
      // Your code to delete the review
    }
  }
}
</script>
