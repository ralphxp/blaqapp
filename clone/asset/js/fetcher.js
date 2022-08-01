'use strict'

const user = 'ralph02',
	password ='@1997.Rapha.com';

const live_url = 'https://vtu.ng/wp-json/api/v1/';

var Fetcher = {
	BASE_URL: '../api.php',
	
	auth: `username=${user}&password=${password}`,



	apiCaller : async function(url){
		const resp = await fetch(url);
		const data = await resp.json();
		return data;
	},


	balance: function(){

	},

	airtime: async function(network, phone, amount){
		const url = `${live_url}/airtime?${Fetcher.auth}&phone=${phone}&network_id=${network}&amount=${amount}`;
		return await Fetcher.apiCaller(
			`${Fetcher.BASE_URL}?${Fetcher.auth}&phone=${phone}&network_id=${network}&amount=${amount}`
		);
	},

	data: async function(network, phone, variationId){
		const url = `${live_url}/airtime?${Fetcher.auth}&phone=${phone}&network_id=${network}&variation_id=${variationId}`;

		return await Fetcher.apiCaller(
			`${Fetcher.BASE_URL}?${Fetcher.auth}&phone=${phone}&network_id=${network}&variation_id=${variationId}`
		);
	},

	electricity: function(company, meter_number, amount){
		
	}

}