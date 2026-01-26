import { logoutUser, getStudentAttendance } from "../utils/api.js";
const username = localStorage.getItem("username") || "User";
document.getElementById("userName").innerText = username;
const table = document.getElementById("attendanceTable");
(async ()=> {
    const data = await getStudentAttendance(username);
    table.innerHTML = "";
    if (data.length === 0)
        {
            table.innerHTML = `
            <tr>
            <td colspan = "3">No attendance yet</td>
            </tr>
            `;
            return;
        }
        data.forEach(a =>
            {
                table.innerHTML += `
                <tr>
                    <td>${a.subject}</td>
                    <td>${a.time}</td>
                    <td class="status ${a.status === "Present" ? "present" : "pending"}">${a.status}</td>
                </tr>
                `;
            });
})();
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