<template>
<div class="publiList">
    <LNavBar style="z-index:3"/>
    <ListReactor style="z-index:3" />
    <LReaction style="z-index:3" />
    <LLoading style="z-index:3" />
     <div class="pBLTitle" style="z-index:0">Publications</div>
    <div class="pBLSelection1" style="z-index:0">
        <span>Sort by</span>
        <div>
            <LDropDown :datas='this.$store.state.sortCommentDatas'
            maxHeight = '950%'
            maxWidth  = '200px'
            bdColor = 'solid 1px rgb(210, 210, 210)'
            />
        </div>
    </div>
    <div class="pBLSelection2">
        <div>Latest</div>
        <div>Most Commented</div>
        <div>Funniest</div>
        <div>Last 3 month</div>
    </div>
    <div class="pBLPublication" style="z-index:0">
        <div><LPublication ref='lp1' reference='lp1' :id='publicationIndexes[0]' /></div>
        <div><LPublication ref='lp2' reference='lp2' :id='publicationIndexes[1]' /></div>
        <div><LPublication ref='lp3' reference='lp3' :id='publicationIndexes[2]' /></div>
        <div><LPublication ref='lp4' reference='lp4' :id='publicationIndexes[3]' /></div>
        <div><LPublication ref='lp5' reference='lp5' :id='publicationIndexes[4]' /></div>
        <div><LPublication ref='lp6' reference='lp6' :id='publicationIndexes[5]' /></div>
        <div><LPublication ref='lp7' reference='lp7' :id='publicationIndexes[6]' /></div>
        <div><LPublication ref='lp8' reference='lp8' :id='publicationIndexes[7]' /></div>
    </div>
    <div class="pBLLPagination"><LPagination/></div>
    <LFooter/>
</div>
</template>
<style src="./publiList.css">
</style>
<script src = "./publiList.js">
</script>
