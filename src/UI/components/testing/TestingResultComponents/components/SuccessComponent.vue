<template>
    <v-col>
        <div class="row">
            <ProgressCircleTesting :result="result" />
            <v-col>
                <h3>Поздравляем - вы выполнили задание!</h3>
                <span class="info">Теперь вы можете перейти к следующему уроку.</span>
            </v-col>
        </div>
        <v-divider></v-divider>
        <v-col>
            <Button class="with_icon" @sumbit="$emit('moveToNextLesson')">
                <svg-icon class="svg next" name="Next"></svg-icon>Перейти к следующему уроку
            </Button>
            <Button class="with_icon secondary" @submit="$emit('reviewLesson')">
                <svg-icon class="svg" name="Return"></svg-icon>Пересмотреть урок
            </Button>
        </v-col>
    </v-col>
</template>
<script lang="ts">
import TestingResult from '@/entity/testingResult/testingResult';
import ProgressCircleTesting from '@/UI/components/progress/ProgressCircleTesting.vue';
import Button from '@/UI/components/common/Button.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {
        ProgressCircleTesting,
        Button,
    },
})
export default class Success extends Vue {
    @Prop() readonly result!: TestingResult;
}
</script>
