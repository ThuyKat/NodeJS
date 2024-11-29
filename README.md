# NodeJS basics
1. Understand Node.js
- Node.js is a JS runtime built on V8 JS engine. JS is the language, engine is something that run JS that is built inside browser. Context of browser contains DOM surrounding the JS engine. If we take V8 engine out of browser, we put it in NodeJS context. It leverages V8 engine, provides richer context - APIs that you would expect in normal programming environment, to access different system resources of local computer for example memory, file system, I/O, network, etc.
2. Setup, write and execute code
- Setup: download the nodeJS Long-term support- more stable version/current- for frequently updated -> use current for practice -> npm is installed in user local bin -> it is in system PATH : 
    **PATH**: environment variable that specifies a set of directories where executable programs are located. 

        1/ it allows users to run executable programs from any location in the command line without specifying the full path to the program. 
        
        2/ when a command is entered in a terminal or command prompt, the system searches through the directories listed in the PATH to find and execute the program. 
    ==> it eliminates the need to navigate to specific directories or type of full file paths
    **Node version manager** : if you work on other people's code and they have complatility issue -> install nvm 
         1/ install script
         2/ create .bashrc file: vi ~/.bashrc -> paste the command to load nvm
         3/ nvm -v? if not found -> source ~/.bashrc
         4/ install a version of node: nvm install node_version -> node is switched to desirable version / nvm install node -> install the latest version of node
    **Node Read-Evaluate-Print-Loop (REPL)** : -> type "node" -> node prompt: let you write JS code and execute it

    **When to use NodeJS**: 
        NodeJS is single-threaded, run through a queue of event. 
           1. non-blocking
            **Event loop** : loop of execution, looking at the queue, take and execute event -> when we want events to happen after a network call, NodeJS will put those even to the queue to be executed immediately after network call is done ->asynchronous works because of callbacks
          
           
        2. event-driven 
            NodeJS excels at responding to events and managing real-time applications. This makes it particularly well-suited for: web servers, real time application, projects with  schema-less, flexible object models, build tools for SPAs
            NodeJS is not good for: data calculations, processor intensive, blocking operations

        3. data-intensive
            Optimized for streaming data and handling data-intensive, but not ideal for complex math calculation, CPU intensive operations, tasks that involve heavy processing or block operations.

        4. I/O intensive
            NodeJS performs well when hanldling multiple I/O operations simultaneously, thanks to its non-blocking nature

3. Understand and use Node.js module system
    **Node module system**
    - Use 'require' to import and execute other file in node. However, if we want to use the function in the file we import in the current file we will not be able to do so. -> encapsulating nature of js file
4. Code organisation, exports and imports
    - A module is encapsulated, if you want to take anything in the module and use it in another file  you need to tell nodeJS your intention by using 'exports' property. 
     e.g: module.export = add;
     In other file: var addFn = require('./add.js')
     --> now I can use add function in test.js
    - We can export multiple properties and function by exporting an object: module.exports = {add: add, subtract:subtract}. It works the same as: 
        module.exports.add = add;
        module.exports.subtract = subtract;
        ===> in other file, we can use destructuring object format to get all of theses functions and properties with 'require'
    - module.exports can be shorthanded as 'exports' -> this way we use exports as an alias of module.exports : var exports = module.exports. However, when we write exports = add, we assign a new (undeifned) value to export and it doesn't take reference to module.exports -> be careful with this! --> to use only " exports", we need to write: exports.add = add. In summary, two ways which we can use : 
        1/ exports.add = add
        2/ module.exports = add
    

5. Starting a web server using Node.js
    - 'require' with NodeJS APIs: fs.writeFileSyc, readline.createInterface
    - Third party APIs:
6. Writing a command line utility
