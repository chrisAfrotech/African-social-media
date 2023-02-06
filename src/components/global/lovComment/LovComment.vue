<template>
    <div class ="lovComment" :style="{display: Display}">
        <div :style="{display:DisplayImg}" class="lovCommentImg"><img v-bind:src="publication_img" /></div>
        <div class="lovCommentAuthor">
            <div @click="toProfile" class="lovCommentDate"><span>{{ publication_author }} |</span> {{ facebookDate(publication_date) }}</div>
            <div class="lovCommentProfile">
                <div><img :src="auth_img"></div>
            </div>
        </div>
        <div class="lovCommentText" :style="{maxHeight:vtext_height}">{{ publication_text }} </div>
        <div class="lovCommentMore"><div @click="slideText" :style="{ display: vdisplay_more }">read more...</div></div>
        <div class="lovCommentOption">
            <div class="lovCommentPoint" >
                <div>
                    <img @click="reactEmit" v-bind:src="require('./emoticones/'+  react + '.svg')" />
                    <span class="lovCommentPointt" @click="lsReactEmit" >{{ publication_point }}</span>
                </div>
            </div>
            <div class="lovCommentPoint" >
                <div @click="commentEmit" ><img src="./images/com.svg" />{{ publi_numb_com }}</div>
            </div>
        </div>
    </div>
</template>
<style src="./lovComment.css">
</style>
<script src="./lovComment.js">
</script>
