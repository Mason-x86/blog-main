const express = require('express')
const router = express.Router()
const Article = require('./../models/article')

router.get('/new', (req, res) => { 
    res.render('articles/new', {article: new Article() })
})

router.get('/about_me', (req, res) =>  {
    res.render('articles/about_me')
})

router.get('/contact_me', (req, res) =>  {
    res.render('articles/contact_me')
})

router.get('/snake', (req, res) =>  {
    res.render('articles/snake')
})

router.get('/dissertation', (req, res) =>  {
    res.render('articles/dissertation')
})



router.get('/mark_down_blog', async (req, res) => {
    try {
        const articles = await Article.find()
        res.render('articles/mark_down_blog', { articles: articles })
    } catch (e) {
        console.log(e)
    }
});
  

router.get('/:id', async (req, res) => {

    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})



router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/mark_down_blog${article.id}`)
    } catch (e) {
        console.log(e)
        res.render('articles/new', { article: article })
    }
    
})

module.exports = router;
