"use strict";
const express = require("express"); //pulling express file using require
const { response } = require("express");
const routes = express.Router();

const movies = [
    { id: 1, title: "2001: A Space Odyssey", year: 1968, animated: false },
    { id: 2, title: "The Godfather", year: 1972, animated: false },
    { id: 3, title: "The Lion King", year: 1994, animated: true },
    { id: 4, title: "Black Panther", year: 2018, animated: false },
];

// let nextId = 5;

// USING GET
// GET /movies - respond with an array of movies
routes.get("/movies", (req, res) => {
    const minYear = parseInt(req.query.minYear);

    if (minYear) {
        const filteredMovies = movies.filter(movie => movie.year >= minYear);
        res.json(filteredMovies);
    } else {
        res.json(movies);  //only type res.json(movies); if you want to see the whole list of movies
    };
});


// USING GET
//id can be anything but it has to match id after params
routes.get("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404);
        res.send(`No movie with id ${id} exists.`);
    }
});


let nextId = 5; ///////////////// DON'T FORGET THIS!!!!

// USING POST
//to create another item in the array using post
routes.post("/movies", (req, res) => {
    const movie = req.body;
    movie.id = nextId++;
    movies.push(movie);

    res.status(201);
    res.json(movie);
});



// //TO UPDATE using PUT
routes.put("/movies/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let index = movies.findIndex((item) => {
        return item.id === id;
    });
    movies[index] = req.body;
    movies[index].id = id;
    res.status(200);
    res.json(movies[index]);
});


//TO DELETE
routes.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        movies.splice(index, 1);
    }
    res.status(204);
    res.send(); //either send() or json()
});




module.exports = routes; // we are exporting routes for use in server.js