<template>
    <button class ="ButtonA2" :style = "{ fontSize:fSize, backgroundColor:bgColor}" @mouseleave="bgColor='transparent'" @mouseover="bgColor=bghColor">
        <div v-html="bEmoji"></div>
        <span>{{ message }}</span>
    </button>
</template>
<style src="./buttonA2.css">
</style>
<script src="./buttonA2.js">
</script>
