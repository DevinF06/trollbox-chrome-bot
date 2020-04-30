var smsg = [], lmsg = "", users2 = [], name2 = ["botnamehere", "#123456"], timers = {}

_addTimer("msgTimer", _msgTimer, 1.75)

socket.on("message", (data) => _getmsg(data, _msg))
socket.on("update users", (data) => {
    users2 = []
    for (let key in data) {
        let home = data[key].home
        if (!users2[home]) {users2[home] = []}
        users2[home].push([he.decode(data[key].nick), data[key].color])
    }
})

function _msgTimer() {if (smsg.length > 0) {socket.emit("message", smsg.shift())}}

function _getmsg(data, _msg) {}

function _msg(msg) {
    smsg.push(msg + (msg == lmsg ? " " : ""))
    lmsg = msg + (msg == lmsg ? " " : "")
}

function _findHome(nick) {
    var homes = []
    for (let key in users2) {
        users2[key].forEach(n => {if (n[0] == nick) {homes.push(key)}})
    }
    return homes
}

function _updName(newName) {
    if (newName != undefined && typeof(newName[0]) == "string") {name2 = newName}
    socket.emit("user joined", name2[0], name2[1], pass)
}

function _addTimer(name, callback, sec) {if (timers[name]) {clearInterval(timers[name])}; timers[name] = setInterval(callback, sec * 1000)}
function _removeTimer(name) {if (timers[name]) {clearInterval(timers[name]); return true}; return false}
