a = "23";
b = "25";

const numA = parseFloat(a);
const numB = parseFloat(b);

if(Number.isNaN(numA)) {
    return res
        .status(400)
        .send('a must be a number');
}

//vs.

if(isNaN(numA)) {
    return res
        .status(400)
        .send('a must be a number');
}



