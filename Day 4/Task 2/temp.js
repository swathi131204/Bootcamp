document.addEventListener("DOMContentLoaded", function () {
    let celsius = document.getElementById("celsius");
    let fahrenheit = document.getElementById("fahrenheit");

    function celToFar() {
        if (celsius.value === "") {
            fahrenheit.value = "";
            return;
        }
        let output = (parseFloat(celsius.value) * 9 / 5) + 32;
        fahrenheit.value = output.toFixed(2);
    }

    function farToCel() {
        if (fahrenheit.value === "") {
            celsius.value = "";
            return;
        }
        let output = (parseFloat(fahrenheit.value) - 32) * 5 / 9;
        celsius.value = output.toFixed(2);
    }


    celsius.addEventListener("input", celToFar);
    fahrenheit.addEventListener("input", farToCel);
});
