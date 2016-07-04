Utils  = {

	sortByProperty:	function (property) {
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	},
	
	findMaxTemp : function(items, timestamp) {
		var todaysWeather = [];
		var current = moment.unix(timestamp);
		var details = items.map(function(data){
			var compare = moment.unix(data.dt)
			if(moment(current).isSame(moment(compare), 'day')) {
				todaysWeather.push(data);
			}          
        });
		
		todaysWeather.sort(Utils.sortByProperty("maxTemp"));
		return todaysWeather;
	}
}