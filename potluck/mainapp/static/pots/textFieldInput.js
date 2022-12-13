foodCount = 1;

function addItem(){
    var foodList = document.getElementById("items");
    foodCount++;
    var items=[];
    var fields=foodList.getElementsByTagName('input');

    for (var i = 0; i < fields.length; i++){
        var field = fields[i];
        items.push(field.value);
    }

    const node = "<li><input type=\"text\" id=\"food" + foodCount + "\" name=\"food" + foodCount + "\"></li>";
    foodList.innerHTML += node;

    for (var i = 0; i < fields.length-1; i++){
        fields[i].value = items[i];
    }
}

function removeItem(){
    it = document.getElementById("food" + foodCount);
    if(it.parentNode.parentNode.childElementCount > 1){
        it.parentNode.parentNode.removeChild(it.parentNode);
        foodCount--;
    }
}