const display = document.getElementById("display");
const preview = document.getElementById("preview");
const historyList = document.getElementById("historyList");
const themeBtn = document.getElementById("themeBtn");

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

function appendValue(value) {
    const lastChar = display.value.slice(-1);

    if (isOperator(value) && isOperator(lastChar)) {
        return;
    }

    display.value += value;
    showPreview();
}

function clearDisplay() {
    display.value = "";
    preview.innerText = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    showPreview();
}

function showPreview() {
    if (display.value === "") {
        preview.innerText = "";
        return;
    }

    try {
        preview.innerText = "= " + eval(display.value);
    } catch {
        preview.innerText = "";
    }
}

function calculate() {
    if (display.value === "") return;

    try {
        const expression = display.value;
        const result = eval(expression);

        const li = document.createElement("li");
        li.textContent = `${expression} = ${result}`;

        historyList.prepend(li);

        display.value = result;
        preview.innerText = "";
    } catch {
        display.value = "Error";
    }
}

function clearHistory() {
    historyList.innerHTML = "";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeBtn.textContent =
        document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";
});

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        appendValue(key);
    }
    else if (["+", "-", "*", "/", "."].includes(key)) {
        appendValue(key);
    }
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }
    else if (key === "Backspace") {
        deleteLast();
    }
    else if (key === "Escape") {
        clearDisplay();
    }
});
