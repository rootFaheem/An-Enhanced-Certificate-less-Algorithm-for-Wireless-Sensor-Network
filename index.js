var app=require('express')(); //WEB SERVER (CLIENT SERVER ARCHITECTURE ) FOR EVERY WSN NODE FOR INITIAL CONFIGUTAION
var EC=require('elliptic').ec; //ELIPTIC CURVE INSTANCE
var ellipticCurve=new EC('secp256k1'); //STANDARD FOR ELLIPTIC CURVE eg. secp256k1 p192 p224 p256 p384 p521 curve25519 ed25519
var crypto=require('crypto'); //CRYPTO MODULE FOR DEFFIHELLMAN CODES GENERATE KSAK KPAK
const PORT=process.env.PORT||8003
//DiffHell for Generating KSAK AND KPAK
/*
Using Diff Hell Algorithm we Ensure to Generate a Unique Pair of Mathametical Pair of 
KSAK AND KPAK
*/
var prime_length=3;
var diffhell=crypto.createDiffieHellman(prime_length);
diffhell.generateKeys('hex'); //GENERATE DIFFYHELLMAN KEY IN HEXDECIMAL eg 0-F
var http=require('http').Server(app); //SERVER CREATE
var io=require('socket.io')(http); //SOCKET REAL TIME CONFIGURATIONS eg. EVERY TIME NEW NODES COMES IN EVERY ESN WILL BE NOTIFIED

var nodes=[];
// System Setup
const KSAK=diffhell.getPrivateKey('hex'); //SERVER PRIVAYE KEY FOR ALL WSN NODES
const KPAK=diffhell.getPublicKey('hex'); //SERVER PUBLIC KEY FOR ALL
var clientConfig={};
//EACH TIME WSN CLIENT WILL CONNECT IT WILL CALL connection ON SOCKET
io.on('connection',function(socket){
    /*
        Construction of SSK&PVT
    */
    //CLIENT ASK FOR INITIAL CONFIG FOR INITIATING SERVICES
    socket.on('initiate_node',()=>{
        //EVERY CLIENT WILL BE ADDED IN A ROOM
        socket.join('wsn_room',()=>{
            //GENERATE KEY PAIR FROM ELLIPTIC CURVE FOR EVERY CLIENT
            var key=ellipticCurve.genKeyPair();
            //CLIENT UNIQUE ID
            var UniqueId=Object.keys(socket.rooms)[0];
            //GENERATE PUBLIC KEY <X,Y> POINT
            var Key=key.getPublic();
            clientConfig[UniqueId]={
                _id:UniqueId,
                PVT:[
                    //X COORDINATE IN DECIMAL NUMBER SYSTEM
                    Key.getX().toString(10).substr(0,5),
                    //Y 
                    Key.getY().toString(10).substr(0,5)
                ],
                //GENERATE PRIVATE KEY <K>
                SSK:key.getPrivate(),
                //SERVER PUBLIC KEY FROM HEX TO DECIMAL
                KPAK:parseInt(KPAK,16).toString(10)
            }  
            console.log(clientConfig);
            nodes.push(clientConfig);
            //NOTIFY OUR WSN CLIENT TO CONFIGUATTION
            socket.emit('setup_credentials',clientConfig);
        })        
    });
    socket.on('let_me_go',(id)=>{

    })
});
http.listen(PORT,function(){
    console.log("RUNNING ON PORT "+PORT);
})