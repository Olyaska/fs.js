const root = document.getElementById('form')
const bNext = `<button class="next">Дальше</button>`
const bBack = '<button class="back">Назад</button>'
const bAnswer = `<button class="apply">Ответить</button>`


// import render from '/gfgjfgfh'
//
//
//
// export default function render() {
//   const first = currentCardNum === 0
//   root.innerHTML = createCard(cards[currentCardNum], first)
// }

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
        let answers = '<div class="answers">';
        for (let i=0; i < card.body_c.length; i++) {
            answers += createAnswer (card, i)
        }
        answers += '</div>'
        return answers
    }        
}

function createIconTrue() {
  return `<div class="icon">
            <object data="img/icons/right.svg" type="image/svg+xml"></object>
          </div>`
}
function createIconFalse() {
  return `<div class="icon">
            <object data="img/icons/wrong.svg" type="image/svg+xml"></object>
          </div>`
}
function checkIcon(card, i) {
  if (card.user_answer) {
    if (i === +card.r_ans) {
      return createIconTrue()
    }
    if (+card.user_answer === i) {
            if (card.user_answer === card.r_ans) {
        return createIconTrue()
      } else {
        return createIconFalse()
      }
    }
  }
}
function createAnswer (card, i) {
    return `
    <div class="answer">
        ${checkIcon(card, i) || ''}
        <label for="${i}" class="radio">    
            <input type="radio" name="r" id="${i}" ${isRight(card, i)} ${isChecked (card, i)}>      
            <span>${card.body_c[i]}</span>
        </label>
    </div>
   `
}

function createSVG (card, i) {
    return i == card.r_ans ? 'right' : 'wrong'
}
// function displaySVG (card, i) {
//     if (!card.user_answer ) return 'none' // для новых вопросов
//     // для отмеченных вопросов:
//     if (i == card.r_ans) return 'block' // вывод правильного ответа
//     else if (card.user_answer == i) return 'block' // показать ответ юзера
//     else return 'none'
// }
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
  if (event.target.className === 'apply') {
    checkAnswer ()
    document.querySelector('.apply').outerHTML = bNext

    
  }
}

function checkAnswer () { //Проверка правильного ответа
    let input = document.querySelector('input[data-ans="1"]');
    const parent = document.querySelector('.answers')
    if (input.checked == true) { //если отмечен правильный импут
        parent.childNodes[+input.id + 1].insertAdjacentHTML('afterbegin', createIconTrue())
        console.log('right');
        // document.querySelector(`object[data-svg="${input.id}"]`).style.display = 'block'
    // score++; // прибавить 1 балл
    } else {
        console.log('wrong');
    }
    cards[currentCardNum].user_answer = input.id // сохранить ответ юзера в текущий массив // +
}



//-------------- Другой вариант добавления ответов на вопросы
        //     answers += `<input type="radio" name="radio" id="${i}" `           
        //     if (i == card.user_answer) answers += 'checked'
        //     else if (i == card.r_ans) answers += `data-ans="1"`
        //     answers += `><label for="${i}">${card.body_c[i]}</label><br>`