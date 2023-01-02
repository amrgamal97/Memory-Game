let startScreen = document.querySelector(".splash");
let startBtn = document.querySelector(".splash span");
let gameBlock = document.querySelector(".game-block");
let boxContainer = document.querySelector(".memory-game-blocks");

startBtn.addEventListener("click", () => {
    let nameAccess = prompt("Type Your Name Please?");
    let name = document.querySelector(".info .name span");
    if (nameAccess !== "") {
        name.textContent = nameAccess;
        startScreen.remove();
    }
    else {
        name.textContent = "Unknown";
        startScreen.remove();
    }
});

let blocks = Array.from(boxContainer.children);
let order = [...Array(blocks.length).keys()];
shuffle(order);

blocks.forEach((element, index) => {
    element.style.order = order[index];
    element.addEventListener("click", () => {
        flip(element);
    });
});

function shuffle(array) {
    let current = array.length;
    let temp;
    let random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}

function flip(element) {
    element.classList.add("flipped");
    let collecting = blocks.filter(el => el.classList.contains("flipped"));
    if (collecting.length === 2) {
        stopClick();
        checking(collecting[0], collecting[1]);
    }
    function stopClick() {
        boxContainer.classList.add("no-click");
        setTimeout(() => {
            boxContainer.classList.remove("no-click");
            blocks.forEach(e => {
                e.classList.remove("flipped");
            });
        }, 1000);
    }
    function checking(e1, e2) {
        let tries = document.querySelector(".info .try span");
        if (e1.dataset.technology === e2.dataset.technology) {
            e1.classList.remove("flipped");
            e2.classList.remove("flipped");
            e1.classList.add("match");
            e2.classList.add("match");
        }
        else {

            tries.innerHTML++;
        }
    }
}