const axios = require("axios");
const number, message = null;


(async function(){
    const sms = await axios({
		url: 'https://api2.totalvoice.com.br/sms',
		method: 'post',
		headers: {
			'Access-Token': process.env.TOKEN
		},
		data: {
			'numero_destino': `${number}`,
			'mensagem': `${message}`
		}
	});
	console.log(sms.data);
})()
