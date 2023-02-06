<template>
    <div class ="lPublication" :style="{display: Display}">
        <div class="lPType">{{ publication_type }}</div>
        <div class="lPImg"><img :src='publication_img' :style="{display:DisplayImg}"/></div>
        <div class="lPDate">
            <div class="lPProfile">
                <img :src='auth_img'>
            </div>
            <div @click="toProfile" class="lPAuthor">
                <div><span>{{ publication_author }} |</span> {{ facebookDate(publication_date) }}</div>
                <div class="lPStars"> <div v-for="(color, index) in star_colors" :key="index"> <LPStar :Color="color.color"/> </div> </div>
            </div>
        </div>
        <div class="lPTitle">{{ publication_title }} </div>
        <div @click="toPublication" class="lPText" :style="{maxHeight:vtext_height}">{{ publication_text }} </div>
        <div class="lPMore"><div @click="slideText" :style="{ display: vdisplay_more }">more...</div></div>
        <div class="lPOption">
            <div class="lPPoint" >
                <div @click="toPublication" ><img src="./images/com.svg" />{{ publi_numb_com }}</div>
            </div>
            <div class="lPPoint" >
                <div>
                    <img @click="reactEmit" v-bind:src="require('./emoticones/'+  react + '.svg')" />
                    <span class="lPPointt" @click="lsReactEmit" >{{ publication_point }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="./lPublication.css">
</style>
<script src="./lPublication.js">
</script>
