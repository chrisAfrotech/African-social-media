<template>
    <div class="lNavBar">
      <div class="lnavWhite">
        <div class="lnavSign">
          <div><span>taime</span> 7parsKeJe</div>
          <div><span>fait</span> keglejuste</div>
          <div><span>fait</span> toutceciest </div>
        </div>
        <div>
          <div class="navBellN"><BellNotification/></div>
          <div class="navlDropDown"><LDropDown :datas="this.$store.state.langDatas" bdColor="solid 1px rgb(136, 139, 141)" maxHeight="330%" style="font-size:12px" /></div>
          <div @click="toProfile"><img src="./profile_black.svg"/>Log in</div>
        </div>
      </div>
      <div style="display:none;" class="navCollapse">
        <div class="navLeftElment">
          <div><ButtonA1 message="Videos"/></div>
          <div><ButtonA11 message="News"/></div>
          <div><ButtonA12 message="Statistics"/></div>
          <div><ButtonA13 message="Photos"/></div>
        </div>
        <div class="navLogo"><img src="@/assets/logo.png"/></div>
       <div class="navR">
          <div><ButtonA1 message="Videos"/></div>
          <div><ButtonA11 message="News"/></div>
          <div><ButtonA12 message="Statistics"/></div>
          <div><ButtonA13 message="Photos"/></div>
        </div>
      </div>
      <div class="navRemains">
        <div class="navMenuButton">
          <MenuButton @click="cross" />
        </div>
        <div class="navLogo2">
            <div><img src="@/assets/textLogo.png"/></div>
        </div>
        <div class="navBar2right">
          <div class="navLang">
            <BellNotificationSmall/>
          </div>
        </div>
      </div>
      <div class="navDropDown" :style="{height:vheight, paddingTop:ptop}">
        <div><div class=navDt><LDropDown :datas="this.$store.state.langDatas" style="color:rgb(40,40,40); font-size:12px" maxHeight="330%"/></div><div><img src="./next.svg"/></div></div>
        <div><div @click="toAccueil" class=navDt>Accueil</div><div><img src="./next.svg"/></div></div>
        <div><div @click="toProfile" class=navDt>Mon Profile</div><div><img src="./next.svg"/></div></div>
        <div><div @click="toPubliList" class=navDt>News</div><div><img src="./next.svg"/></div></div>
        <div><div @click="toPubliList" class=navDt>Liste Publications</div><div><img src="./next.svg"/></div></div>
      </div>
    </div>
</template>
<style src="./lNavBar.css">
</style>
<script src = "./lNavBar.js">
</script>
