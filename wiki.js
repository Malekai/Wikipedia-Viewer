var api = "";
//store properties into arrays so we can access them dynamically
var arr = [];

$(document).ready(function(){
	searchResult();
});


//enterfunction that changes the search result
function searchResult() {
	$('input').keypress(function(event){
		if(event.which === 13) {
			var inputText = $('input').val();
			api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=" + inputText 
			+ "&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max";
			getData(api, arr);
			$('.contentDisplay').addClass('onDisplay');
			//clear out array of properties
			arr = [];
		}
	});
}

//function to return all pages from wikipedia that user searches by adjusting the api
function getData() {
	$.getJSON(api + "&callback=?", function (data) {
		var raw = JSON.stringify(data);
		var json = JSON.parse(raw);
		results(json, arr);
		resultPage(json, arr);
	});
}

//display blocks of the first 5 pages
function results(json) {
		for (var key in json.query.pages) {
		arr.push(key);
	}
	$('#R1').html("<h3>" + json["query"]["pages"][arr[0]]["title"] + "</h3>" 
		+ "<p>" + json["query"]["pages"][arr[0]]["extract"]);

	$('#R2').html("<h3>" + json["query"]["pages"][arr[1]]["title"] + "</h3>" 
		+ "<p>" + json["query"]["pages"][arr[1]]["extract"]);

	$('#R3').html("<h3>" + json["query"]["pages"][arr[2]]["title"] + "</h3>" 
		+ "<p>" + json["query"]["pages"][arr[2]]["extract"]);

	$('#R4').html("<h3>" + json["query"]["pages"][arr[3]]["title"] + "</h3>" 
		+ "<p>" + json["query"]["pages"][arr[3]]["extract"]);

	$('#R5').html("<h3>" + json["query"]["pages"][arr[4]]["title"] + "</h3>" 
		+ "<p>" + json["query"]["pages"][arr[4]]["extract"]);
}

function resultPage(json) {
	$('#R1').one("click", function(){
		$("a").attr("href", "https://en.wikipedia.org/?curid=" + [arr[0]])
	});
	$('#R2').one("click", function(){
		$("a").attr("href", "https://en.wikipedia.org/?curid=" + [arr[1]])
	});
	$('#R3').one("click", function(){
		$("a").attr("href", "https://en.wikipedia.org/?curid=" + [arr[2]])
	});
	$('#R4').one("click", function(){
		$("a").attr("href", "https://en.wikipedia.org/?curid=" + [arr[3]])
	});
	$('#R5').one("click", function(){
		$("a").attr("href", "https://en.wikipedia.org/?curid=" + [arr[4]])
	});
}

$('.btn-success').click(function(){
 window.open("https://en.wikipedia.org/wiki/Special:Random");
});

