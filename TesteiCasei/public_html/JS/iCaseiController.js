var mainApp = angular.module("mainApp", ['angularUtils.directives.dirPagination']);
mainApp.controller("iCaseiController", function($scope, $http) {
    $scope.procurar = {
      placeholderProcurar: "Procure seu filme",
      nomefilme: "",
      mostrarListaFilmes: false,
      filmesLista: [],
   
   
        pageSize: 6,


      ConsultarFilme: function(nomefilme) {
          var nomeConcatenado = "http://www.omdbapi.com/?s=%7B" + nomefilme;
          $http({
                method : "GET",
                url : nomeConcatenado
            }).then(function(response) {

            
                if(response.data.Response)
                {
                    MoverCaixaProcurarFilme();
                    $scope.mostrarListaFilmes= true;
                    $scope.filmesLista = response.data.Search;
                    console.log($scope.filmesLista);
                }
                else
                {
                    $scope.mostrarListaFilmes = false;

                     
                }
            });
      },
      ChamarFilmeDetalhe: function(id) {
          console.log(id);
      }
   };
});
function MoverCaixaProcurarFilme()
{
    $('.procurarBox').addClass("procurarBoxAnimacao");
}
