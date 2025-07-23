const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const progressInner = document.getElementById("progress-inner");
    const progressCount = document.getElementById("progress-count");

    let tasks = [];

    function addTask() {
      const text = taskInput.value.trim();
      if (text === "") return;

      tasks.push({ text, completed: false });
      taskInput.value = "";
      renderTasks();
    }

    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    function renderTasks() {
      taskList.innerHTML = "";

      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.flex = "1";

        const actions = document.createElement("div");
        actions.className = "actions";

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "✔️";
        completeBtn.onclick = () => toggleComplete(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
      });

      updateProgress();
    }

    function updateProgress() {
      const total = tasks.length;
      const completed = tasks.filter(task => task.completed).length;

      const percent = total ? (completed / total) * 100 : 0;
      progressInner.style.width = percent + "%";
      progressCount.textContent = `${completed}/${total}`;
    }