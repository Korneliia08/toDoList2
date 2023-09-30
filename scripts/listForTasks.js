class ListForTasks {
    nameOfList;
    titleTable;

    inputDeleteList;
    inputWhichShowTask;

    panelForListsObj;

    tasks = [];
    btnAddNewTask;


    // all  panels
    divForListHTML;

    panelForCreateTasks;
    panelWhichShowTasks;
    elementMainHTML;
    divForConfirmDelete;
    confirmDeleteTask;

    //panelForCreateTask

    inputForName;
    areaForDescribe;
    inputForDate;
    lastTaskSort = 'all';

    counter = 0;

    constructor(nameOfListParam, objPanelForLists) {
        this.nameOfList = nameOfListParam;
        this.inputDeleteList = this.createInputForDelete();
        this.inputWhichShowTask = this.createInputForShowTask();
        this.divForListHTML = this.createList();
        this.panelForListsObj = objPanelForLists;
    }

    createInputForDelete() {
        let inputForDelete = document.createElement("input");
        inputForDelete.type = "submit";
        inputForDelete.value = "Delete";
        inputForDelete.classList.add("inputDelete");
        return inputForDelete;
    }

    createInputForShowTask() {
        let inputWhichShowTasks = document.createElement("input");
        inputWhichShowTasks.type = "submit";
        inputWhichShowTasks.value = "Show Tasks";
        inputWhichShowTasks.classList.add("inputShowTasks");
        inputWhichShowTasks.addEventListener("click", this.showTasksIfExists.bind(this))
        return inputWhichShowTasks;
    }

    createList() {


        let divForListHTML = document.createElement("div");
        divForListHTML.classList.add("list");
        divForListHTML.dataset.id = new Date().getTime().toString();
        let h2 = document.createElement("h2");
        h2.textContent = this.nameOfList;
        h2.classList.add("titleList");

        divForListHTML.append(h2);
        divForListHTML.append(this.inputWhichShowTask);
        divForListHTML.append(this.inputDeleteList);
        return divForListHTML;
    }

    showTasksIfExists() {
        this.elementMainHTML = document.querySelector("main");
        this.deletePreviousElements();
        if (this.tasks.length < 1) {
            this.createPanelForCreateTasks();
        } else {
            this.createPanelWhichShowAllTasks();
        }
    }

    createPanelForCreateTasks() {
        this.panelForCreateTasks = document.createElement("div");
        this.panelForCreateTasks.classList.add("panelForCreateTasks");

        let template = document.querySelector("#templateCreatePanelForCreateTask").content.cloneNode(true);
        this.panelForCreateTasks.append(template);
        this.elementMainHTML.append(this.panelForCreateTasks);

        let inputCreateTask = document.querySelector(".inputCreateTask");
        inputCreateTask.addEventListener("click", this.addTaskToList.bind(this));
    }

    createPanelWhichShowAllTasks() {

        this.panelForCreateTasks.style.display = "none";
        this.panelWhichShowTasks = document.createElement("div");

        let h2 = document.createElement("h2");
        h2.innerHTML = `List "${this.nameOfList}". <span>Your tasks:</span>`;
        h2.classList.add("title");

        this.btnAddNewTask = document.createElement("button");
        this.btnAddNewTask.textContent = "Add new task";
        this.btnAddNewTask.classList.add("btnAddNewTask");
        this.btnAddNewTask.addEventListener("click", this.showPanelForCreateTask.bind(this));

        let divForSortButtons = document.createElement("div");
        divForSortButtons.classList.add("sortButtonDiv")
        let btnSortAll = document.createElement("button");
        btnSortAll.textContent = "All";
        btnSortAll.dataset.state = "all";
        btnSortAll.classList.add("btnsSort");
        let btnSortDone = document.createElement("button");
        btnSortDone.textContent = "Done";
        btnSortDone.dataset.state = "done";
        btnSortDone.classList.add("btnsSort");
        let btnSortIsNotDone = document.createElement("button");
        btnSortIsNotDone.textContent = "Time Is Up";
        btnSortIsNotDone.dataset.state = "timeIsUp";
        btnSortIsNotDone.classList.add("btnsSort");
        let btnSortInTime = document.createElement("button");
        btnSortInTime.textContent = "In progress";
        btnSortInTime.dataset.state = "inProgress";
        btnSortInTime.classList.add("btnsSort");

        divForSortButtons.append(btnSortAll, btnSortDone, btnSortInTime, btnSortIsNotDone);
        divForSortButtons.addEventListener("click", this.sortArray.bind(this))

        this.divForConfirmDelete = document.createElement("div");
        this.divForConfirmDelete.classList.add("divForConfirmDelete");


        this.panelWhichShowTasks.append(h2);
        this.panelWhichShowTasks.append(this.btnAddNewTask, divForSortButtons, this.divForConfirmDelete);

        this.panelWhichShowTasks.classList.add("panelForTasks");

        this.titleTable = document.createElement("div");
        this.titleTable.classList.add("titleTable");
        let name = document.createElement("p");
        name.classList.add("titleOfTask");
        name.textContent = "Task";
        let describe = document.createElement("p");
        describe.classList.add("describeOfTask");
        describe.textContent = "Describe";
        let term = document.createElement("p");
        term.classList.add("termOfTask");
        term.textContent = "Term of Task";

        this.titleTable.append(name, describe, term);
        this.sortArray('all')
    }

    createInputForDeleteTask(event) {
        this.divForConfirmDelete.style.display = "flex";
        if (this.divForConfirmDelete.children.length !== 0) {
            Array.from(this.divForConfirmDelete.children).forEach(children => children.remove());
        }
        let eventBtnDelete = event.target;
        let title = document.createElement("h4");
        title.innerHTML = `If you want to delete it task,enter "delete" in the field and press ENTER`;
        title.classList.add("titleDeleteTask");
        this.confirmDeleteTask = document.createElement("input");
        this.confirmDeleteTask.classList.add("inputConfirmDelete");
        this.confirmDeleteTask.addEventListener("keypress", (event) => {
            if (event.code === "Enter") {
                this.deleteTask(event, eventBtnDelete);
            }
        })
        this.divForConfirmDelete.append(title, this.confirmDeleteTask);
    }

    deleteTask(event, eventBtnDelete) {
        let enterAgain = document.createElement("h4");
        enterAgain.classList.add("titleDeleteTask");
        enterAgain.textContent = "TRY AGAIN!";
        enterAgain.classList.add("enterAgain");
        let titleFromInput = event.target.value;
        titleFromInput = titleFromInput.toUpperCase();

        let parentForBtnDelete = eventBtnDelete.parentElement;

        if (titleFromInput === "DELETE") {
            this.tasks = this.tasks.filter(task => {
                return task.idOfTask.toString() !== parentForBtnDelete.dataset.id.toString()
            });
        } else {
            this.counter++;
            if (this.counter > 1) {
                return;
            }
            this.divForConfirmDelete.append(enterAgain);
            return;
        }
        Array.from(this.divForConfirmDelete.children).forEach(children => children.remove());
        this.sortArray();
        this.counter = 0;
        this.divForConfirmDelete.style.display = "none";
    }

    sortArray(event) {
        let state;
        if (event !== 'all' && event !== undefined) {
            this.lastTaskSort = event.target.dataset.state;
            state = event.target.dataset.state
        }
        if (event === undefined) {
            state = this.lastTaskSort;
        }
        this.panelWhichShowTasks.append(this.titleTable);
        let tasksToDelete = (this.panelWhichShowTasks.querySelectorAll('.task'));
        tasksToDelete.forEach(task => {
            task.remove();
        })
        this.tasks.forEach(task => {
            const afterDate = task.checkDate()
            if (event === "all" || state === "all") {
                if (task.isDoneTask) {

                    task.divOfOneTask.style.backgroundColor = ''
                }
                this.panelWhichShowTasks.append(task.divOfOneTask);
            } else {
                if (state === "done" && task.isDoneTask) {
                    task.divOfOneTask.style.backgroundColor = ''
                    this.panelWhichShowTasks.append(task.divOfOneTask);
                }
                if (state === "inProgress" && !afterDate && !task.isDoneTask) {
                    this.panelWhichShowTasks.append(task.divOfOneTask);
                }
                if (state === "timeIsUp" && afterDate && !task.isDoneTask) {

                    this.panelWhichShowTasks.append(task.divOfOneTask);
                }
            }
        })
        this.elementMainHTML.append(this.panelWhichShowTasks);
    }

    deletePreviousElements() {
        this.panelForListsObj.formForCreateListHTML.style.display = "none";
        this.panelForListsObj.divForListsHTML.style.display = "none";
    }

    addTaskToList() {
        this.inputForName = document.querySelector(".inputForName");
        let titleOfTask = this.inputForName.value;

        this.areaForDescribe = document.querySelector(".areaForDescribe");
        let describeOfTask = this.areaForDescribe.value;

        this.inputForDate = document.querySelector(".inputForDate");
        let data = this.inputForDate.value;

        let allEmpty = false;

        this.inputForName.classList.remove("redBorder", "redPlaceholder");
        this.areaForDescribe.classList.remove("redBorder", "redPlaceholder");
        this.inputForDate.classList.remove("redBorder", "inputForDateEmpty");
        if (titleOfTask.length < 1) {
            this.inputForName.placeholder = "Enter title";
            this.inputForName.classList.add("redBorder", "redPlaceholder");
            allEmpty = true;
        }

        if (describeOfTask.length < 1) {
            this.areaForDescribe.placeholder = "Enter describe";
            this.areaForDescribe.classList.add("redBorder", "redPlaceholder");
            allEmpty = true;
        }
        if (data.length < 1) {
            this.inputForDate.classList.add("redBorder", "inputForDateEmpty");
            allEmpty = true;
        }

        if (allEmpty !== false) {
            return;
        }
        this.tasks.push(new TasksInList(titleOfTask, describeOfTask, data, this));
        this.createPanelWhichShowAllTasks();
    }

    showPanelForCreateTask() {
        let titleInPanelCreateTask = document.querySelector(".titleInPanelCreateTask");
        titleInPanelCreateTask.textContent = "Add new Task";
        this.panelWhichShowTasks.remove();
        this.panelForCreateTasks.style.display = "flex";

        this.inputForName.value = "";
        this.areaForDescribe.value = "";
        this.inputForDate.value = "";
    }

}
