<template>
    <v-row>
        <v-col class="profile__col" cols="12">
            <div class="grid-conten bg-purple"></div>
        </v-col>
    </v-row>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ProfileSubscribe extends Vue {}
</script>

<style lang="scss" scoped>
.grid-conten {
    min-height: 32px;
}
.bg-purple {
    background: #d3dce6;
}
</style>
