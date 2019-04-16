let input, button, greeting;
let task_list = [];
let task_sum = 0;
let ss;
const low_space = 20;

function setup() {
  // create canvas
  createCanvas(720, 1280);

  input = createInput();
  input.position(20, 65);

  button = createButton('commit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);

  greeting = createElement('h2', 'what do you do next?');
  greeting.position(20, 15);

  textAlign(CENTER);
  textSize(50);
    
     background('#d5cfb6');
    
    //ss = new TaskBox("yaru", "TODO", 1);
}

function greet() {

  const name = input.value();
  //greeting.html('hello ' + name + '!' + task_sum);

  input.value('');
    
    task_list.push(new TaskBox(name, "TODO", task_sum));
    task_sum += 1;
    
    fill(102); // 塗りつぶしの色
    rect(input.x, 65+low_space*index, 200, 20); // 四角形を生成(左上のx軸, 左上のy軸, 横幅, 縦幅)
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
        if (index > 1) index -= 1;
        fill(102); // 塗りつぶしの色
        if (alt_key) fill('#ba684f'); 
        rect(input.x, 65+low_space*index, 200, 20); // 四角形を生成(左上のx軸, 左上のy軸, 横幅, 縦幅)
        
    } else  if (keyCode === DOWN_ARROW) {
        //value = 255;
        background('#d5cfb6');
        index += 1;
        fill(102); // 塗りつぶしの色
        if (alt_key) fill('#ba684f'); 
        rect(input.x, 65+low_space*index, 200, 20); // 四角形を生成(左上のx軸, 左上のy軸, 横幅, 縦幅)
        
    }
    
    if (keyCode === RIGHT_ARROW){
        if (task_list[index-1].status == "TODO") task_list[index-1].status = "DONE";
        else if (task_list[index-1].status == "DONE") task_list[index-1].status = "TODO";
        //task_list[index-1].name.html(task_list[index-1].status + ": " + task_list[index-1].n_text);
        task_list[index-1].state_element.html(task_list[index-1].status + ":");
        
    }
    

}


function TaskBox(name, sta, rank) {
    
    this.state_element = createElement('h1', sta + ":");
    this.task_element = createElement('h2', name);
    
    this.state_element.position(input.x, 65+low_space*rank);
    this.task_element.position(input.x+100, 65+low_space*rank);
    
    //this.name = createElement('h2', sta + ": " + name);
    this.n_text = name;
    //this.name.position(input.x, 65+low_space*rank);
    this.status = sta;
    this.rank = rank;
    
}

