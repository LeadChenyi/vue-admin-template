/**
 * 七器合一
 * Author：Chenyi 2021/9/16
 * 按系列区分模块 
 *      Generator   生成器  （生成资源、数据）按需或随机生成资源或数据
 *      Filtrator   过滤器  （过滤数据）不改变原始数据和数据类型，返回原始数据中的部分数据
 *      Refactor    重构器  （重构数据）改变原始数据，不改变数据类型，返回重组后的数据
 *      Validator   验证器  （数据验证）
 *      Translator  转换器  （数据转换）
 *      Selector    选择器  （元素查询选择方法）
 *      Functor     功能器  （辅助功能方法）
 *      
 * 按返回类型排列函数 Void、Boolean、String、Number、Object、Array、Date、Function
 * 
 * 1、暂不完全考虑语法兼容性，多参考Github
 * 2、考虑通用性，如支持String、Array的方法，比如indexOf、for of这类的
 *      indexOf 支持String、Array
 *      for of  支持String、Object、Array
 * 3、队列、发布订阅与管理、数据劫持与监听
 */

const modules = {};
const files = require.context('./modules', false, /\.js$/);
files.keys().forEach((item) => {
    Object.assign(modules, files(item).default)
});
export default modules;