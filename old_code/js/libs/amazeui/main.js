(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('console-polyfill');
var store = require('store');
var Notify = require('notifyjs');
var md5 = require('blueimp-md5');
var detector = require('detector');
var hbs = window.Handlebars;
var w = window;
var $ = window.jQuery || window.Zepto;
var browser = detector.browser;
var isIE = browser.ie;
var oldIE = isIE && browser.version < 10;

var $body = $('body');
var $html = $('html');

function onShowNotification() {
  console.log('notification is shown!');
}

function onCloseNotification() {
  console.log('notification is closed!');
}

function onClickNotification() {
  console.log('notification was clicked!');
}

function onErrorNotification() {
  console.error('Error showing notification. ' +
  'You may need to request permission.');
}

function onPermissionGranted() {
  console.log('Permission has been granted by the user');
  doNotification('你要捏代码已经复制到剪贴板，粘去吧 ^_^');
}

function onPermissionDenied() {
  console.warn('Permission has been denied by the user');
}

function doNotification(msg) {
  var myNotification = new Notify('嗨，骚年!', {
    body: msg,
    tag: 'amazeUI',
    icon: '/i/app-icon72x72@2x.png',
    notifyShow: onShowNotification,
    notifyClose: onCloseNotification,
    notifyClick: onClickNotification,
    notifyError: onErrorNotification,
    timeout: 3
  });

  myNotification.show();
}

var initDuosuo = function() {
  w.duoshuoQuery = {
    short_name: 'amui'
  };

  var $duoshuo = $('<script></script>', {
    charset: 'utf-8',
    src: (document.location.protocol === 'https:' ?
      'https:' : 'http:') + '//static.duoshuo.com/embed.js'
  });

  $body.append($duoshuo);
};

$(window).on('load', function() {
  $('.ds-thread').length && initDuosuo();
});

var amaze = {};

amaze.auth = function() {
  var $auth = $('.auth');
  var $user = $auth.find('#username');
  var $avatar = $auth.find('#user-avatar');

  $user.on('blur', function() {
    var hash = md5($(this).val());
    $avatar.attr('src',
      'http://www.gravatar.com/avatar/' + hash + '?d=mm&s=144');
  });
};

amaze.externalLink = function() {
  var $doc = $('.doc-content');
  var $exLink = $doc.find('a[href^="http://"], a[href^="https://"]').
    not('.doc-example a');
  $exLink.addClass('external-link').attr('target', '_blank');
};

amaze.checkLogin = function() {
  var storeEnabled = store && store.enabled;
  var $header = $('#amz-header');
  var $profile = $header.find('.nav-profile.need-check');
  var $avatar = $profile.find('img');
  var loggedInStatusKey = '_amui_login_status';
  var now = new Date().getTime();

  if (storeEnabled) {
    var localData = store.get(loggedInStatusKey);
    if (localData) {
      if (w.location.search.indexOf('logout') > -1) {
        store.remove(loggedInStatusKey);
        $profile.hide();
        return;
      }

      if ((now - localData.lastCheck) < 3600000) {
        $avatar.attr('src', localData.avatar);
        $profile.show().addClass('am-animation-fade');
        return;
      } else {
        store.remove(loggedInStatusKey);
      }
    }
  }

  $.getJSON('/api/user', function(data) {
    if (data.loggedIn) {
      $profile.show();
      $avatar.attr('src', data.avatar);
      data.lastCheck = new Date().getTime();
      storeEnabled && store.set(loggedInStatusKey, data);
    } else {
      $profile.hide();
    }
  });
};

amaze.zeroClip = function() {
  if (!window.ZeroClipboard) {
    return;
  }

  ZeroClipboard.config({
    moviePath: '/js/ZeroClipboard.swf',
    hoverClass: 'doc-act-clip-hover'
  });

  var copyBtn = '<div class="doc-actions"><div class="doc-act-inner">' +
    '<span class="doc-act-clip am-icon-copy"> Copy</span></div></div>';
  var copyBtnNew = '<div class="doc-actions"><div class="doc-act-inner">' +
    '<span class="doc-act-newwin am-icon-file-code-o"> New Win</span>' +
    '<span class="doc-act-clip am-icon-copy"> Copy</span></div></div>';

  $('.doc-code').each(function() {
    var $code = $(this);
    var $prev = $code.prev();

    if ($prev.hasClass('doc-example')) {
      if ($prev.attr('data-url')) {
        $prev.before(copyBtnNew);
      } else {
        $prev.before(copyBtn);
      }
    } else {
      $code.before(copyBtn);
    }
  });

  $('.doc-act-newwin').on('click', function(e) {
    var $demo = $(this).parent().parent('.doc-actions').next('.doc-example');
    if ($demo.length && $demo.attr('data-url')) {
      window.open($demo.attr('data-url') + '?_ver=' +
        $(document.body).data('amui'), '',
        'width=320px, height=480px, centerscreen=yes');
    }
  });

  var codeClip = new ZeroClipboard($('.doc-act-clip'));

  codeClip.on('ready', function(readyEvent) {
    codeClip.on('copy', function(e) {
      var $next = $(e.target).parent().parent().next();
      var $reqCode = $next.is('.doc-code') ? $next : $next.next('.doc-code');
      e.clipboardData.setData('text/plain', $reqCode.text());
    });
  });

  // Copy finish
  codeClip.on('aftercopy', function(e) {
    if (Notify.needsPermission) {
      Notify.requestPermission(onPermissionGranted, onPermissionDenied);
    } else {
      doNotification('你要捏代码已经复制到剪贴板，粘去吧 ^_^');
    }
    if (console) {
      console.log('Copied text to clipboard: ' + e.data['text/plain']);
    }
  });

  // Can't copy
  codeClip.on('error', function(e) {
    if (Notify.needsPermission) {
      Notify.requestPermission(onPermissionGranted, onPermissionDenied);
    } else {
      doNotification('Something wrong :-(\n' + e.name);
    }
  });

  // Copy example
  // Read: https://github.com/zeroclipboard/zeroclipboard/blob/1.x-master/docs/instructions.md
};

amaze.toolbar = function() {
  var $w = $(w);
  var $toolbar = $('#amz-toolbar');
  var $goTop = $toolbar.find('#amz-go-top');

  if (!$goTop.length) {
    return;
  }

  $goTop.on('click', function(e) {
    e.preventDefault();
    if (oldIE) {
      $('html, body').animate({scrollTop: 0}, 500);
      return false;
    }

    $(w).smoothScroll(0);
  });

  function checkScrollTop() {
    if ($w.scrollTop() > 10) {
      $goTop.addClass('am-active');
    } else {
      $goTop.removeClass('am-active');
    }
  }

  function checkWinWidth() {
    if ($w.width() > 1110) {
      $toolbar.css({right: ($w.width() - 1110) / 2});
    } else {
      $toolbar.css({right: '10px'});
    }
  }

  checkScrollTop();

  checkWinWidth();

  $w.on('scroll', $.AMUI.utils.debounce(checkScrollTop, 100));
  $w.on('resize', $.AMUI.utils.debounce(checkWinWidth, 100));
};

amaze.standaloneMode = function() {
  if (window.navigator.standalone) { // WebApp Mode
    $(document).on('click', 'a', function(e) {
      var link = $(this).attr('href');
      if (link && (link.indexOf('http') || ~link.indexOf(location.host))) {
        e.preventDefault();
        location.href = link;
      }
    });
  }
};

amaze.pageChange = function() {
  var animationSupported = $.AMUI.support.animation;
  var $bd = $('body');

  if (animationSupported) {
    $(document).on('click', 'a', function(e) {
      var link = $(this).attr('href');
      if (link && (link.indexOf('http') || ~link.indexOf(location.host))) {
        e.preventDefault();
        $bd.addClass('doc-slide-out');
        $bd.one(animationSupported.end, function() {
          location.href = link;
        });
      }
    });

    $bd.addClass('doc-slide-in');
    $bd.one(animationSupported.end, function() {
      $bd.removeClass('doc-slide-in');
    });
  }
};

amaze.getIssues = function() {
  var issues = 'https://api.github.com/repos/allmobilize/amazeui/issues?state=all&labels=';
  var labels = [];
  var $main = $('#amz-main');
  var component = $main.data('tag');
  var $tpl = $main.find('#issue-list-tpl');
  var $issueList = $main.find('#issue-list');
  var source = $tpl.text() || '';
  var template = hbs && hbs.compile(source);
  labels.push('v' + $(document.body).data('amui'));
  labels.push(component);

  if (component && template) {
    $.getJSON(issues + labels.join(','), function(data) {
      data && data.length && $issueList.html(template(data));
    });
  }
};

amaze.sticky = function() {
  var userAgent = navigator.userAgent.toLowerCase();
  // Test if the browser is IE and check the version number is lower than 9
  if (/msie/.test(userAgent) && parseFloat((userAgent.
      match(/.*(?:rv|ie)[\/: ](.+?)([ \);]|$)/) || [])[1]) < 10) {
    return;
  }

  var $bar = $('#amz-offcanvas');
  var $pager = $bar.find('.amz-pager');
  var $pagerLink = $pager.find('a');
  var $sidebar = $bar.find('.amz-sidebar');

  $bar.sticky({
    top: 10,
    bottom: function() {
      return $('.amz-footer').height() + 25;
    },
    media: 641
  });

  function barMaxHeight() {
    var $footer = $('.amz-footer');
    // jQuery height() 返回的值不包含 padding 和 border
    var footerHeight = $footer[$.fn.outerHeight ? 'outerHeight' : 'height']();
    var h = $(w).height() - 20 - footerHeight;
    if ($bar.hasClass('am-sticky')) {
      $sidebar.css({'max-height': h});
      $bar.css({'max-height': h});
    } else {
      $sidebar.css({'max-height': ''});
      $bar.css({'max-height': ''});
    }

    if (h > $sidebar.height()) {
      $pager.removeClass('am-active');
    } else {
      $pager.addClass('am-active');
    }

    $pager.css({top: $sidebar.height() / 2});
  }

  barMaxHeight();

  setTimeout(barMaxHeight, 119);

  $(w).on('scroll resize', $.AMUI.utils.debounce(barMaxHeight, 10));

  $pager.on('click', 'a', function(e) {
    e.preventDefault();
    if ($(this).hasClass('am-disabled')) {
      return;
    }

    var data = $(this).data('rel');
    var scrollTop = $sidebar.scrollTop();
    var delta = 200;

    if (data === 'scrollUp') {
      $sidebar.smoothScroll({position: scrollTop - delta});
    } else {
      $sidebar.smoothScroll({position: scrollTop + delta});
    }
  });

  function checkScroll() {
    var disabled = 'am-disabled';

    if ($sidebar.scrollTop() === 0) {
      $pagerLink.eq(0).addClass(disabled);
    } else {
      $pagerLink.eq(0).removeClass(disabled);
    }
    // TODO: 滚动到底部判断
  }

  $sidebar.on('scroll', $.AMUI.utils.debounce(checkScroll, 50));

  // http://stackoverflow.com/questions/7154967/jquery-detect-scrolldown
  // IE, Opera, Safari
  $sidebar.on('mousewheel', function(e) {
    e.preventDefault();
    // jquery store originalEvent
    var event = e.originalEvent || e;
    var direction = event.wheelDelta < 0 ? 'down' : 'up';
    mouseScroll(direction);
  }).on('DOMMouseScroll', function(e) { // Firefox
    e.preventDefault();
    var event = e.originalEvent || e;
    mouseScroll(event.detail > 0 ? 'down' : 'up');
  });

  function mouseScroll(direction, delta) {
    direction = direction || 'up';
    delta = delta || 100;
    var scrollTo = (direction === 'up' ?
        -delta : delta) + $sidebar.scrollTop();

    $sidebar.scrollTop(scrollTo);
  }
};

