import routes from '../request/routes.js';
import req from '../request/req.js';

class Sms{
	// 登录验证码
	smsSend (params){
		params.url = routes.services.sms.userCode;
		req.post(params);
	}
}

module.exports = new Sms;