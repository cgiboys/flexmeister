function sumit() {
    event.preventDefault();
    var userName = document.getElementById("username").value;
    //console.log(userName);
    if (userName == "Gustav") {
        document.cookie = "userId=" + 100;
        document.cookie = "userName=" + userName;
        window.location.href = "index.html";
    } else if (userName == "Bjorn") {
        document.cookie = "userId=" + 200;
        document.cookie = "userName=" + userName;
        window.location.href = "index.html";
    }
}