# Project 5 - Travel App

## Table of Contents

* [About](#about)
* [Pre-requisites](#pre-requisites)
* [APIs used](#apis-used)
* [Get Started](#get-started)
* [What I used](#what-i-used)


## About

This project was built with the goal of completing the course of front-end developer of udacity.

It is a website that allows the user to add future trips. The user enter info about their trip (locations and dates) and they could see more info about it, like some images of the city, the forecast of the first day, the country... 

The user can save the trip in a list and delete it from the list.


## Pre-requisites
* You must have [Node.js](https://nodejs.org/en/) installed


## APIs used

[Geonames](http://www.geonames.org/) -> To get data of the city

[Dark Sky](https://darksky.net/dev) -> To get the weather forecast

[Pixabay](https://pixabay.com/) -> To get images



## Get Started

1. Download files or clone the repository
2. Install all dependencies
    * put `npm install` on the terminal
3. Add dist folder
    * `npm run prod` on the terminal
4. For use all APIs (Geonames, Dark Sky and Pixabay) you must signing up to get an API key
    * Create a `.env` file that contain your `GEONAMES_API_KEY`, `DARK_SKY_API_KEY` and `PIXABAY_API_KEY`
5. For start the server you should run that command in the terminal: `npm start`
    * The server should start on http://localhost:8000/ on your browser
6. You can run the application in developer mode.
    * Run `npm run dev` in the terminal
7. Use `npm run test` for test the project with jest
    * Run it when the server was not running



## What I used

Most important things that I used:
* HTML
* CSS
* SASS
* Javascript
* Express
* Webpack
* Node.js
* Jest