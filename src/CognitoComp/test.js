var attributeList = [];
var attribute = {
	Name: 'nickname',
	Value: 'joe',
};
var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
attributeList.push(attribute);

cognitoUser.updateAttributes(attributeList, function(err, result) {
	if (err) {
		alert(err.message || JSON.stringify(err));
		return;
	}
	console.log('call result: ' + result);
});