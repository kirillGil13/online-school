<template>
    <div class="course-block" @click="$emit('proceed', course.id)">
        <div class="course-video-block" :style="{ backgroundImage: 'url(' + course.cover + ')' }">
            <Rating :rating="course.rating" />
            <div class="course-info duration">{{ course.totalLesson}} уроков</div>
        </div>
        <div class="leader">
            <div class="course-avatar" :style="{ backgroundImage: 'url(' + leaderAvatar + ')' }"></div>
            <span class="desc">{{ leaderFullName }}</span>
        </div>
        <div class="course-title">{{ course.title }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Rating from '@/UI/components/common/Rating.vue';
import {ILeaderCourses} from '@/entity/leaderCourses/leaderCourses.types';

@Component({
    components: {
        Rating,
    },
})
export default class LeaderCourseItem extends Vue {
    @Prop() readonly leaderFullName!: string;
    @Prop() readonly leaderAvatar!: string;
    @Prop() readonly course!: ILeaderCourses;
}
</script>

<style lang="scss">
.course-block {
    .leader {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 8px;
        .course-avatar {
            border: 1px solid rgba(0, 0, 0, 0.04);
            width: 24px;
            height: 24px;
            margin-right: 8px;
            border-radius: 50%;
            background-size: cover;
        }
        .desc {
            color: #060516;
            opacity: 0.6;
            font-size: 12px;
            line-height: 150%;
        }
    }
}
</style>
