# RealThyme

First time Node.js / Mongo / Express project: to develop a real-time voting web app in a weekend (April 18th - 20th 2014).

## Setup
1. Clone this repo.
2. Make sure you have MongoDB installed. Run `mongod --dbpath data` to setup the database.
3. Run `npm install` to install all dependencies.
4. Run `node app.js` to start the server.
5. Visit `http://127.0.0.1:3000` to access the site.

## "Worst. Code. Ever." ~You, probably
I'll be honest, there's probably a bunch of mistakes in this, and things that can be done 1000x better. I'd be grateful if you pointed me in the right direction if you spot anything I'm doing wrong. I'm learning as I go, thanks!

## Tests
Mocha is being used to handle tests.

1. Install Mocha globally by running `npm install -g mocha`.
2. Move to the tests directory `cd tests`.
3. Run `mocha`.

## Todo
- Allow users to add multiple choices when creating a poll
- Real time voting system (comparative = measures the +ve/-ve reaction to a choice over time in comparison to the other choices | cumulative = measures the overall +ve/-ve reaction to a choice over time)
- Implement sockets.io for real time data pushing
- Prevent a single user voting multiple times on one poll (or allow them to vote once every n minutes)
- Replace chart.js
- Prevent multiple choices sharing the same name