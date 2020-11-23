<template>
    <div class="loginStepTwo">
        <div class="content">
                <form class="form">
                    <h1>ONELINKS.com</h1>
                    <span>Подтвердите номер телефона {{tel}} введите код из СМС</span>
                    <label for="tel">Код из СМС</label>
                    <input v-model="code" @blur="isCodeTouched = true" id="code" name="code" type="text" placeholder="Введите код в это поле">
                    <div v-if="isCodeError" class="error-label">
                    Код введен неверно
                    </div>
                    <button :disabled="isCodeValid" @click="login" class="form-button">Продолжить</button>
                </form>
            </div>
    </div>
</template>
<script>
export default {
    name: 'loginStepTwo',
    props:['tel'],
    data(){
        return{
            code: null,
            isCodeTouched: false,
            isCodeValid: false,
            isCodeError: false
        }
    },
    methods: {
        login(){
            this.$router.push('/main')
        }
    },
}
</script>