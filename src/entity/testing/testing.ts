import {ITesting, ITestingQuestions, TestingResponseType} from './testing.types';

export default class Testing implements ITesting{
    id: number;
    homeworkType: string;
    lessonId: number;
    question: string;
    tests: ITestingQuestions[] = [];
    constructor(data: TestingResponseType) {
        this.id = data.id;
        this.question = this.resolveQuestion(data.question);
        this.homeworkType = data.homeworkType;
        this.lessonId = data.lessonId;
        if (data.tests) {
            for(let i = 0; i < data.tests.length; i++) {
                this.tests.push(data.tests[i]);
            }
        }
    }

    urlRegex = /([^\s]+\.(com|ru|net|рф|info|org|me|by|biz|pro|travel|tel|name|art|dev|online)[\S]*)/g;
    httpRegex = /https?:\/\//;

    resolveQuestion(s: string): string {
        return s.replace(this.urlRegex, (url) => {
            const startsWithHttp = url.startsWith('http');
            if (this.httpRegex.test(url) && !startsWithHttp) return url;
            const url2 = startsWithHttp ? url : `https://${url}`;
            return `<a class="desc_link" target="_blank" href="${url2}">${url}</a>`;
        });
    }
}
