function showTasks() {
  table.style.display = "block";
  let length = localStorage.length;
  for (let i = 0; i < length; i++) {
    try {
      let task = JSON.parse(localStorage.getItem(localStorage.key(i)));
      let cl = task.status == "incomplete" ? "text-black" : "text-green-400";
      let cl2 =
        task.status == "incomplete"
          ? ""
          : 'style="text-decoration: line-through;"';
      todoList.innerHTML =
        todoList.innerHTML +
        `
                <tr class="bg-green-200 text-lg lg:text-2xl" ${cl2}>
                <td class="p-4 text-center">${task.num}</td>
                <td class="p-4 text-center w-36">${task.task}</td>
                <td class="p-4 text-center">${task.date}</td>
                <td data-value="${task.status}" onclick="changeStatus(this)" class="p-6 text-center"><i class='bx bxs-check-square cursor-pointer text-2xl ${cl}'></i></td>
                <td class="p-6 text-center" onclick="deleteTask(this)"><i class='bx bxs-message-square-x cursor-pointer text-2xl'></i></td>
                </tr> `;
    } catch (error) {
      console.log(error + ` ${i + 1} is deleted already.`);
    }
  }
  checkTasks()
}
function run() {
  if (localStorage.length > 0) {
    message.innerHTML = ``;
    showTasks();
  } else {
    table.style.display = "none";
    message.innerHTML = `<p class="font-black text-xl">No Tasks Available.</p>`;
  }
}
addTask.addEventListener("click", () => {
  let text = addTask.previousElementSibling.value;
  if(!text){
    return 0;
  }
  let objectDate = new Date();
  let month = objectDate.getMonth() + 1;
  let day = objectDate.getDate();
  let formattedDate = month + "/" + day;
  let index = localStorage.length + 1;
  let task = {
    num: index,
    task: text,
    date: formattedDate,
    status: "incomplete",
  };
  localStorage.setItem(`${index}`, JSON.stringify(task));
  addTask.previousElementSibling.value = "";
  todoList.innerHTML = ``;
  run();
  showAlert("Task Added!");
});

function showAlert(text) {
  alertDivText.innerText = text;
  alertDiv.style.display = "block";
  setTimeout(() => {
    alertDiv.style.display = "none";
  }, 3000);
}

function changeStatus(e) {
  let key = e.parentNode.firstElementChild.innerText;
  let status = JSON.parse(localStorage.getItem(key)).status;
  if (status == "incomplete") {
    let taskToUpdate = JSON.parse(localStorage.getItem(key));
    taskToUpdate["status"] = "completed";
    localStorage.setItem(key, JSON.stringify(taskToUpdate));
    todoList.innerHTML = ``;
    run();
    showAlert("Congratulations! Task Completed");
  } else {
    let taskToUpdate = JSON.parse(localStorage.getItem(key));
    taskToUpdate["status"] = "incomplete";
    localStorage.setItem(key, JSON.stringify(taskToUpdate));
    todoList.innerHTML = ``;
    run();
  }
}

function deleteTask(e) {
  let key = e.parentNode.firstElementChild.innerText;
  localStorage.removeItem(key);
  showAlert("Task Removed!");
  todoList.innerHTML = ``;
  run();
  checkTasks();
}
run();

function checkTasks() {
  let length = localStorage.length;
  let completed = 0;
  for (let i = 0; i < length; i++) {
    try {
      let task = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (task.status == "completed") {
        completed += 1;
      }
    } catch (error) {
      console.log(error + ` ${i + 1} is deleted already.`);
    }
  }
  totalCount.innerText = length;
  completedCount.innerText = completed;
  remainingCount.innerText = length-completed;
}
