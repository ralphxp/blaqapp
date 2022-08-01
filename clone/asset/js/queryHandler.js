const popover = $(".app-popover");

function airtimeProcessor(form){
	form.on('submit', async (event)=>{
		event.preventDefault();
		const elem = event.target;
		const network = $(elem.network).val();
		const phone = $(elem.phone).val();
		const amount = $(elem.amount).val();

		const resp = await Fetcher.airtime(network, phone, amount);
		
		if(resp.code === 'success'){
			popover?
				((resp)=>{
					popover.addClass('open')
					popover.html(`
						<div class="app-card">
							<div class="app-card-head" style='color:green' >
								Successful
							</div>
							<div class='app-card-body' style='font-size:12px'>
								<p>${resp.message}</p><br>
								<table>
									<tr>
										<th>Amount : </th>
										<td> ${resp.data.amount}</td>
									</tr>
									<tr>
										<th>Phone : </th>
										<td> ${resp.data.phone}</td>
									</tr>
									<tr>
										<th>Network : </th>
										<td> ${resp.data.network}</td>
									</tr>
									<tr>
										<th>Order Id : </th>
										<td> ${resp.data.order_id}</td>
									</tr>
								</table>
								<button class='btn form-control' style='background:green;' onclick='reset()'>Done</button>
							</div>
						</div>
					`);
				})(resp)
			:0;
		}
		else if(resp.code === 'failure'){
			popover?
				((resp)=>{
					popover.addClass('open')
					popover.html(`
						<div class="app-card">
							<div class="app-card-head" >
								${resp.code}
							</div>
							<div class='app-card-body' style='font-size:12px'>
								<p>${resp.message}</p><br>
								<table>
									<tr>
										<th>Order Id : </th>
										<td> ${resp.order_id?resp.order_id:'NaN'}</td>
									</tr>
								</table>
								<button class='btn form-control' onclick='clearPop()'>Ok</button>
							</div>
						</div>
					`);
				})(resp)
			:0;
		}
	})
}

function dataProcessor(form){
	buyData(form)
}

function reset(e){
	popover.html('')
	popover.removeClass('open');
	for(let form of document.forms){
		form.reset()
	}
}

function clearPop(e){
	popover.html('')
	popover.removeClass('open');
	
}

const networkInput = $('#network');
const planInput = $('#plan');
networkInput?networkInput.on('change',selectNetworkPlan):0;

planInput?planInput.on('change', selectPlanPrice):0;

// SET NETWORK DATA PLAN OPTIONS

function selectNetworkPlan(e){
	e.preventDefault()
	const networkName = networkInput.val()
	document.querySelector('#plan').innerHTML = '';
	document.querySelector('#plan').innerHTML = '<option value="">----Select Plan----</option>';
	for(let plan of plans){
		if(plan.network === networkName){
			let domElem = document.createElement('option');
			domElem.setAttribute('value', plan.value);
			domElem.innerText = plan.name;
			document.querySelector('#plan').appendChild(domElem)
		}
	}
}

// SET DATA PLAN PRICE

function selectPlanPrice(e){
	e.preventDefault()
	const planVal = planInput.val();
	
	for(let plan of plans){
		if(plan.value === planVal){
			document.querySelector('#price').value = plan.price;
		}
	}
}

// CONFIRM BUTTON CLICK EVENT
const confirmSale = e=>{
	for(let form of document.forms){
		const id = form.id;
		switch(id){
			case 'data':
				dataConfirm($(form));
				break;
			case 'airtime':
				airtimeConfirm($(form));
				break;
			default:
				break;
		}
	}
}

const acceptSale = e=>{
	for(let form of document.forms){
		const id = form.id;
		switch(id){
			case 'data':
				dataProcessor(form);
				break;
			case 'airtime':
				airtimeProcessor(form);
				break;
			default:
				break;
		}
	}
}


const btnC = document.querySelector('#confirm');

btnC?btnC.addEventListener('click', confirmSale):0;

for(let form of document.forms){
	form.addEventListener('change', e=>{
		if(form.checkValidity()){
			btnC?
				(()=>{
					btnC.disabled = false;
					btnC.style.background = 'var(--them-red)'
				})()
			:0;
		}
	})
}

function dataConfirm(form){
	popover.html(`
		<div class='app-card'>
			<div class='app-card-body'>

			</div>
			<div class="form-group flex space-between">
				<button type="button" onclick='acceptSale()' class="form-control">Accept</button>
				<button class="app-btn" onclick="clearPop()">Cancel</button>
			</div>
		</div>
	`)
	popover.addClass('open');

}

async function buyData(form){
	const elem = form;
	const network = $(elem.network).val();
	const phone = $(elem.phone).val();
	const amount = $(elem.plan).val();
	popover.html('<div class="loader l-md"></div>')
	const resp = await Fetcher.data(network, phone, amount);
	
	if(resp.code === 'success'){
		popover?
			((resp)=>{
				popover.addClass('open')
				popover.html(`
					<div class="app-card">
						<div class="app-card-head" style='color:green' >
							Successful
						</div>
						<div class='app-card-body' style='font-size:12px'>
							<p>${resp.message}</p><br>
							<table>
								<tr>
									<th>Data Plan : </th>
									<td> ${resp.data.data_plan}</td>
								</tr>
								<tr>
									<th>Amount : </th>
									<td> ${resp.data.amount}</td>
								</tr>
								<tr>
									<th>Phone : </th>
									<td> ${resp.data.phone}</td>
								</tr>
								<tr>
									<th>Network : </th>
									<td> ${resp.data.network}</td>
								</tr>
								<tr>
									<th>Order Id : </th>
									<td> ${resp.data.order_id}</td>
								</tr>
							</table>
							<button class='btn form-control' style='background:green;' onclick='reset()'>Done</button>
						</div>
					</div>
				`);
			})(resp)
		:0;
	}
	else if(resp.code === 'failure'){
		popover?
			((resp)=>{
				popover.addClass('open')
				popover.html(`
					<div class="app-card">
						<div class="app-card-head" >
							${resp.code}
						</div>
						<div class='app-card-body' style='font-size:12px'>
							<p>${resp.message}</p><br>
							<table>
								<tr>
									<th>Order Id : </th>
									<td> ${resp.order_id?resp.order_id:'NaN'}</td>
								</tr>
							</table>
							<button class='btn form-control' onclick='clearPop()'>Ok</button>
						</div>
					</div>
				`);
			})(resp)
		:0;
	}
}