amaze.docToc = function() {
  var $toc = $('.doc-toc-bd > .md-toc');
  var $tocParent = $toc.find('>li').has('>ul');

  $tocParent.addClass('am-parent');

  $tocParent.on('mouseenter', function() {
    var $subToc = $(this).children('ul');
    $subToc.collapse('open');
    $(this).addClass('am-open');
    // $(this).siblings('li').children('ul.am-in').collapse('close');
  });

  $toc.find('a').on('click', function(e) {
    e.preventDefault();
    var anchor = decodeURIComponent($(this).attr('href'));
    var $anchor = $(anchor);

    $anchor.length && $(w).smoothScroll({position: $anchor.offset().top});
  });

  // TODO: 使用 pushState
};

amaze.cse = function() {
  var $cse = $('#amz-header').find('.amz-cse');
  var $q = $cse.find('[name="q"]');
  var timer;

  $q.on('focus', function() {
    $cse.addClass('am-active');
    clearTimeout(timer);
  }).on('blur', function() {
    timer = setTimeout(function() {
      $cse.removeClass('am-active');
    }, 1000);
  });
};

amaze.init = function() {
  this.auth();
  this.externalLink();
  this.checkLogin();
  this.zeroClip();
  this.toolbar();
  this.standaloneMode();
  this.getIssues();
  this.docToc();
  this.sticky();
  this.cse();
  // this.pageChange();
};

