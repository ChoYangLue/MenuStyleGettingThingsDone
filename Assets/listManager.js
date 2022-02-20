
document.addEventListener('keydown', eventKeyDown);

var taskObject = {
    version: "01.00",
    task: [
        { id: "mytask1", data: "setting1", childTask: [
            { id: "mytask3", data: "setting3", childTask: [] },
            { id: "mytask4", data: "setting4", childTask: [] },
            { id: "mytask5", data: "setting5", childTask: [] },
        ] },
        { id: "mytask2", data: "setting2", childTask: [
            { id: "mytask7", data: "setting7", childTask: [] },
            { id: "mytask8", data: "setting8", childTask: [] },
        ] },
        { id: "mytask6", data: "setting6", childTask: [] },
        { id: "mytask9", data: "setting9", childTask: [] },
    ],
};


function saveTaskObjectToLocalStrage()
{
    if (!window.localStorage) {
        console.log("can not use local storage.");
		return;
    }
    var json = JSON.stringify(taskObject, undefined, 1);
    localStorage.setItem('userData', json);
}

function loadTaskObjectFromLocalStrage()
{
    var data = localStorage.getItem('userData');
    taskObject = JSON.parse(data);
}


function addTaskListForDiv(taskList, divName) {
    for (var i = 0; i < taskList.length; ++i) {
        var elemLi = document.createElement('li');
        elemLi.id = taskList[i].id;
        
        var caption = document.createTextNode(taskList[i].data);
        elemLi.appendChild(caption);
        document.getElementById(divName).appendChild(elemLi);
    }
}

function setFocus(listObj, fcind) {
    if (fcind < 0 || fcind > listObj.length) return;

    var elem = document.getElementById(listObj[fcind].id);
    //elem.style.fontWeight = "bold";
    elem.style.backgroundColor = "#ff7800";
    elem.style.color = "#111111";
    elem.style.listStylePosition = "outside";
}

function outFocus(listObj, fcind) {
    if (fcind < 0 || fcind > listObj.length) return;

    var elem = document.getElementById(listObj[fcind].id);
    //elem.style.fontWeight = "normal";
    elem.style.backgroundColor = "#111111";
    elem.style.color = "#ff7800";
    elem.style.listStylePosition = "outside";
}

function deleteDisplayList(listId) {

    var ul = document.getElementById(listId);
    var len = ul.children.length;
    for (var i = 0; i < len; i++) {
        //[li]を削除する
        ul.removeChild(ul.children[0]);
    }
}

function switchStyle(divName, origStyleName, changeStyleName) {
    document.querySelector(divName).classList.remove(origStyleName);
    document.querySelector(divName).classList.toggle(changeStyleName);
}

function isDisplayContextMenu(ctxId) {
    if (document.getElementById(ctxId).style.display == "block") return true;
    return false;
}

function displayContextMenuById(ctxId){
    document.getElementById(ctxId).style.left=window.innerWidth/2+"px";
    document.getElementById(ctxId).style.top=window.innerHeight/2+"px";

    if (isDisplayContextMenu(ctxId))
    {
        document.getElementById(ctxId).style.display="none";
    }
    else {
        document.getElementById(ctxId).style.display="block";
    }
    contextMenuFocusIndex = 0;
}


loadTaskObjectFromLocalStrage();
addTaskListForDiv(taskObject.task, 'list-left');

var focusIndex = 0;
setFocus(taskObject.task, focusIndex);
var number = 1;

var contextMenuFocusIndex = 0;
var editMode = 0;

function eventKeyDown(e) {

    switch (e.key) {
        case "ArrowUp":
            if (isDisplayContextMenu('contextmenu'))
            {
                contextMenuFocusIndex -=1;
                break;
            }
            outFocus(taskObject.task, focusIndex);
            if (focusIndex > 0) focusIndex -= 1;
            setFocus(taskObject.task, focusIndex);
            
            deleteDisplayList("list-right");
            addTaskListForDiv(taskObject.task[focusIndex].childTask, 'list-right');
            break;
        case "ArrowDown":
            if (isDisplayContextMenu('contextmenu'))
            {
                contextMenuFocusIndex += 1;
                break;
            }
            outFocus(taskObject.task, focusIndex);
            if (focusIndex+1 < taskObject.task.length) focusIndex += 1;
            else focusIndex = 0;
            setFocus(taskObject.task, focusIndex);
            
            deleteDisplayList("list-right");
            addTaskListForDiv(taskObject.task[focusIndex].childTask, 'list-right');
            break;
        case "ArrowRight":
            if (isDisplayContextMenu('contextmenu') || 
                editMode)
            {
                break;
            }
            switchStyle('#list-right-div', 'flex-small-list', 'flex-big-list');
            switchStyle('#list-left-div', 'flex-big-list', 'flex-small-list');
            break;
        case "ArrowLeft":
            if (isDisplayContextMenu('contextmenu') || 
                editMode)
            {
                break;
            }
            switchStyle('#list-right-div', 'flex-big-list', 'flex-small-list');
            switchStyle('#list-left-div', 'flex-small-list', 'flex-big-list');
            break;
        case "Enter":
            switch(editMode)
            {
                case 0:
                    break;
                case 1:
                    taskObject.task[focusIndex].data = document.getElementById("edit-input").value;
                    document.getElementById(taskObject.task[focusIndex].id).innerHTML = document.getElementById("edit-input").value;
                    break;
                default:
                    break;
            }
            if (editMode != 0){
                editMode = 0;
                saveTaskObjectToLocalStrage();
                break;
            }
            console.log(editMode);
            
            if (isDisplayContextMenu('contextmenu'))
            {
                console.log(contextMenuFocusIndex);
                switch(contextMenuFocusIndex){
                    case 0:
                        document.getElementById(taskObject.task[focusIndex].id).innerHTML = '<input type="text" id="edit-input" value="'+taskObject.task[focusIndex].data+'"/>'
                        editMode = 1;
                        document.getElementById("edit-input").focus();
                        break;
                    case 1:
                        addItem();
                        break;
                    case 2:
                        delItem(focusIndex);
                        if (focusIndex > 0) focusIndex -= 1;
                        setFocus(taskObject.task, focusIndex);
                        break;
                    default:
                        break;
                }
            }
            
            displayContextMenuById('contextmenu');
            break;
        default:
            break;
    }
    
    console.log(e.key);
}

function addItem(focusIndex) {
    var dt = new Date();
    var elem = document.createElement('li');
    elem.id = 'item' + dt;
    var caption = document.createTextNode('リスト' + dt);
    elem.appendChild(caption);
    document.getElementById('list-left').appendChild(elem);
    
    var item = { id: elem.id, data: caption, childTask: [] };
    taskObject.task.push(item);
}


function delItem(focusIndex) {
    var elem = document.getElementById(taskObject.task[focusIndex].id);
    document.getElementById('list-left').removeChild(elem);
    
    taskObject.task.splice(focusIndex, 1);
}