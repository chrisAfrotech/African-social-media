<template>
<section class="inscription">
    <header>
        <img src="@/assets/logo.png"/>
    </header>
    <div class="insMain">
        <form class = "insMainSection" @submit="submiting" action="#">
            <div class = "insTitle">
                <span>Sign up for your account</span>
            </div>
            <div class ="insInput">
                <InputI0 ref="age" placeholder="Age" type = "number" :min=12 :max=130 />
            </div>
            <div class ="insCountry">
                <div>Choose your country</div>
                <div>
                    <vue-country-code
                    @onSelect="countrySelect"
                    >
                    </vue-country-code>
                 </div>
            </div>
            <div class ="insInput insSex">
                <div>Male<input v-model="sex" type = "radio" name="sex" value="male"/></div>
                <div>Female<input v-model="sex" type = "radio" name="sex" value="female"/></div>
            </div>
            <div class ="insInput">
                <InputI0 ref="pseudo" placeholder="Enter your pseudo (description)" type = "text"  pattern="^[a-zA-Z ]{4,22}$"/>
            </div>
            <div class="insLaw">
                <span class ="insPolicy">By signing up, you confirm that you've read and accepted our <span>Terms of Service</span> and <span>Privacy Policy</span>. </span>
            </div>
            <div @click="toNext" class="insButtonI0" ><ButtonI0 message = "next" /></div>
            <div @click="previous" class="insButtonI0" ><ButtonI0 message = "previous" style="margin-top:10px"/></div>
            <div class = "insOR">
                <span class ="insPolicy">OR</span>
            </div>
            <div class="insLast">
                <a href='/login'>Already have an account? Log In</a>
            </div>
        </form>
        <section class = "insSiteLang">
            <DropDownList/>
        </section>
    </div>
    <FooterI/>
</section>
</template>
<script src = "./inscription1.js">
</script>
<style src="./inscription.css">
</style>
<style>
    .insCountry {
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
    .insCountry > div {
        margin:5px ;
    }
    .insCountry span {
        color:white; /* that allowed me to make thecountry codes desapear */
    }
    .insSex {
        display: flex;
        width: 100%;
    }
    .insSex > div {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
