function random(min, max){
  var ran = Math.floor (Math.random() * (max-min+1) + min)
  return ran
}

export  function setlist(item){
  let _arr = [...item]
  for(var i=0;i<_arr.length;i++){
    var a = random(0,i)
    var contanier = _arr[i];
    _arr[i] = _arr[a]
    _arr[a] = contanier
  }
  return _arr
}
