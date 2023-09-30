class TasksInList {
    titleOfTask;
    describeOfTask;
    termOfTask;
    btnDelete;
    btnModyfication;
    btnConfirm;
    inputDone;
    titleOfTaskHTML;
    describeOfTaskHTML;
    termOfTaskHTML;

    divOfOneTask;
    isDoneTask = false;
    idOfTask;

    listForTaskObj;

    constructor(titleOfTask, decsribeOfTask, termOfTask, listForTaskObjParam) {
        this.titleOfTask = titleOfTask;
        this.describeOfTask = decsribeOfTask;
        this.termOfTask = termOfTask;
        this.idOfTask = new Date().getTime();
        this.createBtnDelete();
        this.createBtnModyfication();
        this.createInputDone();

        this.listForTaskObj = listForTaskObjParam;

        this.createTask();
    }

    createBtnDelete() {
        this.btnDelete = document.createElement("button");
        this.btnDelete.textContent = "Delete";
        this.btnDelete.classList.add("btnDeleteTaskAndEdit");
        this.btnDelete.addEventListener("click", this.deleteTask.bind(this));
    }

    deleteTask() {
        this.listForTaskObj.createInputForDeleteTask(event);
    }

    createBtnModyfication() {
        this.btnModyfication = document.createElement("button");
        this.btnModyfication.textContent = "Edit";
        this.btnModyfication.classList.add("btnDeleteTaskAndEdit");
        this.btnModyfication.addEventListener("click", this.editTask.bind(this));
    }

    editTask() {
        Array.from(this.listForTaskObj.divForConfirmDelete.children).forEach(children => children.remove());
        this.listForTaskObj.divForConfirmDelete.style.display = "none";
        let inputExists = this.divOfOneTask.querySelectorAll("input");
        if (inputExists.length === 3) {
            console.log(1);
            return;
        }

        let titleOfTaskHTML = this.divOfOneTask.querySelector(".titleOfTask");

        titleOfTaskHTML.style.display = "none";

        let describeOfTaskHTML = this.divOfOneTask.querySelector(".describeOfTask");
        describeOfTaskHTML.style.display = "none";

        let termOfTaskHTML = this.divOfOneTask.querySelector(".termOfTask");
        termOfTaskHTML.style.display = "none";

        this.btnModyfication.style.display = "none";

        this.btnConfirm = document.createElement("button");
        this.btnConfirm.textContent = "Save";
        this.btnConfirm.classList.add("btnDeleteTaskAndEdit");


        let inputTitle = document.createElement("input");
        inputTitle.type = "text";
        inputTitle.value = titleOfTaskHTML.textContent;
        inputTitle.classList.add("titleOfTaskEdit");

        let inputDescribe = document.createElement("textarea");
        inputDescribe.textContent = describeOfTaskHTML.textContent;
        inputDescribe.classList.add("describeOfTaskEdit");


        let inputTerm = document.createElement("input");
        inputTerm.type = "date";
        inputTerm.value = termOfTaskHTML.textContent;
        inputTerm.classList.add("termOfTaskEdit");

        this.btnConfirm.addEventListener("click", this.saveEditTask.bind(this, inputTitle, inputDescribe, inputTerm))
        this.divOfOneTask.prepend(inputTitle, inputDescribe, inputTerm);
        this.divOfOneTask.querySelector("input[type=checkbox]").before(this.btnConfirm);
    }

    saveEditTask(inputTitle, inputDescribe, inputTerm) {
        this.titleOfTaskHTML.textContent = inputTitle.value;
        this.titleOfTaskHTML.style.display = "block";
        inputTitle.remove();

        this.describeOfTaskHTML.textContent = inputDescribe.value;
        this.describeOfTaskHTML.style.display = "block";
        inputDescribe.remove();

        this.termOfTaskHTML.textContent = inputTerm.value;
        this.termOfTaskHTML.style.display = "block";
        inputTerm.remove();

        this.btnConfirm.style.display = "none";
        this.btnModyfication.style.display = "block";
    }

    checkDate() {
        const endTime = new Date(this.termOfTask).setHours(0, 0, 0, 0)
        const endTimeToday = new Date().setHours(0, 0, 0, 0)
        if (endTime < endTimeToday) {
            this.divOfOneTask.style.backgroundColor = "#e22424c2"
            return true
        }
        return false
    }

    createInputDone() {
        this.inputDone = document.createElement("input");
        this.inputDone.type = "checkbox";
        this.inputDone.style.scale = "1.5";
        this.inputDone.addEventListener("click", (event) => {
            if (event.target.checked) {
                this.isDoneTask = true;
                this.divOfOneTask.classList.add("taskIsDone");
            } else {
                this.isDoneTask = false;
                this.divOfOneTask.classList.toggle("taskIsDone");
            }
            this.listForTaskObj.sortArray()
        });
    }

    createTask() {

        this.divOfOneTask = document.createElement("div");
        this.divOfOneTask.dataset.id = this.idOfTask;
        this.divOfOneTask.classList.add("task");

        this.titleOfTaskHTML = document.createElement("p");
        this.titleOfTaskHTML.classList.add("titleOfTask");
        this.titleOfTaskHTML.append(this.titleOfTask);
        this.divOfOneTask.append(this.titleOfTaskHTML);

        this.describeOfTaskHTML = document.createElement("p");
        this.describeOfTaskHTML.classList.add("describeOfTask");
        this.describeOfTaskHTML.append(this.describeOfTask);
        this.divOfOneTask.append(this.describeOfTaskHTML);

        this.termOfTaskHTML = document.createElement("p");
        this.termOfTaskHTML.classList.add("termOfTask");
        this.termOfTaskHTML.append(this.termOfTask);
        this.divOfOneTask.append(this.termOfTaskHTML);


        this.divOfOneTask.append(this.btnDelete, this.btnModyfication, this.inputDone);
    }

}
