let square = {
    a1: "",
    a2: "",
    a3: "",
    b1: "",
    b2: "",
    b3: "",
    c1: "",
    c2: "",
    c3: "",
}

let player
let warning
let playing = false

const playerTurn = () => {
    let random = Math.floor(Math.random() * 2)

    if (random === 0) {
        player = "o"
    } else {
        player = "x"
    }
}

const reset = () => {
    warning = ""

    playerTurn() // escolher de quem e a vez de jogar

    for (let i in square) {
        // limpar todos os campos
        square[i] = ""
    }

    playing = true

    renderSquare() // rederizar o quadro
    renderInfo() //renderiza as informacoes no painel
}
// percorre o square e verifica se em cada elemento tem algo preenchido e poe no html
const renderSquare = () => {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
        if (square[i] !== "") {
            item.innerHTML = square[i] // aqui adiciona oq tem dentro do objeto
        } else {
            item.innerHTML = ""
        }
    }
}

const renderInfo = () => {
    document.querySelector(".vez").innerHTML = player
    document.querySelector(".resultado").innerHTML = warning
}

const togglePlayer = () => {
    player = player === "x" ? "o" : "x"
    renderInfo()
}

const itemClick = (event) => {
    let positionSquare = event.target.dataset.item

    if (playing && square[positionSquare] === "") {
        //se dentro do square na posicao item tiver vazio
        square[positionSquare] = player // adiciona a string do player/
        checkGame()

        renderSquare() // e renderiza oq tem dentro do square
        togglePlayer()
    }
}

// verificar se empatou

const isFull = () => {
    for (let i in square) {
        //se o square estiver vazio retorna falze
        if (square[i] === "") {
            return false
        }
    } //se tiver algo no meu square return true
    return true
}

//verifica quem venceu

const checkWinner = (player) => {
    let possibility = [
        "a1,a2,a3",
        "b1,b2,b3",
        "c1,c2,c3",

        "a1,b1,c1",
        "a2,b2,c2",
        "a3,b3,c3",

        "a1,b2,c3",
        "a3,b2,c1",
    ]

    for (let w in possibility) {
        let pArray = possibility[w].split(",") // vai fazer com que seja criado um array
        //every vai verificar se algum array esta sendo preenchido apenas pelo player
        let hasWon = pArray.every((option) => square[option] === player)

        if (hasWon) {
            return true
        }
    }
    return false
}

// fazer a verificacao de quem ganhou
const checkGame = () => {
    if (checkWinner("x")) {
        warning = '"x" venceu'
        playing = false
    } else if (checkWinner("o")) {
        warning = '"o" venceu'
        playing = false
    } else if (isFull()) {
        warning = "empatou"
        playing = false
    }
}

reset()

document.querySelector(".reset").addEventListener("click", reset)
document
    .querySelectorAll(".item")
    .forEach((item) => item.addEventListener("click", itemClick))
