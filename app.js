// 17.3 Assignment
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));



// Drill #1 
//localhost:8000/sum?a=1&b=2
app.get('/sum', (req, res) => {
    //retrieve values from request
    const a = req.query.a;
    const b = req.query.b;

    //validation
    if(!a) {
        return res.status(400).send("Please provide a number");
    }
    if(!b) {
        return res.status(400).send("Please provide a second number");
    }

    //process request
    const c = parseInt(a) + parseInt(b);
    
    //construct response
    const statement = `The sum of ${a} and ${b} is ${c}.`
    
    //send response
    res.send(statement);
})



// Drill #2 
//localhost:8000/cipher?text=abz&shift=1
app.get('/cipher', (req, res) => {
    //retrieve values from request
    const text = req.query.text;
    const shift = parseInt(req.query.shift);

    //validation
    if(!text){
        return res.status(400).send("Please provide text.");
    }
    if(!shift){
        return res.status(400).send('Please provide shift.');
    }
    if(shift<0 || shift >= 26){
        return res.status(400).send('Please provide shift number between 1-25');
    }
    
    //process request
    let result="";

    for(let i=0; i<text.length; i++){
        let c = text.charCodeAt(i);
        if (65<=c && c<=90) {
            result += String.fromCharCode((c-65+shift)%26+65);
        } else if (97 <=c && c<=122) {
            result += String.fromCharCode((c-97+shift)%26+97);
        } else {
            result += text.charAt(i);
        }
    }
   
    //return response
    res.send(result);
})



// Drill #3 
//localhost:8000/lotto?arr=1&arr=2&arr=3&arr=4&arr=5&arr=6
app.get('/lotto', (req, res) => {
    //retrieve values from request
    const inputArray = req.query.arr.map(element=>parseInt(element));

    //validation
    inputArray.forEach(element=> {
        if(element <= 0 || element > 20){
            return res.status(400).send('Numbers must be between 1-20.')
        }
    })

    //process request
    const array = [];
    const max = 20;
    const min = 1;
    const arrayLength = 6;

    while(array.length<6){
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if(!array.includes(num)){
            array.push(num);
        }
    }

    let count = 0;
    
    for(let i=0; i<arrayLength; i++){
        if(array.includes(inputArray[i])){
            count+=1;
        };
    }

    //uncomment below to see how the results ran
    /*
    res.json({
        inputArray,
        array,
        count
    })
    */
    
    //send response
    if(count==6) {
        res.send("Wow! Unbelievable! You could have won the mega millions.")
    }
    else if(count==5) {
        res.send("Congratulations! You win $100.")
    } else {
        res.send("Sorry, you lose.")
    }
});


//the server needs to listen to a specific port so that requests to that port will be correctly routed to the server
app.listen(8000, ()=> {
    console.log('Express server is listening on port 8000!');
})


