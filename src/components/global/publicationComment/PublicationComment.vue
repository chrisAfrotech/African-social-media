<template>
    <div class ="publicationComment" :style="{display: Display}">
        <ComLReaction style="z-index:3"/>
        <ListReactorComOfCom style="z-index:3"/>
        <div class="pubComTitle">Comment of Comment haha
            <div class="pubComCross" @click="displaying()"><img src="./images/more.svg"/></div>
        </div>
        <div>
            <div :style="{display:DisplayImg}" class="pubComImg"><img :src="publication_img" /></div>
            <div @click="toProfile" class="pubComDate"><span>{{ publication_author }} |</span> {{ facebookDate(publication_date) }}</div>
            <div class="pubComText" :style="{maxHeight:vtext_height}">{{ publication_text }} </div>
            <div class="pubComMore"><div @click="slideText" :style="{ display: vdisplay_more }">read more...</div></div>
            <div class="pubComOption">
                <div class="pubComPoint" >
                    <div>
                        <img @click="reactEmit" v-bind:src="require('./emoticones/'+  react + '.svg')" />
                        <span class="pubComPointt" @click="lsReactEmit" >{{ publication_point }}</span>
                    </div>
                </div>
                <div class="pubComPoint" >
                    <div @click="comOfComEmit" ><img src="./images/com.svg" />{{ publi_numb_com }}</div>
                </div>
                <div class="pubComProfile">
                    <div><img :src="auth_img"></div>
                </div>
            </div>
        </div>
        <div class="pubComComZone">
            <div><LovComOfCom ref='lp1' reference='lp1' :id='publicationIndexes[0]' /></div>
            <div><LovComOfCom ref='lp2' reference='lp2' :id='publicationIndexes[1]' /></div>
            <div><LovComOfCom ref='lp3' reference='lp3' :id='publicationIndexes[2]' /></div>
            <div><LovComOfCom ref='lp4' reference='lp4' :id='publicationIndexes[3]' /></div>
            <div><ComPagination ref='pagination' /></div>
        </div>
    </div>
</template>
<style src="./publicationComment.css">
</style>
<script src="./publicationComment.js">
</script>
