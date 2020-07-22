const root = document.getElementById('form')
const bNext = `<button class="next">Дальше</button>`
const bBack = '<button class="back">Назад</button>'
const bAnswer = `<button class="answer">Ответить</button>`

let cards = cards_tests_new
// let cards = cards_started
let currentCardNum = 0 
render() 

function render() {
  const first = currentCardNum === 0
  root.innerHTML = createCard(cards[currentCardNum], first)
}
function createCard(card, first) {
    return `<div class="card">
      <div class="main">
      <h2>${card.title_c}</h2>
      <div>${createBody(card)}</div>
      <div class="buttons">
        ${createBack(first)}
        ${createButton(card)}
      </div>
    </div>
    <div class="img">${createImg(card)}</div>
  </div>`
}

function createBody(card) {
    if (card.type_c === 'info') return card.body_c;
    else {
        let answers = '<table>';
        for (let i=0; i < card.body_c.length; i++) {
            answers += createAnswer (card, i)
        }
        answers += '</table>'
        return answers
    }        
}
function createAnswer (card, i) {
    return `
    <tr>
        <td class="icon">
            <object data="img/icons/${createSVG(card, i)}.svg" type="image/svg+xml" data-svg="${i}" style="display: ${displaySVG(card, i)}"></object>
        </td>
        <td class="radio">    
            <input type="radio" name="r" id="${i}" ${isRight(card, i)} ${isChecked (card, i)}>      
            <label for="${i}">${card.body_c[i]}</label><br>
        </td>
    </tr>
   `
}

function createSVG (card, i) {
    return i == card.r_ans ? 'right' : 'wrong'
}
function displaySVG (card, i) {
    if (!card.user_answer ) return 'none' // для новых вопросов
    // для отмеченных вопросов:
    if (i == card.r_ans) return 'block' // вывод правильного ответа
    else if (card.user_answer == i) return 'block' // показать ответ юзера
    else return 'none'
}
function isRight (card, i) {
    return card.r_ans == i ? 'data-ans="1"' : ''
}
function isChecked (card, i) {
    return card.user_answer == i ? 'checked' : ''
}

function createImg (card) {
  return card.img ? `<img src="img/${card.id_lesson_f}/${card.img}">` : ''
}
function createBack(first) {
	return first ? '' : bBack
}
function createButton(card) {
	return card.type_c === 'info' || card.user_answer ? bNext : bAnswer
}

root.onclick = (event) => {
	console.log(event.target.className)
  if (event.target.className === 'next') {
    currentCardNum++
    render()
  }
  if (event.target.className === 'back') {
    currentCardNum--
    render()
  }
  if (event.target.className === 'answer') {
    checkAnswer ()
    document.querySelector('.answer').outerHTML = bNext

    
  }
}

function checkAnswer () { //Проверка правильного ответа
    let input = document.querySelector('input[data-ans="1"]');
    if (input.checked == true) { //если отмечен правильный импут
        console.log('right');
        document.querySelector(`object[data-svg="${input.id}"]`).style.display = 'block'
    // score++; // прибавить 1 балл
    } else {
        console.log('wrong');
    }
    cards[currentCardNum].user_answer = input.id // сохранить ответ юзера в текущий массив
}



//-------------- Другой вариант добавления ответов на вопросы
        //     answers += `<input type="radio" name="radio" id="${i}" `           
        //     if (i == card.user_answer) answers += 'checked'
        //     else if (i == card.r_ans) answers += `data-ans="1"`
        //     answers += `><label for="${i}">${card.body_c[i]}</label><br>`