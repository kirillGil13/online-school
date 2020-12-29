// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import moment from 'moment';
import 'moment/locale/ru';

moment.updateLocale('ru', {
    durationLabelsStandard: {
        s: 'секунду',
        ss: 'секунды',
        sss: 'секунд',
        m: 'минуту',
        mm: 'минуты',
        mmm: 'минут',
        h: 'час',
        hh: 'часа',
        hhh: 'часов',
        d: 'день',
        dd: 'дня',
        ddd: 'дней',
        w: 'неделя',
        ww: 'недели',
        www: 'недель',
        M: 'месяц',
        MM: 'месяца',
        MMM: 'месяцев',
        y: 'год',
        yy: 'года',
        yyy: 'лет',
    },
    durationPluralKey: function (token, integerValue) {
        return integerValue % 10 === 1 && integerValue % 100 !== 11
            ? token
            : integerValue % 10 >= 2 && integerValue % 10 <= 4 && (integerValue % 100 < 10 || integerValue % 100 >= 20)
            ? token + token
            : token + token + token;
    },
});
