const express = require('express')
const app = express()
const Nunjucks = require('nunjucks')

Nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const verificaIdade = (req, res, next) => {
  const { age } = req.query
  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.get('/major', verificaIdade, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', verificaIdade, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age > 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen(3000)
