jQuery.extend({

	View: function($console){

        // keep a reference to ourselves
		var that = this;

        // create a global listener array
		var listeners = [];

        that.config = {
            lang: 'EN',
            version: '1A01',
            baseURL: 'php/ajax.php'
        };


        // initialize the view
        that.initializeView     = function(){

            // create buttons to get messages
            $console.append($("<input type='button' value='Load JSON' id='load-json'/>").click(function(){
                that.notifyLoadJson();
            }))

            $console.append($("<input type='button' value='Load HTML' id='load-html'/>").click(function(){
                that.notifyLoadHtml();
            }));

        }


        // misc functions to update the view
        this.updateMessages     = function(str){
            $('#messages').append(str + "<br>");
        }

		// add a listener to this view
		this.addListener        = function(list){
			listeners.push(list);
		}

		// notify all listeners that the user wants to load data
        this.notifyLoadJson   = function(){
            $.each(listeners, function(i){
                listeners[i].loadJson();
            });
        }

		this.notifyLoadHtml   = function(){
			$.each(listeners, function(i){
				listeners[i].loadHtml();
			});
		}


	},

	// let people create listeners easily
	ViewListener: function(list) {
		if(!list) list = {};
		return $.extend({
            loadJson : function() { },
			loadHtml : function() { }
		}, list);
	}

});
