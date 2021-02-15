import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'adaptive',
    store,
    dynamic: true,
})
class AdaptiveModule extends VuexModule {
    isMobile = false;
    isTablet = false;

    @Mutation
    resolveAdaptive(breakpointName: string): void {
        this.isTablet = false;
        this.isMobile = false;
        switch (breakpointName) {
            case 'xs': this.isMobile = true;
            case 'sm': this.isMobile = true;
            case 'md': this.isTablet = true;
        }
    }
}

export const AdaptiveStore = getModule(AdaptiveModule);
