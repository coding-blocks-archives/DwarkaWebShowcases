function on_myprofile() {
    document.getElementById("my-profile").style.display = "block";
    document.getElementById("edit-profile").style.display = "none";
    document.getElementById("my-articles").style.display = "none";
    document.getElementById("add-articles").style.display = "none";
  }
  
  function on_editprofile() {
    document.getElementById("my-profile").style.display = "none";
    document.getElementById("edit-profile").style.display = "block";
    document.getElementById("my-articles").style.display = "none";
    document.getElementById("add-articles").style.display = "none";
  }

  function on_myarticles(){
    document.getElementById("my-profile").style.display = "none";
    document.getElementById("edit-profile").style.display = "none";
    document.getElementById("my-articles").style.display = "block";
    document.getElementById("add-articles").style.display = "none";
  }

  function on_addarticle(){
    document.getElementById("my-profile").style.display = "none";
    document.getElementById("edit-profile").style.display = "none";
    document.getElementById("my-articles").style.display = "none";
    document.getElementById("add-articles").style.display = "block";
  }

  function on_requestarticles(){
    document.getElementById("my-profile").style.display = "none";
    document.getElementById("edit-profile").style.display = "none";
    document.getElementById("request-articles").style.display = "block";
    document.getElementById("donate-section").style.display = "none";
  }

  function on_donate(){
    document.getElementById("my-profile").style.display = "none";
    document.getElementById("edit-profile").style.display = "none";
    document.getElementById("request-articles").style.display = "none";
    document.getElementById("donate-section").style.display = "block";

  }