$(function() {
  var $docContent = $('#amz-main').find('.doc-content');
  var $toc = $docContent.find('.doc-toc');

  if ($toc.next().is('h1')) {
    $docContent.find('hr').first().after($toc);
  }

  if (isIE && browser.version < 9) {
    return false;
  }

  amaze.init();
  $('.amz-social [data-am-modal]').on('click', function(e) {
    e.preventDefault();
  });

  var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  if (iOS) {
    $html.addClass('ios');
  }

  $('.new-issue').each(function() {
    this.href += encodeURIComponent('```\n' + navigator.userAgent + '\n```\n');
  });
});

},{"blueimp-md5":2,"console-polyfill":3,"detector":4,"notifyjs":6,"store":7}],2:[function(require,module,exports){
/*
 * JavaScript MD5 1.0.1
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 * 
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*jslint bitwise: true */
/*global unescape, define */

(function ($) {
    'use strict';

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
        var i,
            bkey = rstr2binl(key),
            ipad = [],
            opad = [],
            hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
    * Encode a string as utf-8
    */
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw) {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return md5;
        });
    } else {
        $.md5 = md5;
    }
}(this));

},{}],3:[function(require,module,exports){
// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(con) {
  'use strict';
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) con[prop] = con[prop] || empty;
  while (method = methods.pop()) con[method] = con[method] || dummy;
})(this.console = this.console || {}); // Using `this` for web workers.

},{}],4:[function(require,module,exports){
(function (process){

var detector = {};
var NA_VERSION = "-1";
var win = this;
var external;
var re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;

function toString(object){
  return Object.prototype.toString.call(object);
}
function isObject(object){
  return toString(object) === "[object Object]";
}
function isFunction(object){
  return toString(object) === "[object Function]";
}
function each(object, factory, argument){
  for(var i=0,b,l=object.length; i<l; i++){
    if(factory.call(object, object[i], i) === false){break;}
  }
}

// 硬件设备信息识别表达式。
// 使用数组可以按优先级排序。
var DEVICES = [
  ["nokia", function(ua){
    // 不能将两个表达式合并，因为可能出现 "nokia; nokia 960"
    // 这种情况下会优先识别出 nokia/-1
    if(ua.indexOf("nokia ") !== -1){
      return /\bnokia ([0-9]+)?/;
    }else if(ua.indexOf("noain") !== -1){
      return /\bnoain ([a-z0-9]+)/;
    }else{
      return /\bnokia([a-z0-9]+)?/;
    }
  }],
  // 三星有 Android 和 WP 设备。
  ["samsung", function(ua){
    if(ua.indexOf("samsung") !== -1){
      return /\bsamsung(?:\-gt)?[ \-]([a-z0-9\-]+)/;
    }else{
      return /\b(?:gt|sch)[ \-]([a-z0-9\-]+)/;
    }
  }],
  ["wp", function(ua){
    return ua.indexOf("windows phone ") !== -1 ||
      ua.indexOf("xblwp") !== -1 ||
      ua.indexOf("zunewp") !== -1 ||
      ua.indexOf("windows ce") !== -1;
  }],
  ["pc", "windows"],
  ["ipad", "ipad"],
  // ipod 规则应置于 iphone 之前。
  ["ipod", "ipod"],
  ["iphone", /\biphone\b|\biph(\d)/],
  ["mac", "macintosh"],
  ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/],
  ["aliyun", /\baliyunos\b(?:[\-](\d+))?/],
  ["meizu", /\b(?:meizu\/|m)([0-9]+)\b/],
  ["nexus", /\bnexus ([0-9s.]+)/],
  ["huawei", function(ua){
    var re_mediapad = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
    if(ua.indexOf("huawei-huawei") !== -1){
      return /\bhuawei\-huawei\-([a-z0-9\-]+)/;
    }else if(re_mediapad.test(ua)){
      return re_mediapad;
    }else{
      return /\bhuawei[ _\-]?([a-z0-9]+)/;
    }
  }],
  ["lenovo", function(ua){
    if(ua.indexOf("lenovo-lenovo") !== -1){
      return /\blenovo\-lenovo[ \-]([a-z0-9]+)/;
    }else{
      return /\blenovo[ \-]?([a-z0-9]+)/;
    }
  }],
  // 中兴
  ["zte", function(ua){
    if(/\bzte\-[tu]/.test(ua)){
      return /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/;
    }else{
      return /\bzte[ _\-]?([a-su-z0-9\+]+)/;
    }
  }],
  // 步步高
  ["vivo", /\bvivo(?: ([a-z0-9]+))?/],
  ["htc", function(ua){
    if(/\bhtc[a-z0-9 _\-]+(?= build\b)/.test(ua)){
      return /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/;
    }else{
      return /\bhtc[ _\-]?([a-z0-9 ]+)/;
    }
  }],
  ["oppo", /\boppo[_]([a-z0-9]+)/],
  ["konka", /\bkonka[_\-]([a-z0-9]+)/],
  ["sonyericsson", /\bmt([a-z0-9]+)/],
  ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/],
  ["lg", /\blg[\-]([a-z0-9]+)/],
  ["android", /\bandroid\b|\badr\b/],
  ["blackberry", "blackberry"]
];

// 操作系统信息识别表达式
var OS = [
  ["wp", function(ua){
    if(ua.indexOf("windows phone ") !== -1){
      return /\bwindows phone (?:os )?([0-9.]+)/;
    }else if(ua.indexOf("xblwp") !== -1){
      return /\bxblwp([0-9.]+)/;
    }else if(ua.indexOf("zunewp") !== -1){
      return /\bzunewp([0-9.]+)/;
    }
    return "windows phone";
  }],
  ["windows", /\bwindows nt ([0-9.]+)/],
  ["macosx", /\bmac os x ([0-9._]+)/],
  ["ios", function(ua){
    if(/\bcpu(?: iphone)? os /.test(ua)){
      return /\bcpu(?: iphone)? os ([0-9._]+)/;
    }else if(ua.indexOf("iph os ") !== -1){
      return /\biph os ([0-9_]+)/;
    }else{
      return /\bios\b/;
    }
  }],
  ["yunos", /\baliyunos ([0-9.]+)/],
  ["android", function(ua){
    if(ua.indexOf("android") >= 0){
      return /\bandroid[ \/-]?([0-9.x]+)?/;
    }else if(ua.indexOf("adr") >= 0){
      if(ua.indexOf("mqqbrowser") >= 0){
        return /\badr[ ]\(linux; u; ([0-9.]+)?/;
      }else{
        return /\badr(?:[ ]([0-9.]+))?/;
      }
    }
    return "android";
    //return /\b(?:android|\badr)(?:[\/\- ](?:\(linux; u; )?)?([0-9.x]+)?/;
  }],
  ["chromeos", /\bcros i686 ([0-9.]+)/],
  ["linux", "linux"],
  ["windowsce", /\bwindows ce(?: ([0-9.]+))?/],
  ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/],
  ["blackberry", "blackberry"]
];

// 解析使用 Trident 内核的浏览器的 `浏览器模式` 和 `文档模式` 信息。
// @param {String} ua, userAgent string.
// @return {Object}
function IEMode(ua){
  if(!re_msie.test(ua)){return null;}

  var m,
      engineMode, engineVersion,
      browserMode, browserVersion,
      compatible=false;

  // IE8 及其以上提供有 Trident 信息，
  // 默认的兼容模式，UA 中 Trident 版本不发生变化。
  if(ua.indexOf("trident/") !== -1){
    m = /\btrident\/([0-9.]+)/.exec(ua);
    if(m && m.length>=2){
      // 真实引擎版本。
      engineVersion = m[1];
      var v_version = m[1].split(".");
      v_version[0] = parseInt(v_version[0], 10) + 4;
      browserVersion = v_version.join(".");
    }
  }

  m = re_msie.exec(ua);
  browserMode = m[1];
  var v_mode = m[1].split(".");
  if("undefined" === typeof browserVersion){
    browserVersion = browserMode;
  }
  v_mode[0] = parseInt(v_mode[0], 10) - 4;
  engineMode = v_mode.join(".");
  if("undefined" === typeof engineVersion){
    engineVersion = engineMode;
  }

  return {
    browserVersion: browserVersion,
    browserMode: browserMode,
    engineVersion: engineVersion,
    engineMode: engineMode,
    compatible: engineVersion !== engineMode
  };
}

// 针对同源的 TheWorld 和 360 的 external 对象进行检测。
// @param {String} key, 关键字，用于检测浏览器的安装路径中出现的关键字。
// @return {Undefined,Boolean,Object} 返回 undefined 或 false 表示检测未命中。
function checkTW360External(key){
  if(!external){return;} // return undefined.
  try{
    //        360安装路径：
    //        C:%5CPROGRA~1%5C360%5C360se3%5C360SE.exe
    var runpath = external.twGetRunPath.toLowerCase();
    // 360SE 3.x ~ 5.x support.
    // 暴露的 external.twGetVersion 和 external.twGetSecurityID 均为 undefined。
    // 因此只能用 try/catch 而无法使用特性判断。
    var security = external.twGetSecurityID(win);
    var version = external.twGetVersion(security);

    if(runpath && runpath.indexOf(key) === -1){return false;}
    if(version){return {version: version};}
  }catch(ex){}
}

var ENGINE = [
  ["trident", re_msie],
  //["blink", /blink\/([0-9.+]+)/],
  ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
  ["gecko", /\bgecko\/(\d+)/],
  ["presto", /\bpresto\/([0-9.]+)/],
  ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/],
  ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/],
  ["u2", /\bu2\/([0-9.]+)/],
  ["u3", /\bu3\/([0-9.]+)/]
];
var BROWSER = [
  // Sogou.
  ["sogou", function(ua){
    if (ua.indexOf("sogoumobilebrowser") >= 0) {
      return /sogoumobilebrowser\/([0-9.]+)/
    } else if (ua.indexOf("sogoumse") >= 0){
      return true;
    }
    return / se ([0-9.x]+)/;
  }],
  // TheWorld (世界之窗)
  // 由于裙带关系，TheWorld API 与 360 高度重合。
  // 只能通过 UA 和程序安装路径中的应用程序名来区分。
  // TheWorld 的 UA 比 360 更靠谱，所有将 TheWorld 的规则放置到 360 之前。
  ["theworld", function(ua){
    var x = checkTW360External("theworld");
    if(typeof x !== "undefined"){return x;}
    return "theworld";
  }],
  // 360SE, 360EE.
  ["360", function(ua) {
    var x = checkTW360External("360se");
    if(typeof x !== "undefined"){return x;}
    if(ua.indexOf("360 aphone browser") !== -1){
      return /\b360 aphone browser \(([^\)]+)\)/;
    }
    return /\b360(?:se|ee|chrome|browser)\b/;
  }],
  // Maxthon
  ["maxthon", function(ua){
    try{
      if(external && (external.mxVersion || external.max_version)){
        return {
          version: external.mxVersion || external.max_version
        };
      }
    }catch(ex){}
    return /\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/;
  }],
  ["qq", /\bm?qqbrowser\/([0-9.]+)/],
  ["green", "greenbrowser"],
  ["tt", /\btencenttraveler ([0-9.]+)/],
  ["liebao", function(ua){
    if (ua.indexOf("liebaofast") >= 0){
      return /\bliebaofast\/([0-9.]+)/;
    }
    if(ua.indexOf("lbbrowser") === -1){return false;}
    var version;
    try{
      if(external && external.LiebaoGetVersion){
        version = external.LiebaoGetVersion();
      }
    }catch(ex){}
    return {
      version: version || NA_VERSION
    };
  }],
  ["tao", /\btaobrowser\/([0-9.]+)/],
  ["coolnovo", /\bcoolnovo\/([0-9.]+)/],
  ["saayaa", "saayaa"],
  // 有基于 Chromniun 的急速模式和基于 IE 的兼容模式。必须在 IE 的规则之前。
  ["baidu", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],
  // 后面会做修复版本号，这里只要能识别是 IE 即可。
  ["ie", re_msie],
  ["mi", /\bmiuibrowser\/([0-9.]+)/],
  // Opera 15 之后开始使用 Chromniun 内核，需要放在 Chrome 的规则之前。
  ["opera", function(ua){
    var re_opera_old = /\bopera.+version\/([0-9.ab]+)/;
    var re_opera_new = /\bopr\/([0-9.]+)/;
    return re_opera_old.test(ua) ? re_opera_old : re_opera_new;
  }],
  ["oupeng", /\boupeng\/([0-9.]+)/],
  ["yandex", /yabrowser\/([0-9.]+)/],
  // 支付宝手机客户端
  ["ali-ap", function(ua){
    if(ua.indexOf("aliapp") > 0){
      return /\baliapp\(ap\/([0-9.]+)\)/;
    }else{
      return /\balipayclient\/([0-9.]+)\b/;
    }
  }],
  // 支付宝平板客户端
  ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/],
  // 支付宝商户客户端
  ["ali-am", /\baliapp\(am\/([0-9.]+)\)/],
  // 淘宝手机客户端
  ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
  // 淘宝平板客户端
  ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/],
  // 天猫手机客户端
  ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
  // 天猫平板客户端
  ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/],
  // UC 浏览器，可能会被识别为 Android 浏览器，规则需要前置。
  // UC 桌面版浏览器携带 Chrome 信息，需要放在 Chrome 之前。
  ["uc", function(ua){
    if(ua.indexOf("ucbrowser/") >= 0){
      return /\bucbrowser\/([0-9.]+)/;
    } else if(ua.indexOf("ubrowser/") >= 0){
      return /\bubrowser\/([0-9.]+)/;
    }else if(/\buc\/[0-9]/.test(ua)){
      return /\buc\/([0-9.]+)/;
    }else if(ua.indexOf("ucweb") >= 0){
      // `ucweb/2.0` is compony info.
      // `UCWEB8.7.2.214/145/800` is browser info.
      return /\bucweb([0-9.]+)?/;
    }else{
      return /\b(?:ucbrowser|uc)\b/;
    }
  }],
  ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
  // Android 默认浏览器。该规则需要在 safari 之前。
  ["android", function(ua){
    if(ua.indexOf("android") === -1){return;}
    return /\bversion\/([0-9.]+(?: beta)?)/;
  }],
  ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
  // 如果不能被识别为 Safari，则猜测是 WebView。
  ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/],
  ["firefox", /\bfirefox\/([0-9.ab]+)/],
  ["nokia", /\bnokiabrowser\/([0-9.]+)/]
];

