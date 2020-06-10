$(document).ready(function()
{
	UcitavanjeClanaka();
});
function UcitavanjeClanaka()
{
	/*$.ajax( // jquery ajax funkcije di su get post (javascript xml)
	{
		url: 'action.php?action_id=svi_clanci', 
		type: 'GET',
		success: function(oData)
		{
			$('.article_holder').empty();
			for(var i=0; i<oData.length; i++)
			{
				console.log(i);
				var article ='<div class="article">'+ 
									'<h3>'+ oData[i].article_title +'</h3>'+
									'<button type="button" class="btn">Dodaj podčl.</button>'+
									'<button type="button" class="btn">Obriši</button>'+
									'<button type="button" class="btn">Uredi</button>'+
								'<div>'
								+ oData[i].article_content +
								'</div>'+
							'</div>';
				$('.article_holder').append(article);
			}
		}
	});
	console.log("funkcija");*/
}