import { logoutUser } from "../utils/api.js";
document.getElementById("userName").innerText = localStorage.getItem("user") || "User";
function goToScan()
{
    window.location.href = "scan.html";
}
function logout()
{
    logoutUser();
    window.location.href = "../auth/login.html";
}
window.goToScan = goToScan;
window.logout = logout;