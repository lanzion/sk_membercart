import command from './command'

class CardService {
  // 获取V卡
  getCardInfo(param) {
    return new command().execute({ api: '/api/Mbc/GetCartInfoCommand', param: param });
  }


  // 获取支付方式
  GetPaymentList(param){
    return new command().execute({ api: '/api/Mbc/GetPaymentList', param: param });
  }


  // 支付方式
  GetPaymentInfoCommand(param) {
    return new command().execute({ api: '/api/Mbc/GetPaymentInfoCommand', param: param });
  }
}

export default CardService