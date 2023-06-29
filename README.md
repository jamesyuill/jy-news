# JY News API

Hi there,

Welcome to the very first API I have ever created.

You can access all the endpoint fun [here](https://jy-news.onrender.com/api/).

This news API is a project completed during my time on the Northcoders Software Development course. It was a practical exercise to cement our knowledge of setting up a server, first locally, then remotely. It was a chance to impliment asynchronous code and to get familiar with SQL queries, as well as mitigating for SQL injection using Postgres' dollar syntax and the principles of greenlisting for user input.

The project was built using Test Driven Development, RESTful API constraints and MVC.


### Cloning

In order to clone and run this project locally, you will need to type the following command into your terminal:  

<i>git clone https://github.com/jamesyuill/jy-news.git</i>

Once this is cloned, open the file up in your IDE of choice.

Firstly, you will need to install dependencies. In your IDE terminal run the following command:

<i>npm install</i>

Provided this has completed, you should have all the dependencies needed to run this repo.

*Please note, you should have at least version "^8.7.3" of Postgres and "v18.16.0" of Node.js.*

You will then need to create the two environment variable files (.env.) in the top level of the folder (making sure to .gitignore them, I realise how pointless that is, given that I go on to give you the exact information)

The first will be ".env.test". This will contain "PGDATABASE=nc_news_test"

The second will be ".env.development". This will contain "PGDATABASE=nc_news"
