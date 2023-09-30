class StartPanel {
    elementHTML;
    startPanelHTML;
    unOrderedListHTML;
    titleHTML;
    formHTML;
    input;
    nameUser;
    headerObj;
    panelForListsObj;

    constructor(elementHTMLParam) {
        this.elementHTML = document.querySelector(elementHTMLParam);
        this.startPanelHTML = document.createElement("div");
        this.unOrderedListHTML = this.createUlList();
        this.titleHTML = this.createTitle();
        this.formHTML = this.createForm();
    }

    putOtherObj(headerObjParam, panelForListsObjParam) {
        this.headerObj = headerObjParam;
        this.panelForListsObj = panelForListsObjParam;
    }

    createUlList() {
        let ulList = document.createElement("ul");
        ulList.classList.add("ulList");
        const liInListHTML1 = document.createElement("li");
        const liInListHTML2 = document.createElement("li");
        liInListHTML1.classList.add("li");
        liInListHTML2.classList.add("li");
        liInListHTML1.textContent = "Constantly flying out of the head, what should be done?";
        liInListHTML2.textContent = "Are you worried about not forgetting to do something important?";
        ulList.append(liInListHTML1, liInListHTML2);
        return ulList;
    }

    createTitle() {
        let title = document.createElement("h1");
        title.classList.add("h1Title");
        title.textContent = "Then To-Do List is waiting for you";
        return title;
    }

    createForm() {
        let form = document.createElement("div");
        form.classList.add("form");

        let h2 = document.createElement("h2");
        h2.textContent = "Enter your name so we know how to contact you";
        h2.classList.add("h2Style");

        this.input = document.createElement("input");
        this.input.type = "text";

        this.input.classList.add("label");

        let button = document.createElement("button");
        button.textContent = "Start"
        button.classList.add("button");

        form.append(h2, this.input, button);

        form.addEventListener("click", this.sendNameMethod.bind(this));
        form.addEventListener("keypress", this.sendNameMethod.bind(this));
        return form;
    }

    sendNameMethod(event) {

        switch (event.target.className) {
            case "button":
                this.sendName();
                break;
            case "label":
            case "label redBorder":
                this.checkWhichPress(event);
                break;
        }
    }

    checkWhichPress(event) {

        if (event.code === "Enter") {

            this.sendName();
        }

    }

    sendName() {
        let footer = document.querySelector("footer");
        if (this.input.value < 1) {
            this.input.classList.add("redBorder");
        } else {
            this.nameUser = this.input.value;
            this.startPanelHTML.style.display = "none";
            this.headerObj.elementHeader.style.display = "block";
            this.headerObj.nameUser = this.nameUser;
            this.headerObj.showHeader();

            this.panelForListsObj.showPanelForLists();

            footer.style.display = "flex";
        }
    }

    showPanel() {
        this.startPanelHTML.classList.add("startPanel");
        this.startPanelHTML.append(this.unOrderedListHTML);
        this.startPanelHTML.append(this.titleHTML);
        this.startPanelHTML.append(this.formHTML);

        this.elementHTML.append(this.startPanelHTML);
    }

}
