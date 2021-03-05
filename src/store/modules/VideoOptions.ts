import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

@Module({
    namespaced: true,
    name: 'options',
    store,
    dynamic: true,
})
class VideoOptionsModule extends VuexModule {
    options = {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        hls: true,
        poster: '',
        width: document.documentElement.clientWidth, // Player width
        notSupportedMessage: 'This video cannot be played for the time being. Please try again later.',
        controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true,
            volumePanel: {inline: false}
        },
        sources: [
            {
                type: 'application/x-mpegURL',
                src: '',
            }
        ],
    };

    @Mutation
    handleVideo(data: {src: string; poster: string}): void {
        this.options.sources[0].src = data.src;
        this.options.poster = data.poster;
    }
}

export const VideoOptionsStore = getModule(VideoOptionsModule);
