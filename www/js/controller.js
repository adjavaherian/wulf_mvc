jQuery.extend({

	Controller: function(model, view){

		// listen to the view
		var vlist = $.ViewListener({

            loadJson : function(){

                var data = {'id':'true'};

                model.getJSON(view.config.baseURL, data, function(response){
                    console.log(response.employees);
                    $.each(response.employees, function(key, val) {
                        view.updateMessages(val.name);  // or val['name']
                    });

                });

            },

            loadHtml : function(){
				model.getHtml();
			}

		});
		view.addListener(vlist);

		// listen to the model
		var mlist = $.ModelListener({

			loadFail : function() {
				view.updateMessages("ajax error");
			},
			loadFinish : function(data){
                view.updateMessages(data);

			}
		});
		model.addListener(mlist);
	}

});
