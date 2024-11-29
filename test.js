require('./add.js');
function greet(name){
    console.log("Hello there,"+name+"!");
    
}
greet("thuy");

// add(10,20); -> cannot be used -> every module is encapsulated by default 
//-> require execute the code in add.js and do not keep the context



			


