// Khởi tạo mảng các từ vựng cho trò chơi
let vocabularies = [
    'Aspirin','Ibuprofen','Naproxen','Tylenol',
    'Tempra','Excedrin','Diphenhydramine','Brompheniramine'
    ,'Chlorpheniramine','Pseudoephedrine',
    'Dextromethorpan','Guaifenesin'
];
let vocabulariesDiv = document.getElementById("vocabularies");

for (let i = 0;i<vocabularies.length;i++)
{
    let word = document.createElement('div');
    word.setAttribute('id','word-'+i);
    word.setAttribute('class','word');
    word.setAttribute('draggable', 'true');
    word.innerHTML=vocabularies[i];
    vocabulariesDiv.appendChild(word);
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
