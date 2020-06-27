var oWikiModul = angular.module("wiki-app", ["ngRoute"]);

// Rute
oWikiModul.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "templates/home.html",
    controller: "wikiController",
  });

  //Kategorija i clanak
  $routeProvider.when("/category/:path", {
    templateUrl: "templates/category.html",
    controller: "wikiController",
  });
  $routeProvider.when("/article/:path", {
    templateUrl: "templates/single_article.html",
    controller: "wikiController",
  });

  //Administracija
  $routeProvider.when("/administration_users", {
    templateUrl: "templates/administration_users.html",
    controller: "wikiController",
  });
  $routeProvider.when("/administration_categorys", {
    templateUrl: "templates/administration_categorys.html",
    controller: "wikiController",
  });
  $routeProvider.when("/administration_articles", {
    templateUrl: "templates/administration_articles.html",
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
  $route,
  $window,
  $timeout
) {
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
  $scope.clanakBrisanje = function (id, title, content) {
    $scope.article_id = id;
    $scope.article_title = title;
    $scope.article_content = content;
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
  $scope.clanakEdit = function (id, title, content) {
    $scope.article_id = id;
    $scope.article_title = title;
    $scope.article_content = content;

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

  // modali za brisanje uredivanje i dodavanje podkategorija

  //modal obrisi podclanak
  $scope.modalObrisiPodClanak = function () {
    var modal_popup = angular.element(
      document.querySelector("#modalDeleteSubarticle")
    );
    modal_popup.modal("show");
  };

  $scope.podclanakBrisanje = function (id, title, content) {
    $scope.podclanak_id = id;
    $scope.podclanak_title = title;
    $scope.podclanak_content = content;
    $scope.modalObrisiPodClanak();
  };
  $scope.modalUrediPodclanak = function () {
    var modal_popup = angular.element(
      document.querySelector("#modalEditSubarticle")
    );
    modal_popup.modal("show");
  };
  $scope.podclanakUredivanje = function (id, title, content) {
    $scope.podclanak_id = id;
    $scope.podclanak_title = title;
    $scope.podclanak_content = content;
    $scope.modalUrediPodclanak();
  };

  // dodavanje podclanka
  $scope.modalAddPodclanak = function () {
    var modal_popup = angular.element(
      document.querySelector("#modalAddSubarticle")
    );
    modal_popup.modal("show");
  };
  $scope.dodajPodclanak = function (articleID) {
    $scope.article_id = articleID;
    $scope.modalAddPodclanak();
  };
  $scope.DodajSubarticle = function () {
    var oData = {
      action_id: "add_subarticle",
      articleID: $scope.article_id,
      sub_title: $scope.title,
      sub_content: $scope.content,
    };
    console.log(oData);
    $http.post("action.php", oData).then(function (response) {
      alert("Podčlanak uspješno dodan!");
      $window.location.reload();
    });
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
            $scope.CheckAdmin();
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

          localStorage.setItem(
            "ulogiran_id",
            JSON.stringify(response.data.user_id)
          );

          $location.path("/");
          $scope.CheckAdmin();
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
      ime: $scope.ime,
      prezime: $scope.prezime,
      email: $scope.email,
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

  $scope.AddUser = function () {
    var oData = {
      action_id: "add_user",
      username: $scope.username,
      password: $scope.password,
      type: $scope.tip_input,
    };
    console.log(oData);
    $http.post("action.php", oData).then(function (response) {
      alert("Korisnik uspješno dodan!");
    });
    $route.reload();
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
        localStorage.setItem("polje_subartikl", JSON.stringify(response.data));

        $scope.polje_subartikl = JSON.parse(
          localStorage.getItem("polje_subartikl")
        );
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
  // kada kliknemo na odredenu kategoriju poziva se ta funkcija
  $scope.GetAllFromCategory = function (id, name) {
    $http({
      method: "GET",
      url:
        "json.php?json_id=dohvati_sve_iz_kategorije&category_id=" +
        $rootScope.$id,
    }).then(
      function (response) {
        $route.reload();
        $location.path("/category/" + name);
      },
      function (error) {
        console.log(error);
      }
    );
    // ovjde spremamo id kategorije
    $rootScope.$id = id;
    // spremamo naziv kategorije u lokalnu pohranu jer bi se inace na refresh izgubio
    localStorage.setItem("ime_kategorije", JSON.stringify(name));
  };

  $scope.getArticleByType = function () {
    //saljem upit prema bazi da mi dohvati sve clanke te kategorije
    $http({
      method: "GET",
      url:
        "json.php?json_id=dohvati_clanke_po_id&category_id=" + $rootScope.$id,
    }).then(
      function (response) {
        //u articlesByType se spremaju svi clanci te kategorije
        $scope.articlesByType = response.data;
        // tu dohvacamo vrijednost a to je ime kategorije i spremamo u scope.ime_kategorije
        $scope.ime_kategorije = JSON.parse(
          localStorage.getItem("ime_kategorije")
        );
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
      $window.location.reload();
    });
  };
  // ovo je umjesto hrefa
  // šaljemo objekat artikla i
  $scope.SingleArticle = function (oArticle) {
    // spremamo u globalnu varijablu oArticle i
    localStorage.setItem("objekt_artikl", JSON.stringify(oArticle));
    //preusmjeravamo se single_article.html
    $location.path("/article/" + oArticle.article_title);
  };

  $scope.ShowSingleArticle = function () {
    //$scope.single_article = $rootScope.oArticle;
    $scope.objekt_artikl = JSON.parse(localStorage.getItem("objekt_artikl"));
    $scope.ulogiran_id = JSON.parse(localStorage.getItem("ulogiran_id"));

    // upit prema bazi da pokupi ako ima nesto sto ima taj id korisnika i tog clanka
    //alert($scope.objekt_artikl.articleID + " " + $scope.ulogiran_id);
    $timeout(function () {
      $http({
        method: "GET",
        url:
          "json.php?json_id=dohvati_ocjenu&article_id=" +
          $scope.objekt_artikl.articleID +
          "&user_id=" +
          $scope.ulogiran_id,
      }).then(
        function (response) {
          localStorage.setItem("ocjena", JSON.stringify(response.data));

          $scope.ocj = JSON.parse(localStorage.getItem("ocjena"));

          if (response.data == "") {
            $scope.ocj[0] = { ocjena: 0 };
          }
        },
        function (error) {
          console.log(error);
        }
      );
    }, 500);
  };

  $scope.ShowSingleSubarticle = function () {
    $scope.objekt_subartikl = JSON.parse(
      localStorage.getItem("objekt_subartikl")
    );
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
      sub_title: $scope.podclanak_title,
      sub_content: $scope.podclanak_content,
    };
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
    if (confirm("Jeste li sigurni da želite obrisati podčlanak?")) {
      $http.post("action.php", oData).then(function (response) {
        alert("Podčlanak uspješno obrisan!");
        $window.location.reload();
      });
    }
  };

  $scope.AddCategory = function () {
    var oData = {
      action_id: "add_category",
      categoryName: $scope.kategorijaName,
    };
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

  $scope.getUsers = function () {
    $http({
      method: "GET",
      url: "json.php?json_id=dohvati_korisnike",
    }).then(
      function (response) {
        $scope.users = response.data;
      },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.DeleteCategory = function (id) {
    var oData = {
      action_id: "delete_category",
      category_id: id,
    };
    console.log(oData);
    if (confirm("Jeste li sigurni da želite obrisati kategoriju?")) {
      $http.post("action.php", oData).then(function (response) {
        alert("Kategorija uspješno obrisana!");
      });
      $window.location.reload();
    }
  };

  $scope.DeleteUser = function (id) {
    var oData = {
      action_id: "delete_user",
      user_id: id,
    };
    if (confirm("Jeste li sigurni da želite obrisati korisnika?")) {
      $http.post("action.php", oData).then(function (response) {
        alert("Korisnik je uspješno obrisan!");
      });
      $window.location.reload();
    }
  };

  $scope.Ocijeni = function (ocjena, clanak) {
    $scope.ulogiran_id = JSON.parse(localStorage.getItem("ulogiran_id"));

    alert(ocjena + " " + clanak + " " + $scope.ulogiran_id);

    // pohraniti u bazu

    var oData = {
      action_id: "ocijeni",
      ocjena: ocjena,
      clanak: clanak,
      korisnik: $scope.ulogiran_id,
    };

    $http.post("action.php", oData).then(function (response) {
      if (response.data == 1) {
        $scope.closeModalSignUp();
        alert("Uspješno ocjenjeno!");
        $window.location.reload();
      } else {
        alert("Neuspješno ocjenjeno!");
      }
    });
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
