<template>
    <div class ="pComment" :style="{ display:Display }" >
        <div class="pCommentBody">
            <div class="pCTitle">Commenter
                <div class="pCCross" @click="displaying()"><img src="./images/more.svg"/></div>
            </div>
            <div class="pCContainerImg">
               <img id="pCImage" />
            </div>
        </div>
        <div class="pCommentCom">
            <div class="pCPin">
                <label class="pCfileUpload"><image-uploader
                    :debug="1"
                    :maxWidth="512"
                    :maxHeight="512"
                    :autoRotate = true
                    :quality = "1"
                    outputFormat="blob"
                    :preview=false
                    @input="preview"
                ></image-uploader><img src="./images/pin.svg"></label>
            </div>
            <div><textarea v-model="texte"></textarea></div>
            <div @click='sendImage' ><img src="./images/send.svg"/></div>
        </div>
    </div>
</template>
<style src="./pComment.css">
</style>
<script src="./pComment.js">
</script>
