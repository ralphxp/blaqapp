const output = document.querySelector('#output');
const predictBtn = document.querySelector('#predictBtn');
const inputVal = document.querySelector('#inputVal');

const model = tf.sequential()
model.add(tf.layers.dense({units: 1, inputShape:[1]}));

model.compile({loss: 'meanSquaredError', optimizer: 'sgd'})

const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1])

const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1])

model.fit(xs, ys, {epochs: 500})
.then(()=>{
	inputVal.disabled=false;
	predictBtn.disabled = false;
	predictBtn.style.background='var(--them-red)';
	predictBtn.innerText="Predict"
});

predictBtn.addEventListener('click', (e)=>{
	var val = inputVal.value || 1;
	output.innerText = model.predict(tf.tensor2d([parseInt(val)], [1,1]));
})