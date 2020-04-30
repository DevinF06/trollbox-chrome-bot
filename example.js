var test = "test"

function _getmsg(data) {
    data.nick = he.decode(data.nick)
    data.msg = he.decode(data.msg)
    if (data.msg.startsWith("test")) {
        _msg(test)
    }
}
