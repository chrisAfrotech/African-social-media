import MenuButton from './menuButton/MenuButton.vue'
import ButtonA2 from './buttonA2/ButtonA2.vue'
import ButtonA1 from './buttonA1/ButtonA1.vue'
import ButtonA11 from './buttonA11/ButtonA11.vue'
import ButtonA12 from './buttonA12/ButtonA12.vue'
import ButtonA13 from './buttonA13/ButtonA13.vue'
import LDropDown from '@/components/global/lDropDown/LDropDown.vue'
import BellNotification from './bellNotification/BellNotification.vue'
import BellNotificationSmall from './bellNotification/BellNotificationSmall.vue'
export default {
  name: 'lNavBar',
  components: {
    MenuButton,
    ButtonA2,
    ButtonA1,
    ButtonA11,
    ButtonA12,
    ButtonA13,
    LDropDown,
    BellNotification,
    BellNotificationSmall
  },
  data () {
    return {
      vheight: '0px',
      m_visible: false,
      ptop: '0px'
    }
  },
  methods: {
    cross () {
      if (this.m_visible) {
        this.m_visible = false
        this.vheight = '0px'
        this.ptop = '0px'
      } else {
        this.m_visible = true
        this.vheight = '330px'
        this.ptop = '5px'
      }
    },
    toProfile () {
      this.$store.commit('updateProfilePage', this.$store.state.login.id)
      this.$router.push('profilePage')
    },
    toPubliList () {
      this.$router.push('publiList')
    },
    toAccueil () {
      this.$router.push('/')
    }
  }
}
