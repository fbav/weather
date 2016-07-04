'use strict';
var WeatherItem = React.createClass({

    overHandler: function(){

		this.props.onMouseOver(this.props.dt);
    },

    render: function(){

	   var iconSrc = "http://openweathermap.org/img/w/" + this.props.icon + ".png",
		   maxTemp = Math.round(this.props.maxTemp),
	       minTemp = Math.round(this.props.minTemp),
		   formattedDate = moment.unix(this.props.dt).format("dddd MMMM Do YYYY"),
		   weatherDetails = (this.props.currentId === this.props.dt)? this.props.weatherDetails : '';

        return (			
            <div id="weatherItem" onMouseOver={this.overHandler}>
				{formattedDate} <br/>
				<div id="temperature"><img src={iconSrc} /> {maxTemp} °C</div>
				 {this.props.description}
				 <ul id="details">
				 {weatherDetails}
				</ul>
				<hr />	
            </div>			
        );
    }
});

var WeatherDetails = React.createClass({

    render: function(){

	   var iconSrc = "http://openweathermap.org/img/w/" + this.props.icon + ".png",
		   maxTemp = Math.round(this.props.maxTemp),
	       minTemp = Math.round(this.props.minTemp),
		   formattedTime = moment.unix(this.props.dt).format("LT");

        return (			
            <li>
				{formattedTime}
				<img src={iconSrc} /> {maxTemp} °C
            </li>			
        );
    }

});


var WeatherForecast = React.createClass({

    getInitialState: function(){
        
        return { weather: [] };
    },

    componentDidMount: function(){

        var self = this;

        var url = 'http://api.openweathermap.org/data/2.5/forecast/city?id=2643743&APPID=bc7a85f8ac5b48c5e38dc4360b8e7cf6&units=metric';
		
		//var url = 'data/london.json';

        $.getJSON(url, function(result){
            if(!result){
				console.log("Error loading data");
				self.setState({ error: "Error loading data" });
                return;
            }

			var id = 0;
            var weather = result.list.map(function(data){
				
                return { 
					id: id++,
					dt: data.dt,
					dt_txt: data.dt_txt,
					maxTemp: data.main.temp_max,
					minTemp: data.main.temp_min,
					description: data.weather[0].description,
					icon: data.weather[0].icon 
                };

            });
			
			var city = result.city.name;

            self.setState({ weather: weather, city: city });

        }).done(function() {
			console.log( "second success" );
		}).fail(function() {
			console.log("Error loading data");
			 self.setState({ error: "Error loading data" });
		}).always(function() {
			console.log( "complete" );
		});

    },
	
	rollOver: function(id) {
		var todaysWeather = [];
		var current = moment.unix(id);
		var details = this.state.weather.map(function(data){
			var compare = moment.unix(data.dt)
			if(moment(current).isSame(moment(compare), 'day')) {
				todaysWeather.push(data);
			}	         
        });

		
		this.setState({details: todaysWeather, currentId: id});
	},
	

    render: function() {
		var self = this;
		
		if(this.state.error) {
			return (
				<div>
					There was an error loading the weather forecast....
				</div>
			);
		}
		
		var city = this.state.city;
		var details = (this.state.details)? this.state.details : null;
		var currentId = (this.state.currentId)? this.state.currentId : null;
		
		if(details){
			var weatherDetails = this.state.details.map(function(data){
				return <WeatherDetails id={data.id} dt={data.dt} date={data.dt_txt} maxTemp={data.maxTemp} minTemp={data.minTemp} description={data.description} icon={data.icon}/>
			});
		}
		
		//We want to get the maximum temperature from the first day items 
		var firstItem = this.state.weather[0];
		if(firstItem){			
			var firstMaxTemp = Utils.findMaxTemp(this.state.weather, this.state.weather[0].dt);
		}
		
		//Let' display the highest remperature expected for the day		
        var info = this.state.weather.map(function(data){
			//Max temp for first day - we can't use time as a marker, because this set changes depending on the time of day. Items on the other days have a consistent set of items.
			if(firstMaxTemp[firstMaxTemp.length - 1].dt === data.dt) {
				return <WeatherItem key={data.id} dt={data.dt} date={data.dt_txt} maxTemp={data.maxTemp} minTemp={data.minTemp} description={data.description} icon={data.icon} weatherDetails={weatherDetails} currentId={currentId} onMouseOver={self.rollOver}/>
			}
			
			//We assume for the [urpose of this exercise that the maximum temperature for the day happens at 15:00 Stanadard time or 16:00 Summer time]
			else if(data.dt_txt.includes("15:00:00") && data.id > firstMaxTemp.length){
				return <WeatherItem key={data.id} dt={data.dt} date={data.dt_txt} maxTemp={data.maxTemp} minTemp={data.minTemp} description={data.description} icon={data.icon} weatherDetails={weatherDetails} currentId={currentId} onMouseOver={self.rollOver}/>
			}            
        });

        if(!info.length){
            info = <p>Loading forecast...</p>;
        }		

        return (
            <div>
                <h1>5 Day Forecast for {city}</h1>
                <div> {info} </div>
            </div>
        );
    }
});


ReactDOM.render(
    <WeatherForecast/>,
    document.getElementById('container')
);
