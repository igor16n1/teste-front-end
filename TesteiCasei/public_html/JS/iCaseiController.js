var mainApp = angular.module("mainApp", ['angularUtils.directives.dirPagination', 'ngRoute']);
mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
   when('/Detalhes', {
      templateUrl: 'Detalhes.html', controller: 'iCaseiController'
   }).
    otherwise({
               redirectTo: '/Detalhes'
            });
}]);
mainApp.controller("iCaseiController",  function($scope, $http, $location) {
    $scope.procurar = {
      placeholderProcurar: "Procure seu filme",
      nomefilme: "",
      mostrarListaFilmes: false,
      mostrarDetalhes: false,
      filmesLista: [],
      pageSize: 6,
      filmeDetalhe: [],
      
      ConsultarFilme: function(nomefilme) {
          var nomeConcatenado = "http://www.omdbapi.com/?s=%7B" + nomefilme;
          var procurar;
          procurar = $scope.procurar;
          $http({
                method : "GET",
                url : nomeConcatenado
            }).then(function(response) {
                if(response.data.Response)
                {
                    MoverCaixaProcurarFilme();
                    $scope.mostrarListaFilmes= true;
                    procurar.mostrarListaFilmes = $scope.mostrarListaFilmes;
                    $scope.filmesLista = response.data.Search;
                    $location.path('Detalhes.html');
                }
                else
                {
                    $scope.mostrarListaFilmes = false; 
                    procurar.mostrarListaFilmes = $scope.mostrarListaFilmes;
                }
            });
      },
      ChamarFilmeDetalhe: function(id) {
          var nomeConcatenado = "http://www.omdbapi.com/?i=" + id;
          var procurar;
          procurar = $scope.procurar;
          $http({
                method : "GET",
                url : nomeConcatenado
            }).then(function(response) {
                if(response.data.Response)
                {
                    $scope.mostrarDetalhes= true;
                    procurar.mostrarDetalhes = $scope.mostrarDetalhes;
                    $scope.mostrarListaFilmes = false;
                    procurar.mostrarListaFilmes = $scope.mostrarListaFilmes;
                    $scope.filmeDetalhe = response.data;
                    console.log($scope.filmeDetalhe);
                    
                }
                else
                {
                     
                }
            });
      },
      VoltarConsultaFilme: function()
      { 
         var procurar;
         procurar = $scope.procurar;
         $scope.mostrarDetalhes= false;
        procurar.mostrarDetalhes = $scope.mostrarDetalhes;
        $scope.mostrarListaFilmes = true;
        procurar.mostrarListaFilmes = $scope.mostrarListaFilmes;
      }
   };
});
function MoverCaixaProcurarFilme()
{
    $('.procurarBox').addClass("procurarBoxAnimacao");
}