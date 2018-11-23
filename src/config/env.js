/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = "";
// let routerMode = 'hash';
let routerMode = "history";
let imgBaseUrl;

if (process.env.NODE_ENV == "development") {
  // baseUrl = 'http://adotest2.keda-digital.com';

  baseUrl = "http://www.adxsystem.com:8088/";
} else if (process.env.NODE_ENV == "production") {
  baseUrl = "http://adotest8086.keda-digital.com:8086"; // 生产测试
  //baseUrl = 'http://sspdata.keda-u.com:8086';// 生产测试
}

export { baseUrl, routerMode, imgBaseUrl };