// UserAgent Detector.
// @param {String} ua, userAgent.
// @param {Object} expression
// @return {Object}
//    返回 null 表示当前表达式未匹配成功。
function detect(name, expression, ua){
  var expr = isFunction(expression) ? expression.call(null, ua) : expression;
  if(!expr){return null;}
  var info = {
    name: name,
    version: NA_VERSION,
    codename: ""
  };
  var t = toString(expr);
  if(expr === true){
    return info;
  }else if(t === "[object String]"){
    if(ua.indexOf(expr) !== -1){
      return info;
    }
  }else if(isObject(expr)){ // Object
    if(expr.hasOwnProperty("version")){
      info.version = expr.version;
    }
    return info;
  }else if(expr.exec){ // RegExp
    var m = expr.exec(ua);
    if(m){
      if(m.length >= 2 && m[1]){
        info.version = m[1].replace(/_/g, ".");
      }else{
        info.version = NA_VERSION;
      }
      return info;
    }
  }
}

var na = {name:"na", version:NA_VERSION};
// 初始化识别。
function init(ua, patterns, factory, detector){
  var detected = na;
  each(patterns, function(pattern){
    var d = detect(pattern[0], pattern[1], ua);
    if(d){
      detected = d;
      return false;
    }
  });
  factory.call(detector, detected.name, detected.version);
}

