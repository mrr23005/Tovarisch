const router = require('express').Router()
const { User } = require('../db/models')

router.get('/', async (req, res) => {
	try {
		const allUsers = await User.findAll({ raw: true })
		res.json( allUsers )
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
