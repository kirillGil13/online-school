import {helpers} from 'vuelidate/lib/validators';

export const less = (less: any): any =>
    helpers.withParams({ type: 'less', param: less }, function(value: any, parentVm: any) {
        // @ts-ignore
        return +value <= +helpers.ref(less, this, parentVm);
    })
