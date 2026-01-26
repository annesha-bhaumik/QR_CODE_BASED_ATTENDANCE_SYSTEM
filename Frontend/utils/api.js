const BASE_URL = "http://localhost:3000";

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

export async function startClassSession(subject, location)
{
    const res = await fetch(`${BASE_URL}/session/start`, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({subject, location})
    });
    return await res.json();
}
export async function endClassSession()
{
    const res = await fetch(`${BASE_URL}/session/end`, {
        method : "POST"
    });
    return await res.json();
}
export async function getActiveSession()
{
    const res = await fetch(`${BASE_URL}/session`);
    return await res.json();
}
export async function getAttendanceBySession(location, subject, date)
{
    const res = await fetch(`${BASE_URL}/attendance`);
    const data = await res.json();
    return data.filter(
        a =>
            a.location === location && a.subject === subject && a.date === date
    );
}
export async function verifyAttendance({username, subject, date})
{
    const res = await fetch(`${BASE_URL}/attendance/verify`, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({username, subject, date})
    });
    return await res.json();
}

export async function markAttendance(location)
{
    const username = localStorage.getItem("username");
    const res = await fetch(`${BASE_URL}/attendance/mark`, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({username, location})
    });
    return await res.json();
}
export async function getStudentAttendance(username)
{
    const res = await fetch(`${BASE_URL}/attendance`);
    const data = await res.json();
    return data.filter(a =>a.username === username);
}