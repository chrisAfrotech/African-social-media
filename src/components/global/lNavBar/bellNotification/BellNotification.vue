<template>
<section draggable="false" class="bellNotification">
    <div class = "notification">
    <div class = "notBtn" href = "#">
        <!--Number supports double digets and automaticly hides itself when there is nothing between divs -->
        <div class="BNbell">
            <div v-if="uncheckedNumb > 0" class = "number"><span>{{ uncheckedNumb }}</span></div>
            <img class="fas fa-bell" src="./bell.svg"/>
        </div>
        <div class = "box">
            <div class = "display">
            <div class = "nothing">
                <i class="fas fa-child stick"></i>
                <div class = "cent">Looks Like your all caught up!</div>
            </div>
            <div class = "cont"><!-- Fold this div and try deleting evrything inbetween -->
                <div v-for="(data, index) in datas"
                :key="index"
                :style="{backgroundColor:bgColor(data.status)}"
                @click="toPublication(data.publication,data.com,data.comOfCom,data.id,index)"
                class = "sec new" >
                    <a href = "#">
                    <div class = "profCont">
                    <img class = "profile" :src="baseUrl + data.image">
                    </div>
                    <div class = "txt"> {{ data.nom }} reacted your post: "{{ data.texte.substr(0,30) }}..."
                       <span v-show = "data.number > 2"> with {{ data.number - 1  }} other person</span>
                    </div>
                    <div class = "txt sub">{{ facebookDate(data.date) }}</div>
                    </a>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>

</section>
</template>
<style src="./bellNotification.css">
</style>
<script src = "./bellNotification.js">
</script>
