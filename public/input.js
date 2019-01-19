let ctlInput = { x: 0, y: 0 }
let ctlDirty = true

let joystickId = null

const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const context = canvas.getContext('2d')

function registerTouchListeners() {
    document.addEventListener('mousedown', ev => {
        const rect = canvas.getBoundingClientRect()
        ctlInput.x = ev.clientX - rect.left - canvas.width / 2
        ctlInput.y = ev.clientY - rect.top - canvas.height / 2
        ctlDirty = true
        joystickId = true
    })
    
    document.addEventListener('mousemove', ev => {
        if (joystickId) {
            const rect = canvas.getBoundingClientRect()
            ctlInput.x = ev.clientX - rect.left - canvas.width / 2
            ctlInput.y = ev.clientY - rect.top - canvas.height / 2
            ctlDirty = true
        }
    })
    
    document.addEventListener('mouseup', ev => {
        ctlInput.x = 0
        ctlInput.y = 0
        ctlDirty = true
        joystickId = null
    })
    
    canvas.addEventListener('touchstart', function (evt) {
        evt.preventDefault();
    
        if (!joystickId) {
            var rect = canvas.getBoundingClientRect();
            ctlInput.x = evt.changedTouches[0].clientX - rect.left - canvas.width / 2
            ctlInput.y = evt.changedTouches[0].clientY - rect.top - canvas.height / 2
            ctlDirty = true
            joystickId = evt.changedTouches[0].identifier;
        }
    
    }, false);
    
    canvas.addEventListener('touchend', function (evt) {
        evt.preventDefault();
        for (var i = 0; i < evt.changedTouches.length; i++) {
            if (evt.changedTouches[i].identifier == joystickId) {
                ctlInput.x = 0
                ctlInput.y = 0
                ctlDirty = true
                joystickId = null;
            }
        }
    }, false);
    
    canvas.addEventListener('touchmove', function (evt) {
        evt.preventDefault();
        for (var i = 0; i < evt.changedTouches.length; i++) {
            if (evt.changedTouches[i].identifier == joystickId) {
                var rect = canvas.getBoundingClientRect();
                ctlInput.x = evt.changedTouches[i].clientX - rect.left - canvas.width / 2
                ctlInput.y = evt.changedTouches[i].clientY - rect.top - canvas.height / 2
                ctlDirty = true
            }
        }
    }, false);
}