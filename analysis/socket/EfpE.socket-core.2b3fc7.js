const DanmakuWebSocket = function (t) {
    function e(o) {
        if (n[o]) return n[o].exports;
        let i = n[o] = {i: o, l: !1, exports: {}};
        return t[o].call(i.exports, i, i.exports, e), i.l = !0, i.exports
    }

    let n = {};
    e.m = t
    e.c = n
    e.d = function (t, n, o) {
        e.o(t, n) || Object.defineProperty(t, n, {configurable: !1, enumerable: !0, get: o})
    }
    e.n = function (t) {
        let n = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(n, "a", n), n
    }
    e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    e.p = ""
    e.s = 1
    return e(1)
}([
    function (t, e, n) {
        "use strict";
        e.a = {
            WS_OP_HEARTBEAT: 2,
            WS_OP_HEARTBEAT_REPLY: 3,
            WS_OP_MESSAGE: 5,
            WS_OP_USER_AUTHENTICATION: 7,
            WS_OP_CONNECT_SUCCESS: 8,
            WS_PACKAGE_HEADER_TOTAL_LENGTH: 16,
            WS_PACKAGE_OFFSET: 0,
            WS_HEADER_OFFSET: 4,
            WS_VERSION_OFFSET: 6,
            WS_OPERATION_OFFSET: 8,
            WS_SEQUENCE_OFFSET: 12,
            WS_BODY_PROTOCOL_VERSION_NORMAL: 0,
            WS_BODY_PROTOCOL_VERSION_BROTLI: 3,
            WS_HEADER_DEFAULT_VERSION: 1,
            WS_HEADER_DEFAULT_OPERATION: 1,
            WS_HEADER_DEFAULT_SEQUENCE: 1,
            WS_AUTH_OK: 0,
            WS_AUTH_TOKEN_ERROR: -101
        }
    },
    function (t, e, n) {
        let o = n(2).default;
        t.exports = o
    },
    function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        let o = n(3)
        let i = function () {
            function t(t, e) {
                for (let n = 0; n < e.length; n++) {
                    let o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }()
        let r = function () {
            function t(e) {
                return function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), "development" === t.CONFIG.bundleType && (console.clear(), console.dir(t.CONFIG)), this.initialize(e)
            }

            t.prototype.initialize = function (e) {
                let n = this;
                "development" === t.CONFIG.bundleType && console.log("App Initialized.");
                let i = document.createElement("script");
                return i.src = "//activity.hdslb.com/blackboard/static/20210425/d0411babbbf77c49ca42a3320eb804ae/0NCT06vruR.js", i.onload = function () {
                    n.ws = new o.a(e)
                }, window.document.head.append(i), this.getReturn()
            }
            t.prototype.getReturn = function () {
                return "development" === t.CONFIG.bundleType ? this : {
                    destroy: this.destroy.bind(this),
                    send: this.send.bind(this),
                    getAuthInfo: this.getAuthInfo.bind(this),
                    getRetryCount: this.getRetryCount.bind(this),
                    getState: this.getState.bind(this)
                }
            }
            t.prototype.destroy = function () {
                this.ws && this.ws.destroy()
            }
            t.prototype.getState = function () {
                return this.ws && this.ws.getState()
            }
            t.prototype.send = function (t) {
                this.ws && this.ws.send(t)
            }
            t.prototype.getAuthInfo = function () {
                return this.ws && this.ws.getAuthInfo()
            }
            t.prototype.getRetryCount = function () {
                return this.ws && this.ws.getRetryCount()
            }
            i(t, null, [{
                key: "CONFIG",
                get: function () {
                    return {version: "1.4.4", gitHash: "31c446ee", build: "34", bundleType: "release"}
                }
            }])
            return t
        }();
        e.default = r
    },
    function (t, e, n) {
        "use strict";
        let o = n(0)
        let i = n(4)
        let r = n(5)
        let s = function () {
            function t(e) {
                if (function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), t.checkOptions(e)) {
                    let n = {
                        url: "",
                        urlList: [],
                        rid: 0,
                        aid: 0,
                        uid: 0,
                        from: -1,
                        retry: !0,
                        retryMaxCount: 0,
                        retryInterval: 5,
                        retryThreadCount: 10,
                        connectTimeout: 5e3,
                        retryConnectCount: 3,
                        retryconnectTimeout: 1e4,
                        retryRoundInterval: Math.floor(2 * Math.random()) + 3,
                        customAuthParam: [],
                        fallback: function () {
                        },
                        heartBeatInterval: 30,
                        onReceivedMessage: function () {
                        },
                        onReceiveAuthRes: function () {
                        },
                        onHeartBeatReply: function () {
                        },
                        onInitialized: function () {
                        },
                        onOpen: function () {
                        },
                        onClose: function () {
                        },
                        onError: function () {
                        },
                        onListConnectError: function () {
                        },
                        onLogger: function () {
                        }
                    };
                    this.options = r.a.extend({}, n, e), this.wsBinaryHeaderList = r.a.extend([], i.a), this.authInfo = {
                        origin: "",
                        encode: ""
                    }, 0 !== this.options.urlList.length && 0 !== this.options.retryMaxCount && this.options.retryMaxCount < this.options.urlList.length && (this.options.retryMaxCount = this.options.urlList.length - 1), this.state = {
                        retryCount: 0,
                        listConnectFinishedCount: 0,
                        index: 0,
                        connectTimeoutTimes: 0,
                        url: ""
                    }, this.callbackQueueList = {
                        onInitializedQueue: [],
                        onOpenQueue: [],
                        onCloseQueue: [],
                        onErrorQueue: [],
                        onReceivedMessageQueue: [],
                        onHeartBeatReplyQueue: [],
                        onRetryFallbackQueue: [],
                        onListConnectErrorQueue: [],
                        onReceiveAuthResQueue: []
                    }, this.HEART_BEAT_INTERVAL = 0, this.CONNECT_TIMEOUT = 0, this.mixinCallback().initialize(this.options.urlList.length > 0 ? this.options.urlList[0] : this.options.url)
                }
            }

            t.prototype.initialize = function (t) {
                let e = this, n = "MozWebSocket" in window ? window.MozWebSocket : window.WebSocket,
                    o = this.options;
                try {
                    this.state.url = t, this.ws = new n(t), this.ws.binaryType = "arraybuffer", this.ws.onopen = this.onOpen.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onclose = this.onClose.bind(this), this.ws.onerror = this.onError.bind(this), r.a.callFunction(this.callbackQueueList.onInitializedQueue), this.callbackQueueList.onInitializedQueue = [];
                    let i = this.state.connectTimeoutTimes >= 3 ? o.retryconnectTimeout : o.connectTimeout;
                    this.CONNECT_TIMEOUT = setTimeout(function () {
                        e.state.connectTimeoutTimes += 1, e.options.onLogger("connect timeout " + e.state.connectTimeoutTimes), e.ws.close()
                    }, i)
                } catch (t) {
                    "function" == typeof o.fallback && o.fallback()
                }
                return this
            }
            t.prototype.onOpen = function () {
                return r.a.callFunction(this.callbackQueueList.onOpenQueue), this.state.connectTimeoutTimes = 0, this.CONNECT_TIMEOUT && clearTimeout(this.CONNECT_TIMEOUT), this.userAuthentication(), this
            }
            t.prototype.userAuthentication = function () {
                let t, e = this, n = this.options,
                    i = {uid: parseInt(n.uid, 10), roomid: parseInt(n.rid, 10), protover: 3};
                n.aid && (i.aid = parseInt(n.aid, 10)), n.from > 0 && (i.from = parseInt(n.from, 10) || 7);
                for (let r = 0; r < n.customAuthParam.length; r++) {
                    let s = n.customAuthParam[r], a = s.type || "string";
                    switch (void 0 !== i[s.key] && this.options.onLogger("Token has the same key already! 【" + s.key + "】"), s.key.toString() && s.value.toString() || this.options.onLogger("Invalid customAuthParam, missing key or value! 【" + s.key + "】-【" + s.value + "】"), a) {
                        case"string":
                            i[s.key] = s.value;
                            break;
                        case"number":
                            i[s.key] = parseInt(s.value, 10);
                            break;
                        case"boolean":
                            i[s.key] = !!i[s.value];
                            break;
                        default:
                            return void this.options.onLogger("Unsupported customAuthParam type!【" + a + "】")
                    }
                }
                t = this.convertToArrayBuffer(JSON.stringify(i), o.a.WS_OP_USER_AUTHENTICATION), this.authInfo.origin = i, this.authInfo.encode = t, setTimeout(function () {
                    e.ws.send(t)
                }, 0)
            }
            t.prototype.getAuthInfo = function () {
                return this.authInfo
            }
            t.prototype.getState = function () {
                return this.state
            }
            t.prototype.heartBeat = function () {
                let t = this;
                clearTimeout(this.HEART_BEAT_INTERVAL);
                let e = this.convertToArrayBuffer({}, o.a.WS_OP_HEARTBEAT);
                this.ws.send(e), this.HEART_BEAT_INTERVAL = setTimeout(function () {
                    t.heartBeat()
                }, 1e3 * this.options.heartBeatInterval)
            }
            t.prototype.onMessage = function (t) {
                let e = this;
                try {
                    let n = this.convertToObject(t.data);
                    if (n instanceof Array) n.forEach(function (t) {
                        e.onMessage(t)
                    }); else if (n instanceof Object) switch (n.op) {
                        case o.a.WS_OP_HEARTBEAT_REPLY:
                            this.onHeartBeatReply(n.body);
                            break;
                        case o.a.WS_OP_MESSAGE:
                            this.onMessageReply(n.body, n.seq);
                            break;
                        case o.a.WS_OP_CONNECT_SUCCESS:
                            if (0 !== n.body.length && n.body[0]) switch (n.body[0].code) {
                                case o.a.WS_AUTH_OK:
                                    this.heartBeat();
                                    break;
                                case o.a.WS_AUTH_TOKEN_ERROR:
                                    this.options.retry = !1, "function" == typeof this.options.onReceiveAuthRes && this.options.onReceiveAuthRes(n.body);
                                    break;
                                default:
                                    this.onClose()
                            } else this.heartBeat()
                    }
                } catch (t) {
                    this.options.onLogger("WebSocket Error: ", t)
                }
                return this
            }
            t.prototype.onMessageReply = function (t, e) {
                let n = this;
                try {
                    t instanceof Array ? t.forEach(function (t) {
                        n.onMessageReply(t, e)
                    }) : t instanceof Object && "function" == typeof this.options.onReceivedMessage && this.options.onReceivedMessage(t, e)
                } catch (t) {
                    this.options.onLogger("On Message Resolve Error: ", t)
                }
            }
            t.prototype.onHeartBeatReply = function (t) {
                r.a.callFunction(this.callbackQueueList.onHeartBeatReplyQueue, t)
            }
            t.prototype.onClose = function () {
                let t = this, e = this.options.urlList.length;
                return r.a.callFunction(this.callbackQueueList.onCloseQueue), clearTimeout(this.HEART_BEAT_INTERVAL), this.options.retry ? (this.checkRetryState() ? setTimeout(function () {
                    t.options.onLogger("Danmaku Websocket Retry .", t.state.retryCount), t.state.index += 1, 0 === e || t.state.retryCount > t.options.retryThreadCount ? setTimeout(function () {
                        t.initialize(t.options.url)
                    }, 1e3 * t.options.retryRoundInterval) : 0 !== e && t.state.index > e - 1 ? (t.state.index = 0, t.state.listConnectFinishedCount += 1, 1 === t.state.listConnectFinishedCount && r.a.callFunction(t.callbackQueueList.onListConnectErrorQueue), setTimeout(function () {
                        t.initialize(t.options.urlList[t.state.index])
                    }, 1e3 * t.options.retryRoundInterval)) : t.initialize(t.options.urlList[t.state.index])
                }, 1e3 * this.options.retryInterval) : (this.options.onLogger("Danmaku Websocket Retry Failed."), r.a.callFunction(this.callbackQueueList.onRetryFallbackQueue)), this) : this
            }
            t.prototype.onError = function (t) {
                return this.options.onLogger("Danmaku Websocket On Error.", t), r.a.callFunction(this.callbackQueueList.onErrorQueue, t), this
            }
            t.prototype.destroy = function () {
                this.HEART_BEAT_INTERVAL && clearTimeout(this.HEART_BEAT_INTERVAL), this.CONNECT_TIMEOUT && clearTimeout(this.CONNECT_TIMEOUT), this.options.retry = !1, this.ws && this.ws.close(), this.ws = null
            }
            t.prototype.convertToArrayBuffer = function (t, e) {
                this.encoder || (this.encoder = r.a.getEncoder());
                let n = new ArrayBuffer(o.a.WS_PACKAGE_HEADER_TOTAL_LENGTH),
                    i = new DataView(n, o.a.WS_PACKAGE_OFFSET), s = this.encoder.encode(t);
                return i.setInt32(o.a.WS_PACKAGE_OFFSET, o.a.WS_PACKAGE_HEADER_TOTAL_LENGTH + s.byteLength), this.wsBinaryHeaderList[2].value = e, this.wsBinaryHeaderList.forEach(function (t) {
                    4 === t.bytes ? i.setInt32(t.offset, t.value) : 2 === t.bytes && i.setInt16(t.offset, t.value)
                }), r.a.mergeArrayBuffer(n, s)
            }
            t.prototype.convertToObject = function (t) {
                let e = new DataView(t), n = {body: []};
                if (n.packetLen = e.getInt32(o.a.WS_PACKAGE_OFFSET), this.wsBinaryHeaderList.forEach(function (t) {
                    4 === t.bytes ? n[t.key] = e.getInt32(t.offset) : 2 === t.bytes && (n[t.key] = e.getInt16(t.offset))
                }), n.packetLen < t.byteLength && this.convertToObject(t.slice(0, n.packetLen)), this.decoder || (this.decoder = r.a.getDecoder()), !n.op || o.a.WS_OP_MESSAGE !== n.op && n.op !== o.a.WS_OP_CONNECT_SUCCESS) n.op && o.a.WS_OP_HEARTBEAT_REPLY === n.op && (n.body = {count: e.getInt32(o.a.WS_PACKAGE_HEADER_TOTAL_LENGTH)}); else for (let i = o.a.WS_PACKAGE_OFFSET, s = n.packetLen, a = "", u = ""; i < t.byteLength; i += s) {
                    s = e.getInt32(i), a = e.getInt16(i + o.a.WS_HEADER_OFFSET);
                    try {
                        if (n.ver === o.a.WS_BODY_PROTOCOL_VERSION_NORMAL) {
                            let c = this.decoder.decode(t.slice(i + a, i + s));
                            u = 0 !== c.length ? JSON.parse(c) : null
                        } else if (n.ver === o.a.WS_BODY_PROTOCOL_VERSION_BROTLI) {
                            let l = t.slice(i + a, i + s), h = window.BrotliDecode(new Uint8Array(l));
                            u = this.convertToObject(h.buffer).body
                        }
                        u && n.body.push(u)
                    } catch (e) {
                        this.options.onLogger("decode body error:", new Uint8Array(t), n, e)
                    }
                }
                return n
            }
            t.prototype.send = function (t) {
                this.ws && this.ws.send(t)
            }
            t.prototype.addCallback = function (t, e) {
                return "function" == typeof t && e instanceof Array && e.push(t), this
            }
            t.prototype.mixinCallback = function () {
                let t = this.options, e = this.callbackQueueList;
                return this.addCallback(t.onReceivedMessage, e.onReceivedMessageQueue).addCallback(t.onHeartBeatReply, e.onHeartBeatReplyQueue).addCallback(t.onInitialized, e.onInitializedQueue).addCallback(t.onOpen, e.onOpenQueue).addCallback(t.onClose, e.onCloseQueue).addCallback(t.onError, e.onErrorQueue).addCallback(t.onRetryFallback, e.onRetryFallbackQueue).addCallback(t.onListConnectError, e.onListConnectErrorQueue).addCallback(t.onReceiveAuthRes, e.onReceiveAuthResQueue), this
            }
            t.prototype.getRetryCount = function () {
                return this.state.retryCount
            }
            t.prototype.checkRetryState = function () {
                let t = this.options, e = !1;
                return (0 === t.retryMaxCount || this.state.retryCount < t.retryMaxCount) && (this.state.retryCount += 1, e = !0), e
            }
            t.checkOptions = function (t) {
                return t || t instanceof Object ? t.url ? null != t.rid || (console.error("WebSocket Initialize options rid(cid) missing."), !1) : (this.options.onLogger("WebSocket Initialize options url missing."), !1) : (this.options.onLogger("WebSocket Initialize options missing or error.", t), !1)
            }
            return t
        }();
        e.a = s
    },
    function (t, e, n) {
        "use strict";
        let o = n(0)
        let i = [{
            name: "Header Length",
            key: "headerLen",
            bytes: 2,
            offset: o.a.WS_HEADER_OFFSET,
            value: o.a.WS_PACKAGE_HEADER_TOTAL_LENGTH
        }, {
            name: "Protocol Version",
            key: "ver",
            bytes: 2,
            offset: o.a.WS_VERSION_OFFSET,
            value: o.a.WS_HEADER_DEFAULT_VERSION
        }, {
            name: "Operation",
            key: "op",
            bytes: 4,
            offset: o.a.WS_OPERATION_OFFSET,
            value: o.a.WS_HEADER_DEFAULT_OPERATION
        }, {
            name: "Sequence Id",
            key: "seq",
            bytes: 4,
            offset: o.a.WS_SEQUENCE_OFFSET,
            value: o.a.WS_HEADER_DEFAULT_SEQUENCE
        }];
        e.a = i
    },
    function (t, e, n) {
        "use strict";
        let o = {
            getDecoder: function () {
                return window.TextDecoder ? new window.TextDecoder : {
                    decode: function (t) {
                        return decodeURIComponent(window.escape(String.fromCharCode.apply(String, new Uint8Array(t))))
                    }
                }
            },
            getEncoder: function () {
                return window.TextEncoder ? new window.TextEncoder : {
                    encode: function (t) {
                        for (let e = new ArrayBuffer(t.length), n = new Uint8Array(e), o = 0, i = t.length; o < i; o++) n[o] = t.charCodeAt(o);
                        return e
                    }
                }
            },
            mergeArrayBuffer: function (t, e) {
                let n = new Uint8Array(t), o = new Uint8Array(e),
                    i = new Uint8Array(n.byteLength + o.byteLength);
                return i.set(n, 0), i.set(o, n.byteLength), i.buffer
            },
            callFunction: function (t, e) {
                return t instanceof Array && t.length ? (t.forEach(function (t) {
                    return "function" == typeof t && t(e)
                }), null) : "function" == typeof t && t(e)
            },
            extend: function (t) {
                for (let e = arguments.length, n = Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++) n[o - 1] = arguments[o];
                let i = t || {};
                return i instanceof Object && n.forEach(function (t) {
                    t instanceof Object && Object.keys(t).forEach(function (e) {
                        i[e] = t[e]
                    })
                }), i
            }
        };
        e.a = o
    }
])
