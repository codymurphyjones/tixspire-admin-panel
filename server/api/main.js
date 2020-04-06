const Hubspot = require('hubspot')
const hubspot = new Hubspot({
  apiKey: '73c6c801-b156-412a-8041-91fd93699507',
  checkLimit: false // (Optional) Specify whether to check the API limit on each call. Default: true
})


function getPartners(res,value=[],hasMore = false, offset = 0) {
	hubspot.companies.get({hasMore, offset, properties: ["name","type"]})
  		.then(results => {
				let companies = []
				let valueNoIndex = [];
				let index = 0;
				results.companies.map(item => {
					if(item.properties["type"]) {
						const {name, type} = item.properties;
						companies.push({name: name.value, type: type.value, id: item.companyId});
					}
				})
				
				val =[ ...value,...companies ]
				if(results["has-more"]) {
					getPartners(res,val,results["has-more"],results["offset"])
				}
				else {
				
					res.json(val)
				}
  		})
  		.catch(err => {
    		console.error(err)
		  })
}

const Main = (req,res) => {

	const path = req.originalUrl.replace(req.route.path.slice(0, -2),"");
	const route = path.split("/")[1];

	switch(route) {
		case "partners":
			getPartners(res);
		break;

		default:
			res.send("API call is invalid")
		break;

	}

	
		  
	
	return { req, res }
}
          
module.exports = Main