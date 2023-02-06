<template>
    <div class ="listReactor" :style="{display:Display}">
        <div class="lrCTitle">Réactions
            <div class="lrCCross" @click="displaying()"><img src="./more.svg"/></div>
        </div>
        <div class="lrHeader">
            <div @click="getReactor('[a-z]+')" ><span>Total {{ total }}</span></div>
            <div @click="getReactor('heart')" ><img src="./images/heart.svg"/><span>{{ heart }}</span></div>
            <div @click="getReactor('laughing')" ><img src="./images/laughing.svg"/><span>{{ laughing }}</span></div>
            <div @click="getReactor('impressed')" ><img src="./images/impressed.svg"/><span>{{ impressed }}</span></div>
            <div @click="getReactor('like')" ><img src="./images/like.svg"/><span>{{ like }}</span></div>
            <div @click="getReactor('handshake')" ><img src="./images/handshake.svg"/><span>{{ handshake }}</span></div>
            <div @click="getReactor('sad')" ><img src="./images/sad.svg"/><span>{{ sad }}</span></div>
            <div @click="getReactor('sick')" ><img src="./images/sick.svg"/><span>{{ sick }}</span></div>
            <div @click="getReactor('angry')" ><img src="./images/angry.svg"/><span>{{ angry }}</span></div>
        </div>
        <div  v-for="(data,index) in datas" :key ="index" class="lrElement">
            <div class="lrProfile"><img v-bind:src= "require(data.profile + '')" /></div>
            <div class="lrName"> {{ data.name }}</div>
            <div class="lrReaction"><img v-bind:src= "require('./images/'+data.emoji + '.svg')" /></div>
            <div class="lrPoint">12</div>
        </div>
    </div>
</template>
<style src="./listReactor.css">
</style>
<script src="./listReactorComOfCom.js">
</script>
