/**
 * call 方法的参考答案
 */
Function.prototype.myCall = function(context, ...args) {
  // 如果 context 为 null 或 undefined，则指向全局对象
  context = context == null ? (typeof global !== 'undefined' ? global : window) : context;

  // 将当前函数作为 context 的一个属性
  context.fn = this;

  // 执行函数
  const result = context.fn(...args);

  // 删除临时属性
  delete context.fn;

  return result;
};
