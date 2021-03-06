// Generated by CoffeeScript 1.3.3
(function() {
  var LunchLister, LunchView, app, syncFetchUrl,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.log = function() {
    if (this.console) {
      console.log(Array.prototype.slice.call(arguments));
    }
  };

  window.dosubmit = function() {
    return log("Submitting");
  };

  LunchView = (function(_super) {

    __extends(LunchView, _super);

    function LunchView() {
      return LunchView.__super__.constructor.apply(this, arguments);
    }

    LunchView.prototype.initialize = function() {
      var ts;
      log("initializing view");
      ts = $("#food-entry-template").html();
      log("template is", ts);
      this.tmpl = Handlebars.compile(ts);
      return this.places = [];
    };

    LunchView.prototype.addResponse = function(placename, response) {
      var pent;
      log("adding", placename, response);
      pent = {
        placename: placename,
        food_entries: response.courses
      };
      return this.places.push(pent);
    };

    LunchView.prototype.render = function() {
      var rendered;
      rendered = this.tmpl({
        places: this.places
      });
      this.$el.html(rendered);
      return this;
    };

    return LunchView;

  })(Backbone.View);

  syncFetchUrl = function(url, cb) {
    var request;
    log("fetching", url);
    request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    log("Completed status", request.status);
    if (request.status === 200) {
      log(request.responseText);
      return cb(JSON.parse(request.responseText));
    }
  };

  LunchLister = (function() {

    function LunchLister() {
      log("Hello!");
    }

    LunchLister.prototype.start = function() {
      var d, dstring, id, name, places, promises, url, urlForPlace, _i, _len, _ref,
        _this = this;
      $("#sub").on("click", function() {
        return log("Nappia!");
      });
      this.lv = new LunchView;
      log("starting");
      log("getting");
      "jQuery.getFeed\n  url: url,\n  success: -> log \"jee!\"";

      syncFetchUrl("http://www.osnews.com/", function() {
        return 0;
      });
      d = new Date();
      dstring = "" + (d.getFullYear()) + "/" + (d.getMonth() + 1) + "/" + (d.getDate());
      urlForPlace = function(placeid) {
        return "http://www.sodexo.fi/ruokalistat/output/daily_json/" + placeid + "/" + dstring + "/fi?mobileRedirect=false";
      };
      places = [["Hermia 3", 731], ["Hermia 6", 424]];
      promises = [];
      for (_i = 0, _len = places.length; _i < _len; _i++) {
        _ref = places[_i], name = _ref[0], id = _ref[1];
        url = urlForPlace(id);
        syncFetchUrl(url, function(resp) {
          log("Got", resp, "for", url);
          return _this.lv.addResponse(name, resp);
        });
      }
      log("Should render now!");
      return $("#menu-area").append(this.lv.render().el);
    };

    return LunchLister;

  })();

  window.app = app = new LunchLister;

  $(function() {
    return app.start();
  });

}).call(this);
