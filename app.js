'use strict';

// Importar las dependencias para configurar el servidor
const
  express = require('express'),
  bodyParser = require('body-parser'),

  app = express().use(bodyParser.json()); // creates express http server
const request = require('request');

// configurar el puerto y el mensaje en caso de exito
app.listen((process.env.PORT || 1337), () => console.log('El servidor webhook esta escuchando!'));




app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
       // Get the sender PSID
  let sender_psid = webhook_event.sender.id;
  console.log('Sender PSID: ' + sender_psid);
  if (webhook_event.message) {
    handleMessage(sender_psid, webhook_event.message);        
  } else if (webhook_event.postback) {
    handlePostback(sender_psid, webhook_event.postback);
  }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

function handleMessage(sender_psid, received_message) {

  let response;

  // Check if the message contains text
  if (received_message.text) {    

    // Create the payload for a basic text message
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  }  else if (received_message.attachments) {
  
    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
  
  } 
  
  // Sends the response message
  callSendAPI(sender_psid, response);    
};

function callSendAPI(sender_psid, response) {

  let PAGE_ACCESS_TOKEN = "EAAH4g5yYSH0BAIuQ0I78ZAjzmbkZCFFjYFR62djCN2UXpZBbq2HdSYsInlzG7j84ClyyvQtwZBTFRP205TVSgE2oxdZBMqXpi1ZA8ZCX3pI7FInQLCpLZCObufXimHuF8WO6Xya6rg9Pt65mBHMB13LZAvwZC73dSylW8oZAqS7GxRZBzwZDZD"
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }


   request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });

};


app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "yo-vip"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});








// const PAGE_ACCESS_TOKEN = "EAAH4g5yYSH0BAMyZAVwim4ZCrbxkJZCLGO9i4hLuX7iZArj7uiRHV3Koc6mcNZCAnacbFIwk5ZAPwu8SAUkjJKO3kGXAIYQNJWb5zytezZBkySd37MyphNqLfZASItRHjjpN9uRZBgdgCFRxzuc7AkHjxVf6ehlZCYoaQlt5dn3RD4rAZDZD";
// const VERIFICATION_TOKEN = "yo-vip";

// Ruta de la pagina index
// app.get("/", function (req, res) {
//     res.send("Se ha desplegado de manera exitosa el ChatBot :D!!!");
// });

// Facebook Webhook

// // Usados para la verificacion
// app.get("/webhook", function (req, res) {

//     // Verificar la coincidendia del token
//     if (req.query["hub.verify_token"] === "yo-vip") {
//         // Mensaje de exito y envio del token requerido
//         console.log("webhook verificado!");
//         res.status(200).send(req.query["hub.challenge"]);
//         console.log(res);
//     } else {
//         // Mensaje de fallo
//         console.error("La verificacion ha fallado, porque los tokens no coinciden");
//         res.sendStatus(403);
//     }
// });

// // Todos eventos de mesenger sera apturados por esta ruta
// app.post("/webhook", function (req, res) {
//     // Verificar si el vento proviene del pagina asociada
//     if (req.body.object == "suscribe") {

//         console.log(req);
//         // Si existe multiples entradas entraas
//         req.body.entry.forEach(function(entry) {
//             // Iterara todos lo eventos capturados
//             entry.messaging.forEach(function(event) {
//                 if (event.message) {
//                     process_event(event);
//                 }
//             });
//         });
//         res.sendStatus(200);
//     }
// });


// // Funcion donde se procesara el evento
// function process_event(event){
//     // Capturamos los datos del que genera el evento y el mensaje 
//     var senderID = event.sender.id;
//     var message = event.message;
    
//     // Si en el evento existe un mensaje de tipo texto
//     if(message.text){
//         // Crear un payload para un simple mensaje de texto
//         var response = {
//             "text": 'Enviaste este mensaje: ' + message.text
//         }
//     }
    
//     // Enviamos el mensaje mediante SendAPI
//     enviar_texto(senderID, response);
// }

// // Funcion donde el chat respondera usando SendAPI
// function enviar_texto(senderID, response){
//     // Construcicon del cuerpo del mensaje
//     let request_body = {
//         "recipient": {
//           "id": senderID
//         },
//         "message": response
//     }
    
//     // Enviar el requisito HTTP a la plataforma de messenger
//     request({
//         "uri": "https://graph.facebook.com/v2.6/me/messages",
//         "qs": { "access_token": PAGE_ACCESS_TOKEN },
//         "method": "POST",
//         "json": request_body
//     }, (err, res, body) => {
//         if (!err) {
//           console.log('Mensaje enviado!')
//         } else {
//           console.error("No se puedo enviar el mensaje:" + err);
//         }
//     }); 
// }

