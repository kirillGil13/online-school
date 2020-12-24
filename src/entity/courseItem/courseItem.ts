import {CourseItemResponseType, ICourseItem, ICourseLessons} from './courseItem.type';
import {LessonsTypesEnum} from "@/entity/common/lessons.types";

export default class CourseItem implements ICourseItem {
    currentLessonId: number;
    lessons: ICourseLessons[] = [];
    constructor(data: CourseItemResponseType, paramLessonId: string) {
        this.currentLessonId = data.currentLessonId;
        for (let i = 0; i < data.lessons.length; i++) {
            this.lessons.push({
                id: data.lessons[i].id,
                title: data.lessons[i].title,
                available: data.lessons[i].available,
                lessonPassed: data.lessons[i].lessonPassed,
                type(): string{
                    let type = '';
                    if(data.lessons[i].lessonPassed) {
                        type = LessonsTypesEnum.DONE;
                    } else if(!data.lessons[i].lessonPassed && data.lessons[i].available) {
                        type = LessonsTypesEnum.UN_DONE;
                    } else
                        type = LessonsTypesEnum.LOCKED;
                    if(data.lessons[i].available && i.toString() === paramLessonId) {
                        type = LessonsTypesEnum.IN_PROGRESS;
                    }
                    return type;
                }
            })
            /*if(this.lessons[i].lessonPassed) {
                this.lessons[i].type = LessonsTypesEnum.DONE;
            } else if(!this.lessons[i].lessonPassed && this.lessons[i].available) {
                this.lessons[i].type = LessonsTypesEnum.UN_DONE;
            } else if(!this.lessons[i].lessonPassed && this.lessons[i].available && i.toString() === pathParam) {
                this.lessons[i].type = LessonsTypesEnum.IN_PROGRESS;
            } else
                this.lessons[i].type = LessonsTypesEnum.LOCKED;*/
        }
    }
}