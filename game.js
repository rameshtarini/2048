export default class Game {
    constructor(dim) {
        this.board = [dim*dim]
        for(let i = 0; i < dim*dim; i++){
            this.board[i] = 0
        }
        this.addTile()
        this.addTile()
        this.score = 0
        this.won = false
        this.over = false
        this.move_listener = []
        this.win_listener = []
        this.lose_listener = []
    }

    checkWin(){
        let x = Math.sqrt(this.board.length)
        for(let i = 0; i < x; i++){
            for(let j = 0; j < x; j++){
                if(this.board[x*i+j]==2048){
                    return true
                }
            }
        }
        
        return false
    }

    checkBoardFull(){
        let x = Math.sqrt(this.board.length)
        for(let i = 0; i < x; i++){
            for(let j = 0; j < x; j++){
                if(this.board[x*i+j]==0){
                    return false
                }
            }
        }

        return true
    }

    checkOver(){
        if(!this.checkBoardFull()){
            return false
        }

        let x = Math.sqrt(this.board.length)
        let temp = [x]
        for(let i = 0; i < x; i++){
            temp[i] = [x]
        }
        for(let i = 0; i < x; i++){
            for(let j = 0; j < x; j++){
                temp[i][j] = this.board[x*i + j]
            }
        }

        for(let i = 0; i < x; i++){
            for(let j = 0; j < x; j++){
                if(i > 0 && temp[i-1][j]==temp[i][j]){
                    return false
                }
                if(i < x-1 && temp[i+1][j]==temp[i][j]){
                    return false
                }
                if(j > 0 && temp[i][j-1]==temp[i][j]){
                    return false
                }
                if(j < x-1 && temp[i][j+1]==temp[i][j]){
                    return false
                }
            }
        }        

        this.over = true
        this.lose_listener.forEach(element => {
            element(this.getGameState())
        })
        return true
    }

    randNumGen(){
        if(Math.random()<.9){
            return 2
        }
        return 4
    }

    addTile(){
        let rand = Math.floor(Math.random() * this.board.length)
        while(this.board[rand]!=0){
            rand = Math.floor(Math.random() * this.board.length)
        }
        this.board[rand] = this.randNumGen();

        this.checkOver()
    }

    setupNewGame(){
        for(let i = 0; i < this.board.length; i++){
            this.board[i] = 0
        }
        this.addTile()
        this.addTile()
        this.score = 0
        this.won = false
        this.over = false
    }

    loadGame(gameState){
        this.board = gameState.board
        this.score = gameState.score
        this.won = gameState.won
        this.over = gameState.over
    }

    move(direction){
        let x = Math.sqrt(this.board.length)
        let temp = [x]
        let summed = [x]
        for(let i = 0; i < x; i++){
            temp[i] = [x]
            summed[i] = [x]
        }
        for(let i = 0; i < x; i++){
            for(let j = 0; j < x; j++){
                temp[i][j] = this.board[x*i + j]
                summed[i][j] = false
            }
        }

        if(direction == "up"){
            for(let i = 1; i < x; i++){
                for(let j = 0; j < x; j++){
                    if(temp[i][j]!=0){
                        let y = 1
                        while((i - y > 0) && (temp[i-y-1][j]==0)){
                            y++
                        }
                        if((i-y>0) && temp[i-y-1][j]==temp[i][j] && temp[i-y][j]==0 && summed[i-y-1][j] == false){
                            temp[i-y-1][j] = temp[i][j] * 2
                            temp[i][j] = 0
                            summed[i-y-1][j] = true  
                            this.score += temp[i-y-1][j]   
                        }
                        else if(summed[i-y][j]==false && temp[i-y][j]==temp[i][j]){
                            temp[i-y][j] = temp[i][j] * 2
                            temp[i][j] = 0
                            summed[i-y][j] = true
                            this.score +=  temp[i-y][j]
                        }
                        else if(temp[i-y][j]==0){
                            temp[i-y][j] = temp[i][j]
                            temp[i][j] = 0
                        }
                    }
                }
            }
        }
        else if(direction == "down"){
            for(let i = x-2; i > -1; i--){
                for(let j = 0; j < x; j++){
                    if(temp[i][j]!=0){
                        let y = 1
                        while((i + y < x-1) && (temp[i+y+1][j]==0)){
                            y++
                        }
                        if((i + y < x-1) && temp[i+y+1][j]==temp[i][j] && temp[i+y][j]==0 && summed[i+y+1][j] == false){
                            temp[i+y+1][j] = temp[i][j] * 2
                            temp[i][j] = 0
                            summed[i+y+1][j] = true
                            this.score += temp[i+y+1][j]    
                        }
                        else if(summed[i+y][j]==false && temp[i+y][j]==temp[i][j]){
                            temp[i+y][j] = temp[i][j] * 2
                            temp[i][j] = 0
                            summed[i+y][j] = true
                            this.score += temp[i+y][j]
                        }
                        else if(temp[i+y][j]==0){
                            temp[i+y][j] = temp[i][j]
                            temp[i][j] = 0
                        }
                    }
                }
            }
        }
        else if (direction == "left"){
            for(let i = 0; i < x; i++){
                for(let j = 1; j < x; j++){
                    if(temp[i][j]!=0){
                        let y = 1
                        while((j - y > 0) && (temp[i][j-y-1]==0)){
                            y++
                        }
                        if((j-y>0) && temp[i][j-y-1]==temp[i][j] && temp[i][j-y]==0 && summed[i][j-y-1]==false){
                            temp[i][j-y-1] = temp[i][j] * 2
                            temp[i][j] = 0
                            summed[i][j-y-1] = true
                            this.score += temp[i][j-y-1]   
                        }
                        else if(summed[i][j-y]==false && temp[i][j-y]==temp[i][j]){
                            temp[i][j-y] = temp[i][j] * 2
                            temp[i][j] = 0
                            summed[i][j-y] = true
                            this.score += temp[i][j-y]
                        }
                        else if(temp[i][j-y]==0){
                            temp[i][j-y] = temp[i][j]
                            temp[i][j] = 0
                        }
                    }
                }
            }
        }
        else{
            for(let i = 0; i < x; i++){
                for(let j = x-2; j > -1; j--){
                    if(temp[i][j]!=0){
                        let y = 1
                        while((j + y < x-1) && (temp[i][j+y+1]==0)){
                            y++
                        }
                        if((j + y < x-1) && temp[i][j+y+1]==temp[i][j] && temp[i][j+y]==0 && summed[i][j+y+1] == false){
                            temp[i][j+y+1] = temp[i][j] * 2
                            temp[i][j] = 0
                            summed[i][j+y+1] = true
                            this.score += temp[i][j+y+1]    
                        }
                        else if(summed[i][j+y]==false && temp[i][j+y]==temp[i][j]){
                            temp[i][j+y] = temp[i][j] * 2
                            temp[i][j] = 0
                            summed[i][j+y] = true
                            this.score += temp[i][j+y]
                        }
                        else if(temp[i][j+y]==0){
                            temp[i][j+y] = temp[i][j]
                            temp[i][j] = 0
                        }
                    }
                }
            }
        }
        
        for(let i = 0; i < x; i++){
            for(let j = 0; j < x; j++){
                this.board[x*i + j] = temp[i][j]
                summed[i][j] = false
            }
        }

        this.move_listener.forEach(element => {
            element(this.getGameState())
        })

        if(this.checkWin()){
            this.won = true
            this.win_listener.forEach(element => {
                element(this.getGameState())
            })            
        }
        else if(!this.checkBoardFull()){ 
            this.addTile()
        }
        else{
            this.checkOver()
        }
    }

    boardToString(){
        let output = ""
        for(let i = 0; i < this.board.length; i++){
            output += this.board[i].toString() + ", "
        }
        return output
    }

    toString(){
        return "board size: " + this.board.length
        + ", board: " + this.boardToString()
        + ", score: " + this.score 
        + ", won: " + this.won 
        + ", over: " + this.over
    }

    onMove(callback){
        this.move_listener.push(callback)
    }

    onWin(callback){
        this.win_listener.push(callback)
    }

    onLose(callback){
        this.lose_listener.push(callback)
    }

    getGameState(callback){
        return {
            board: this.board,
            score: this.score,
            won: this.won,
            over: this.over
        }
    }
}