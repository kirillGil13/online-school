import { Intercom } from '@mathieustan/vue-intercom';
import {IUser} from '@/entity/user';

const appId = 'sbqnz5ar';

const intercom = new Intercom({ appId });

function rebootIntercom(user: IUser): void {
    intercom.shutdown();

    if (intercom.isBooted) return;
    intercom.boot({
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_id: user.id,
        name: user.fullName,
        email: user.email,
    });
}

export function startIntercomMessenger (user: IUser): void {
    if (!intercom.ready) {
        intercom.once('ready', () => rebootIntercom(user));
    } else {
        rebootIntercom(user);
    }
}
