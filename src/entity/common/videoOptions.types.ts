export interface IVideoOptions {
    playbackRates: number[];
    autoplay: boolean;
    muted: boolean;
    loop: boolean;
    preload: string;
    language: string;
    aspectRatio: string;
    fluid: boolean;
    hls: boolean;
    poster: string;
    techOrder?: string[];
    cache_: {
        currentTime: number;
    };
    width: number;
    notSupportedMessage: string;
    controlBar: {
        timeDivider: boolean;
        durationDisplay: boolean;
        remainingTimeDisplay: boolean;
        fullscreenToggle: boolean;
        volumePanel: {inline: boolean};
    };
    sources: IVideoOptionsSource[];
}

export interface IVideoOptionsSource {
    type: string;
    src: string;
    youtube?: IVideoOptionsSourceYoutube;
}

export interface IVideoOptionsSourceYoutube {
    iv_load_policy?: number;
    rel?: number;
}

