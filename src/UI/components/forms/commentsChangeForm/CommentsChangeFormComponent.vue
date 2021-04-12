<template>
  <v-form class="form" @submit.prevent>
    <div>
      <FormGroup
          v-slot="attrs" :form="form" field="message" show-custom-error
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
    <v-divider class="mt-2"></v-divider>
    <div>
      <Button small class="mr-3" :disabled="form.disabled" @submit="$emit('changeComment')">
        Продолжить
      </Button>
      <Button small class="secondary_blue"  @submit="$emit('closeChange')">
        Отменить
      </Button>
      <div class="red--text mt-1 ml-4" v-if="form.getErrors('0')[0]">{{ form.getErrors('0')[0] }}</div>
    </div>
  </v-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import FormGroup from '../../common/form/FormGroup.vue';
import Button from '../../common/Button.vue';
import {CommentsChangeForm} from '../../../../form/commentsChange/commentsChangeForm';

@Component({
  components: {Button, FormGroup}
})
export default class CommentsChangeFormComponent extends Vue {
  @Prop() readonly form!: CommentsChangeForm;
}
</script>

<style lang="scss">
.captcha {
  color: #828282;
  font-size: 12px;
}
</style>
