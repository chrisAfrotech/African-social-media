<template>
<svg :style="{fill:Color}" class="bImage3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
<path d="M416,336V80c0-17.672-14.328-32-32-32H32C14.328,48,0,62.328,0,80v256c0,17.672,14.328,32,32,32h352
  C401.672,368,416,353.672,416,336z M352,112v138.668l-51.203-68.27c-3.094-4.148-8.156-6.773-13.234-6.391
  c-5.203,0.141-10,2.797-12.875,7.117l-56.172,84.25l-51.359-25.688c-5.078-2.523-11.109-2.195-15.844,0.883L64,299.07V112H352z"/>
<circle cx="144" cy="176" r="32"/>
<path d="M480,112c-17.672,0-32,14.328-32,32v256H96c-17.672,0-32,14.328-32,32s14.328,32,32,32h384c17.672,0,32-14.328,32-32V144
  C512,126.328,497.672,112,480,112z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
</template>

<style>
.bImage3 {
  width:15px;
  height: 15px;
  stroke:#25282A;
  transition: fill 0.5s;
}
.bImage3:hover {
  fill:yellow
}
</style>
<script>
export default {
  name: 'BImage',
  props: {
    message: String
  },
  data () {
    return {
      Color: 'white'
    }
  },
  methods: {
    changeam () {
      this.Color = '#EB951E'
    },
    changeamR () {
      this.Color = 'white'
    }
  }
}
</script>
