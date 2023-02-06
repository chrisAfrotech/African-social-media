export default {
  name: 'pComment',
  data () {
    return {
      Display: 'none',
      isDisplayed: false,
      texte: '',
      type: 'Football',
      callerId: 42,
      serverPage: '',
      file: ''
    }
  },
  methods: {
    displaying () {
      this.Display = this.isDisplayed ? 'none' : 'block'
      this.isDisplayed = !this.isDisplayed
    },
    preview (file) {
      if (file) {
        this.file = file
        document.getElementById('pCImage').src = URL.createObjectURL(file)
      }
    },
    sendImage () {
      this.$root.$emit('loading', 'on')
      const axios = require('axios')
      var formData = new FormData()
      if (this.file) {
        formData.append('image_name', this.file) // don't modify image_name, it will be called server sidely
        axios.post(this.$store.state.baseUrl + 'savePublicationImg.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) => {
            console.log(response.data)
            if (response.data === 'success') {
              this.publishing()
            } else {
              this.$root.$emit('loading', 'off')
              alert(response.data)
            }
          })
          .catch((error) => {
            alert(error)
          })
      } else { this.publishing() } // s'il n(y a pas de fichier on publi quand meme le reste)
    },
    validation () {
      return true
    },
    publishing () {
      if (!this.validation()) alert('echec de validation')
      else {
        const axios = require('axios')
        axios.post(this.$store.state.baseUrl + this.serverPage, {
          texte: this.texte,
          type: this.$parent.publication_type,
          publication: this.callerId,
          personne: this.$store.state.login.id,
          parent: this.$route.params.id
        })
          .then((response) => {
            console.log('success' + response.data)
            if (this.serverPage === 'saveComOfCom.php') this.$root.$emit('loadPagination') // emitted for comPagination
            else this.$root.$emit('typeSelected', 'latest')
            this.displaying()
            this.$root.$emit('loading', 'off')
          })
          .catch((error) => {
            alert(error)
          })
      }
    }
  },
  mounted () {
    this.$root.$on('commenter', data => {
      this.callerId = data.id
      if (data.type === 'comment') {
        this.serverPage = 'saveComment.php'
      }
      if (data.type === 'comOfcom') {
        this.serverPage = 'saveComOfCom.php'
      }
      this.displaying()
    })
  }
}
