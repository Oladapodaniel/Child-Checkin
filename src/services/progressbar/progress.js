// import { NProgress } from "nprogress";
const NProgress = require('nprogress')
const finish = () => {
    /*eslint no-undef: "warn"*/
    // NProgress.start();
    NProgress.done();
}

export default finish;