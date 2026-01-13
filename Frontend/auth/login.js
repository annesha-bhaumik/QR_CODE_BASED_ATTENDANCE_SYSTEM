import { loginUser } from "../utils/api.js";
document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const result = loginUser(username, password, role);
    if(!result.success)
    {
        alert(result.message);
        return;
    }
    if(result.role === "student")
    {
        window.location.href="../student/dashboard.html";
    }
    else
    {
        window.location.href="../teacher/dashboard.html";
    }
});