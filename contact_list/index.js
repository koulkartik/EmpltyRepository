const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/monjoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , 'views') );
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'assets')));

// middleware1
// app.use(function(request,response,next){
//     // console.log('Middleware 1 called');
//     request.myName="Arpan";
//     next();
// });

// middleware2
// app.use(function(request,response,next){
//     // console.log('Middleware 2 called');
//     console.log('My Name from MW2',request.myName);
//     next();
// });


var contactList = [
{
    name : "Arpan",
    phone: "1111111111"
},
{
    name: "Tony",
    phone: "123456789"
},
{
    name: "Coding Ninjas",
    phone: "987654321"
}
]


app.get('/',function(request,response){
    // console.log(request);
    // console.log(__dirname);
    // response.send('<h1>Cool, it is runningh! or  it is ?</h1>')
//   console.log('From the get rouer controller',request.myName);
    
Contact.find({}, function(error , contacts){
 if(error){
    console.log('Error in fetching contacts from db');
    return;
 }

 return response.render('home',{
    title:"Contact Lists",
    // contact_list: contactList
    contact_list: contacts
});

});

});

app.get('/practice',function(request,response){
    return response.render('practice',{
        title:"Let us play with ejs"
    });

});

app.post('/create-contact', function(request,response){
//    return response.redirect('/practice');
// contactList.push({
//     name:request.body.name,
//     phone: request.body.phone
// });

// contactList.push(request.body)

Contact.create({
    name: request.body.name,
    phone: request.body.phone
}, function(error,newContact){
    if(error){
        console.log('error in creating a contact');
        return;
    }

    console.log('**********',newContact);
    return response.redirect('back')
});
// return response.redirect('back');
});

// for deleting a contact
app.get('/delete-contact',function(request,response){
    
    // console.log(request.params);
    // let phone= request.params.phone;
    // console.log(request.query);

//    get the query from the url
    // let phone= request.query.phone;
    
    
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    // return response.redirect('back');
//    get the id from the url

let id= request.query.id;
    
//find the contact in the database using id and delete    
Contact.findByIdAndDelete(id , function(error){
    if(error){
        console.log('error in deleting an object from database');
        return;
    }
    return response.redirect('back');
})

});


app.listen(port, function(error){
    if(error){
        console.log('Error in running on server' , error);
    }

    console.log('yup!My Express Server is running on port', port);
})