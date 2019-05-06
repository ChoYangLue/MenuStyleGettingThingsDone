let input, button, button_exp;
//let greeting;
let task_list = [];
let task_sum = 0;
const low_space = 20;
const text_pos = 3;
const low_size = 20;

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
        
        if (task_sum==1){
            task_list[0].task_element.style('color', '#d5cfb6');
        }
        
        console.log("task_sum: "+task_sum);

        fill(102); // 塗りつぶしの色
        rect(input.x, input.y+input.height +low_space*(index+1), windowWidth*2/3, low_size); 
    }
    
}

let index = 0;
let alt_key = false;
function keyPressed() {
    
    if (keyIsDown(ALT)){
        alt_key = true;
    } else {
        alt_key = false;
    }
    
    if (keyCode === UP_ARROW) {
        background('#d5cfb6');
        
        if (task_list.length > 1) {
            task_list[index].task_element.style('color', '#4a4a4a');
            if (index > 0) index -= 1;
            task_list[index].task_element.style('color', '#d5cfb6');
            fill(102); // 塗りつぶしの色
        }        
        
        if (alt_key) fill('#ba684f'); 
        rect(input.x, input.y+input.height +low_space*(index+1), windowWidth*2/3, low_size); // 四角形を生成(左上のx軸, 左上のy軸, 横幅, 縦幅)
        
    } else  if (keyCode === DOWN_ARROW) {
        background('#d5cfb6');
        
        if (task_list.length > 1) {
            task_list[index].task_element.style('color', '#4a4a4a');
            if (index < task_list.length-1) index += 1;
            task_list[index].task_element.style('color', '#d5cfb6');
            fill(102); // 塗りつぶしの色
        }
        
        if (alt_key) {
            fill('#ba684f');
        } 
        rect(input.x, input.y+input.height +low_space*(index+1), windowWidth*2/3, low_size); // 四角形を生成(左上のx軸, 左上のy軸, 横幅, 縦幅)
        
    }
    
    if (keyCode === RIGHT_ARROW){
        if (task_list[index].status == "TODO") {
            task_list[index].status = "DONE";
            task_list[index].state_element.style('color', '#00aa21');
        } else if (task_list[index].status == "DONE") {
            task_list[index].status = "TODO";
            task_list[index].state_element.style('color', '#aa0000');
        }
        task_list[index].state_element.html(task_list[index].status + ":");
        
    }
    
    if (keyCode === TAB) {
        let l_i_stg = 0;
        if (task_list[index].stage == 0){
            task_list[index].stage = 30;
        } else {
            task_list[index].stage = 0;
        }
        l_i_stg = task_list[index].stage;
        
        task_list[index].state_element.position(l_i_stg+input.x, input.y+input.height +text_pos+low_space*task_list[index].rank);
        task_list[index].task_element.position(l_i_stg+input.x+70, input.y+input.height +text_pos+low_space*task_list[index].rank);
    }
    
    if (keyCode === DELETE){
        task_list[index].eof();
        task_list.splice(index, 1);
        if (index > 0) index -= 1;
        
        background('#d5cfb6');
        if (task_list.length > 0) {
            rect(input.x, input.y+input.height +low_space*(index+1), windowWidth*2/3, low_size); 
            task_list[index].task_element.style('color', '#d5cfb6');
            
            task_sum -= 1;
        } else{
            task_sum = 0;
        }
        
        
        for(var i=index+1;i < task_list.length; i++){
            //background('#000000');
            task_list[i].rank -= 1;
            let l_i_stg = task_list[i].stage;
            task_list[i].state_element.position(l_i_stg+input.x, input.y+input.height +text_pos+low_space*task_list[i].rank);
            task_list[i].task_element.position(l_i_stg+input.x+70, input.y+input.height +text_pos+low_space*task_list[i].rank);
        }
        
    }
}


function TaskBox(name, sta, rank) {
    
    this.state_element = createElement('h2', sta + ":");
    this.task_element = createElement('h2', name);
    
    this.state_element.position(input.x, input.y+input.height +text_pos+low_space*rank);
    this.task_element.position(input.x+70, input.y+input.height +text_pos+low_space*rank);
    
    this.state_element.style('color', '#aa0000');
    
    this.n_text = name;
    this.status = sta;
    this.rank = rank;
    this.stage = 0;
    
}

TaskBox.prototype.eof = function(){
    this.state_element.remove();
    this.task_element.remove();
}

TaskBox.prototype.clk = function(mx, my){
    //if (my > 0) return true;
    if (input.y+input.height +low_space*this.rank < my && my < input.y+input.height +low_space*this.rank +low_size){
        return true;
    }
    return false;
}

// ウィンドウのリサイズ
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background('#d5cfb6');
    
    input.position(windowWidth/10, windowHeight/12 );
    input.size(windowWidth/2,18);
    button.position(input.x + input.width, windowHeight/12);
    
    if (task_list.length > 0) rect(input.x, input.y+input.height +low_space*(index+1), windowWidth*2/3, low_size); 
    
    for(var i=0;i < task_list.length; i++){
        //background('#000000');
        task_list[i].state_element.position(input.x, input.y+input.height +text_pos+low_space*task_list[i].rank);
        task_list[i].task_element.position(input.x+70, input.y+input.height +text_pos+low_space*task_list[i].rank);
    }
}

// 出力
function exportGTD(){
    var writer = createWriter('2019'+month()+day()+'土日.txt');
    
    writer.print("2019/"+month()+"/"+day()+"の活動報告をさせていただきます。" );
    writer.print("業務内容" );
    
    for(var i=0; i<task_list.length; i++){
        if (task_list[i].status === 'DONE') {
            if (task_list[i].stage == 0) writer.print("・"+task_list[i].n_text);
            else writer.print("  -"+task_list[i].n_text);
        }
    }
    
    writer.print("今後直近でやること");
    
    for(var i=0; i<task_list.length; i++){
        if (task_list[i].status === 'TODO') {
            if (task_list[i].stage == 0) writer.print("・"+task_list[i].n_text);
            else writer.print("  -"+task_list[i].n_text);
        }
    }
    
    writer.close();
    writer.clear();
}

// 入力
function inportGTD(){
    let result;
    result = loadStrings('assets/test.txt');
}