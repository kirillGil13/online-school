<template>
  <v-form class="form" @submit.prevent>
    <h5>ЗАДАНИЕ</h5>
    <v-divider class="my-4 test-form-divider"></v-divider>
    <TextHide :text="form.question" :style="{fontSize: '16px'}"/>
    <v-divider class="my-4 test-form-divider"></v-divider>
    <template v-if="!form.passed">
      <div>
        <FormGroup
            v-slot="attrs" :form="form" field="answer" label="Решение" show-custom-error
        >
            <textarea
                rows="6"
                class="input input__normal text-area"
                v-model="form[attrs.name]"
                v-bind="attrs"
                @input="attrs.change"
            ></textarea>
        </FormGroup>
      </div>
      <div>
        <Button small type="submit" :disabled="form.disabled" @submit="$emit('sendFreeTest')">Отправить
        </Button>
        <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
      </div>
    </template>
    <div class="task-done d-flex" :class="[$adaptive.isMobile ? 'flex-column' : 'justify-space-between']" v-else>
      <div>
        Вы выполнили домашнее задание
      </div>
      <div>
        <span @click="$emit('showForm')">Посмотреть <svg-icon name="Arrow_Right"></svg-icon></span>
      </div>
    </div>
  </v-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import FormGroup from '../../common/form/FormGroup.vue';
import Button from '../../common/Button.vue';
import PhoneMaskInput from 'vue-phone-mask-input';
import {FreeTestForm} from '../../../../form/freeTest/freeTestForm';
import TextHide from '../../common/TextHide.vue';

@Component({
  components: {TextHide, Button, FormGroup, PhoneMaskInput}
})
export default class FreeTestFormComponent extends Vue {
  @Prop({required: true}) readonly form!: FreeTestForm;
}
</script>

<style lang="scss">
.captcha {
  color: #828282;
  font-size: 12px;
}

.task {
  width: 100%;
  font-size: 16px;
  white-space: pre-wrap;
}

.task-done {
  color: #5F739C;

  span {
    color: #426DF6;
    font-size: 14px;
    cursor: pointer;

    svg {
      path {
        fill: #99A2AD;
      }
    }
  }
}
.test-form-divider {
  border-color: #f2f2f2 !important;
}

</style>
