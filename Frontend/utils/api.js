export function loginUser(username, password, role)
{
    if (!role || !username || !password)
    {
        return{success: false, message: "All fields are required"};
    }
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
    return{success: true, role, username};
}
export function logoutUser()
{
    localStorage.clear();
}

export function startClassSession(subject, location)
{
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("activeSession", JSON.stringify({subject, location, date : today}));
}

export function markAttendance(location)
{
    const session = JSON.parse(localStorage.getItem("activeSession"));
    if (!session) return {success: false, message: "No active class session"};
    if (session.location !== location)
    {
        return {success: false, message: "Wrong location QR"};
    }
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const user = localStorage.getItem("username");
    const already = attendance.find(a=>
        a.user === user && a.date === session.date && a.subject === session.subject
    );
    if (already) return {success: false, message: "Already marked"};
    attendance.push(
        {
            user,
            location,
            subject : session.subject,
            status : "Pending",
            time : new Date().toLocaleTimeString(),
            date : session.date
        });
    localStorage.setItem("attendance", JSON.stringify(attendance));
    return {success: true};
}
export function getStudentAttendance(username)
{
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    return attendance.filter(a => a.user === username);
}

export function getAttendanceBySession(subject, location, date)
{
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    return attendance.filter(a => a.subject === subject && a.location === location && a.date === date);
}
export function verifyAttendance(index)
{
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    if (attendance[index])
    {
        attendance[index].status = "Present";
        localStorage.setItem("attendance", JSON.stringify(attendance));
        return true;
    }
    return false;
}