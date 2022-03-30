let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");


//=====================================================











//=====================================================


let arrayOfTasks = [];
if (localStorage.getItem("tasks"))
    {
        arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    }
getDataToLocalStorge();


//=====================================================
//=====================================================
//take values from local storge
let tcount = localStorage.getItem("totalcount");
let dcount = localStorage.getItem("donecount");
let rcount = localStorage.getItem("Remainingcount");

document.querySelector(".container .info .totalcount").innerHTML = localStorage.getItem("totalcount");
document.querySelector(".container .info .row .DONEcount").innerHTML = localStorage.getItem("donecount");
document.querySelector(".container .info .row .Remainingcount").innerHTML = localStorage.getItem("Remainingcount");

//localStorage.clear();
//=====================================================
//=====================================================

//add task
submit.onclick = function () {

    //chack empty input task
    if (input.value !== "")
        {
            //add task div
            addTaskToArray(input.value);
            input.value = "";
            //console.log(input.value);
            if (localStorage.getItem("totalcount") == 0)
                {
                    localStorage.setItem("Remainingcount",0);
                    localStorage.setItem("donecount",0);
                    tcount = 1;
                    rcount = 1;
                    localStorage.totalcount = tcount;
                    localStorage.Remainingcount = rcount;
                    document.querySelector(".container .info  .totalcount").innerHTML = tcount;
                    document.querySelector(".container .info .row .Remainingcount").innerHTML = rcount;
                }
            else
                {
                    tcount++;
                    rcount++;
                    localStorage.totalcount = tcount;
                    localStorage.Remainingcount = rcount;
                    document.querySelector(".container .info .totalcount").innerHTML = tcount;
                    document.querySelector(".container .info .row .Remainingcount").innerHTML = rcount;
                }
        }
    };
//=====================================================
//=====================================================

//update task element
taskDiv.addEventListener("click", (e) => {
    //delet botton
    if (e.target.classList.contains("del"))
        {
            //remove element from page
            e.target.parentElement.remove();
            //remove element from local storge
            deleteTaskById(e.target.parentElement.getAttribute("data-id"));

            tcount--;
            localStorage.totalcount = tcount;
            document.querySelector(".container .info  .totalcount").innerHTML = tcount;

            if (e.target.parentElement.classList.contains("done"))
                {
                    dcount --;
                    localStorage.donecount = dcount;
                    document.querySelector(".container .info .row .DONEcount").innerHTML = dcount;
                }
            else
                {
                    rcount--;
                    localStorage.Remainingcount = rcount;
                    document.querySelector(".container .info .row .Remainingcount").innerHTML = rcount;
                }

        }
    //task element
    if (e.target.classList.contains("task"))
    {
        //toggle status of task (completed)
        toggleStatusById(e.target.getAttribute("data-id"));

        //toggle done class
        e.target.classList.toggle("done");
        if (e.target.classList=="task col-12 done") 
            {
                if (localStorage.getItem("donecount") == 0)
                    {
                        dcount = 1;
                        rcount--;
                        localStorage.Remainingcount = rcount;
                        document.querySelector(".container .info .row .Remainingcount").innerHTML = rcount;
                        localStorage.donecount = dcount;
                        document.querySelector(".container .info .row .DONEcount").innerHTML = dcount;
                    }
                else
                    {
                        dcount ++;
                        localStorage.donecount = dcount;
                        document.querySelector(".container .info .row .DONEcount").innerHTML = dcount;
                        rcount--;
                        localStorage.Remainingcount = rcount;
                        document.querySelector(".container .info .row .Remainingcount").innerHTML = rcount;
                    }
            }
        else
            {
                    dcount --;
                    localStorage.donecount = dcount;
                    document.querySelector(".container .info .row .DONEcount").innerHTML = dcount;
                    rcount++;
                    localStorage.Remainingcount = rcount;
                    document.querySelector(".container .info .row .Remainingcount").innerHTML = rcount;
            }
    }
})

//=====================================================
//=====================================================

//add Task To Array function
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed:false,
    }
    //push task to array
    arrayOfTasks.push(task);

    //add block of task page
    addTaskBlock(arrayOfTasks);

    //add arry of tasks to local storge
    addDataToLocalStorge(arrayOfTasks);
}

//=====================================================
//=====================================================

function addTaskBlock(arrayOfTasks) {
    //empty task div
    taskDiv.innerHTML = "";

    //loop on arry of tasks
    arrayOfTasks.forEach((task) => {

        //create task div
        let label = document.createElement("label");
        label.className = "task col-12";
        if (task.completed) {
            label.className = "task done";
        }
        label.setAttribute("data-id", task.id);
        //add button check
        let checkButton = document.createElement("input");
        checkButton.type = "checkbox";
        checkButton.id = "checked";
        label.appendChild(checkButton);

        let checkMark = document.createElement("span");
        checkMark.className="checkmark";
        label.appendChild(checkMark);

        //task text
        label.appendChild(document.createTextNode(task.title));
        //add delete button
        let span = document.createElement("span");
        span.className="del btn btn-outline-danger";
        span.appendChild(document.createTextNode("Delete"));
        label.appendChild(span);

        taskDiv.appendChild(label);
    });
}

//=====================================================
//=====================================================


//add data to local storge
function addDataToLocalStorge(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

//get data to local storge
function getDataToLocalStorge()
{
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTaskBlock(tasks);
    }

}

//=====================================================
//=====================================================

//delete task from local by id
function deleteTaskById(taskId) {
    //filter array of tasks by id taken from click on delete button
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    //update tasks after filteration
    addDataToLocalStorge(arrayOfTasks);
    
}
//=====================================================
//=====================================================
function toggleStatusById(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId)
        {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
        addDataToLocalStorge(arrayOfTasks);
    }
}
//=====================================================
//=====================================================


