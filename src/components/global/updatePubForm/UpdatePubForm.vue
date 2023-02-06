<template>
<section class="lPblicationForm" :style="{ display:Display }" >
    <div class="lPBFCTitle">Update profile
        <div class="lPBFCCross" @click="displaying()"><img src="./more.svg"/></div>
    </div>
    <div class="lPBFCBody">
            <div class="lPBFCType"></div>
            <div>Description</div>
            <div><textarea v-model="description" placeholder="Votre description (aucunes modifications) "></textarea></div>
            <div class ="upFImage"> Mettre à jour Photo de profile {{ noModif['profile'] }}
            <label class="custom-file-upload">
                <image-uploader
                    ref='profile'
                    :debug="1"
                    :maxWidth="612"
                    :maxHeight="612"
                    :autoRotate = true
                    :quality = "1"
                    outputFormat="blob"
                    :preview=false
                    @input="previewProfile"
                ></image-uploader><img src="./photo.svg"></label>
                <div style="display:none">
                    <image-uploader
                        ref='profileSmall'
                        :debug="1"
                        :maxWidth="100"
                        :maxHeight="100"
                        :autoRotate = true
                        :quality = "1"
                        outputFormat="blob"
                        :preview=false
                        @input="previewProfileSmall"
                    ></image-uploader>
                </div>
            <img id="upFprofile" />
            </div>
            <div class ="upFImage"> Mettre à jour Photo de couverture {{ noModif['cover'] }}
            <label class="custom-file-upload">
                    <image-uploader
                    :debug="1"
                    :maxWidth="700"
                    :maxHeight="700"
                    :autoRotate = true
                    :quality = "1"
                    outputFormat="blob"
                    :preview=false
                    @input="previewCover"
                ></image-uploader><img src="./photo.svg"></label>
            <img id="upFcover" />
            </div>
            <div class="upFSend" @click="sendImages" >Publier</div>
            <div class="upFSend" @click='cancel' >Annuler</div>
    </div>
</section>
</template>
<style src="./updatePubForm.css">
</style>
<script src = "./updatePubForm.js">
</script>
