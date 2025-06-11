/**
 * 手写 call 方法
 * @param {Object} context 要绑定的上下文
 * @param {...any} args 参数列表
 * @returns {any} 函数执行结果
 */
Function.prototype.myCall = function(context, ...args) {
  // 在这里实现你的代码
  var context = context || window;
  context.fn=this;
  let args=[];
  for(var i=1;i<arguments.length;i++){
    args.push('arguments['+i+']')
  }
  var result= eval('context.fn('+args+')');
  delete context.fn();
  return result;
};
