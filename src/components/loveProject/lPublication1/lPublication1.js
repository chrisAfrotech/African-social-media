export default {
  name: 'lPublication1',
  props: {
    publication_type: String,
    publication_img: {
      type: String,
      default: './images/dembouz.jpg'
    },
    publication_date: {
      type: String,
      default: 'MER. 20.02.2000 '
    },
    publication_author: {
      type: String,
      default: 'TAMO MBOBDA ERIC'
    },
    publication_title: {
      type: String,
      default: 'Welcome at objective social network'
    },
    publication_text: {
      type: String,
      default: 'La facon objective de voir un réseau social basée principalement sur un système de points (réactions)  et de classement...'
    },
    publi_numb_com: {
      type: Number,
      default: 100
    },
    publication_point: {
      type: Number,
      default: 1000
    }
  }
}
