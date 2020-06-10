var oWikiModul = angular.module("wiki-app", ["ngRoute"]);

oWikiModul.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/home.html",
    controller: "wikiController",
  });
  $routeProvider.when("/login", {
    templateUrl: "templates/login.html",
    controller: "wikiController",
  });
  $routeProvider.when("/register", {
    templateUrl: "templates/register.html",
    controller: "wikiController",
  });
  $routeProvider.when("/search", {
    templateUrl: "templates/search.html",
    controller: "wikiController",
  });
  $routeProvider.when("/new_article", {
    templateUrl: "templates/new_article.html",
    controller: "wikiController",
  });

  $routeProvider.when("/category/:path", {
    templateUrl: "templates/category.html",
    controller: "wikiController",
  });

  $routeProvider.when("/article/:path", {
    templateUrl: "templates/single_article.html",
    controller: "wikiController",
  });
  $routeProvider.when("/subarticle/:path", {
    templateUrl: "templates/single_subarticle.html",
    controllet: "wikiController",
  });
  $routeProvider.when("/administration", {
    templateUrl: "templates/administration.html",
    controller: "wikiController",
  });
  $routeProvider.otherwise({
    template: "Greška",
  });
});

oWikiModul.controller("wikiController", function (
  $scope,
  $http,
  $location,
  $rootScope,
  $route
) {
  $scope.jsonClanci = [];

  // Modal LogIn

  $scope.openModal = function () {
    var modal_popup = angular.element(document.querySelector("#modalLogIn"));
    modal_popup.modal("show");
  };
  $scope.closeModal = function () {
    var modal_popup = angular.element("#modalLogIn");
    modal_popup.modal("hide");
  };
  $scope.modalLogIn = function () {
    $scope.openModal();
  };
  $scope.OtvoriModalReg = function () {
    $scope.closeModal();
    $scope.openModalSignUp();
  };

  // Modal SignUp

  $scope.openModalSignUp = function () {
    var modal_popup = angular.element(document.querySelector("#modalSignUp"));
    modal_popup.modal("show");
  };
  $scope.closeModalSignUp = function () {
    var modal_popup = angular.element("#modalSignUp");
    modal_popup.modal("hide");
  };
  $scope.modalSignUp = function () {
    $scope.openModalSignUp();
  };
  $scope.OtvoriModalLog = function () {
    $scope.closeModalSignUp();
    $scope.openModal();
  };

  // Modal dodavanje clanka

  $scope.modaldodavanjeopen = function () {
    var modal_popup = angular.element(
      document.querySelector("#modaldodavanjeClanka")
    );
    modal_popup.modal("show");
  };
  $scope.modaldodavanjeclose = function () {
    var modal_popup = angular.element("#modaldodavanjeClanka");
    modal_popup.modal("hide");
  };
  $scope.modaldodavanjeClanka = function () {
    $scope.modaldodavanjeopen();
  };

  // Modal obrisi clanak

  $scope.modalClanakBrisanjeOpen = function () {
    var modal_popup = angular.element(document.querySelector("#modalDelete"));
    modal_popup.modal("show");
  };
  $scope.modalClanakBrisanjeClose = function () {
    var modal_popup = angular.element("#modalDelete");
    modal_popup.modal("hide");
  };
  $scope.clanakBrisanje = function () {
    $scope.modalClanakBrisanjeOpen();
  };

  // Modal uredi clanak

  $scope.modalClanakEditOpen = function () {
    var modal_popup = angular.element(document.querySelector("#modalEdit"));
    modal_popup.modal("show");
  };
  $scope.modalClanakEditClose = function () {
    var modal_popup = angular.element("#modalEdit");
    modal_popup.modal("hide");
  };
  $scope.clanakEdit = function () {
    $scope.modalClanakEditOpen();
  };

  //modal dodaj kategoriju

  $scope.modalDodajKategorijuOpen = function () {
    var modal_popup = angular.element(
      document.querySelector("#modaldodavanjeKategorije")
    );
    modal_popup.modal("show");
  };
  $scope.modalDodajKategorijuClose = function () {
    var modal_popup = angular.element("#modaldodavanjeKategorije");
    modal_popup.modal("hide");
  };
  $scope.modaldodavanjeKategorije = function () {
    $scope.modalDodajKategorijuOpen();
  };

  $scope.CheckLoggedIn = function () {
    $http
      .post("action.php", {
        action_id: "check_logged_in",
      })
      .then(
        function (response) {
          if (response.data.status == 1) {
            $scope.loggedin = true;
          } else {
            $scope.loggedin = false;
          }
        },
        function (error) {
          console.log(error);
        }
      );
  };

  $scope.CheckAdmin = function () {
    $http
      .post("action.php", {
        action_id: "check_if_admin",
      })
      .then(
        function (response) {
          if (response.data.type == "admin") {
            $scope.admin = true;
          } else {
            $scope.admin = false;
          }
        },
        function (error) {
          console.log(error);
        }
      );
  };

  $scope.Login = function () {
    var oData = {
      action_id: "login",
      username: $scope.username,
      password: $scope.password,
    };
    $http.post("action.php", oData).then(
      function (response) {
        if (response.data.status == 1) {
          $scope.closeModal();
          $scope.loggedin = true;
          $location.path("/");
          alert("Pozdrav " + $scope.username + "!");
        } else {
          alert("Neispravno korisničko ime i/ili lozinka! Pokušajte ponovno!");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.Register = function () {
    var oData = {
      action_id: "register",
      username: $scope.username,
      password: $scope.password,
      type: "user",
    };
    $http.post("action.php", oData).then(function (response) {
      if (response.data == 1) {
        $scope.closeModalSignUp();
        alert("Uspješna registracija!");
        $location.path("/");
      } else {
        alert("Neuspješna registracija!");
      }
    });
  };

  $scope.Logout = function () {
    var oData = {
      action_id: "logout",
    };
    $http
      .post("action.php", {
        action_id: "logout",
      })
      .then(
        function (response) {
          $scope.loggedin = false;
          $scope.admin = false;
          alert("Uspješno ste se odjavili!");
          $location.path("/");
        },
        function (error) {
          console.log(error);
        }
      );
  };

  $scope.getArticles = function () {
    $http({
      method: "GET",
      url: "json.php?json_id=dohvati_clanke",
    }).then(
      function (response) {
        $scope.articles = response.data;
      },
      function (response) {
        console.log("error");
      }
    );
  };

  $scope.getSubarticles = function () {
    $http({
      method: "GET",
      url: "json.php?json_id=dohvati_podclanke",
    }).then(
      function (response) {
        $scope.subarticles = response.data;
      },
      function (error) {
        console.log("error");
      }
    );
  };

  $scope.getCategories = function () {
    $http({
      method: "GET",
      url: "json.php?json_id=dohvati_kategorije",
    }).then(
      function (response) {
        $scope.categories = response.data;
      },
      function (error) {
        console.log("error");
      }
    );
  };

  $scope.GetAllFromCategory = function (id, name) {
    $http({
      method: "GET",
      url: "json.php?json_id=dohvati_sve_iz_kategorije&category_id=" + id,
    }).then(
      function (response) {
        $route.reload();
        $location.path("/category/" + name);
      },
      function (error) {
        console.log(error);
      }
    );
    $rootScope.id = id;
  };

  $scope.getArticleByType = function () {
    $http({
      method: "GET",
      url: "json.php?json_id=dohvati_clanke_po_id&category_id=" + $rootScope.id,
    }).then(
      function (response) {
        $scope.articlesByType = response.data;
      },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.searchArticles = function () {
    $http({
      method: "GET",
      url: "json.php?json_id=search&search_params=" + $scope.searchParams,
    }).then(function (response) {
      if (response.data.length == 0) {
        alert("Niti jedan članak se ne podudara s rezultatima pretrage!");
      } else {
        $scope.searchedArticles = response.data;
      }
    });
  };

  $scope.AddArticle = function () {
    var oData = {
      action_id: "add_article",
      categoryID: $scope.category,
      article_title: $scope.article_title,
      article_content: $scope.article_content,
    };
    console.log(oData);
    $http.post("action.php", oData).then(function (response) {
      alert("Članak uspješno dodan!");
      $location.path("/");
    });
  };

  $scope.AddSubarticle = function (article_id) {
    var oData = {
      action_id: "add_subarticle",
      articleID: article_id,
      sub_title: $scope.sub_title,
      sub_content: $scope.sub_content,
    };
    console.log(oData);
    $http.post("action.php", oData).then(function (response) {
      alert("Počlanak uspješno dodan!");
      $location.path("/");
    });
  };

  $scope.SingleArticle = function (oArticle) {
    $rootScope.oArticle = oArticle;
    $location.path("/article/" + oArticle.article_title);
  };

  $scope.SingleSubarticle = function (oSubarticle) {
    $rootScope.oSubarticle = oSubarticle;
    $location.path("/subarticle/" + oSubarticle.title);
  };

  $scope.ShowSingleArticle = function () {
    $scope.single_article = $rootScope.oArticle;
    $scope.article_title = $scope.single_article.article_title;
    $scope.article_content = $scope.single_article.article_content;
    $scope.article_id = $scope.single_article.articleID;
  };

  $scope.ShowSingleSubarticle = function () {
    $scope.single_subarticle = $rootScope.oSubarticle;
    $scope.subarticle_title = $scope.single_subarticle.title;
    $scope.subarticle_content = $scope.single_subarticle.content;
    $scope.subarticle_id = $scope.single_subarticle.id;
  };

  $scope.EditArticle = function (id) {
    var oData = {
      action_id: "edit_article",
      article_id: id,
      article_title: $scope.article_title,
      article_content: $scope.article_content,
    };
    $http.post("action.php", oData).then(function (response) {
      alert("Članak uspješno promijenjen!");
      $location.path("/");
    });
  };

  $scope.DeleteArticle = function (id) {
    var oData = {
      action_id: "delete_article",
      article_id: id,
    };
    if (confirm("Jeste li sigurni da želite obrisati članak?")) {
      $http.post("action.php", oData).then(function (response) {
        alert("Članak uspješno obrisan!");
        $location.path("/");
      });
    }
  };

  $scope.EditSubarticle = function (id) {
    var oData = {
      action_id: "edit_subarticle",
      subarticle_id: id,
      sub_title: $scope.subarticle_title,
      sub_content: $scope.subarticle_content,
    };
    console.log(oData);
    $http.post("action.php", oData).then(function (response) {
      alert("Članak uspješno promijenjen!");
      $location.path("/");
    });
  };

  $scope.DeleteSubarticle = function (subarticle_id) {
    var oData = {
      action_id: "delete_subarticle",
      subarticle_id: subarticle_id,
    };
    console.log(oData);
    if (confirm("Jeste li sigurni da želite obrisati podčlanak?")) {
      $http.post("action.php", oData).then(function (response) {
        alert("Podčlanak uspješno obrisan!");
        $location.path("/");
      });
    }
  };

  $scope.AddCategory = function () {
    var oData = {
      action_id: "add_category",
      categoryName: $scope.kategorijaName,
    };
    console.log(oData);
    $http.post("action.php", oData).then(function (response) {
      alert("Kategorija uspješno dodana!");
      $route.reload();
    });
  };

  $scope.GetUserType = function () {
    $http({
      method: "GET",
      url: "json.php?json_id=dohvati_tip",
    }).then(
      function (response) {
        $scope.tipovi = response.data;
      },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.AddUser = function () {
    var oData = {
      action_id: "add_user",
      username: $scope.username,
      password: $scope.password,
      type: $scope.tip,
    };
    $http.post("action.php", oData).then(function (response) {
      alert("Korisnik uspješno dodan!");
    });
    $route.reload();
  };

  $scope.EditHistory = function () {
    $http({
      method: "GET",
      url: "json.php?json_id=edit_history",
    }).then(
      function (response) {
        $scope.edit_history = response.data;
      },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.DohvatiKategoriju = function () {
    $http({
      method: "GET",
      url:
        "json.php?json_id=dohvati_kategoriju_po_id&category_id=" +
        $rootScope.id,
    }).then(
      function (response) {
        $scope.categoryName = response.data;
        $scope.categoryID = $rootScope.id;
      },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.DeleteCategory = function () {
    var oData = {
      action_id: "delete_category",
      category_id: $rootScope.id,
    };
    if (confirm("Jeste li sigurni da želite obrisati kategoriju?")) {
      $http.post("action.php", oData).then(function (response) {
        alert("Kategorija uspješno obrisana!");
      });
      $location.path("/");
    }
  };
});

oWikiModul.filter("strLimit", [
  "$filter",
  function ($filter) {
    return function (input, limit) {
      if (!input) return;
      if (input.length <= limit) {
        return input;
      }

      return $filter("limitTo")(input, limit) + "...";
    };
  },
]);
/*
// https://www.webslesson.info/2016/09/file-upload-using-angularjs-with-php-script.html
oWikiModul.directive("fileInput", function ($parse) {
  return {
    link: function ($scope, element, attrs) {
      element.on("change", function (event) {
        var files = event.target.files;
        //console.log(files[0].name);
        $parse(attrs.fileInput).assign($scope, element[0].files);
        $scope.$apply();
      });
    },
  };
});
oWikiModul.controller("oWikiModul", function ($scope, $http) {
  $scope.uploadFile = function () {
    var form_data = new FormData();
    angular.forEach($scope.files, function (file) {
      form_data.append("file", file);
    });
    $http
      .post("action.php", form_data, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined, "Process-Data": false },
      })
      .success(function (response) {
        alert(response);
        $scope.select();
      });
  };
  $scope.select = function () {
    $http.get("select.php").success(function (data) {
      $scope.images = data;
    });
  };
});
$http.post("action.php", oData).then(function (response) {
  if (response.data == 1) {
    $scope.closeModalSignUp();
    alert("Uspješna registracija!");
    $location.path("/");
  } else {
    alert("Neuspješna registracija!");
  }
});
*/
