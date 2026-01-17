import { logoutUser, startClassSession, endClassSession, getAttendanceBySession, verifyAttendance } from "../utils/api.js";
const startBtn = document.getElementById("startBtn");
const endBtn = document.getElementById("endBtn");
document.addEventListener("DOMContentLoaded", () =>
{
    const session = localStorage.getItem("activeSession");
    if(session)
    {
        startBtn.style.display = "none";
        endBtn.style.display = "inline";
    }
    else
    {
        startBtn.style.display = "inline";
        endBtn.style.display = "none";
    }
});
function startSession()
{
    const loc = document.getElementById("loc").value;
    const sub = document.getElementById("sub").value;
    if(!loc || !sub)
    {
        alert("Enter location and subject");
        return;
    }
    startClassSession(sub, loc);
    startBtn.style.display = "none";
    endBtn.style.display = "inline";
    alert("Session started");
}
function endSession()
{
    endClassSession();
    startBtn.style.display = "inline";
    endBtn.style.display = "none";
    alert("Session ended");
}
function loadAttendance()
{
    const location = document.getElementById("location").value;
    const subject = document.getElementById("subject").value;
    const date = document.getElementById("date").value;
    const card = document.getElementById("attendanceCard");
    const table = document.getElementById("attendanceTable");
    if(!location  || !subject || !date)
    {
        alert("Please select Location, Subject and Date!");
        card.style.display = "none";
        return;
    }
    const data = getAttendanceBySession(location, subject, date);
    card.style.display = "block";
    table.innerHTML = "";
    if(data.length === 0)
    {
        table.innerHTML = `
        <tr>
            <td colspan="4">No attendance records found!</td>
        </tr>
        `;
        return;
    }
    data.forEach((student, index) => {
    table.innerHTML += `
    <tr>
        <td>${index + 1}</td>
        <td>${student.user}</td>
        <td class="${student.status === "Present" ? "present" : "pending"}">${student.status}</td>
        <td>
            ${student.status === "Pending" ? `<button class="verify-btn" onclick="verifyAttendance(${index}, this)">Verify</button>` : "-"}
        </td>
    </tr>
    `;
    });
}
function verifyStudentAttendance(index, btn)
{
    const success = verifyAttendance(index);
    if (!success)
    {
        alert("Verification failed");
        return;
    }
    const row = btn.closest("tr");
    const statusCell = row.children[2];
    statusCell.innerText = "Present";
    statusCell.classList.remove("pending"); 
    statusCell.classList.add("present"); 
    btn.disabled = true;
    btn.innerText = "Verified";
    btn.style.backgroundColor = "rgba(126, 126, 126, 0.4)";
    btn.style.cursor = "not-allowed";
    btn.style.boxShadow = "none";
}
function logout()
{
    logoutUser();
    window.location.href = "../auth/login.html";
}
window.startSession = startSession;
window.endSession = endSession;
window.loadAttendance = loadAttendance;
window.verifyStudentAttendance = verifyStudentAttendance;
window.logout = logout;