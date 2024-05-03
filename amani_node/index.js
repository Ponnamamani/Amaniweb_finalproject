const http = require("http");
const fs = require("fs");
const path = require("path");
const {MongoClient} = require("mongodb");

// Port number that server listens to
const PORT = 3409;

const databaseConnection = async () => {
    const URL = "mongodb+srv://Ammani:Ammani%409872@nurserycluster.5mbblmb.mongodb.net/?retryWrites=true&w=majority&appName=NurseryCluster";
    // Creating a new client for connecting to database
    const client = new MongoClient(URL);
    try{
        //Connects to database
        await client.connect();
        console.info("Database is connected successfully");
        const data = await getNurseryData(client);
        return data;
    }
    catch(err){
        console.error("Error in connecting database : ", err)
    }
    finally{
        //Closing connection to database
        await client.close();
        console.log("Database connection is closed");
    }
}

const getNurseryData = async (client) => {
    //Fetches records from given database
    const cursor = await client.db("Nursery").collection("Plants").find({});
    const results = await cursor.toArray();
    return results;
}

const server = http.createServer(async (req,res)=>{
    if(req.url==="/api"){
        const nurseryData = await databaseConnection();
        console.log(JSON.stringify(nurseryData));
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.writeHead(200,{"content-type":"application/json"});
        res.end(JSON.stringify(nurseryData));
    }
    else{
        let mediaType;
        const fileRoute = path.join(__dirname,"public",req.url==="/"?"index.html":req.url);
        const fileFormat = path.extname(fileRoute);
        switch(fileFormat){
            case ".html":
                mediaType = "text/html";
                break;
            case ".css":
                mediaType = "text/css";
                break;
            case ".js":
                mediaType = "application/javascript";
                break;
            case ".json":
                mediaType = "application/json";
                break;
            default :
                mediaType = "text/plain";
                break;
        }
        fs.readFile(fileRoute,(err,data)=>{
            if(err){
                if(err.code === "ENOENT"){
                    res.writeHead(404,{"content-type":"text/html"});
                    res.end("<h1>404 Page Not Found!</h1>");
                }
                else{
                    res.writeHead(500, { "content-type": "text/plain" });
                    res.end("Internal Server Error");
                }
            }
            else{
                res.writeHead(200,{"content-type": mediaType});
                res.end(data);
            }
        })
    }
});

server.listen(PORT,()=>console.info(`Server is running on ${PORT}`));