// 解析 UserAgent 字符串
// @param {String} ua, userAgent string.
// @return {Object}
var parse = function(ua){
  ua = (ua || "").toLowerCase();
  var d = {};

  init(ua, DEVICES, function(name, version){
    var v = parseFloat(version);
    d.device = {
      name: name,
      version: v,
      fullVersion: version
    };
    d.device[name] = v;
  }, d);

  init(ua, OS, function(name, version){
    var v = parseFloat(version);
    d.os = {
      name: name,
      version: v,
      fullVersion: version
    };
    d.os[name] = v;
  }, d);

  var ieCore = IEMode(ua);

  init(ua, ENGINE, function(name, version){
    var mode = version;
    // IE 内核的浏览器，修复版本号及兼容模式。
    if(ieCore){
      version = ieCore.engineVersion || ieCore.engineMode;
      mode = ieCore.engineMode;
    }
    var v = parseFloat(version);
    d.engine = {
      name: name,
      version: v,
      fullVersion: version,
      mode: parseFloat(mode),
      fullMode: mode,
      compatible: ieCore ? ieCore.compatible : false
    };
    d.engine[name] = v;
  }, d);

  init(ua, BROWSER, function(name, version){
    var mode = version;
    // IE 内核的浏览器，修复浏览器版本及兼容模式。
    if(ieCore){
      // 仅修改 IE 浏览器的版本，其他 IE 内核的版本不修改。
      if(name === "ie"){
        version = ieCore.browserVersion;
      }
      mode = ieCore.browserMode;
    }
    var v = parseFloat(version);
    d.browser = {
      name: name,
      version: v,
      fullVersion: version,
      mode: parseFloat(mode),
      fullMode: mode,
      compatible: ieCore ? ieCore.compatible : false
    };
    d.browser[name] = v;
  }, d);
  return d;
};


