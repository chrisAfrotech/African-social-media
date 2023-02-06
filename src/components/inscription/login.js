import InputI0 from '@/components/inscription/InputI0.vue'
import ButtonI0 from '@/components/inscription/ButtonI0.vue'
import ButtonI1 from '@/components/inscription/ButtonI1.vue'
import DropDownList from '@/components/inscription/DropDownList.vue'
import FooterI from '@/components/inscription/FooterI.vue'
export default {
  name: 'inscription',
  components: {
    InputI0,
    ButtonI0,
    ButtonI1,
    DropDownList,
    FooterI
  },
  methods: {
    submiting (e) {
      e.preventDefault()
      return false
    },
    login () {
      if (!this.validation()) alert('echec de validation')
      else {
        const axios = require('axios')
        axios.post(this.$store.state.baseUrl + 'login.php', {
          name: this.$refs.name.message,
          password: this.$refs.password.message
        })
          .then((response) => {
            if (response.data) {
              this.$store.commit('updateLogin', {connected: true, id: response.data})
              document.cookie = 'userId=' + response.data + ';expires=Thu, 18 Dec 2023 12:00:00 UTC; SameSite=lax; Secure; path=/'
              this.$router.push('loveProject')
              alert('connexion éffectué avec success')
            } else { alert('account does not exist') }
          })
          .catch((error) => {
            // error.response.status Check status code
            alert(error)
          }).finally(() => {
            // Perform action in always
          })
      }
    },
    validation () {
      let regex1 = /^.{2,22}$/
      let regex2 = /^.{2,22}$/
      if (!regex1.test(this.$refs.name.message) ||
          !regex2.test(this.$refs.password.message)) return false
      return true
    }
  }
}
