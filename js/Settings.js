import {Quiz} from './Quiz.js'
export class Settings{
    constructor(){
        this.categoryElement = document.getElementById("category");
        this.difficultyElement = Array.from(document.getElementsByName("difficulty"));
        this.numberOfQuestions = document.getElementById("numOfQuestions");
        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click" , this.getData.bind(this))
    }

    async getData(){
        if(this.numberOfQuestions.value >=0 && this.numberOfQuestions.value !=''){
            let categoryElement =  this.categoryElement.value
            let difficultyElement = this.difficultyElement.filter((ele)=>{return ele.checked === true})[0].value
            let numberOfQuestions = this.numberOfQuestions.value
            let apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryElement}&difficulty=${difficultyElement}`
            let dataQuiz = await this.getRuselt(apiUrl)
            $("#formAlert").fadeOut(0)
            $("#setting").fadeOut(400 , ()=>{
                $("#quiz").fadeIn(400)
            })
            new Quiz (dataQuiz)
        }else{
            $("#formAlert").fadeIn(1000)
        }
    }

    async getRuselt(Url){
        let response = await fetch(Url)
        let responseRuselt = await response.json()
        // console.log(responseRuselt.results)
        return responseRuselt.results
    }
}