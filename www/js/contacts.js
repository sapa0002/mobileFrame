function fetchingContacts() {
	var options = new ContactFindOptions();

	options.multiple = true;
	var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
	navigator.contacts.find(fields, successFunc, errFunc, options);
}

function  successFunc(contacts) {
	
	document.querySelector("#contactsUl").innerHTML="";
	for (var i = 0; i < contacts.length; i++) {
		
		if(contacts[i].displayName)
		{
			var li = document.createElement("li");
			li.innerHTML=contacts[i].displayName;
			document.querySelector("#contactsUl").appendChild(li);
		}
	}
}

function errFunc(contactsError) {
	alert('Error!');
}

