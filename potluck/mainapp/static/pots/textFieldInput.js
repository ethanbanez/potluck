foodCount = 1;

function addItem(){
    foodCount++;
    document.getElementById("items").innerHTML += "<li><input type=\"text\" id=\"food" + foodCount + "\" name=\"food" + foodCount + "\"></li>";
}

function removeItem(){
    it = document.getElementById("food" + foodCount);
    if(it.parentNode.parentNode.childElementCount > 1){
        it.parentNode.parentNode.removeChild(it.parentNode);
        foodCount--;
    }
}