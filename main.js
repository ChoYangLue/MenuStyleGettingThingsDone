let input, button, button_exp;
//let greeting;
let task_list = [];
let task_sum = 0;
const low_space = 20;

function setup() {
    //createCanvas(720, 1280);
    createCanvas(windowWidth, windowHeight);

    input = createInput();
    input.position(windowWidth/10, windowHeight/12);
    input.size(windowWidth/2,18);

    button = createButton('commit');
    button.position(input.x + input.width, windowHeight/12);
    button.mousePressed(greet);
    button.style('background-color', '#4a4a4a');
    button.style('color', '#d5cfb6');
    
    button_exp = createButton('export');
    button_exp.position(input.x, 2);
    button_exp.mousePressed(exportGTD);
    button_exp.style('background-color', '#4a4a4a');
    button_exp.style('color', '#d5cfb6');

    textAlign(CENTER);
    textSize(50);
    
    background('#d5cfb6');
}

function greet() {
    const name = input.value();
    input.value('');
    if (name !== ''){
        task_list.push(new TaskBox(name, "TODO", task_sum));
        task_sum += 1;

        fill(102); // 塗りつぶしの色
        rect(input.x, input.y+input.height +low_space*index, windowWidth*2/3, 20); 
    }
    
}

let index = 1;
let alt_key = false;
function keyPressed() {
    
    if (keyIsDown(ALT)){
        alt_key = true;
    } else {
        alt_key = false;
    }
    
    if (keyCode === UP_ARROW) {
        //value = 255;
        background('#d5cfb6');
        task_list[index-1].task_element.style('color', '#4a4a4a');
        if (index > 1) index -= 1;
        task_list[index-1].task_element.style('color', '#d5cfb6');
        fill(102); // 塗りつぶしの色
        
        if (alt_key) fill('#ba684f'); 
        rect(input.x, input.y+input.height +low_space*index, windowWidth*2/3, 20); // 四角形を生成(左上のx軸, 左上のy軸, 横幅, 縦幅)
        
    } else  if (keyCode === DOWN_ARROW) {
        //value = 255;
        background('#d5cfb6');
        task_list[index-1].task_element.style('color', '#4a4a4a');
        if (index < task_list.length) index += 1;
        task_list[index-1].task_element.style('color', '#d5cfb6');
        fill(102); // 塗りつぶしの色
        
        if (alt_key) {
            fill('#ba684f');
            /*
            task_list[index-1].rank +=1;
            task_list[index-1].state_element.position(input.x, 65+low_space*task_list[index-1].rank);
            task_list[index-1].task_element.position(input.x+70, 65+low_space*task_list[index-1].rank);
            */
        } 
        rect(input.x, input.y+input.height +low_space*index, windowWidth*2/3, 20); // 四角形を生成(左上のx軸, 左上のy軸, 横幅, 縦幅)
        
    }
    
    if (keyCode === RIGHT_ARROW){
        if (task_list[index-1].status == "TODO") {
            task_list[index-1].status = "DONE";
            task_list[index-1].state_element.style('color', '#00aa21');
        } else if (task_list[index-1].status == "DONE") {
            task_list[index-1].status = "TODO";
            task_list[index-1].state_element.style('color', '#aa0000');
        }
        //task_list[index-1].name.html(task_list[index-1].status + ": " + task_list[index-1].n_text);
        task_list[index-1].state_element.html(task_list[index-1].status + ":");
        
    }
    
    if (keyCode === DELETE){
        //task_list[index].state_element.remove();
        //task_list[index].task_element.remove();
        if (index > 0) index -= 1;
        task_list[index].eof();
        task_list.splice(index, 1);
        
        task_sum -= 1;
        
        background('#d5cfb6');
        if (task_list.length > 0) rect(input.x, input.y+input.height +low_space*index, windowWidth*2/3, 20); 
    
        for(var i=index;i < task_list.length; i++){
            //background('#000000');
            task_list[i].rank -= 1;
            task_list[i].state_element.position(input.x, input.y+input.height +low_space*task_list[i].rank);
            task_list[i].task_element.position(input.x+70, input.y+input.height +low_space*task_list[i].rank);
        }
    }
}


function TaskBox(name, sta, rank) {
    
    this.state_element = createElement('h2', sta + ":");
    this.task_element = createElement('h2', name);
    
    this.state_element.position(input.x, input.y+input.height +low_space*rank);
    this.task_element.position(input.x+70, input.y+input.height +low_space*rank);
    
    this.state_element.style('color', '#aa0000');
    
    this.n_text = name;
    this.status = sta;
    this.rank = rank;
    
}

TaskBox.prototype.eof = function(){
    this.state_element.remove();
    this.task_element.remove();
}

TaskBox.prototype.clk = function(mx, my){
    //if (my > 0) return true;
    if (input.y+input.height +low_space*this.rank < my && my < input.y+input.height +low_space*this.rank +20){
        return true;
    }
    return false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background('#d5cfb6');
    
    input.position(windowWidth/10, windowHeight/12 );
    input.size(windowWidth/2,18);
    button.position(input.x + input.width, windowHeight/12);
    
    if (task_list.length > 0) rect(input.x, input.y+input.height +low_space*index, windowWidth*2/3, 20); 
    
    for(var i=0;i < task_list.length; i++){
        //background('#000000');
        task_list[i].state_element.position(input.x, input.y+input.height +low_space*task_list[i].rank);
        task_list[i].task_element.position(input.x+70, input.y+input.height +low_space*task_list[i].rank);
    }
}

function mouseClicked() {
    //background('#d5cfb6');
    for(var i=0; i<task_list.length; i++){
        if (task_list[i].clk(mouseX, mouseY)) index = i;
    }
    
    background('#d5cfb6');
    if (task_list.length > 0) rect(input.x, input.y+input.height +low_space*index, windowWidth*2/3, 20); 
}

function exportGTD(){
    var writer = createWriter('2019'+month()+day()+'土日.txt');
    
    writer.print("2019/"+month()+"/"+day()+"の活動報告をさせていただきます。" );
    writer.print("業務内容" );
    
    for(var i=0; i<task_list.length; i++){
        if (task_list[i].status === 'DONE') writer.print("・"+task_list[i].n_text);
    }
    
    writer.print("今後直近でやること");
    
    for(var i=0; i<task_list.length; i++){
        if (task_list[i].status === 'TODO') writer.print("・"+task_list[i].n_text);
    }
    
    writer.close();
    writer.clear();
}