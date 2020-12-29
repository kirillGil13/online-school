/**/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const NODE_ENV = process.env.NODE_ENV === 'development' ? 'development' : 'production';
module.exports = {
    //...
    css: {
        extract: NODE_ENV === 'development',
        loaderOptions: {
            sass: {
                additionalData: `@import "@/UI/assets/scss/env-${NODE_ENV}.scss";`,
            },
        },
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, 'src/UI/assets/scss/const/const.scss'),
                path.resolve(__dirname, 'src/styles/_mixins.scss'),
            ],
        },
    },
};
