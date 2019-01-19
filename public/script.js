// Initialize Firebase
var config = {
	apiKey: "AIzaSyAT6eC_vQJ6K5Ck55bLk0ReeizhflhPbsA",
	authDomain: "vr-hack-1547913415542.firebaseapp.com",
	databaseURL: "https://vr-hack-1547913415542.firebaseio.com",
	projectId: "vr-hack-1547913415542",
	storageBucket: "vr-hack-1547913415542.appspot.com",
	messagingSenderId: "582748546152"
};
firebase.initializeApp(config);

const db = firebase.database();

let ctlId = null

function draw() {
	context.setTransform(1, 0, 0, 1, 0, 0)
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.translate(canvas.width / 2, canvas.height / 2)

	context.beginPath()
	context.arc(0, 0, 80, 0, Math.PI * 2)
	context.strokeStyle = '#444'
	context.lineWidth = 4
	context.stroke()

	if (ctlInput.x || ctlInput.y) {
		context.beginPath()
		context.arc(ctlInput.x, ctlInput.y, 20, 0, Math.PI * 2)
		context.fillStyle = '#eee'
		context.fill()
	}

	requestAnimationFrame(draw)
}

function sendInput() {
	// Add a new document in collection "cities"
	// db.collection("constrollers").doc(ctlId).set(ctlInput)
	// 		.then(function () {
	// 	console.log("Document successfully written!")
	// })
	// 		.catch(function (error) {
	// 			console.error("Error writing document: ", error)
	// 		})

	const scale = 100
	const normalized = {x: ctlInput.x / scale, y: ctlInput.y / scale}
	const mag = Math.sqrt(Math.pow(normalized.x, 2) + Math.pow(normalized.y, 2))
	if (mag > 1) {
		normalized.x /= mag
		normalized.y /= mag
	}

	normalized.x = normalized.x.toString()
	normalized.y = normalized.y.toString()

	db.ref('controllers/' + ctlId).set(normalized)
		.then(function () {
			console.log("Document successfully written!")
		})
		.catch(function (error) {
			console.error("Error writing document: ", error)
		})
}

const inputField = document.querySelector('#code-input')

inputField.addEventListener('change', ev => {

	ctlId = inputField.value

	document.querySelector('.input-wrapper').style.display = 'none'

	setInterval(() => {
		if (ctlDirty) {
			sendInput()
			ctlDirty = false
		}
	}, 100)
	
	requestAnimationFrame(draw)

	registerTouchListeners()

})