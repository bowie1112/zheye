Function.prototype.myapply = function(context, arr) {
  var context=Object(context) || window;
  context.fn=this;

  var result;
  if(!arr){
    result=context.fn();
  }
  else{
    let args=[];
    for(var i=0;i<arr.length;i++){
    args.push('arr['+i+']')
  }
  result= eval('context.fn('+args+')');
  }
  delete context.fn;
  return result;
}
