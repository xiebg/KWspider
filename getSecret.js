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
    v = function(t) {
        res = "FTDFBA8TkwNG4eQpzAPM7QxN5thPsDrD"
        var e = `_ga=GA1.2.1617862873.1703732461; _gid=GA1.2.1291582354.1703732461; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1703725476; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1703734897; _ga_ETPBRPM9ML=GS1.2.1703732461.1.1.1703734896.33.0.0; Hm_Iuvt_cdb524f42f0cer9b268e4v7y735ewrq2324=${res}`
          , n = e.indexOf(t + "=");
        if (-1 != n) {
            n = n + t.length + 1;
            var r = e.indexOf(";", n);
            return -1 == r && (r = e.length),
            unescape(e.substring(n, r))
        }
        return null
    }
    
    var e = v("Hm_Iuvt_cdb524f42f0cer9b268e4v7y735ewrq2324");
    Secret = h(e, "Hm_Iuvt_cdb524f42f0cer9b268e4v7y735ewrq2324")
    return Secret
}