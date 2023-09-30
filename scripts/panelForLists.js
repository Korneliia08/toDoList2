class CreatePanel {
    arrayOfLists = [];
    main;

    formForCreateListHTML;
    divForListsHTML;

    nameArray;

    inputAddArrayHTML;
    inputForTitleArray;
    inputCreateArray;

    emptyInput;
    confirm;
    titleDeleteArray;

    constructor(formParam) {
        this.formForCreateListHTML = document.querySelector(formParam);
    }

    showPanelForLists() {
        this.main = document.querySelector("main");
        this.main.style.display = "flex";
        this.inputAddArrayHTML = document.createElement("input");

        this.inputAddArrayHTML.type = "button";
        this.inputAddArrayHTML.value = "Add array"
        this.inputAddArrayHTML.classList.add("btnAddArray");

        this.formForCreateListHTML.append(this.inputAddArrayHTML);

        this.inputAddArrayHTML.addEventListener("click", this.createInput.bind(this));
    }

    createInput() {
        if (this.formForCreateListHTML.querySelector(".btnAddNameArray") != undefined) {
            return;
        }
        this.showInputForTitle();
        this.showInputCreateArray();
    }

    showInputForTitle() {
        this.inputForTitleArray = document.createElement("input");
        this.inputForTitleArray.type = "text";
        this.inputForTitleArray.placeholder = "Name"

        this.inputForTitleArray.classList.add("btnAddNameArray");

        this.formForCreateListHTML.append(this.inputForTitleArray);

        this.inputForTitleArray.addEventListener("keypress", (event) => {

            if (event.code === "Enter") {
                this.createArray();
            }
        })
    }

    showInputCreateArray() {
        this.removeLastConfirmIfExist();
        this.inputCreateArray = document.createElement("input");
        this.inputCreateArray.type = "button";
        this.inputCreateArray.value = "Create"
        this.inputCreateArray.classList.add("btnCreateArray");

        this.formForCreateListHTML.append(this.inputCreateArray);

        this.inputCreateArray.addEventListener("click", this.createArray.bind(this));
    };


    createArray() {
        if (!this.emptyInput) {
            this.emptyInput = document.createElement("h4");
        }

        if (this.inputForTitleArray.value.length < 1) {
            this.emptyInput.textContent = "Empty field! Enter a name";
            this.emptyInput.classList.add("emptyInput");
            this.formForCreateListHTML.append(this.emptyInput);
            this.inputForTitleArray.classList.add("redBorder");
            return;
        }
        this.nameArray = this.inputForTitleArray.value;
        const findDubleList = this.arrayOfLists.findIndex(list => list.nameOfList === this.nameArray) !== -1;
        if (findDubleList) {
            this.emptyInput.textContent = "The list name is already used";
            this.emptyInput.classList.add("emptyInput");
            this.formForCreateListHTML.append(this.emptyInput);
            this.inputForTitleArray.classList.add("redBorder");
            return;
        }
        this.arrayOfLists.push(new ListForTasks(this.nameArray, this));
        this.inputForTitleArray.remove();
        this.inputCreateArray.remove();
        this.emptyInput.remove();
        this.showAllLists();
    }

    showAllLists() {
        this.divForListsHTML = document.querySelector(".lists");

        Array.from(this.divForListsHTML.children).forEach(child => {
            child.remove()
        })
        this.arrayOfLists.forEach(list => {
            list.divForListHTML.addEventListener("click", this.deleteList.bind(this));
            this.divForListsHTML.append(list.divForListHTML);
        })
    }

    deleteList(event) {
        let parent = event.target.parentElement;
        let titleListToDelete = parent.querySelector('h2').textContent;
        if (event.target.value === "Delete") {
            this.removeExistsInputForAddArray();
            this.removeLastConfirmIfExist();

            this.titleDeleteArray = document.createElement("h3");
            this.titleDeleteArray.innerHTML = `If you want to delete the <em style="text-transform: uppercase">"${titleListToDelete}"</em>,<br>  table,
            enter its name in the field and press "Enter"`;
            this.titleDeleteArray.classList.add("h3Style");

            this.confirm = document.createElement("input");
            this.confirm.placeholder = "Enter the name"
            this.confirm.classList.add("confirmDeleteList");

            this.confirm.addEventListener("keydown", (event) => {
                let titleFromConfirm = this.confirm.value;
                if (event.code === "Enter") {
                    if (titleFromConfirm.toUpperCase() !== titleListToDelete.toUpperCase()) {
                        let titleNotFoundList = document.createElement("h3");
                        titleNotFoundList.textContent = "List not found";
                        titleNotFoundList.classList.add("notFound");

                        titleNotFoundList.dataset.notFound = "";
                        let existNotFoundList = document.querySelectorAll("[data-not-found]");

                        if (existNotFoundList.length >= 1) {
                            return;
                        }

                        this.formForCreateListHTML.append(titleNotFoundList);
                        return;
                    }
                    parent.remove();
                    this.removeLastConfirmIfExist();
                    this.deleteFromPanelList(parent)

                }
            })

            this.formForCreateListHTML.append(this.titleDeleteArray);
            this.formForCreateListHTML.append(this.confirm);
        }
    }

    deleteFromPanelList(titleListToDelete) {
        this.arrayOfLists = this.arrayOfLists.filter(panel => {
            return panel.divForListHTML.dataset !== titleListToDelete.dataset
        })

    }

    removeLastConfirmIfExist() {
        let existConfirm = this.formForCreateListHTML.querySelector(".confirmDeleteList");
        let notFound = this.formForCreateListHTML.querySelector(".notFound");
        if (existConfirm) {
            existConfirm.remove();
            this.titleDeleteArray.remove();
        }
        if (notFound) {
            notFound.remove();
        }
    }

    removeExistsInputForAddArray() {
        let existInput = this.formForCreateListHTML.querySelector(".btnAddNameArray");
        if (existInput) {
            existInput.remove();
            this.inputCreateArray.remove();
        }
    }
}
