// 模拟权限数据
function myPermissions() {
  return [{
    id: '添',
    code : 'permission:add',
  }, {
    id: '删',
    code : 'permission:delete',
  }, {
    id: '改',
    code : 'permission:edit',
  }, {
    id: '查',
    code : 'permission:list',
  }]
}


// 是否开启权限判断
let isAuth = true

let auth = function(value) {
  let b = false;
  let p = isAuth;

  if (!p) {
    return false;
  }

  let permissions = myPermissions();

  for (let i = 0; i < permissions.length; i++) {

    if (permissions[i].code === value) {
      b = true;
      break;
    }
  }

  return b;
}

export default {
  bind() {
  },
  inserted(el, binding) {
    if (!auth(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
}