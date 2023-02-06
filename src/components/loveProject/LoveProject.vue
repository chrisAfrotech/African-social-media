<template>
<section class="main">
        <LNavBar style="z-index:3"/>
        <ListReactor style="z-index:3" />
        <LReaction style="z-index:3" />
        <LPblicationForm style="z-index:3;" ref='publiForm'/>
        <LLoading style="z-index:3" />
        <LPublication1 publication_type="FOOTBALL"/>
        <div class="publish">
                <div @click="publiFormDisplaying">
                        <span>PUBLIER UN ARTICLE</span>
                </div>
        </div>
        <h2>News</h2>
        <div class="pubClass" style="z-index:1">
                <div class="publications">
                        <div><LPublication ref='lp1' reference='lp1' :id='publicationIndexes[0]' /></div>
                        <div><LPublication ref='lp2' reference='lp2' :id='publicationIndexes[1]' /></div>
                        <div><LPublication ref='lp3' reference='lp3' :id='publicationIndexes[2]' /></div>
                        <div><LPublication ref='lp4' reference='lp4' :id='publicationIndexes[3]' /></div>
                        <div><LPublication ref='lp5' reference='lp5' :id='publicationIndexes[4]' /></div>
                        <div><LPublication ref='lp6' reference='lp6' :id='publicationIndexes[5]' /></div>
                        <div><LPublication ref='lp7' reference='lp7' :id='publicationIndexes[6]' /></div>
                        <div><LPublication ref='lp8' reference='lp8' :id='publicationIndexes[7]' /></div>
                </div>
                <div class="sliderClass">
                        <div @click="toPubliList" class="seeAll">SEE ALL NEWS</div>
                        <LPagination />
                </div>
                <div class="secondZone">
                        <div class="secondFirst">
                                <div class="secondVoid"></div>
                                <div><BestStat/></div>
                        </div>
                        <div><LRanking/></div>
                </div>
        </div>
        <div class="prefooter1">
        </div>
        <LFooter/>
</section>
</template>
<style src="./loveProject.css">
</style>
<script src = "./loveProject.js">
</script>
