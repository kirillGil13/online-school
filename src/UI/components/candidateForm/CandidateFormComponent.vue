<template>
  <v-col class="pa-6 d-flex justify-center flex-column candidate_form">
    <h1 class="mx-auto my-0">Создать кандидата</h1>
    <FormGroup
        :messages="form.messages.name"
        :server-errors="form.getErrors('code')"
        :validator="form.$v.name"
        class="mt-6"
    >
      <template v-slot:label>
        <label for="name">Имя *</label>
      </template>
      <template v-slot:input="{attrs}">
        <input
            class="input input__normal"
            type="name" name="name"
            id="name"
            @input="form.$v.name.$touch()"
            v-model="form.name"
            v-bind="attrs"
        >
      </template>
    </FormGroup>
    <FormGroup
        class="mt-4"
        :messages="form.messages.phone"
        :server-errors="form.getErrors('phone')"
        :validator="form.$v.phone"
    >
      <template v-slot:label>
        <label for="phone">Номер телефона *</label>
      </template>
      <template v-slot:input="{attrs}">
        <PhoneMaskInput
            v-model="form.phone"
            v-bind="attrs"
            autoDetectCountry
            showFlag
            id="phone"
            inputClass="input"
            wrapperClass="wrapper"
            flagSize="normal"
        />
      </template>
    </FormGroup>
    <FormGroup
        class="mt-4"
        :messages="form.messages.email"
        :server-errors="form.getErrors('code')"
        :validator="form.$v.email"
    >
      <template v-slot:label>
        <label for="email">Email</label>
      </template>
      <template v-slot:input="{attrs}">
        <input
            class="input input__normal"
            type="email" name="email"
            id="email"
            @input="form.$v.email.$touch()"
            v-model="form.email"
            v-bind="attrs"
        >
      </template>
    </FormGroup>
    <FormGroup class="mt-4">
      <template v-slot:label>
        <label>Продукт</label>
      </template>
      <template v-slot:input="{attrs}">
        <v-select
            :items="form.productList"
            v-model="form.product"
            id="product"
            :menu-props="{ left: true}"
            v-bind="attrs"
            class="select"
            flat
            dense
            hide-details
            solo
        >
        </v-select>
      </template>
    </FormGroup>
    <FormGroup class="mt-4">
      <template v-slot:label>
        <label>Статус</label>
      </template>
      <template v-slot:input="{attrs}">
        <v-select
            :items="form.statusList"
            v-model="form.status"
            id="status"
            :menu-props="{ left: true}"
            v-bind="attrs"
            class="select"
            flat
            dense
            hide-details
            solo
        >
        </v-select>
      </template>
    </FormGroup>
    <div class="d-flex flex-row justify-space-between mt-2">
      <Button class="secondary_blue mr-3" @submit="$emit('close')">Отмена</Button>
      <Button :disabled="form.$v.$invalid" @submit="$emit('add')">Добавить кандидата</Button>
    </div>
  </v-col>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {CandidateForm} from '@/form/candidate/candidateForm';
import Button from '@/UI/components/common/Button.vue';
import FormGroup from '@/UI/components/common/form/FormGroup.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
@Component({
  components: {FormGroup, Button, PhoneMaskInput}
})
export default class CandidateFormComponent extends Vue {
  @Prop() readonly form!: CandidateForm;

  constructor() {
    super();
    this.form.status = this.form.statusList[0];
    this.form.product = this.form.productList[0];
  }
}
</script>

<style lang="scss">
.candidate_form {
  .select {
    border: 1px solid #f2f2f2 !important;
    padding: 4px !important;
    font-size: 14px !important;
  }
  button {
    width: 50%;
  }
}


</style>