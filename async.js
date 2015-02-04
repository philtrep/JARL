;(function(d, s, n) {
  window.isOldIE = (function() {
    var rv = -1;
    if (n.appName == 'Microsoft Internet Explorer') {
      if (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(n.userAgent) != null)
        rv = parseFloat(RegExp.$1);
    }
    return rv > -1 && rv < 10 ? true : false;
  })();

  String.prototype.removeComments = function() {
    var str = ('__' + this + '__').split('');
    var mode = {
      singleQuote: false,
      doubleQuote: false,
      regex: false,
      blockComment: false,
      lineComment: false,
      condComp: false
    };
    for (var i = 0, l = str.length; i < l; i++) {

      if (mode.regex) {
        if (str[i] === '/' && str[i - 1] !== '\\') {
          mode.regex = false;
        }
        continue;
      }

      if (mode.singleQuote) {
        if (str[i] === "'" && str[i - 1] !== '\\') {
          mode.singleQuote = false;
        }
        continue;
      }

      if (mode.doubleQuote) {
        if (str[i] === '"' && str[i - 1] !== '\\') {
          mode.doubleQuote = false;
        }
        continue;
      }

      if (mode.blockComment) {
        if (str[i] === '*' && str[i + 1] === '/') {
          str[i + 1] = '';
          mode.blockComment = false;
        }
        str[i] = '';
        continue;
      }

      if (mode.lineComment) {
        if (str[i + 1] === '\n' || str[i + 1] === '\r') {
          mode.lineComment = false;
        }
        str[i] = '';
        continue;
      }

      if (mode.condComp) {
        if (str[i - 2] === '@' && str[i - 1] === '*' && str[i] === '/') {
          mode.condComp = false;
        }
        continue;
      }

      mode.doubleQuote = str[i] === '"';
      mode.singleQuote = str[i] === "'";

      if (str[i] === '/') {

        if (str[i + 1] === '*' && str[i + 2] === '@') {
          mode.condComp = true;
          continue;
        }
        if (str[i + 1] === '*') {
          str[i] = '';
          mode.blockComment = true;
          continue;
        }
        if (str[i + 1] === '/') {
          str[i] = '';
          mode.lineComment = true;
          continue;
        }
        mode.regex = true;
      }
    }
    return str.join('').slice(2, -2);
  }

  var fjs = d.getElementsByTagName(s)[0];
  a2l = 0,
    j2l = 0,
    c2l = 0;

  Loader = (function() {
    var child = function(options) {
      this.elementClass = options.elementClass;
      this.callback = options.callback;
      this.script = '';
      this.fn = options.fn;
    };
    child.prototype = {
      'addRequests': function(list) {
        var self = this;
        for (var l in list) {
          a2l++;
          j2l++;
          self.sendRequest(list[l]['src'], this.callback.bind(this));
        }
      },
      'sendRequest': function(url, callback, postData) {
        var self = this;
        var req = self.createXMLHTTPObject();
        if (!req) {
          return;
        }
        var method = (postData) ? "POST" : "GET";
        req.open(method, url, true);
        if (postData) {
          req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        req.onreadystatechange = function() {
          if (req.readyState != 4) {
            return;
          }
          if (req.status != 200 && req.status != 304) {
            return;
          }
          callback(req);
        }
        if (req.readyState == 4) {
          return;
        }
        req.send(postData);
      },
      'XMLHttpFactories': [
        function() {
          return new XMLHttpRequest()
        },
        function() {
          return new ActiveXObject("Msxml2.XMLHTTP")
        },
        function() {
          return new ActiveXObject("Msxml3.XMLHTTP")
        },
        function() {
          return new ActiveXObject("Microsoft.XMLHTTP")
        }
      ],
      'createXMLHTTPObject': function() {
        var self = this;
        var xmlhttp = false;
        for (var i = 0; i < self.XMLHttpFactories.length; i++) {
          try {
            xmlhttp = self.XMLHttpFactories[i]();
          } catch (e) {
            continue;
          }
          break;
        }
        return xmlhttp;
      },
      finished: function(e) {

        var ele = d.getElementsByClassName(this.elementClass)[0];

        if (ele.scriptsdone == ele.scriptsnb && ele.loaded) {
          var _ele_ = d.createElement(s);
          _ele_.innerHTML += this.script + "\r\n;(function(){";
          _ele_.innerHTML += "for(i = 0; i<" + ele.scriptsnb + "; i++){if(1 > --j2l){asyncCallback['js']();}if (1 > --a2l){asyncCallback.all();}}";
          _ele_.innerHTML += "}());";
          fjs.parentNode.insertBefore(_ele_, fjs);
        }
      }
    }
    return child;
  }());


  async = function() {
    if (!arguments.length) {
      return;
    }

    if (isOldIE)
    {
      var stylesheets = [],
        scripts = [];
      for (_o in arguments)
      {
        var _obj = arguments[_o];
        var i = _obj['id'],
                u = _obj['src'],
                t = _obj['type'],
                c = _obj['cb'],
                b = _obj['scripts'];
        
            if (_obj['notOldIE'])
            {
                continue;
            }
        if (!u || !t) {
            console.error("Invalid options in resource", _obj);
            continue;
        }
        if(t == 'js')
        {
            var ele = d.createElement(s);
          ele.src = u;
          if(i)
            {
                ele.id = i;
            }
            if(c)
            {
                ele.onload = c;
            }
            scripts.push(ele)
            for(_s in b)
            {
                ele = d.createElement(s);
            ele.src = b[_s]['src'];
            scripts.push(ele)
            }
        }
        else
        {
            var ele = d.createElement("link");
          ele.rel = "stylesheet"
          ele.href = u;
            if(i)
            {
                ele.id = i;
            }
            stylesheets.push(ele);
        }
      }


      var sc_cb = d.createElement("script"),
            ss_cb = d.createElement("script"),
            all_cb = d.createElement("script");


      sc_cb.text = "window.asyncCallback.js();";
      ss_cb.text = "window.asyncCallback.css();";
      all_cb.text = "window.asyncCallback.all();";
      stylesheets.push(ss_cb);
      scripts.push(sc_cb);
      scripts.push(all_cb);


      for(ss in stylesheets)
      {
        d.getElementsByTagName(s)[0].parentNode.appendChild(stylesheets[ss]);
      }
      for(sc in scripts)
      {
        d.getElementsByTagName(s)[0].parentNode.appendChild(scripts[sc]);
      }

      return;
    }

    var ele_list = [];

    for (_o in arguments) {
      var _obj = arguments[_o];

      var _fn = function() {},
        i = _obj['id'],
        u = _obj['src'],
        t = _obj['type'],
        c = _obj['cb'],
        b = _obj['scripts'];

      if (_obj['onlyOldIE']) {
        continue;
      }

      if (!u || !t) {
        console.error("Invalid options in asynchronous resource", _obj);
        continue;
      }

      switch (t) {
        case 'js':
          var ele = d.createElement(s);
          ele.async = true;
          ele.src = u;
          a2l++;
          j2l++;
          var _fn = function() {
            c && c();

            if (1 > --j2l) {
              asyncCallback['js']();
            }
            if (1 > --a2l) {
              asyncCallback.all();
            }
          };

          break;
        case 'css':
          var ele = d.createElement("link");
          ele.rel = "stylesheet"
          ele.href = u;
          a2l++;
          c2l++;
          var _fn = function(dont_skip_callback) {
            if (!dont_skip_callback) {
              c && c();
            }
            if (1 > --c2l) {
              asyncCallback['css']();
            }
            if (1 > --a2l) {
              asyncCallback.all();
            }
          };

          break;
        default:
          continue;
          break;
      }
      if (i) {
        ele.id = i;
      }
      var eleClass = "async" + String(Math.random() * 9007199254740992);
      ele.setAttribute('class', eleClass);
      if (typeof b == "object" && b.length) {
        ele.scriptsnb = b.length;
        ele.scriptsdone = 0;
        ele.loaded = false;

        loader = new Loader({
          'elementClass': eleClass,
          'fn': _fn,
          'callback': function(req) {

            var ele = d.getElementsByClassName(loader.elementClass)[0];
            var asynctext = req.responseText.removeComments() || "";
            ele.callscript = ele.callscript + asynctext;
            loader.script = loader.script + asynctext;
            ele.scriptsdone++;
            this.finished();
          }
        });
        loader.addRequests(b);

        ele.onload = ele.onerror = function(e) {
          loader.fn(true);
          e.target.loaded = true;
          loader.finished();
        }
      } else {
        ele.onerror = ele.onload = _fn;
      }
      ele_list.push(ele);
    }
    for (_e in ele_list) {
      d.getElementsByTagName(s)[0].parentNode.insertBefore(ele_list[_e], d.getElementsByTagName(s)[0]);
    }
  };
}(document, 'script', navigator));