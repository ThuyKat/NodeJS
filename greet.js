
// API to accept user's input

const readline = require('readline');
const fs = require('fs');

// write something to the file
const writeNameToTheFile = (name) =>{
    fs.writeFileSync('output.txt',`Hello ${name}`, error=>{
        console.error("error writing to file");
    });
}


const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question('What is your name?',(answer)=>{
    rl.close();
    writeNameToTheFile(answer);
})





