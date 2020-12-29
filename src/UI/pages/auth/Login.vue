<template>
    <div class="content center">
        <v-form class="form" @submit.prevent="submit">
            <div class="pa-6">
                <h1 class="mb-36">ONELINKS.COM</h1>
                <div class="my-9">
                    <FormGroup
                        v-if="!form.codeStep"
                        :messages="form.messages.phone"
                        :server-errors="form.getErrors('phone')"
                        :validator="form.$v.phone"
                    >
                        <v-text-field
                            slot-scope="{ attrs }"
                            v-model="form.phone"
                            v-bind="attrs"
                            autocomplete="off"
                            label="Номер телефона"
                            name="phone"
                            outlined
                            placeholder="Введите номер телефона"
                            @input="form.$v.phone.$touch()"
                        />
                    </FormGroup>

                    <FormGroup
                        v-else
                        :messages="form.messages.code"
                        :server-errors="form.getErrors('code')"
                        :validator="form.$v.code"
                    >
                        <v-text-field
                            slot-scope="{ attrs }"
                            v-model="form.code"
                            v-bind="attrs"
                            autocomplete="off"
                            label="Код подтверждения"
                            name="code"
                            outlined
                            placeholder="Введите код подтверждения"
                            @input="form.$v.code.$touch()"
                        />
                    </FormGroup>
                </div>
                <div>
                    <v-btn :disabled="form.$v.$invalid" block class="v-btn_primary v-btn_big" type="submit">
                        Продолжить
                    </v-btn>
                </div>
            </div>
        </v-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginFormVue from '../../components/auth/LoginForm.vue';
import CodeFormVue from '../../components/auth/CodeForm.vue';
import { LoginForm } from '@/form/login/LoginForm';
//import user from '@/store/modules/users';
import Profile from '../Profile.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import Button from '@/UI/components/common/Button.vue';
import { AuthStore } from '@/store/modules/Auth';

@Component({
    components: {
        Button,
        FormGroup,
        LoginFormVue,
        CodeFormVue,
        Profile,
    },
})
export default class Login extends Vue {
    form = new LoginForm();

    submit(): boolean {
        if (this.form.codeStep) {
            AuthStore.login(this.form.getFormData());
        } else {
            // AuthStore.getTwofaCode(this.form.phone);
            this.form.codeStep = true;
        }

        return false;
    }
}
</script>
