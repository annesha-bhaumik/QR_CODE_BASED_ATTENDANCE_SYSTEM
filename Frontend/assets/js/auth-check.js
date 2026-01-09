(function ()
{
    const loggedIn = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("role");
    const path = window.location.pathname;
    if (loggedIn != "true")
    {
        if (path.includes("/student/") || path.includes("/teacher/"))
        {
            window.location.href = "../auth/login.html";
        }
        return;
    }
    if (path.includes("/student/") && role !== "student")
    {
        redirectToLogin();
        return;
    }
    if (path.includes("/teacher/") && role !== "teacher")
    {
        redirectToLogin();
        return;
    }
    if(path.includes("/auth/login.html"))
    {
        if (role === "student")
        {
            window.location.href = "../student/dashboard.html";
        }
        else if (role === "teacher")
        {
            window.location.href = "../teacher/dashboard.html";
        }
    }
})();
function redirectToLogin()
{
    localStorage.clear();
    window.location.href = "../auth/login.html";
}