const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { User } = require('../../db/models')
const checkSession = require('../middleware/checkSession')
const saltRounds = 5

router.route('/register')
  .get(checkSession, (req, res) => {
    let years = []
    for (let year = 2018; year <= 2077; year++) {
      years.push(year)
    }
    const groups = ['Лисы', 'Волки', 'Орлы', 'Совы', 'Пчёлы', 'Медведи', 'Еноты', 'Бобры', 'Ежи']
    res.render('register', { years, groups })
  })
  .post(async (req, res) => {
    try {
      const {
        email, password, name, group, end
      } = req.body.inputs
      const hashedPass = await bcrypt.hash(password, saltRounds)
      const newUser = await User.create({
        email, password: hashedPass, name, group, end
      })

      req.session.userId = newUser.id
      req.session.userName = newUser.name

      res.sendStatus(200)
    } catch (err) {
      res.sendStatus(500)
    }
  })

router.route('/login')
  .get(checkSession, (req, res) => {
    res.render('login')
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body.inputs
      const currUser = await User.findOne({
        where: {
          email,
        },
      })
      if (!currUser || !(await bcrypt.compare(password, currUser.password))) {
        return res.sendStatus(500)
      }

      req.session.userId = currUser.id
      req.session.userName = currUser.name

      res.sendStatus(200)
    } catch (err) {
      res.sendStatus(500)
    }
  })

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.clearCookie('elbrusid')
  res.redirect('/')
})


module.exports = router;
