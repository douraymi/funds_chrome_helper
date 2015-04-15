//从划词翻译copy过来的一个模块 看看能不能用

!function(a, b) {
    "function" == typeof define && define.amd ? define(["../lib/jquery"], b) : a.storage = b(jQuery)
}(this, function(a) {
    var b = chrome.storage.local, c = a.Callbacks("unique"), d = {get: function(c) {
            var d = a.Deferred();
            return b.get(c, function(a) {
                var b = chrome.runtime.lastError;
                b ? (d.reject(b), console.error(b)) : d.resolve(a)
            }), d.promise()
        },set: function(c, d) {
            var e, f = a.Deferred();
            return 2 === arguments.length ? (e = {}, e[c] = d) : e = c, b.set(e, function() {
                var a = chrome.runtime.lastError;
                a ? (f.reject(a), console.error(a)) : f.resolve()
            }), f.promise()
        },onChange: function(b, d) {
            var e;
            return e = d ? function(c, e) {
                var f = {};
                a.each(c, function(a, b) {
                    d.hasOwnProperty(a) && (f[a] = b)
                }), a.isEmptyObject(f) || b(f, e)
            } : b, c.add(e), this
        },restore: function() {
            return d.set({enable: !0,autoPlay: !1,ignoreChinese: !1,ignoreNumLike: !0,showTranslateButton: !0,needCtrl: !1,waitText: "正在翻译，请稍候……",showMenu: !0,defaultApi: "youdao",defaultSpeak: "google",defaultTo: "auto"})
        },updateTemplate: function(c) {
            return a.ajax("/theme/selection.dot?" + Date.now()).done(function(a) {
                b.set({template: a}, c)
            }), this
        },storage: b};
    return chrome.storage.onChanged.addListener(function(b, d) {
        var e = {};
        a.each(b, function(a, b) {
            e[a] = b.newValue
        }), c.fire(Object.freeze(e), d)
    }), Object.freeze(d)
});
