jQuery.extend({
	Model: function(){

        // a reference to ourselves
		var that = this;

		// who is listening to us?
		var listeners = new Array();


		/**
		 * load data from the PHP server (php mod required on server)
		 * or return data from cache if it's already
		 * loaded
		 */

		this.getJSON    = function(url, data, callback){

			$.ajax({
				url: url,
				data : data,
				type: 'GET',
				dataType: 'json',
				timeout: 1000,
                error: function(err){
                    console.log(err);
                    callback( "content load failure: "+ url);
                },
                success: function(data){
                    console.log('get success: '+url);
                    callback(data);
                }
			});
		}

        this.getHtml     = function(){

            $.ajax({
                url: 'php/ajax.php',
                type: 'GET',
                dataType: 'html',
                timeout: 1000,
                error: function(){
                    that.notifyLoadFail();
                },
                success: function(data){
                    that.notifyLoadFinish(data);
                }
            });
        }


		// add a listener to this model
		this.addListener        = function(list){
			listeners.push(list);
		}

        // provide listeners with the data we've loaded
        this.notifyLoadFinish   = function(data){
            $.each(listeners, function(i){
                listeners[i].loadFinish(data);
            });
        }

        // loading might have failed
		this.notifyLoadFail     = function(){
			$.each(listeners, function(i){
				listeners[i].loadFail();
			});
		}

	},

	// let people create listeners easily
	ModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadFinish  : function(data)    { },
			loadFail    : function()        { }
		}, list);
	}
});
