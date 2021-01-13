<template>
    <v-col>
        <v-row class="ma-0">
            <ProgressCircleTesting :result="result" />
            <v-col>
                <h3>К сожалению, вы не прошли тестирование.</h3>
                <span class="success_info"
                    >Внимательно пересмотрите видео для того, чтобы повторно пройти тестирование и перейти к следующему
                    уроку</span>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="ma-0 justify-end">
            <Button @submit="$emit('reviewLesson')">Пересмотреть урок</Button>
        </v-row>
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
