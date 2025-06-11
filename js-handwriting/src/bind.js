Function.prototype.bind2 = function (context) {
  const self = this;
  const args = [...arguments].slice(1);
  return function () {
    return self.apply(
      this instanceof self ? this : context,
      [...args, ...arguments]
    );
  };
};
Function.prototype.bind2 =function(context){
  const self=this;
  const args=[...arguments].slice(1);
  return function(){
    return self.apply(
    this instanceof self?this:context,
    [...args,...arguments]
    )
  }
}
// 记忆口诀：“保原函，取固参，返新函，判 this，拼参数”
