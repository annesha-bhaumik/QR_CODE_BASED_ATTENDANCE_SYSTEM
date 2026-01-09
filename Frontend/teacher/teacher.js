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
    localStorage.clear();
    window.location.href = "../auth/login.html";
}