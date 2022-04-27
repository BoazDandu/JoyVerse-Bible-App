// userInput
let userInput = document.getElementById("bookName");
let subBtn = document.getElementById("submitBtn");
let content = document.getElementById("container");
let chapterNum = document.getElementById("chapterNum")
let verseNum = document.getElementById("verseNum")
let url = "https://bible-api.com/"
let book


let verseDisplay = (data) => {
    let newData = ''
    data.forEach((verse) => {
        let verseRange = verse.verse
        verseNum.placeholder = 1 + "-" + verseRange
        newData += `
        <p id="verseText">${verse.verse}) ${verse.text}</p>
        `
    })
    content.innerHTML = newData;   


}

let bookName = async (e) => {
    e.preventDefault()
    book = userInput.value
    chapter = chapterNum.value
    let apiResponse = await apiRequest(book, chapter)
    console.log("API Response", apiResponse);
    ({verses} = apiResponse)
    verseDisplay(verses)
}


let apiRequest = async (book, chapter) => {
    let response = await fetch(`${url}${book}+${chapter}`)
    let body = await response.json()
    return body
}

subBtn.addEventListener('click', bookName)

window.onload = function() {
    let book = "Genesis"
    let chapter = 1;
    chapterNum.value = chapter
    fetch(`${url}${book}+${chapter}`)
        .then(response => response.json())
        .then(data => {
            ({verses} = data)
            verseDisplay(verses)
        })
 
}

