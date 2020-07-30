
const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '24a488c715dc4f319a7465a0314a6dbc'
});

const handleApiCall = (req, res) => {
	   app.models
	      .predict(
	        Clarifai.FACE_DETECT_MODEL, 
	        req.body.input)
		.then(data => {
			res.json(data)
		})
		.catch(err => res.status(400).json(err))
}

const handleimage = (req, res, db) => {
	const { id } = req.body;

	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0])
	  })
	  .catch(err => {
	  	res.status(400).json('Not updated')
	  })
}

module.exports = {
	handleimage: handleimage,
	handleApiCall
}