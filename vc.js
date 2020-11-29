import Game from "./game.js"

export const renderBoard = function (game) {
    const $root = $('#root');
    let game_board = `<div class="game_board">`;
    for(let i=0; i<game.getGameState().board.length; i++){
        game_board += `<div class="number">${game.getGameState().board[i]}</div>`
    }
    let reset_button =`<button type="button" class="reset">reset</button>`
    let score= `<div class="score">Current Score: ${game.getGameState().score}</div>`

    $root.append(reset_button)
    $root.append(score)
    $root.append(game_board)
}

$(function(){
    let game = new Game(4);
    renderBoard(game); 

    $(document).on('click',`.reset`,function(){
        game.setupNewGame()
        const $root = $('#root');
        let game_board = `<div class="game_board">`;
        for(let i=0; i<game.getGameState().board.length; i++){
            game_board += `<div class="number">${game.getGameState().board[i]}</div>`
        }
        let reset_button =`<button type="button" class="reset">reset</button>`
        let score= `<div class="score">Current Score: ${game.getGameState().score}</div>`
        
        $root.html(game)
        $root.append(reset_button)
        $root.append(score)
        $root.append(game_board)
    });

    $(document).on('keydown', function(k) {
        k.preventDefault()
        switch (k.keyCode) { 
            case 37: 
                game.move('left')
                break; 
            case 38: 
                game.move('up') 
                break; 
            case 39: 
                game.move('right') 
                break; 
            case 40: 
                game.move('down')
                break; 
        }
        
    const $root = $('#root');
    let game_board = `<div class="game_board">`;
    for(let i=0; i<game.getGameState().board.length; i++){
        game_board += `<div class="number">${game.getGameState().board[i]}</div>`
    }
    let reset_button =`<button type="button" class="reset">Reset</button>`
    let score= `<div class="score">Current Score: ${game.getGameState().score}</div>`
    let over_win = ''
    if(game.getGameState().won){
        if(!game.checkBoardFull()){
            over_win =`<p>You won! Your score was ${game.getGameState().score}. 
            You can continue playing if you want!</p>`
        }
        else{
            over_win =`<p>You won! Your score was ${game.getGameState().score}</p>`
        }
    }
    if(game.getGameState().over){
        over_win =`<p>You lost and you can no longer move tiles. 
        Your score was ${game.getGameState().score}</p>`
    }

    $root.html(game)
    $root.append(over_win)
    $root.append(reset_button)
    $root.append(score)
    $root.append(game_board)
    });
});