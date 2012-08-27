window.log = ->
    console.log Array::slice.call arguments if @console
    return

window.dosubmit = ->
    log "Submitting"



class LunchView extends Backbone.View
    initialize: ->
        log "initializing view"
        ts = $("#food-entry-template").html()
        log "template is",ts
        @tmpl = Handlebars.compile ts
        @places = []
    
        

    addResponse: (placename, response) ->
        
        log "adding", placename, response
        pent =
            placename: placename
            food_entries: response.courses
            
        @places.push pent
            
        
                    
            
        
    render: ->
        rendered = @tmpl        
            places: @places
                    
        @$el.html rendered
        
        @
        
                    


class LunchLister
    constructor: ->
        log "Hello!"
        
    start: ->
        $("#sub").on "click", =>
            log "Nappia!"            
            
            
        @lv = new LunchView
            
        log "starting"
        #url = "http://www.sodexo.fi/ruokalistat/output/daily_json/731/2012/8/23/fi?mobileRedirect=false"

        #url = "http://www.sodexo.fi/ruokalistat/output/daily_json/424/2012/8/23/fi?mobileRedirect=false"
        
        #url = "http://www.sodexo.fi/ruokalistat/rss/weekly_rss/731/fi"

    
        log "getting"
    
        
        """
        jQuery.getFeed
          url: url,
          success: -> log "jee!"
        """  
        
        

        d = new Date()
        dstring = "#{d.getFullYear()}/#{d.getMonth()+1}/#{d.getDate()}"
        
        #new Date().toString("yyyy/MM/
        urlForPlace = (placeid) ->
            return "http://www.sodexo.fi/ruokalistat/output/daily_json/#{placeid}/#{dstring}/fi?mobileRedirect=false"
            

        places = [
            ["Hermia 3", 731],
            ["Hermia 6", 424]]
        
        promises = []    
        for [name,id] in places
            
            url = urlForPlace id
            do (name, url) =>
                log "Sending request for ",url
                promises.push $.ajax
                    url: url
                    async: false
                    dataType: "json"
                    success: (resp) =>
                        log "Got",resp, "for",url
                        @lv.addResponse name, resp
        
        
        $.when.apply($, promises).done =>
            log "Should render now!"
            $("#menu-area").append(@lv.render().el)
                
    
window.app = app = new LunchLister
        
$ ->
    app.start()
    
#app = Jsr
        
        