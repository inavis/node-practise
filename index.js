// const { request, response } = require("express");
// const express = require("express"); // 3rd party library
// const {MongoClient} = require("mongodb");

import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env)

const app = express();
const PORT=9000;

//offline mongodb
// const MONGO_URL="mongodb://localhost:27017";
//mongodb+srv://sivani:<password>@cluster0.jeflz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//online mongodb
//dont commit to github with this as it has password

//hiding URL into -> saving url in .env file
const MONGO_URL=process.env.MONGO_URL;

//takes some time to connect so using async and await
async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo DB connected");
    return client;
}
const client = await createConnection();

//applying middleware to all APIS, instead of specific
app.use(express.json())

const movies =[
    {
    "id": "104",
    "name": "Interstellar",
    "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    "rating": 8.6,
    "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E",
    "language": "english"
    },
    {
    "id": "100",
    "name": "Iron man 2",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    "rating": 7,
    "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    "trailer": "https://www.youtube.com/embed/wKtcmiifycU",
    "language": "english"
    },
    {
    "id": "101",
    "name": "No Country for Old Men",
    "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    "rating": 8.1,
    "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    "trailer": "https://www.youtube.com/embed/38A__WT3-o0",
    "language": "english"
    },
    {
    "id": "102",
    "name": "Jai Bhim",
    "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    "rating": 8.8,
    "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA",
    "language": "tamil"
    },
    {
    "id": "103",
    "name": "The Avengers",
    "rating": 8,
    "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8",
    "language": "english"
    },
    
    {
    "id": "105",
    "name": "Baahubali",
    "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    "rating": 8,
    "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI",
    "language": "telugu"
    },
    {
    "id": "106",
    "name": "Ratatouille",
    "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    "rating": 8,
    "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w",
    "language": "english"
    }
    ]
  

app.get("/",(request,response)=>{
    response.send("Hello World");
});

//Like API in mockAPI
// app.get("/movies",(request,response)=>{
//     response.send(movies);
// })

//specific objects from API
app.get(`/movies/:index`,async (request,response)=>{
    console.log(request.params.index) //op: { index: '100' }

    //getting index from request.params
    const {index} =request.params;

    //filter returns array of object, to get object alone -> destructuring it
    // const [obj]=movies.filter(({id})=> id===index);

    //send the specific object alone
    // response.send(obj);

    //uisng find
    // const obj=movies.find(({id})=> id===index);

    //from mongodb
    //takes some time to get data so use async await
    const obj =await client.db("practise").collection("movies").findOne({"id":index});
    // response.send(obj);
    obj?response.send(obj):response.status(404).send({message:"Error"});
})

//DELETE
app.delete(`/movies/:index`,async (request,response)=>{
    console.log(request.params.index) //op: { index: '100' }

    //getting index from request.params
    const {index} =request.params;
    //from mongodb
    //takes some time to get data so use async await
    const obj =await client.db("practise").collection("movies2").deleteOne({"id":index});
    
    //if no related object found- set status 404 and send error
    response.send(obj)
})

// //QUERY PARAMETER
// app.get("/movies",(request,response)=>{

//     const {languages,ratings} = request.query

//     console.log(request.query,languages,ratings)

//     let filteredmovies=movies; //if no condition matches all movies are returned

//     if(languages){
//         filteredmovies=filteredmovies.filter(({language})=>language===languages);
//     }
//      if(ratings){
//         filteredmovies = filteredmovies.filter(({rating})=>rating===+ratings);
//     }

//     response.send(filteredmovies);

// })
// //QUERY PARAMETER
app.get("/movies",async (request,response)=>{

    // const {language,rating} = request.query

    console.log(request.query)

    // const movie =await client.db("practise").collection("movies").find({}).toArray();
    // console.log("m)ovie",movie)
    // let movie = await client.db("practise").collection("movies2").find({}).toArray();;    
    // if(languages){
    //      movie =await client.db("practise").collection("movies2").find({"language":languages}).toArray();
    // }
    // if(ratings){
    //     movie =await client.db("practise").collection("movies2").find({"rating":+ratings}).toArray();
    // }
    // if(languages && ratings){
    //     console.log("both")
    //     movie =await client.db("practise").collection("movies2").find({"rating":+ratings,"language":languages}).toArray();
    //     console.log(movie)
    // }


    //find({"rating":+ratings,"language":languages})
    //what we are passing is query parameter only
    if(request.query.rating)request.query.rating = +request.query.rating; //changing ratin5g to number
    console.log(request.query)
     let movie = await client.db("practise").collection("movies2").find(request.query).toArray();    
    
    response.send(movie);

})


//CREATING / ADDING NEW OBJECT
//using middleware to convert body data to JSON, not TEXT
app.post("/movies",async (request,response)=>{
   const newmovies = request.body;
    console.log(newmovies)
    let result = await client.db("practise").collection("movies2").insertMany(newmovies);
    response.send(result);
})

app.listen(PORT,()=>console.log("Server has started in "+PORT));