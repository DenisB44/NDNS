var app = angular.module('nideputenisoumises', ["chart.js"]);

app.directive('headTemplate', function(){
	return{
		restrict: 'C',
		templateUrl: 'head.html'
	};
});

app.directive('navTemplate', function(){
	return {
		restrict: 'C',
		templateUrl: 'nav.html'
	};

});

app.directive('footerTemplate', function(){
	return {
		restrict: 'C',
		templateUrl: 'footer.html'
	};
});

app.controller('MainCtrl', ['$scope', '$window', function ($scope, $window) {
    	
	$scope.UserName = "Visiteur";
	$scope.loading = true;
	$scope.connecte = false;
	$scope.accueil = true;
	$scope.affichageVote = true;
	$scope.affichageFin = true;
	$scope.partieVote = true;
	$scope.affichageResultat = true;
	$scope.compteur = 0;  
	$scope.questions = [];
	
	
	$scope.labels = ["% lois passées", "% lois rejetées", "% lois en cours"];
	$scope.data = [37, 54, 9];
	$scope.colors = ["#90ed7d", "#f7a35c", "#7cb5ec"];
	
	$scope.labels2 = ["Front national", "Les Républicains", "Centre","Parti Socialiste","Les Ecologistes","Parti Communiste"];
	$scope.data2 = [12, 31, 9, 28, 3, 7];
	$scope.colors2 = ["#3300CC", "#7cb5ec","#434348","#FF3300","#90ed7d","#f7a35c"];
	
	$window.init = function (){
		var rootApi = 'https://1-dot-nideputesnisoumises.appspot.com/_ah/api/';
		//var rdm = Math.abs(Math.random()*201);
		gapi.client.load('loiendpoint', 'v1', function() {
			console.log("Init : loaded");	
			gapi.client.loiendpoint.listLoi({limit:10}).execute(
					function(resp) {
						$scope.test(resp.items);
						gapi.client.load('deputeendpoint', 'v1', function() {
							console.log("Init : loaded");	
							gapi.client.deputeendpoint.listDepute().execute(
									function(resp) {
										console.log(resp.items);
									});	
						}, rootApi);
					});	
		}, rootApi);		
	}

	$scope.test = function (lois){
		$scope.loading = false;
		$scope.questions = lois;
		console.log($scope.questions);
	}
	
	$scope.fctDeco = function(){
		console.log("Methode : fctDeco");
		var divToken = document.getElementById('varToken');
		varaccess_token = divToken.innerHTML;
		//alert(varaccess_token);
		$scope.disconnectUser(varaccess_token);
	};

	$scope.disconnectUser = function (access_token) {
		console.log("Methode : disconnectUser");
		//alert(varaccess_token);
		var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token;
    /*
		// Exécuter une requête GET asynchrone.
		$.ajax({
			type: 'GET',
			url: revokeUrl,
			async: false,
			contentType: "application/json",
			dataType: 'jsonp',
			success: function(nullResponse) {
				// Effectuer une action maintenant que l'utilisateur est dissocié
				// La réponse est toujours non définie.
			},
			error: function(e) {
				// Gérer l'erreur
				// console.log(e);
				// Orienter éventuellement les utilisateurs vers une dissociation manuelle en cas d'échec
				// https://plus.google.com/apps
			}
		});
		*/
	};

	$scope.majConnexion = function (name){	 
		console.log("Methode : majConnexion");
		$scope.connecte = !$scope.connecte;
		if($scope.connecte){
			$scope.accueil = false;
		}
		else {
			$scope.accueil = true;
			$scope.affichageVote = true;
			$scope.affichageFin = true;
			$scope.partieVote = true;			
			$scope.affichageResultat = true;
		}
		$scope.UserName = name;
	}

	$scope.home = function (){
		console.log("Methode : accueil");
		if($scope.connecte){
			$scope.accueil = false;
			$scope.affichageVote = true;
			$scope.affichageFin = true;
			$scope.partieVote = true;
			$scope.affichageResultat = true;
		}
	}

	$scope.voter = function (){	 
		console.log("Methode : voter");
		if($scope.connecte){			
			$scope.accueil = true;
			$scope.partieVote = false;
			$scope.affichageVote = false;
			$scope.affichageResultat = true; 	
		}
	}
	
	/*
	$scope.genererLois = function(){
		
	  var lois = [
	              {id:"505",titre:"Sed ut tum ad senem senex de senectute, sic hoc libro ad amicum ",date:"25-03-2016",
	              nb_votes:5,nb_nspp:0,votes_p:["PA1","PA2"],votes_c:["PA3","PA4"],votes_a:["PA5"]},
                {id:"402",titre:"Amicissimus scripsi de amicitia. Tum est Cato locutus, quo erat nemo fere ",date:"25-03-2016",
                nb_votes:4,nb_nspp:1,votes_p:["PA1","PA2"],votes_c:["PA3"],votes_a:["PA5"]},
                {id:"302",titre:"Senior temporibus illis, nemo prudentior; nunc Laelius et sapiens",date:"25-03-2016",
                nb_votes:3,nb_nspp:2,votes_p:["PA1"],votes_c:["PA4"],votes_a:["PA5"]},
                {id:"111",titre:"Amicitiae gloria excellens de amicitia loquetur. Tu velim a me animum parumper avertas, Laelium loqui ipsum putes.",date:"25-03-2016",
                nb_votes:4,nb_nspp:1,votes_p:["PA2"],votes_c:["PA3","PA4"],votes_a:["PA5"]},
                {id:"222",titre:"Mucius ad socerum veniunt post mortem Africani",date:"25-03-2016",
                nb_votes:5,nb_nspp:0,votes_p:["PA1","PA2"],votes_c:["PA3","PA4"],votes_a:["PA5"]},
                {id:"333",titre:"Sermo oritur, respondet Laelius, cuius tota disputatio est de amicitia, quam legens te ipse cognosces.",date:"25-03-2016",
                nb_votes:5,nb_nspp:0,votes_p:["PA1","PA2"],votes_c:["PA3","PA4"],votes_a:["PA5"]},
                {id:"444",titre:"Siquis enim militarium vel honoratorum aut nobilis inter suos rumore ",date:"25-03-2016",
                nb_votes:5,nb_nspp:0,votes_p:["PA1","PA2"],votes_c:["PA3","PA4"],votes_a:["PA5"]},
                {id:"555",titre:"Tenus esset insimulatus fovisse partes hostiles, iniecto onere catenarum in ",date:"25-03-2016",
                nb_votes:5,nb_nspp:0,votes_p:["PA1","PA2"],votes_c:["PA3","PA4"],votes_a:["PA5"]},
                {id:"666",titre:"Modum beluae trahebatur et inimico urgente vel nullo, quasi sufficiente ",date:"25-03-2016",
                nb_votes:2,nb_nspp:3,votes_p:["PA1"],votes_c:[],votes_a:["PA5"]},
                {id:"999",titre:"Hoc solo, quod nominatus esset aut delatus aut postulatus capite vel ",date:"25-03-2016",
                nb_votes:1,nb_nspp:4,votes_p:["PA1"],votes_c:[],votes_a:[]}
                ];
	}
	*/

	$scope.oui = function (){
		$scope.questions[$scope.compteur].vote = "Pour";
		$scope.compteur++;
		if($scope.compteur == 10){
			$scope.fin();
		}
	}

	$scope.non = function (){
		$scope.questions[$scope.compteur].vote = "Contre";
		$scope.compteur++;
		if($scope.compteur == 10){
			$scope.fin();
		}
	}

	$scope.nspp = function (){
		$scope.questions[$scope.compteur].vote = "Abstention";
		$scope.compteur++;
		if($scope.compteur == 10){
			$scope.fin();
		}
	}

	$scope.fin = function(){
		console.log("Methode : fin");
		$scope.compteur = 0;
		$scope.affichageVote = true;
		$scope.affichageFin = false;
		$scope.affichageResultat = true;
	}
	
	$scope.calculerResultat = function(){
	  console.log("Methode : calculerResultat");
	  
	  $scope.deputeProche = "Julien Aubert";
	  $scope.partiProche = "Les Républicains";
	  
	  /*

var calculDepute = function(voteOui, voteNon, voteBlanc){
	  var similarite=0;
	  var deputePlusProche=deputeeList[0];
	  var similaritePlusProche=0;
	  for (var i=0; i<deputeeList.length; i++){
		  if (deputeeList[i].pour!=null){
			    for (var j=0; j<deputeeList[i].pour.length; j++){
			    	for (var ij=0; ij<voteOui.length; ij++){
			    		if (deputeeList[i].pour[j]==voteOui[ij]){
			    			similarite++;
				    	}
			    	}
		    }
		    	
		  }
		  if (deputeeList[i].non!=null){
			    for (var j=0; j<deputeeList[i].pour.length; j++){
			    	for (var ij=0; ij<voteNon.length; ij++){
			    		if (deputeeList[i].pour[j]==voteNon[ij]){
			    			similarite++;
				    	}
		    		}
			    }
		  }
		    
		  if (deputeeList[i].abstention!=null){
			    for (var j=0; j<deputeeList[i].pour.length; j++){
			    	for (var ij=0; ij<voteBlanc.length; ij++){
			    		if (deputeeList[i].pour[j].voteBlanc==deputeeList[ij]){
			    			similarite++;
				    	}
			    	}
			    }
		  }
		  if (similarite>similaritePlusProche){
			  similaritePlusProche=similarite;
			  deputePlusProche=deputeeList[i];
		  }
		  similarite=0
	  }
	  $scope.deputePlusProche=deputePlusProche;
  } 

	   */
	  
	  $scope.affichageFin = true;
	  $scope.partieVote = true;
	  $scope.affichageResultat = false;
	}

}]);
