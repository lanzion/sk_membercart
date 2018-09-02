import command from './command'

class MbrService {

  //初始化调用接口
  Command = new command()
  //检查是否绑定
  isBind(param) {
    return this.Command.execute({ api: '/api/Mbc/CheckMemberInfo', param: param });
  }

  //加载会员信息
  LaodMemberInfo(param) {
    return this.Command.execute({ api: '/api/Mbc/LaodMemberInfo', param: param });
  }

  // 绑定会员信息
  BindMemberInfo(param) {
    return this.Command.execute({ api: '/api/Mbc/BindMemberInfo', param: param });
  }

  //通过商城授权
  LoginShop(param) {
    return this.Command.execute({ api: '/api/Mbc/LoginShopOuath?MemberCode='+param, param: {} });
  }

  // 创建订单
  CreateOrder(param) {
    return this.Command.execute({ api: '/api/Mbc/CreateOrder', param: param });
  }

}

export default MbrService