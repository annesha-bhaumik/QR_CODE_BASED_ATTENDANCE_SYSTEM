document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if(!role || !username || !password)
    {
        alert("All fields are required");
        return;
    }
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("user", username);
    if(role === "student")
    {
        window.location.href="../student/dashboard.html";
    }
    else
    {
        window.location.href="../teacher/dashboard.html";
    }
});