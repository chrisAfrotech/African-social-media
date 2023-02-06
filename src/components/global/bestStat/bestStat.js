import LProfileCard from '@/components/global/lProfileCard/LProfileCard.vue'
import Slider from './Slider.vue'
export default {
  name: 'BestStat',
  components: {
    LProfileCard,
    Slider
  },
  data () {
    return {
      types1: ['allField', 'Football', 'Philosophy', 'Social problems'],
      types2: ['Politic', 'Beauty', 'Physics', 'Other']
    }
  }
}
