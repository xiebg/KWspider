// var CryptoJS = require("crypto-js");

// 使用 CryptoJS 生成随机数
function getRandomValuesCryptoJS(array) {
    for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256); // 在 0 到 255 之间生成随机数填充数组
    }
}
var getRandomValues = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
if (!getRandomValues) {
    getRandomValues = getRandomValuesCryptoJS; // 如果原始代码中的 getRandomValues 不存在，就使用 CryptoJS 代替
}
var r = new Uint8Array(16);
ArrayS = function () {
    return getRandomValues(r), r;
};


for (var n = [], i = 0; i < 256; ++i)
    n[i] = (i + 256).toString(16).substr(1);
DDD = function () {
    var t = [
        45,
        118,
        133,
        112,
        165,
        33,
        17,
        238,
        140,
        170,
        189,
        11,
        98,
        119,
        132,
        45
    ]
    var i = 0
        , r = n;
    return [r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]]].join("")
}

var r, o, l = ArrayS, c = DDD, d = 0, h = 0;
function A(t, e, n) {
    var i = e && n || 0
        , b = e || []
        , f = (t = t || {}).node || r
        , v = void 0 !== t.clockseq ? t.clockseq : o;
    if (null == f || null == v) {
        var m = l();
        null == f && (f = r = [1 | m[0], m[1], m[2], m[3], m[4], m[5]]),
            null == v && (v = o = 16383 & (m[6] << 8 | m[7]))
    }
    var y = void 0 !== t.msecs ? t.msecs : (new Date).getTime()
        , w = void 0 !== t.nsecs ? t.nsecs : h + 1
        , dt = y - d + (w - h) / 1e4;
    if (dt < 0 && void 0 === t.clockseq && (v = v + 1 & 16383),
        (dt < 0 || y > d) && void 0 === t.nsecs && (w = 0),
        w >= 1e4)
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    d = y,
        h = w,
        o = v;
    var x = (1e4 * (268435455 & (y += 122192928e5)) + w) % 4294967296;
    b[i++] = x >>> 24 & 255,
        b[i++] = x >>> 16 & 255,
        b[i++] = x >>> 8 & 255,
        b[i++] = 255 & x;
    var _ = y / 4294967296 * 1e4 & 268435455;
    b[i++] = _ >>> 8 & 255,
        b[i++] = 255 & _,
        b[i++] = _ >>> 24 & 15 | 16,
        b[i++] = _ >>> 16 & 255,
        b[i++] = v >>> 8 | 128,
        b[i++] = 255 & v;
    for (var A = 0; A < 6; ++A)
        b[i + A] = f[A];
    return e || c(b)
}
function main(){
    m = A();
    return m;
}




function getSecret(coo){
    function h(t, e) {
        if (null == e || e.length <= 0)
            return console.log("Please enter a password with which to encrypt the message."),
            null;
        for (var n = "", i = 0; i < e.length; i++)
            n += e.charCodeAt(i).toString();
        var r = Math.floor(n.length / 5)
          , o = parseInt(n.charAt(r) + n.charAt(2 * r) + n.charAt(3 * r) + n.charAt(4 * r) + n.charAt(5 * r))
          , l = Math.ceil(e.length / 2)
          , c = Math.pow(2, 31) - 1;
        if (o < 2)
            return console.log("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password."),
            null;
        var d = Math.round(1e9 * Math.random()) % 1e8;
        for (n += d; n.length > 10; )
            n = (parseInt(n.substring(0, 10)) + parseInt(n.substring(10, n.length))).toString();
        n = (o * n + l) % c;
        var h = ""
          , f = "";
        for (i = 0; i < t.length; i++)
            f += (h = parseInt(t.charCodeAt(i) ^ Math.floor(n / c * 255))) < 16 ? "0" + h.toString(16) : h.toString(16),
            n = (o * n + l) % c;
        for (d = d.toString(16); d.length < 8; )
            d = "0" + d;
        return f += d
    }
    function AD(t) {
        let currentTime = Date.now();
        // let replacedString = `_ga=GA1.2.26371751.${currentTime}; _gid=GA1.2.747646009.${currentTime}; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=${currentTime}; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=${currentTime+1000}; _ga_ETPBRPM9ML=GS1.2.${currentTime+1}.1.1.${currentTime+1000}.42.0.0; Hm_Iuvt_cdb524f42f0cer9b268e4v7y735ewrq2324=tFnXWXriYFBkmeMjRHep7mzaxHz8pwbT`;

        // var e = "_ga=GA1.2.26371751.1703725476; _gid=GA1.2.747646009.1703725476; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1703725476; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1703728234; _ga_ETPBRPM9ML=GS1.2.1703725477.1.1.1703728234.42.0.0; Hm_Iuvt_cdb524f42f0cer9b268e4v7y735ewrq2324=tFnXWXriYFBkmeMjRHep7mzaxHz8pwbT"
        // var e = replacedString
        var result = coo
        var e = `_ga=GA1.2.26371751.1703725476; _gid=GA1.2.747646009.1703725476; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1703725476; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1703729334; _ga_ETPBRPM9ML=GS1.2.1703725477.1.1.1703729335.60.0.0; Hm_Iuvt_cdb524f42f0cer9b268e4v7y735ewrq2324=${result}`
        , n = e.indexOf(t + "=");
        console.log(e)
        if (-1 != n) {
            n = n + t.length + 1;
            var r = e.indexOf(";", n);
            return -1 == r && (r = e.length),
            unescape(e.substring(n, r))
        }
        return null
    }
    var e = AD("Hm_Iuvt_cdb524f42f0cer9b268e4v7y735ewrq2324");
    console.log(e)
    return h(e,"Hm_Iuvt_cdb524f42f0cer9b268e4v7y735ewrq2324")
}
console.log(getSecret())