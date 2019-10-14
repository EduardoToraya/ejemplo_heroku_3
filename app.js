const express = require('express')
const omdb = require('./movies.js')

const app = express()

app.get('', function(req, res){
  res.send({
    greeting: 'Hola mundo'
  })
})

app.get('/omdb', function(req, res){
  if(!req.query.search){
    res.send({
      error: "debes enviar un titulo de una pelicula o serie"
    })
  }

  omdb.omdbMovie(req.query.search, function(error, response){
    if( error){
      return res.send({
        error: error
      })
    }
    if(response.seasons){
      var title = response.title
      omdb.omdbSeason(response.title, response.seasons, function(error,response){
        if(error){
          return res.send({
            error:error
          })
        }
        res.send({
          title: title,
          season: response.season,
          episodes: response.episodes
        })
      })
    }
    else{
      res.send(response)
    }
  })

})


app.get('*', function(res, res){
  res.send({
    error: 'Ruta no válida'
  })
})

app.listen(3000, function(){
  console.log('Up and running')
})
