<template>
    <v-col>
        <div class="row">
            <ProgressCircleTesting :result="result" />
            <v-col>
                <h3>К сожалению, вы не прошли тестирование.</h3>
                <span class="info"
                    >Внимательно пересмотрите видео для того, чтобы повторно пройти тестирование и перейти к следующему
                    уроку</span
                >
            </v-col>
        </div>
        <v-divider></v-divider>
        <v-col>
            <Button class="with_icon" @submit="$emit('reviewLesson')">Пересмотреть урок</Button>
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
export default class Fail extends Vue {
    @Prop() readonly result!: TestingResult;
}
</script>
