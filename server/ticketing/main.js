

const Main = (req,res) => {
	const path = req.originalUrl.replace(req.route.path.slice(0, -2),"");
	const route = path.split("/")[1];

	/*switch(route) {
		case "partners"
	}*/

	res.send("dope")
	return { req, res }
}
          
module.exports = Main
