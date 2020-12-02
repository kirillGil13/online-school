<template>
  <div class="content center">
    <Form />
  </div>
</template>
<script lang="ts">
import { Component, Model, Vue } from "vue-property-decorator";
import Form from "../components/common/Form.vue";
//import user from '@/store/modules/users';

@Component({
  components: {
    Form,
  },
})
export default class Login extends Vue {
  get user(): any {
      return this.user as any;
  }
}
</script>