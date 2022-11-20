export class Quiz {
    constructor(arrayofQuiz){
        this.arrayofQuiz = arrayofQuiz;
        this.totalAmount = arrayofQuiz.length;
        document.getElementById("totalAmount").innerHTML = this.totalAmount;
        this.currentQuestion = document.getElementById("current")
        this.questionElement = document.getElementById("question")
        this.rowAnswer = document.getElementById("rowAnswer")
        this.btnNext = document.getElementById("next")
        this.score = 0;
        this.currentQue = 0;
        this.showQuestion()
        this.btnNext.addEventListener("click", this.checkAnswer.bind(this))
        this.tryBtn = document.getElementById("tryBtn").addEventListener("click",()=>{
            window.location.reload()
        })
    }

    checkAnswer(){
        
        let correctAnswer = this.arrayofQuiz[this.currentQue].correct_answer
        let allAnswer = Array.from(document.getElementsByName("answers"))
        let userAnswer = allAnswer.filter((ele)=>{return ele.checked === true})[0].value
        if(userAnswer == correctAnswer){
            $("#Correct").fadeIn(1000 , ()=>{
                $("#Correct").hide()
            })
            this.score++
            
        }else{
            $("#inCorrect").fadeIn(1000 , ()=>{
                $("#inCorrect").hide()
            })
        }
        this.currentQue++
        if(this.currentQue >= this.totalAmount){
            this.finish()
        }else{
            this.showQuestion()
        }
    }

    showQuestion(){
        this.currentQuestion.innerHTML = this.currentQue+1
        this.questionElement.innerHTML = this.arrayofQuiz[this.currentQue].question
        let allAnswers = [this.arrayofQuiz[this.currentQue].correct_answer , ...this.arrayofQuiz[this.currentQue].incorrect_answers]
        // console.log(allAnswers)
        this.shuffle(allAnswers)
        // console.log(allAnswers)
        let storageQue = ``
        for(let i =0; i < allAnswers.length; i++){
            storageQue += `<div class="form-check">
            <input type="radio" name="answers" value="${allAnswers[i]}" class="form-check-input" />
            <label class="form-check-label">${allAnswers[i]}</label>
        </div>`
        }
        this.rowAnswer.innerHTML = storageQue;
    }


    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    finish(){
        $("#score").html(this.score)
        $("#quiz").fadeOut(500,()=>{
            $("#finish").fadeIn(500)
        })
    }

}