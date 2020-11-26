/**/
const NODE_ENV = process.env.NODE_ENV === 'development'
    ? 'development'
    : 'production';
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
    };