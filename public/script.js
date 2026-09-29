async function loadTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();
  const box = document.getElementById("tasks");
  document.getElementById("count").textContent = `${tasks.length} task(s)`;
  box.innerHTML = "";

  if (!tasks.length) {
    box.innerHTML = "<p>No tasks yet. Add your first task above.</p>";
    return;
  }

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = `task ${task.completed ? "done" : ""}`;
    div.innerHTML = `
      <div>
        <div class="title"><strong>${escapeHtml(task.title)}</strong></div>
        <div class="meta">${escapeHtml(task.subject)} · Due: ${task.dueDate} · Priority: ${task.priority}</div>
      </div>
      <div class="actions">
        <button onclick="toggleTask(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>`;
    box.appendChild(div);
  });
}

document.getElementById("taskForm").addEventListener("submit", async e => {
  e.preventDefault();
  const body = {
    title: document.getElementById("title").value,
    subject: document.getElementById("subject").value,
    dueDate: document.getElementById("dueDate").value,
    priority: document.getElementById("priority").value
  };
  await fetch("/api/tasks", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  });
  e.target.reset();
  loadTasks();
});

async function toggleTask(id) {
  await fetch(`/api/tasks/${id}/toggle`, {method: "PUT"});
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, {method: "DELETE"});
  loadTasks();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

loadTasks();
