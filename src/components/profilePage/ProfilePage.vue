<template>
    <div class ="profilePage" >
        <LNavBar style="z-index:1"/>
        <ListReactor style="z-index:3" />
        <UpdatePubForm ref="form" style="z-index:3" />
        <LReaction  style="z-index:3" />
         <LLoading style="z-index:3" />
        <div class ="pPageHeader" :style="{backgroundImage: 'url(' + this.$store.state.baseUrl + photo_couverture +')'}" >
            <div class ="pPagePhoto">
                <img :src ="this.$store.state.baseUrl + photo_profile">
            </div>
            <div class = "pPageInfo" id = "pPageInfo1">
                <div class="pPageName">{{ nom }}</div>
                <div><div>Surname</div><span>{{ prenom }}</span></div>
                <div><div>Age</div><span>{{ age }} ans</span></div>
                <div><div>pays</div><span>{{ nation }}</span></div>
                <div><div>genre</div><span>{{ sexe }}</span></div>
            </div>
        </div>
        <div class = "pPageInfo">
            <div class="pPageName">{{ nom }}</div>
            <div><div>Surname</div><span>{{ prenom }}</span></div>
            <div><div>Age</div><span>{{ age }} ans</span></div>
            <div><div>pays</div><span>{{ nation }}</span></div>
            <div><div>genre</div><span>{{ sexe }}</span></div>
        </div>
        <div>
            <div class="pPageProfile">
                <img :src="this.$store.state.baseUrl + photo_profile"/>
            </div>
            <div>
                {{ pseudo }}
            </div>
        </div>
        <div @click="displayForm" :style="{ display:DisplayModifier }" class="pPageModifProfil"><span>Modifier profile</span></div>
        <div class="pPageStats">
            <div class="pPageDropDown"></div>
            <div>
                <span class="pPageFieldName">FIELD NAME</span>
                <span class ="aa" >TOTAL</span>
                <span class ="aa">NbrePUB</span>
                <span class ="aa">PTS/PUB </span>
            </div>
            <div class="pPageStatTable">
                <div v-for="(field, index) in datas" :key="index" class="pPageElementField" :style="{backgroundColor:fieldBgColor(index)}">
                    <div class="pPageElementChild1">
                        <div> {{ index +1 }} </div>
                        <div><img v-bind:src="require('@/assets/publiType/'+ field.type +'.svg')"></div>
                        <div> {{ field.type }}</div>
                    </div>
                    <span>{{ field.total }}</span>
                    <span>{{ field.published }}</span>
                    <span>{{ (field.total/notZero(field.published)).toFixed(2) }}</span>
                </div>
            </div>
        </div>
        <div class="pPagePublication">
            <div>
                <LDropDown
                :datas='this.$store.state.PPDatas'
                 maxHeight = '250%'
                 maxWidth  = '200px'
                />
            </div>
            <div class="pPagePbTitle">
                Publications {{ publicationSort }} {{ nom.toUpperCase() }}
            </div>
            <div>
                <div><LPublication ref='lp1' reference='lp1' :id='publicationIndexes[0]' /></div>
                <div><LPublication ref='lp2' reference='lp2' :id='publicationIndexes[1]' /></div>
                <div><LPublication ref='lp3' reference='lp3' :id='publicationIndexes[2]' /></div>
                <div><LPublication ref='lp4' reference='lp4' :id='publicationIndexes[3]' /></div>
                <div class="pPagePagination"><UserPagination/></div>
            </div>
        </div>
        <LFooter/>
    </div>
</template>
<script src="./profilePage.js">
</script>
<style src="./profilePage.css">
</style>
