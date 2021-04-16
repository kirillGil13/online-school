import { Component } from 'vue-property-decorator';
import { Form } from '@/form/form';
import { ReviewsFormRequestType } from './reviewsForm.types';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import { required, requiredIf } from 'vuelidate/lib/validators';

@Component
export class ReviewsForm extends Form {
    @Validate(requiredIf(function (vm): boolean {
        return !vm.isLike
    }), 'Оставьте отзыв')
    public reviewText = '';
    public reviewId: number | null = null;
    @Validate(requiredIf(function (vm): boolean {
        return vm.isLike === null
    }), 'Оставьте отзыв')
    public isLike: boolean | null = null;;
    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): ReviewsFormRequestType {
        return {
            reviewText: this.reviewText,
            review_id: this.reviewId === 0 ? null : this.reviewId,//eslint-disable-line,
            is_like: this.isLike
        };
    }

    setFormData(isLike: boolean): void {
        this.isLike = isLike
    }

    clearData(): void {
        this.reviewText =  '';
        this.reviewId = null;
        this.isLike = null;
    }
}
