const movieList = new Vue({
    el: "#movies_container",

    data: {
        processing: false,
        movies_list: ''
    },

    mounted() {
        this.processing = true;
        this.loadMovies();
    },

    methods: {
        loadMovies() {
          const self = this;

          axios.post('/api/v1/movies/list')
          .then(function(response){ 
            
            if (response.status !== 200){
              self.movies_list = 'An error must have occured';  
            }
            else { 
              console.log(response.data.data);
              self.movies_list = response.data.data;  
            }
          })
          .catch(error => {
            console.log(error);
            self.movies_list = 'An unknown error must have occured.';  
          })
          .finally(function(){
            self.processing = false;
          })
        }
    }


});


const movieDetails = new Vue({

  el: "#movie_details",

  data: {
      processing: false,
      details_content: ''
  },

  props: ['slug'],

  mounted() {
      this.processing = true;
      alert(this.slug);
      // this.loadMovies();
  },

  methods: {
      loadMovies() {
        const self = this;

        axios.post('/api/v1/movies/list')
        .then(function(response){ 
          
          if (response.status !== 200){
            self.details_content = 'An error must have occured';  
          }
          else { 
            console.log(response.data.data);
            self.details_content = response.data.data;  
          }
        })
        .catch(error => {
          console.log(error);
          self.details_content = 'An unknown error must have occured.';  
        })
        .finally(function(){
          self.processing = false;
        })
      }
  }


});






 