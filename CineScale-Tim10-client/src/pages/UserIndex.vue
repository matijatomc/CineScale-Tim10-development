<template>
  <div id="indexpage" style="display: flex; flex-direction: column; align-items: center;">
    <h2>My Reviews:</h2>
    <div class="content" style="display: flex; flex-direction: column; align-items: center; width: 80%;">
      <div v-for="(review, index) in userReviews" :key="index" style="background-color: lightgray; border: 1px solid black; border-radius: 8px; padding: 20px; margin: 10px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); width: 100%;">
        <h4 style="margin-bottom: 10px;">{{ review.movieOrSeriesName }}</h4>
        <div v-if="editingReviewIndex !== index">
          <p><strong>Comment:</strong> {{ review.komentar }}</p>
          <p><strong>Rating:</strong> {{ review.ocjena }}</p>
        </div>
        <div v-else>
          <p><strong>Comment:</strong></p>
          <textarea v-model="editingReview.komentar" rows="4" cols="50"></textarea>
          <p><strong>Rating:</strong></p>
          <input v-model="editingReview.ocjena" type="number" min="1" max="5"/>
        </div><br>
        <div>
          <button v-if="editingReviewIndex !== index" @click="editReview(index, review)" style="padding: 5px 10px; margin-bottom: 10px;">Edit</button>
          <button v-else @click="saveReview()" style="padding: 5px 10px; margin-bottom: 10px;">Confirm</button>
          <button @click="deleteReview(review)" style="padding: 5px 10px; margin-left: 10px;" >Delete</button>
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
      userId: null,
      editingReviewIndex: null,
      editingReview: null,
      deletingReview: null
    }
  },
  async created () {
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        this.userId = user.uid
        await this.fetchUserReviews()
      } else {
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
    editReview (index, review) {
      this.editingReviewIndex = index
      this.editingReview = Object.assign({}, review)
    },
    async saveReview () {
      if (this.editingReview) {
        await axios.put('http://localhost:3000/recenzije?collection=' + this.editingReview.collection + '&movieOrSeriesId=' + this.editingReview.movieOrSeriesId + '&reviewId=' + this.editingReview.reviewId + '&ocjena=' + this.editingReview.ocjena + '&komentar=' + this.editingReview.komentar)
        this.userReviews[this.editingReviewIndex] = this.editingReview
        this.editingReviewIndex = null
        this.editingReview = null
      }
    },
    async deleteReview (review) {
      this.deletingReview = Object.assign({}, review)
      if (this.deletingReview) {
        await axios.delete('http://localhost:3000/recenzije?collection=' + this.deletingReview.collection + '&movieOrSeriesId=' + this.deletingReview.movieOrSeriesId + '&reviewId=' + this.deletingReview.reviewId)
        this.deletingReview = null
        location.reload()
      }
    }
  }
}
</script>
