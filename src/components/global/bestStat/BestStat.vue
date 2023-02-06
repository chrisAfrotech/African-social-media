<template>
    <div class ="bestStat">
        <div style="display:none" class="bsBlueBand"><div class="bsBlueBand1"></div><div></div></div>
        <div style="display:none" class="bsYellowBand"></div>
        <div class="bsHeader">
            <div class="bsWinner"><img src="./winner.svg"/></div><div>The Best</div>
        </div>
        <div class="bsBody">
            <div style="display:none" class="bsUseless">
                <div class="bsLogo">@Mylogo</div>
                <div class="bsThreeButton">
                    <div class="bsTFirst"><span>i made it</span></div>
                    <div><span>just for you</span></div>
                    <div><span>my dear love</span></div>
                </div>
            </div>
            <div class="bsStats">
                   <div v-for="(type, index) in types1" :key ="index"><LProfileCard :type = type /></div>
            </div>
            <div class="bsStats">
                   <div v-for="(type, index) in types2" :key ="index"><LProfileCard :type = type /></div>
            </div>
            <div class="bsBottom">
                <Slider tsRotate="rotate(180deg)" vopacity="0.5" style="margin-right:1px" /><Slider/>
            </div>
        </div>
    </div>
</template>
<style src="./bestStat.css">
</style>
<script src="./bestStat.js">
</script>
