class HttpService {
    search(key) {
      if (!key) return;
      var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
      var url = window.location.hash == '' ? window.location.search : window.location.hash.substring(window.location.hash.indexOf('?'));
      var r = url.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  }
  
  export default HttpService

