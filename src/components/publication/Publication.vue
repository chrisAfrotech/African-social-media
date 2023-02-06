<template>
    <div class ="publication">
        <ListReactor style="z-index:3" />
        <LReaction style="z-index:3" />
        <div class ="pBody" style="z-index:0" >
            <ListReactorCom style="z-index:3" />
            <LLoading style="z-index:4; background-color: transparent" />
            <div class="pInfo">
                <div class = "pPubTypeOfPub">
                    {{ publication_type }}
                </div>
                <div :style="{display: DisplayImg}" class="pImage"><img :src="publication_img"></div>
                <div class="pTitle">{{ publication_title }}</div>
                <div class="pText">{{ publication_text }}</div>
                <div class="pAuthor">
                    <div class="pBy">
                        <div style="cursor:pointer;" @click="toProfile" class="pNameZone">
                            <div class="pAthName">Par {{ publication_author }}</div>
                            <div class="pDate">{{ facebookDate(publication_date) }}</div>
                        </div>
                        <div class="pProfile"><img :src="auth_img"/></div>
                    </div>
                </div>
            </div>
            <div class="pStats">
                <div class="pStatsFirst">
                    <div class="pReactLogo">
                        <div @click="reactEmit">
                            <img v-bind:src="require('./emoticones/'+  react + '.svg')"/>
                            <PReaction ref='pReaction' reference='pReaction'/>
                        </div>
                        <span @click="lsReactEmit">{{publication_point}}</span>
                    </div>
                    <div @click="commenterPubEmit"><div><img src="./images/com.svg"/></div> {{publi_numb_com}} </div>
                </div>
                <div style="display:none;" >
                    <div class="debateWinner">
                        <div class="debateWinnerImage"><img src=""/></div>
                        <div>100</div>
                        <div><img src="./images/gold_medal.svg"/></div>
                    </div>
                </div>
            </div>
            <div class ="pCom">
                <div class="pComHighlight">Comments </div>
                <div class="pSort">Sort by <div>
                        <LDropDown
                            style="z-index:1" :datas='this.$store.state.sortCommentDatas'
                            maxHeight = '950%'
                            maxWidth  = '200px'
                            bdColor = 'solid 1px rgb(210, 210, 210)'
                        />
                        </div>
                </div>
                <div class="pCommentZone">
                    <LovComment ref="lp1" reference='lp1' :id='publicationIndexes[0]' />
                    <LovComment ref="lp2" reference='lp2' :id='publicationIndexes[1]' />
                    <LovComment ref="lp3" reference='lp3' :id='publicationIndexes[2]'/>
                    <LovComment ref="lp4" reference='lp4' :id='publicationIndexes[3]'/>
                    <PubPagination/>
                </div>
            </div>
            <div>
                <LNavBar style="z-index:1" />
                <PComment style="z-index:3"/>
                <PublicationComment ref="pubCom" reference='pubCom' style="z-index:2" />
            </div>
        </div>
        <LFooter/>
    </div>
</template>
<style src="./publication.css">
</style>
<script src="./publication.js">
</script>
