import { logoutUser, startClassSession, endClassSession } from "../utils/api.js";
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
    const subject = document.getElementById("subject").value;
    const date = document.getElementById("date").value;
    const card = document.getElementById("attendanceCard");
    const table = document.getElementById("attendanceTable");
    if(!subject || !date)
    {
        alert("Please select Subject and Date!");
        card.style.display = "none";
        return;
    }
    card.style.display = "block";
    const data = [
        { roll: "01", name: "ABC", status: "Pending "},
        { roll: "02", name: "DEF", status: "Pending "}
    ];
    table.innerHTML = "";
    if(data.length === 0)
    {
        table.innerHTML = `
        <tr>
            <td colspan="4" style="font-size:20px">No attendance records found!</td>
        </tr>
        `;
        return;
    }
    data.forEach(student => {
    table.innerHTML += `
    <tr>
        <td>${student.roll}</td>
        <td>${student.name}</td>
        <td class="status pending">Pending</td>
        <td>
            <button class="verify-btn" onclick="verifyAttendance(this)">Verify</button>
        </td>
    </tr>
    `;
    });
}
function verifyAttendance(btn)
{
    const row = btn.closest("tr");
    const statusCell = row.children[2];
    statusCell.classList.remove("pending"); 
    statusCell.classList.add("present"); 
    statusCell.innerText = "Present";
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
window.verifyAttendance = verifyAttendance;
window.logout = logout;