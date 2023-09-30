class Header {
    elementHeader;
    headerBlock;
    timeInTagP;
    clock;
    nameUser;


    constructor(elementHeaderParam, headerBlock) {
        this.elementHeader = document.querySelector(elementHeaderParam);
        this.headerBlock = document.querySelector(headerBlock);
        this.elementHeader.classList.add("header");
        this.headerBlock.classList.add("headerBlock");

    }

    createClock() {
        this.clock = document.createElement("div");
        this.headerBlock.append(this.clock);
        this.timeInTagP = document.createElement("p");
        this.timeInTagP.classList.add("time");
        this.clock.append(this.timeInTagP);
    }

    updateClock() {
        let now = new Date();
        let hours = now.getHours();
        // if (hours < 10) hours = '0' + hours
        let minutes = now.getMinutes();
        if (minutes < 10) minutes = '0' + minutes
        let sekunds = now.getSeconds();
        if (sekunds < 10) sekunds = '0' + sekunds
        let currentTime = `${hours}:${minutes}:${sekunds}`;
        this.timeInTagP.textContent = currentTime;
    }

    showHeader() {
        this.createClock();
        this.updateClock()
        setInterval(this.updateClock.bind(this), 1000);

        let h1 = document.createElement("h1");
        h1.innerHTML = `Hi <em style="color: #e7f822">${this.nameUser}</em>, time to make your to-do list`;
        h1.classList.add("h1Style");
        this.headerBlock.append(h1);
    }
}
