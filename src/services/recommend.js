import command from './command'

class Recommend {
  Command = new command()
  GetReferenceProductList(param){
    return this.Command.execute({api: 'https://dvcms.weixinmvp.com/api/Product/GetReferenceProductList', param: param });
  }
}

export default Recommend;