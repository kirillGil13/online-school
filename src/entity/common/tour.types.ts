export interface ITourSteps {
    target: string;
    header?: {
        title: string;
    };
    content: string;
    params?: {
        placement: string;
    };
}

export interface ITourOptions {
    useKeyboardNavigation: boolean;
    labels: {
        buttonSkip: string;
        buttonPrevious: string;
        buttonNext: string;
        buttonStop: string;
    };
}
