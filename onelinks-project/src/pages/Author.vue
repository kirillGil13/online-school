<template>
    <div class="author">
        <div class="container">
            <div v-if="!showStepTwo" class="content">
                <form class="form">
                    <h1>ONELINKS.com</h1>
                    <label for="tel">Номер телефона</label>
                    <input v-model="tel" @blur="isTelTouched = true" id="tel" name="tel" type="text" placeholder="+7">
                    <div v-if="isTelError" class="error-label">
                    Введите корректный номер
                    </div>
                    <button :disabled="!isTelValid" @click="showStepTwo = true" class="form-button">Продолжить</button>
                </form>
            </div>
            <template v-if="showStepTwo">
                <LoginStepTwo
                :tel='tel'
                />
            </template>
        </div>
    </div>
</template>
<script>
import LoginStepTwo from '../components/LoginStepTwo';
export default {
    name: 'author',
    components: {
        LoginStepTwo
    },
    data() {
        return {
            tel:'+7',
            isTelTouched:false,
            telChanged:null,
            showStepTwo: false,
        }
    },
    methods: {
        login(){
            console.log(this.tel1);
        }
    },
    watch: {
        tel: function(){
            this.telChanged = this.tel.split('').slice(1).join('');
            if(this.tel[0] != '+' || this.tel[1] != '7' ){
                this.tel='+7';
            }
        }
    },
    computed: {
        isTelValid(){
            return /^[0-9]+$/.test(this.telChanged) && this.telChanged.length == 11;
        },
        isTelError(){
            return !this.isTelValid && this.isTelTouched;
        }
    },
}
</script>