<template>
  <div class="login_page">
    <Form />
  </div>
</template>
<script lang="ts">
import { IUserModule } from '@/store/modules/users/users.types';
import { Component, Model, Vue } from "vue-property-decorator";
import Form from "../components/common/Form.vue";
//import user from '@/store/modules/users';

@Component({
  components: {
    Form,
  },
})
export default class Login extends Vue {
  get user(): IUserModule {
      return this.user as IUserModule;
  }
}
</script>