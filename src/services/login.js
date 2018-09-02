import Vue from "vue";
import apiService from "./api-service"
import MbrService from "./mbrservice";
import HttpService from "./http-service";

class login {
    Login() {
        var myUrl = escape(location.href)
        var api = new apiService();
        var Url = escape(api.ApiRoot + '/Mobile/Login?redirect=' + myUrl)
        var loginUrl = api.LoginUrl + '?goto=' + Url
        location.href = loginUrl;
    }

    //商城登录
    loginShop() {
        let code = new HttpService().search('membercode');
        var api = new apiService();
        var Url = escape(location.origin + location.pathname + '#/login/loginShop');
        var loginUrl = api.LoginUrl + '?goto=' + Url;
        if (code == null || code == "") {
            location.href = loginUrl
        } else {
            new MbrService().LoginShop(code)
                .then(res => {
                    this.loginSuccess(res);
                }, err => {
                    alert(res.Message);
                });
        }
    }

    //登陆成功
    loginSuccess(res) {

        let gotoUrl = localStorage.getItem('gotoUrl');
        if (gotoUrl) {
            localStorage.setItem('gotoUrl', '');
        } else {
            gotoUrl = location.origin + location.pathname;
        }
        if (res.Data.Token) {
           // localStorage.setItem('membertoken', res.Data.Token);
           //document.cookie("MemberToken",res.Data.Token);
           document.cookie="MemberToken="+res.Data.Token;
        }
        location.replace(gotoUrl);
    }
}
export default login


