import { Intercom } from '@mathieustan/vue-intercom';
import {IUser} from '@/entity/user';

const appId = 'sbqnz5ar';

const intercom = new Intercom({ appId });

function rebootIntercom(user?: IUser): void {
    intercom.shutdown();

    if (intercom.isBooted) return;
    if (user) {
        intercom.boot({
            // eslint-disable-next-line @typescript-eslint/camelcase
            user_id: user.id,
            name: user.name,
            email: user.email,
        });
    } else intercom.boot();

}

export const startIntercomMessenger =  (user?: IUser): void => {
    if (user) {
        if (!intercom.ready) {
            intercom.once('ready', () => rebootIntercom(user));
        } else {
            rebootIntercom(user);
        }
    } else {
        if (!intercom.ready) {
            intercom.once('ready', () => rebootIntercom());
        } else {
            rebootIntercom();
        }
    }

}
