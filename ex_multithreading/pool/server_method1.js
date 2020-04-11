/**
 * Created by kayslay on 8/4/17.
 */
const http = require("http");
const { fork } = require('child_process');
let { EventEmitter } = require('events');

const child = fork(`${__dirname}/fibonacci_runner.js`);
let event = new EventEmitter();

const server = http.createServer(function (req, res) {

    if (req.url == '/fibo') {
        let rand = Math.random() * 10; //generate a random number

        child.send({ num: 3, event: rand });  //send the number to fibonacci_running

        event.once(rand, (value) => { //when the event is called
            res.end(`${value}`)
        })
    } else {
        res.end('hello world');
    }
});

child.on("message", (msg) => event.emit(msg.event, msg.value)); //emt the event event sent

server.listen(8000, () => console.log("running on port 8000"));