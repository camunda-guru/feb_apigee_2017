var express=require('express');
var usergrid=require('usergrid');


var app = express();

var client = new usergrid.init({
	'orgId' : 'iiht',
	'appId' : 'banking',
	'clientId' : 'b3U6MK6RJvysEeaEdxIuBzeXfQ'
,
	'clientSecret' : 'b3U6HCXCTFj3HnRL5c-zy2t-bnvNoD8',
	'authType' : usergrid.AUTH_CLIENT_ID,
	logging : true,
baseUrl : 'https://apibaas-trial.apigee.net'
});

//retrieve the data store

var rootTemplate = {
	'transactions' : {
		'href' : ' use following url /getData /getDevices'
	}
};

app.get('/', function(req, resp) {
	resp.jsonp(rootTemplate);
});

app.get('/getData', function(req, res) {	
		getTransactions(req, res);
       // console.log("reaching...");
});
app.get('/getDevices', function(req, res) {	
		getDevices(req, res);
       // console.log("reaching...");
});


function getTransactions(req, res) {
client.GET('transactions', function(error, usergridResponse,transactions) {
        
    //console.log(transactions);


    if (error) {
			res.status(500).jsonp( {
				'error' : JSON.stringify(error)
			});
			return;
		}
            var tranArray=[];    
            for(x in usergridResponse.entities)
              {
                 tranArray.push(usergridResponse.entities[x]);
              }

      //console.log(tranArray);  

      console.log(tranArray[0].uuid);
console.log(tranArray[0].type);
console.log(tranArray[0].amount);
res.status(200).write("<h1>Transaction Data from API BAAS</h1>")
res.status(200).write("<table>");
res.status(200).write("<tr>");
res.status(200).write("<td> Transaction Id</td>");
res.status(200).write("<td> Transaction date</td>");
res.status(200).write("<td> Transaction Amount</td>");
res.status(200).write("</tr>");
for(obj in tranArray)
{
res.status(200).write("<tr>");
	res.status(200).write("<td>" + tranArray[obj].transactionId+"</td>");
	res.status(200).write("<td>"+ tranArray[obj].date+"</td>");
	res.status(200).write("<td>" + tranArray[obj].amount+"</td>");
res.status(200).write("</tr>");
}
res.status(200).write("</table>");

})


}
function getDevices(req, res) {
client.GET('devices', function(error, devices) {
        
    //console.log(devices);


    if (error) {
			res.status(500).jsonp( {
				'error' : JSON.stringify(error)
			});
			return;
		}
            var tranArray=[];    
            for(x in devices)
              {
                 tranArray.push(devices[x]);
              }
      
     
	res.status(200).jsonp(devices);
})


}


app.listen(7000);
console.log('The server is running in port number 7000!');

