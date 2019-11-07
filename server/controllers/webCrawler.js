 const puppeteer = require('puppeteer');
 const $ = require('cheerio');

 const handleScrap = (req, res) => {
     console.log(req.body.input)
     const addaptReq = req.body.input.replace(' ', '%20'); //make req format as soundcloud
     const url = `https://soundcloud.com/search?q=${addaptReq}`;
     let myBrowser;

     puppeteer
         .launch()
         .then(browser => {
             myBrowser = browser;
             return myBrowser.newPage();
         })
         .then(page => {
             return page.goto(url).then(() => {
                 return page.content();
             });
         })
         .then(html => {
             const results = []
             $('a.soundTitle__title', html, ).each((index, result) => {
                 let songName = $('span', result).text()
                 let songURL = $(result).attr('href')
                 results.push({ name: songName, URL: songURL })
             })
             res.json(results)
         }).then(() => {
             myBrowser.close()
         })
         .catch(err => {
             res.status(400).json('unable to work with API')
         });
 }


 module.exports = {
     handleScrap
 }