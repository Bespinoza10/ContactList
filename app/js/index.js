//We are making Fb a shorcut for the Firebase URL
var FIREBASE_URL = 'https://friendslist.firebaseio.com',
	fb = new Firebase(FIREBASE_URL)


//We are making the function to show the form whenn you click New Contact
$(document).ready(function() {

  $('#newContactForm').hide();
  $('#addContact').click(function() {
    $('#newContactForm').show();
  });
});

//This is the function for when you click the the Save Button it will add a new <tr><td> </td></tr> to the tbody and also the remove button function to remove.

$('#SaveButton').on('click', function(event){
  event.preventDefault();
  
  var Name = $('#Name').val();
  var Photo = $('#photo').val();
  var Phone = $('#Phone').val();
  var Email = $('#Email').val();
  var Website = $('#Website').val();
  var Twitter = $('#Twitter').val();
  
  var $tr = $('<tr><td>' + Photo + '</td><td>' + Name + '</td><td>' + Phone + '</td><td>' + Email + '</td><td>' + Website + '</td><td>' + Twitter + '</td><td><button class="RemoveContact">Delete</button></td></tr>'); 
  $('tbody').append($tr);
  
  var data = JSON.stringify({Name: Name, Photo: Photo, Phone: Phone, Email: Email, Website: Website, Twitter:Twitter})
  
  $.post('https://friendslist.firebaseio.com/' + 'Contacts.json',data, function (res){});
  
});


$('tbody').on('click', 'button', function(event){
  event.preventDefault();
  var $tr = $(event.target).closest('tr');
  $tr.remove();
});

//getting the firebase to link

if(fb.getAuth()){
  $.get('https://friendslist.firebaseio.com/' + 'Contacts.json', function (res) {
	Object.keys(res).forEach(function (uuid) {
	  addRowToTable(uuid, res[uuid])
	});
}

function addRowToTable(uuid, data){
	var $tr = $('<tr><td>' + data.Photo + '</td><td>' + data.Name + '</td><td>' + data.Phone + '</td><td>' + data.Email + '</td><td>' + 				data.Website + '</td><td>' + data.Twitter + '</td><td><button class="RemoveContact">Delete</button></td></tr>'); 

	$tr.attr('data-uuid', uuid);
		$('tbody').append($tr);
};

//Making the log in function 

$('#LogIn').click(function(){
	var LogEmail = $('#LogEmail').val();
	var Password = $('#Password').val();
	fb.authWithPassword({
		email:    LogEmail,
		password: Password
	}, function(error, authData){
		if(error){
			console.log("Log In Failed, Please try again.", error)
		} else{
			console.log("Welcome, your log in was succesfull", authData)
		}
	})
})


//Log out button

$('.logout').click(function (){
  fb.unauth();
  location.reload(true);
});


//Making the Registar button fuction

function register(obj, cb) {
  fb.createUser(obj, function(err) {
		    if (!err) {
    			  Fb.authWithPassword(obj, function (err, auth){
        if (!err) {
          cb(null, auth);
        } else {
          cb(err);
        }
      });
    } else {
      cb(err);
    }
  });
}
