export default {
  name: 'updatePubForm',
  data () {
    return {
      Display: 'none',
      isDisplayed: false,
      description: '',
      noModif: { cover: '( aucunes modifications)', profile: '( aucunes modifications)' },
      profileImg: '',
      profileSmallImg: '',
      coverImg: ''
    }
  },
  methods: {
    displaying () {
      this.Display = this.isDisplayed ? 'none' : 'block'
      this.isDisplayed = !this.isDisplayed
    },
    cancel () {
      document.getElementById('upFcover').src = ''
      document.getElementById('upFprofile').src = ''
      this.description = this.$parent.pseudo
      this.noModif['cover'] = '( aucunes modifications)'
      this.noModif['profile'] = '( aucunes modifications)'
    },
    previewProfile (file) {
      this.profileImg = file
      document.getElementById('upFprofile').src = URL.createObjectURL(file)
      this.noModif['profile'] = ''

      // code for the same profile but with size reduced
      this.$refs.profileSmall.emitLoad()
      this.$refs.profileSmall.handleFile(file)
    },
    previewProfileSmall (file) {
      // named preview but won't be previewed
      this.profileSmallImg = file
    },
    previewCover (file) {
      // const [file] = this.$refs[type].files
      this.coverImg = file
      document.getElementById('upFcover').src = URL.createObjectURL(file)
      this.noModif['cover'] = ''
    },
    sendImages () {
      this.$root.$emit('loading', 'on')
      // axios request
      const axios = require('axios')
      var formData = new FormData()
      if (this.coverImg || this.profileImg) {
        if (this.profileImg) formData.append('image_name', this.profileImg)
        if (this.profileSmallImg) formData.append('image_name2', this.profileSmallImg)
        if (this.coverImg) formData.append('image_name1', this.coverImg)
        axios.post(this.$store.state.baseUrl + 'saveProfilImages.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) => {
            console.log(response.data)
            this.publishing() // on publi après avoir enregistré les images
          })
          .catch((error) => {
            alert(error)
          })
      } else {
        this.publishing()
      } // s'il n(y a pas de fichier on publi quand meme le reste)
    },
    validation () {
      return true
    },
    publishing () {
      if (!this.validation()) alert('echec de validation')
      else {
        const axios = require('axios')
        axios.post(this.$store.state.baseUrl + 'updateUser.php', {
          id: this.$store.state.login.id,
          description: this.description
        })
          .then((response) => {
            console.log(response.data)
            this.$parent.getUserDatas()
            this.cancel()
            this.displaying()
            this.$root.$emit('loading', 'off')
          })
          .catch((error) => {
            alert(error)
          })
      }
    }
  }
}
