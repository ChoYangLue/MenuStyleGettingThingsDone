
document.addEventListener('keydown', eventKeyDown);

var settingList = [
    { name: "setting1", parent: "root", data: "setting1" },
    { name: "setting2", parent: "root", data: "setting2" },
    { name: "setting3", parent: "setting2", data: "setting3" },
    { name: "setting4", parent: "setting2", data: "setting4" },
    { name: "setting5", parent: "setting4", data: "setting5" },
    { name: "setting6", parent: "setting4", data: "setting6" },
    { name: "setting7", parent: "setting2", data: "setting7" },
    { name: "setting8", parent: "root", data: "setting8" },
    { name: "setting9", parent: "root", data: "setting9" },
];


function addItemObject(itemObj) {
    var elemLi = document.createElement('li');
    elemLi.id = itemObj.name;

    var caption = document.createTextNode(itemObj.data);
    elemLi.appendChild(caption);
    if (itemObj.parent == "root") {
        document.getElementById('list-left').appendChild(elemLi);
        return;
    }

    var parentElem = document.getElementById(itemObj.parent);
    var retElemUl = parentElem.getElementsByTagName("ul");
    console.log(retElemUl);
    if (retElemUl.length != 0) {
        retElemUl[0].appendChild(elemLi);
        return;
    }

    var elemUl = document.createElement('ul');
    elemUl.id = itemObj.parent;
    elemUl.appendChild(elemLi);
    document.getElementById(itemObj.parent).appendChild(elemUl);
}

function loadListObj(listObj) {
    for (let i = 0; i < listObj.length; ++i) {
        addItemObject(listObj[i]);
    }
}

function getNextFocusIndex(listObj, ind) {
    if (ind+1 > settingList.length) return ind;

    for (let i = ind+1; i < listObj.length; ++i) {
        if (listObj[i].parent == listObj[ind].parent) return i;
    }

    return 0;
}

function setFocus(listObj, fcind) {
    if (fcind < 0 || fcind > settingList.length) return;

    var elem = document.getElementById(listObj[fcind].name);
    //elem.style.fontWeight = "bold";
    elem.style.backgroundColor = "#ff7800";
    elem.style.color = "#111111";
    elem.style.listStylePosition = "outside";
}

function outFocus(listObj, fcind) {
    if (fcind < 0 || fcind > settingList.length) return;

    var elem = document.getElementById(listObj[fcind].name);
    //elem.style.fontWeight = "normal";
    elem.style.backgroundColor = "#111111";
    elem.style.color = "#ff7800";
    elem.style.listStylePosition = "outside";
}

function deleteDisplayList(listId) {

    const ul = document.getElementById(listId);
    const len = ul.children.length;
    for (var i = 0; i < len; i++) {
        //[li]を削除する
        ul.removeChild(ul.children[0]);
    }
}

function switchStyle(divName, origStyleName, changeStyleName) {
    document.querySelector(divName).classList.remove(origStyleName);
    document.querySelector(divName).classList.toggle(changeStyleName);
}


loadListObj(settingList);

var focusIndex = 0;
setFocus(settingList, focusIndex);


var number = 1;
function eventKeyDown(e) {

    switch (e.key) {
        case "ArrowUp":
            number -= 1;
            outFocus(settingList, focusIndex);
            if (focusIndex > 0) focusIndex -= 1;
            setFocus(settingList, focusIndex);
            break;
        case "ArrowDown":
            number += 1;
            outFocus(settingList, focusIndex);
            focusIndex = getNextFocusIndex(settingList, focusIndex);
            setFocus(settingList, focusIndex);
            deleteDisplayList("list-right");
            break;
        case "ArrowRight":
            switchStyle('#list-right-div', 'flex-small-list', 'flex-big-list');
            switchStyle('#list-left-div', 'flex-big-list', 'flex-small-list');
            break;
        case "ArrowLeft":
            switchStyle('#list-right-div', 'flex-big-list', 'flex-small-list');
            switchStyle('#list-left-div', 'flex-small-list', 'flex-big-list');
            break;
        default:
            break;
    }

    if (e.key == "Enter") {

    }
    console.log(e.key);
}

function addItem() {
    number++;
    var elem = document.createElement('li');
    elem.id = 'item' + number;
    var caption = document.createTextNode('リスト' + number);
    elem.appendChild(caption);
    document.getElementById('list-left').appendChild(elem);

    chrome.webview.hostObjects.class.MessageShow('リスト' + number);
}

function addList() {
    number++;
    var elem = document.createElement('ul');
    elem.id = 'list-left' + number;

    var elem1 = document.createElement('li');
    elem1.id = 'item' + number;

    var caption = document.createTextNode('リスト' + number);
    elem1.appendChild(caption);
    elem.appendChild(elem1);

    document.getElementById('item1').appendChild(elem);
}

function delItem() {
    if (number == 0) {
        alert('削除できる項目がありません');
        return false;
    }
    var elem = document.getElementById('item' + number);
    document.getElementById('list-left').removeChild(elem);
    number--;
}