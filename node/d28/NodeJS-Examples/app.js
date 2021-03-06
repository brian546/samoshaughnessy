// General Initialization
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development' 
const port = process.env.PORT;

// Dependency Injection for Routers and Service
const ViewRouter = require('./ViewRouter');

const { GroupRouter,
        UserRouter} = require('./routers');

const { GroupService,
        UserService} = require('./services');

const JsonFile = require('./stores/JsonFile');

let groupService = new GroupService(new JsonFile('groups.json'));
let userService = new UserService(new JsonFile('users.json'));




const {app} = require('./utils/init-app')();

app.get('/', function(req,res, next){
    console.log('Im going to get the index')
    next()
    
})


app.use('/',new ViewRouter().router());
app.use('/api/groups',new GroupRouter(groupService).router());
app.use('/api/users',new UserRouter(userService).router());


app.listen(port,()=>{
    console.log(`Application started at port:${port}`);
});