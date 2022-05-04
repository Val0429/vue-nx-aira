module.exports = {
    prodMode: process.env.NODE_ENV === 'production',

    title: 'Val Co.',
    port: 8080,
    https: false,
    autoOpen: false,
    historyApiFallback: true,

    showNonePermissionBlock: true
}

// export interface Config {
//     prodMode: boolean;
//
//     title: string;
//     port: number;
//     https: boolean;
//     autoOpen: boolean;
//     historyApiFallback: boolean;
//
//     showNonePermissionBlock: boolean;
// }