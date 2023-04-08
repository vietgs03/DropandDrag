// Khởi tạo mảng các từ vựng cho trò chơi
let vocabularies = [
    'Aspirin','Ibuprofen','Naproxen','Tylenol',
    'Tempra','Excedrin','Diphenhydramine','Brompheniramine'
    ,'Chlorpheniramine','Pseudoephedrine',
    'Dextromethorpan','Guaifenesin'
];
let vocabulariesDiv = document.getElementById("vocabularies");

shuffle(vocabularies);

for (let i = 0;i<vocabularies.length;i++)
{
    let word = document.createElement('div');
    word.setAttribute('id','word-'+i);
    word.setAttribute('class','word');
    word.setAttribute('draggable', 'true');
    word.innerHTML=vocabularies[i];
    vocabulariesDiv.appendChild(word);
}
function shuffle(array)
{
    let currentIndex = array.length;
    let templearrayValue,randomIndex;

    while(0!==currentIndex)
    {
        randomIndex=Math.floor(Math.random()*currentIndex);
        currentIndex-=1;

        templearrayValue=array[currentIndex];
        array[currentIndex]=array[randomIndex];
        array[randomIndex]=templearrayValue;
    }
    return array;

}
const groupWord = [  {    name: 'Pain relievers',    words: ['Aspirin','Ibuprofen','Naproxen','Tylenol',
'Tempra','Excedrin']
  },
  {
    name: 'Antihistamines',
    words: ['Diphenhydramine','Brompheniramine'
    ,'Chlorpheniramine']
  },
  {
    name: 'Decongestants',
    words: ['Pseudoephedrine']
  },
  {
    name: 'Cough medicines',
    words: ['Dextromethorpan','Guaifenesin']
  }
];
//console.log(groupWord);
const words = document.querySelectorAll('.word');

words.forEach(word => {
    word.addEventListener('dragstart', dragStart);
    word.addEventListener('dragend', dragEnd);
});
let draggedWord = null;

function dragStart() {
    draggedWord = this;
    //console.log(draggedWord);
    setTimeout(() => this.style.display = 'none', 0);
}

function dragEnd() {
    draggedWord.style.display = 'block';
    draggedWord = null;
}
const columns = document.querySelectorAll('.column');

columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

function dragOver(e) {
    e.preventDefault();
}

function drop() {
    var check = checkVocabularyGroup(draggedWord.innerHTML,this.querySelector('.nhomthuoc').innerHTML);
    if(check==true)
    {
        console.log(this.querySelector('.nhomthuoc').innerHTML);
        this.querySelector('.tenthuoc').appendChild(draggedWord);
        //console.log(draggedWord);
        let indexOfDragword = vocabularies.indexOf(draggedWord.innerHTML);
        if(indexOfDragword!==-1)
        {
            vocabularies.splice(indexOfDragword,1);
        }
        //console.log(vocabularies);
        if(vocabularies.length===0)
        {
            const congrate = document.getElementById("congrate");
            congrate.style.display='block';
            const vid = document.getElementById('vid');
            vid.requestFullscreen()
            //vid.autoplay = true;

            
        }
    }
    else
    {
        result.textContent = this.querySelector('.nhomthuoc').innerHTML+' do not include '+draggedWord.innerHTML;
        message.style.display = "block";


    }
}
let selectedWords = [];
function checkVocabularyGroup(vocabulary,gr)
{
    for(i=0;i<groupWord.length;i++)
    {
        if(gr===groupWord[i].name)
        {
            for(j=0;j<groupWord[i].words.length;j++)
            {
                if(vocabulary===groupWord[i].words[j])
                {
                    return true;
                }
            
            }
        }
    }
    return null;
}


const message = document.getElementById("message");
const result = document.getElementById("result");
const closeButton = document.getElementById("closeButton");
function closeMessage() {
    message.style.display = "none";
}
closeButton.addEventListener("click", closeMessage);
// Listen for fullscreen change event
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari

function handleFullscreenChange() {
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    // Video is in fullscreen, show it
    vid.style.display = 'block';
  } else {
    // Video is not in fullscreen, hide it
    vid.style.display = 'none';
  }
}