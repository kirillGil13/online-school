/**/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const NODE_ENV = process.env.NODE_ENV === 'development' ? 'development' : 'production';
module.exports = {
    lintOnSave: true,
    transpileDependencies: ['vuetify'],
    css: {
        extract: NODE_ENV === 'development',
        loaderOptions: {
            scss: {
                additionalData: `@import "@/UI/assets/scss/env-${NODE_ENV}.scss";`,
            },
        },
    },
};
