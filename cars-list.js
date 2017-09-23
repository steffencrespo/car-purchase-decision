const MY_FUTURE_CARS = {
	"listName": "next sports car",
	"cars": [
		{
			"id":"1",
			"make":"BMW",
			"model":"X5",
			"year": "2015",
			"trim":"48i",
			"engine":"4.8 V8",
			"dealerUrl":"",
			"listedPrice":"34000",
			"comments":""
		},
		{
			"id":"2",
			"make":"BMW",
			"model":"740",
			"year": "2015",
			"trim":"i",
			"engine":"3.0 i-6",
			"dealerUrl":"",
			"listedPrice":"50000",
			"comments":""
		},
		{
			"id":"3",
			"make":"Ford",
			"model":"Thunderbird",
			"year": "2005",
			"trim":"Premium",
			"engine":"3.9 V8",
			"dealerUrl":"",
			"listedPrice":"38000",
			"comments":""
		},
		{
			"id":"4",
			"make":"Chevrolet",
			"model":"Camaro",
			"year": "2015",
			"trim":"SS",
			"engine":"6.2 V8",
			"dealerUrl":"",
			"listedPrice":"23700",
			"comments":""
		},
	]
}

function getCarsListForUser(userId, listId) {
	return MY_FUTURE_CARS;
}

module.exports = {getCarsListForUser};