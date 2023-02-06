<template>
    <div class ="lReaction" :style="{display:Display}">
        <div class="lRETitle">
            <div class="lRECross" @click="displaying()"><img src="./more.svg"/></div>
        </div>
        <div class ="lREmoji" @click="select('heart')"><img src="./images/heart.svg"/><div class="lREPoint">20</div></div>
        <div class ="lREmoji" @click="select('laughing')" ><img src="./images/laughing.svg"/><div class="lREPoint">15</div></div>
        <div class ="lREmoji" @click="select('impressed')"><img src="./images/impressed.svg"/><div class="lREPoint">10</div></div>
        <div class ="lREmoji" @click="select('like')"><img src="./images/like.svg"/><div class="lREPoint">5</div></div>
        <div class ="lREmoji" @click="select('handshake')"><img src="./images/handshake.svg"/><div class="lREPoint">0</div></div>
        <div class ="lREmoji" @click="select('sad')"><img src="./images/sad.svg"/><div class="lREPoint">-5</div></div>
        <div class ="lREmoji" @click="select('sick')"><img src="./images/sick.svg"/><div class="lREPoint">-10</div></div>
        <div class ="lREmoji" @click="select('angry')"><img src="./images/angry.svg"/><div class="lREPoint">-20</div></div>
    </div>
</template>
<style src="./lReaction.css">
</style>
<script src="./comLReaction.js">
</script>