// NodeJS.
if(typeof process === "object" && process.toString() === "[object process]"){

  // 加载更多的规则。
  var morerule = module["require"]("./morerule");
  [].unshift.apply(DEVICES, morerule.DEVICES || []);
  [].unshift.apply(OS,      morerule.OS      || []);
  [].unshift.apply(BROWSER, morerule.BROWSER || []);
  [].unshift.apply(ENGINE,  morerule.ENGINE  || []);

}else{

  var userAgent = navigator.userAgent || "";
  //var platform = navigator.platform || "";
  var appVersion = navigator.appVersion || "";
  var vendor = navigator.vendor || "";
  external = win.external;

  detector = parse(userAgent + " " + appVersion + " " + vendor);
  win.detector = detector;

}


// exports `parse()` API anyway.
detector.parse = parse;

module.exports = detector;

}).call(this,require("oMfpAn"))
},{"oMfpAn":5}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],6:[function(require,module,exports){
(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD environment
        define('notify', [], function () {
            return factory(root, document);
        });
    } else if (typeof exports === 'object') {
        // CommonJS environment
        module.exports = factory(root, document);
    } else {
        // Browser environment
        root.Notify = factory(root, document);
    }

}(window, function (w, d) {

    'use strict';

    function isFunction (item) {
        return typeof item === 'function';
    }

    function Notify(title, options) {

        if (typeof title !== 'string') {
            throw new Error('Notify(): first arg (title) must be a string.');
        }

        this.title = title;

        this.options = {
            icon: '',
            body: '',
            tag: '',
            notifyShow: null,
            notifyClose: null,
            notifyClick: null,
            notifyError: null,
            permissionGranted: null,
            permissionDenied: null,
            timeout: null
        };

        this.permission = null;

        if (!Notify.isSupported) {
            return;
        }

        //User defined options for notification content
        if (typeof options === 'object') {

            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }

            //callback when notification is displayed
            if (isFunction(this.options.notifyShow)) {
                this.onShowCallback = this.options.notifyShow;
            }

            //callback when notification is closed
            if (isFunction(this.options.notifyClose)) {
                this.onCloseCallback = this.options.notifyClose;
            }

            //callback when notification is clicked
            if (isFunction(this.options.notifyClick)) {
                this.onClickCallback = this.options.notifyClick;
            }

            //callback when notification throws error
            if (isFunction(this.options.notifyError)) {
                this.onErrorCallback = this.options.notifyError;
            }
        }
    }

    // true if the browser supports HTML5 Notification
    Notify.isSupported = 'Notification' in w;

    // true if the permission is not granted
    Notify.needsPermission = !(Notify.isSupported && Notification.permission === 'granted');

    // asks the user for permission to display notifications.  Then calls the callback functions is supplied.
    Notify.requestPermission = function (onPermissionGrantedCallback, onPermissionDeniedCallback) {
        if (!Notify.isSupported) {
            return;
        }
        w.Notification.requestPermission(function (perm) {
            switch (perm) {
                case 'granted':
                    if (isFunction(onPermissionGrantedCallback)) {
                        onPermissionGrantedCallback();
                    }
                    break;
                case 'denied':
                    if (isFunction(onPermissionDeniedCallback)) {
                        onPermissionDeniedCallback();
                    }
                    break;
            }
        });
    };


    Notify.prototype.show = function () {

        if (!Notify.isSupported) {
            return;
        }

        this.myNotify = new Notification(this.title, {
            'body': this.options.body,
            'tag' : this.options.tag,
            'icon' : this.options.icon
        });

        if (this.options.timeout && !isNaN(this.options.timeout)) {
            setTimeout(this.close.bind(this), this.options.timeout * 1000);
        }

        this.myNotify.addEventListener('show', this, false);
        this.myNotify.addEventListener('error', this, false);
        this.myNotify.addEventListener('close', this, false);
        this.myNotify.addEventListener('click', this, false);
    };

    Notify.prototype.onShowNotification = function (e) {
        if (this.onShowCallback) {
            this.onShowCallback(e);
        }
    };

    Notify.prototype.onCloseNotification = function (e) {
        if (this.onCloseCallback) {
            this.onCloseCallback(e);
        }
        this.destroy();
    };

    Notify.prototype.onClickNotification = function (e) {
        if (this.onClickCallback) {
            this.onClickCallback(e);
        }
    };

    Notify.prototype.onErrorNotification = function (e) {
        if (this.onErrorCallback) {
            this.onErrorCallback(e);
        }
        this.destroy();
    };

    Notify.prototype.destroy = function () {
        this.myNotify.removeEventListener('show', this, false);
        this.myNotify.removeEventListener('error', this, false);
        this.myNotify.removeEventListener('close', this, false);
        this.myNotify.removeEventListener('click', this, false);
    };

    Notify.prototype.close = function () {
        this.myNotify.close();
    };

    Notify.prototype.handleEvent = function (e) {
        switch (e.type) {
        case 'show':
            this.onShowNotification(e);
            break;
        case 'close':
            this.onCloseNotification(e);
            break;
        case 'click':
            this.onClickNotification(e);
            break;
        case 'error':
            this.onErrorNotification(e);
            break;
        }
    };

    return Notify;

}));

},{}],7:[function(require,module,exports){
;(function(win){
	var store = {},
		doc = win.document,
		localStorageName = 'localStorage',
		scriptTag = 'script',
		storage

	store.disabled = false
	store.set = function(key, value) {}
	store.get = function(key) {}
	store.remove = function(key) {}
	store.clear = function() {}
	store.transact = function(key, defaultVal, transactionFn) {
		var val = store.get(key)
		if (transactionFn == null) {
			transactionFn = defaultVal
			defaultVal = null
		}
		if (typeof val == 'undefined') { val = defaultVal || {} }
		transactionFn(val)
		store.set(key, val)
	}
	store.getAll = function() {}
	store.forEach = function() {}

	store.serialize = function(value) {
		return JSON.stringify(value)
	}
	store.deserialize = function(value) {
		if (typeof value != 'string') { return undefined }
		try { return JSON.parse(value) }
		catch(e) { return value || undefined }
	}

	// Functions to encapsulate questionable FireFox 3.6.13 behavior
	// when about.config::dom.storage.enabled === false
	// See https://github.com/marcuswestin/store.js/issues#issue/13
	function isLocalStorageNameSupported() {
		try { return (localStorageName in win && win[localStorageName]) }
		catch(err) { return false }
	}

	if (isLocalStorageNameSupported()) {
		storage = win[localStorageName]
		store.set = function(key, val) {
			if (val === undefined) { return store.remove(key) }
			storage.setItem(key, store.serialize(val))
			return val
		}
		store.get = function(key) { return store.deserialize(storage.getItem(key)) }
		store.remove = function(key) { storage.removeItem(key) }
		store.clear = function() { storage.clear() }
		store.getAll = function() {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = function(callback) {
			for (var i=0; i<storage.length; i++) {
				var key = storage.key(i)
				callback(key, store.get(key))
			}
		}
	} else if (doc.documentElement.addBehavior) {
		var storageOwner,
			storageContainer
		// Since #userData storage applies only to specific paths, we need to
		// somehow link our data to a specific path.  We choose /favicon.ico
		// as a pretty safe option, since all browsers already make a request to
		// this URL anyway and being a 404 will not hurt us here.  We wrap an
		// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
		// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
		// since the iframe access rules appear to allow direct access and
		// manipulation of the document element, even for a 404 page.  This
		// document can be used instead of the current document (which would
		// have been limited to the current path) to perform #userData storage.
		try {
			storageContainer = new ActiveXObject('htmlfile')
			storageContainer.open()
			storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
			storageContainer.close()
			storageOwner = storageContainer.w.frames[0].document
			storage = storageOwner.createElement('div')
		} catch(e) {
			// somehow ActiveXObject instantiation failed (perhaps some special
			// security settings or otherwse), fall back to per-path storage
			storage = doc.createElement('div')
			storageOwner = doc.body
		}
		function withIEStorage(storeFunction) {
			return function() {
				var args = Array.prototype.slice.call(arguments, 0)
				args.unshift(storage)
				// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
				// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
				storageOwner.appendChild(storage)
				storage.addBehavior('#default#userData')
				storage.load(localStorageName)
				var result = storeFunction.apply(store, args)
				storageOwner.removeChild(storage)
				return result
			}
		}

		// In IE7, keys cannot start with a digit or contain certain chars.
		// See https://github.com/marcuswestin/store.js/issues/40
		// See https://github.com/marcuswestin/store.js/issues/83
		var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
		function ieKeyFix(key) {
			return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
		}
		store.set = withIEStorage(function(storage, key, val) {
			key = ieKeyFix(key)
			if (val === undefined) { return store.remove(key) }
			storage.setAttribute(key, store.serialize(val))
			storage.save(localStorageName)
			return val
		})
		store.get = withIEStorage(function(storage, key) {
			key = ieKeyFix(key)
			return store.deserialize(storage.getAttribute(key))
		})
		store.remove = withIEStorage(function(storage, key) {
			key = ieKeyFix(key)
			storage.removeAttribute(key)
			storage.save(localStorageName)
		})
		store.clear = withIEStorage(function(storage) {
			var attributes = storage.XMLDocument.documentElement.attributes
			storage.load(localStorageName)
			for (var i=0, attr; attr=attributes[i]; i++) {
				storage.removeAttribute(attr.name)
			}
			storage.save(localStorageName)
		})
		store.getAll = function(storage) {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = withIEStorage(function(storage, callback) {
			var attributes = storage.XMLDocument.documentElement.attributes
			for (var i=0, attr; attr=attributes[i]; ++i) {
				callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
			}
		})
	}

	try {
		var testKey = '__storejs__'
		store.set(testKey, testKey)
		if (store.get(testKey) != testKey) { store.disabled = true }
		store.remove(testKey)
	} catch(e) {
		store.disabled = true
	}
	store.enabled = !store.disabled

	if (typeof module != 'undefined' && module.exports && this.module !== module) { module.exports = store }
	else if (typeof define === 'function' && define.amd) { define(store) }
	else { win.store = store }

})(Function('return this')());

},{}]},{},[1])