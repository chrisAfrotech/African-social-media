<template>
    <div class ="lRanking">
        <div class ="lraHeader">
            <div class="lraHeaderH">STANDING</div>
            <div class="lraOption">
                <div class="lraTotal">TOTAL</div>
                <div>
                    <select v-model = "selected" class="lraSelect">
                        <option v-for="(types, index) in types" :key ="index"> {{ types }}</option>
                    </select>
                </div>
                <div>MORE</div>
            </div>
        </div>
        <div class="lraElements">
            <div id ="lraInfo" class="lraElement">
                <div class="lraRanking">R</div>
                <div><img/></div>
                <div id = "lraInfoName"> NAME</div>
                <div>P</div>
                <div>N</div>
            </div>
            <div v-for="(data, index) in datas" :key="index" class="lraElement" :style="{backgroundColor:bgColor(index), borderColor:bdColor(index)}">
                <div class="lraRanking">{{ index+1 }}</div>
                <div><img :src='baseUrl + data.image'/></div>
                <div @click="toProfile(data.id)"> {{ data.nom + ' ' + data.prenom  }}</div>
                <div>{{ data.point }}</div>
                <div>{{ data.numberPublished }}</div>
            </div>
        </div>
        <div class="lraMore">
            SEE THE COMPLETE STANDING
        </div>
    </div>
</template>
<style src="./lRanking.css">
</style>
<script src="./lRanking.js">
</script>
