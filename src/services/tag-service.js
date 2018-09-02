import command from './command'


class TagService {

    //获取标签信息
    getTagInfo(param) {
      return new command().execute({ api: '/api/Mbc/LoadTagInfo', param: param });
    }
}


export default TagService