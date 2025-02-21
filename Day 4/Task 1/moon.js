
const mybutton = document.getElementById("mybutton");
const myimg = document.getElementById("myimg");

mybutton.addEventListener("click", event =>{
    if(myimg.style.display==="none"){
        myimg.style.display = "block";
        mybutton.textContent = "hide";
    }
    else{
        myimg.style.display="none";
        mybutton.textContent="show";

    }
});
