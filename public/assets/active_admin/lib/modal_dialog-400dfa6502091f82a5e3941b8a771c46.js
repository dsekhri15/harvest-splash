(function() {
  ActiveAdmin.modal_dialog = function(message, inputs, callback) {
    var elem, html, klass, name, opts, ref, ref1, type, v, wrapper;
    html = "<form id=\"dialog_confirm\" title=\"" + message + "\"><ul>";
    for (name in inputs) {
      type = inputs[name];
      if (/^(datepicker|checkbox|text)$/.test(type)) {
        wrapper = 'input';
      } else if (type === 'textarea') {
        wrapper = 'textarea';
      } else if ($.isArray(type)) {
        ref = ['select', 'option', type, ''], wrapper = ref[0], elem = ref[1], opts = ref[2], type = ref[3];
      } else {
        throw new Error("Unsupported input type: {" + name + ": " + type + "}");
      }
      klass = type === 'datepicker' ? type : '';
      html += ("<li>\n<label>" + (name.charAt(0).toUpperCase() + name.slice(1)) + "</label>\n<" + wrapper + " name=\"" + name + "\" class=\"" + klass + "\" type=\"" + type + "\">") + (opts ? ((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = opts.length; i < len; i++) {
          v = opts[i];
          if ($.isArray(v)) {
            results.push("<" + elem + " value=" + v[1] + ">" + v[0] + "</" + elem + ">");
          } else {
            results.push("<" + elem + ">" + v + "</" + elem + ">");
          }
        }
        return results;
      })()).join('') : '') + ("</" + wrapper + ">") + "</li>";
      ref1 = [], wrapper = ref1[0], elem = ref1[1], opts = ref1[2], type = ref1[3], klass = ref1[4];
    }
    html += "</ul></form>";
    return $(html).appendTo('body').dialog({
      modal: true,
      dialogClass: 'active_admin_dialog',
      buttons: {
        OK: function() {
          callback($(this).serializeObject());
          return $(this).dialog('close');
        },
        Cancel: function() {
          return $(this).dialog('close').remove();
        }
      }
    });
  };

}).call(this);
