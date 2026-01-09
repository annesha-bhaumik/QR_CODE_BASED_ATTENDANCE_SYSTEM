document.getElementById("userName").innerText = localStorage.getItem("user") || "User";
function goToScan()
{
    window.location.href = "scan.html";
}
function logout()
{
    localStorage.clear();
    window.location.href = "../auth/login.html";
}