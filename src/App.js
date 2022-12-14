
import Liliana_img from "./assets/Liliana.png";
import Frizi_img from "./assets/Fritzi.png";
import Fridolin_img from "./assets/Fridolin.png";
import Erin_img from "./assets/Erin.png";
import Orlando_img from "./assets/Orlando.png";

import './App.css';
import React from "react";
import Button from '@mui/material/Button';


function shuffle(array) {
  /* Shuffle an array randomly */

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return (array)
}

function shuffleByIndex(array, order) {
  /* Shuffle an array according to an order */

  // Allocate memory for the result
  const shuffledArray = []

  for (let i = 0; i < array.length; i++) {
    // Get the index of the next element
    const j = order[i]
    // Pull that element from the original array
    shuffledArray.push(array[j])
  }

  return (shuffledArray)
}


function StartScreen(props) {
  /* Function that renders the start screen */

  return (
    <div className="start-screen">
      <center>
        <h1>Marroni-Date</h1>
        <div className="start-screen-button">
          <Button variant="contained"
          sx = {{fontFamily: "VermiFont", textTransform: "none", fontSize: "30pt", color: "white", bgcolor: "#008552", "&:hover": {bgcolor: "#008552"}}}
          onClick={props.startDate}>
            Start Date
          </Button>
        </div>
      </center>
    </div>
  )
}


function Questionaire(props) {
  /* Function that renders a question with all its possible answers */

  // Generate the answers
  const rows = []
  for (let i = 0; i < props.answers.length; i++) {
    // Make the button
    const button = <Button 
      vartiant="outlined"
      disableRipple="true"
      sx = {{fontFamily: "VermiFont", textAlign: 'left', fontSize: "1.4em", textTransform: "none", color: "#008552",bgcolor: "#FFA1C9", "&:hover": {bgcolor: "#FFA1C9"}}}
      onClick={() => {props.answerParser(i)}}>
      {props.answers[i]}
    </Button>
    rows.push(<li key={i}>{button}</li>)
  }

  return (
    <center>
      <div className="questionaire">
        <h2>{props.question}</h2>
        <ul>
          {rows}
        </ul>
      </div>  
      <div className="questionaire-page-number">{props.pageIndex}/{props.numPages}</div>  
    </center>
  )
}


function Match(props) {
  /* Function that renders the evaluation */

  const personalities = {
    0: "Liliana",
    1: "Frizi",
    2: "Fridolin",
    3: "Erin",
    4: "Orlando"
  }

  const match = personalities[props.matchIndex]

  const text = {
    "Liliana": {
      "Text": "Du hast ein Marroni-Date mit Liliana! Die r??stige Rentnerin lebt in einem idyllischen Park und freut sich immer ??ber Besuch.", 
      "Address": "Schulhaus K??ferholz, K??ferholzstrasse 271, 8046 Z??rich"
    },
    "Frizi": {
      "Text": "Dein Marroni-Date erwartet dich im Kreis 9! Frizi freut sich, wenn die Fr??chte gesammelt und nicht ??berfahren werden.", 
      "Address": "Schulhaus Utogrund, Dennlerstrasse 55, 8047 Z??rich"
    },
    "Fridolin": {
      "Text": "Dein Marroni-Date f??hrt dich in den Rieterpark zum ??ltesten Kastanienbaum der Stadt! Packe am besten eine Decke und Picknick ein, Fridolin kennt mehr als eine gute Geschichte.",
      "Address": "Rieterpark, Gablerstrasse 13-15, 8002 Z??rich"
    },
    "Erin": {
      "Text": "Dein Marroni-Date ist Erin! Ein Kastanienbaum mit grossen Fr??chten direkt neben einem Pin Pong Tisch ??? was willst du mehr?",
      "Address": "Schulhaus Sihlweid, Sihlweidstrasse 5, 8041 Z??rich"
    },
    "Orlando": {
      "Text": "Du hast ein Marroni-Date mit dem Jungspund! Besuche ihn in seiner Marroni-WG und geniesse dabei den Blick ??ber die Stadt.",
      "Address": "Limmattalstrasse 410, 8049 Z??rich"
    }
  }

  const images = {
    "Liliana": Liliana_img,
    "Frizi": Frizi_img,
    "Fridolin": Fridolin_img,
    "Erin": Erin_img,
    "Orlando": Orlando_img
  }

  // Import image on demand
  const image = <img className="match-image" src={images[match]} alt=""/>

  // use resetApp(-1) to go back to start page
  const resetButton = <Button 
      vartiant="contained"
      sx = {{fontFamily: "VermiFont", textTransform: "none", color: "white", fontSize: "30pt", bgcolor: "#008552", "&:hover": {bgcolor: "#008552"}}}
      onClick={() => props.resetApp(-1)}>
      Neues Date
    </Button>

  return (
    <center>
      {image}
      <div className="match">
        <h1>{match}</h1>
        <p>{text[match].Text}</p>
        <p>Komm vorbei: {text[match].Address}</p>
        <div className="match-screen-button">
          {resetButton}
        </div>
      </div>
    </center>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);

    // State of the app
    this.state = {
      pageIndex: -1,
      name: "my app"
    }

    // Questionaire
    const question1 = {
      "question": "Wie geniesst du dein Vermicelles?",
      "answers": [
        "Minimalistisch: Vermicelles pur ?????ohne Schnickschnack!", 
        "Einmal Coupe Nesselrode bitte!",
        "Ich bin offen f??r Neues: hat schon mal jemand Matcha-Vermicelles probiert?",
        "Mehr ist mehr: Ohne Schlagrahm oder Meringues geht gar nicht und am liebsten noch einen halben Fruchtsalat dazu!",
        "Eigentlich mag ich gar kein Vermicelles."],
      "weights": {
        0: [0, 20, 0, 5, 4],
        1: [13, 0, 20, 0, 0],
        2: [0, 0, 0, 7, 20],
        3: [20, 0, 13, 0, 0],
        4: [0, 0, 0, 20, 0]
      }
    }

    const question2 = {
      "question": "Welche Art von Ferien machst du am liebsten?",
      "answers": [
        "Solo Bella Italia (Fr??hling, Sommer, Herbst und Winter)", 
        "All Inclusive mit Cocktail und Liegestuhl.", 
        "Wellness Wochenende zu zweit.",
        "Aktivferien: wer rastet, rostet.",
        "Freizeitpark z.B. Conny Land."
      ],
      "weights": {
        0: [14, 0, 0, 0, 7],
        1: [15, 0, 10, 0, 0],
        2: [11, 0, 0, 9, 0],
        3: [10, 0, 16, 0, 0],
        4: [0, 0, 0, 5, 12]
      }
    }

    const question3 = {
      "question": "Mit welchem Sprichwort kannst du dich identifizieren? ",
      "answers": [
        "Alles Gute kommt von oben.", 
        "Haben ist besser als brauchen.", 
        "Jammern f??llt keine Kammern.",
        "Ende gut, alles gut.",
        "Ist der Ruf erst ruiniert, lebt es sich ganz ungeniert."
      ],
      "weights": {
        0: [12, 20, 8, 0, 0],
        1: [0, 5, 0, 11, 13],
        2: [12, 0, 20, 0, 0],
        3: [0, 0, 0, 9, 13],
        4: [0, 13, 0, 7, 8]
      }
    }

    const question4 = {
      "question": "Wie w??rden dich deine Freund:innen am beschreiben?",
      "answers": [
        "Ich bin bekannt f??r meine Mon??d????ni??t??t.", 
        "Meine kreative Seite wird stets gesch??tzt.", 
        "Ich sage, was ich denke.",
        "Mein Freund:innenskreis bezeichnet mich als unkompliziert.",
        "Ich handle stets gewissenhaft, bin aber gleichzeitig humorvoll."
      ],
      "weights": {
        0: [15, 0, 6, 0, 0],
        1: [0, 0, 0, 13, 7],
        2: [2, 20, 3, 0, 0],
        3: [0, 0, 10, 9, 9],
        4: [9, 0, 9, 0, 0]
      }
    }

    const question5 = {
      "question": "Was ist dein Lieblings-Accessoire?",
      "answers": [
        "Hausschuhe", 
        "Sonnenbrille", 
        "Taschenmesser",
        "Vermi-Foulard",
        "Smart Watch"
      ],
      "weights": {
        0: [20, 0, 15, 0, 0],
        1: [0, 0, 0, 8, 20],
        2: [0, 0, 16, 0, 0],
        3: [9, 0, 0, 20, 9],
        4: [0, 20, 0, 10, 6]
      }
    }

    // Put all questions into a list
    this.questionaire = shuffle([question1, question2, question3, question4, question5])

    // Prepare the array that stores the result
    this.result = [0, 0, 0, 0, 0]

    // Currently displayed page of the app
    this.displayedPage = null

    // Current answer order
    this.answerOrder = shuffle([0, 1, 2, 3, 4])

    // Initialize timer
    this.resetTimer = setTimeout(() => {}, 5)

    // Bind functions
    this.generateQuestionairePage = this.generateQuestionairePage.bind(this)
    this.parseAnswer = this.parseAnswer.bind(this)
    this.stepQuestionaire = this.stepQuestionaire.bind(this)
    this.evaluateResult = this.evaluateResult.bind(this)
    this.resetQuestionaire = this.resetQuestionaire.bind(this)
  }


  stepQuestionaire() {
    /* Function that advances the quetsionaire by one step */

    // Update pageIndex
    var newState = this.state
    newState.pageIndex += 1

    // Generate the new displayed page
    if (newState.pageIndex < this.questionaire.length) {
      // The next question
      this.generateQuestionairePage(newState.pageIndex)
    }
    else {
      // The evaluation
      this.evaluateResult()
    }

    // Update state which triggers reloading the page
    this.setState(newState)

  }

  resetQuestionaire(newPageIndex) {
    // Update pageIndex
    var newState = this.state

    // Generate new page
    newState.pageIndex = newPageIndex
    if (newPageIndex >= 0) {
      this.generateQuestionairePage(newState.pageIndex)
    }

    // Clear the results
    this.result = [0, 0, 0, 0, 0]

    // Shuffle the questions
    this.questionaire = shuffle(this.questionaire)

    // Update state which triggers reloading the page
    this.setState(newState)
  }

  parseAnswer(answerIndex) {
    /* Function that parses an answer from the questionaire */

    // Get the current question object
    const questionObject = this.questionaire[this.state.pageIndex]

    // Get the original index of the answer 
    const unshuffledAnswerIndex = this.answerOrder[answerIndex]

    // Get the weight of the answer
    for (let i = 0; i < 5; i++) {
      this.result[i] = parseInt(this.result[i]) + parseInt(questionObject.weights[unshuffledAnswerIndex][i])
    }

    // Load next question
    this.stepQuestionaire()
  }

  evaluateResult() {
    /* Function that displays the evaluation */

    // Find the maximum score
    let argmax = 0
    for (let i = 0; i < 5; i++) {
      if (this.result[i] > this.result[argmax]) {
        argmax = i
      }
    }

    this.displayedPage = <Match matchIndex={argmax} resetApp={this.resetQuestionaire}/>
  }

  generateQuestionairePage(index) {
    /* Function that generates the question <index> */

    // Get the question
    const questionObject = this.questionaire[index]

    // Shuffle answers
    this.answerOrder = shuffle(this.answerOrder)
    const shuffledAnswers = shuffleByIndex(questionObject.answers, this.answerOrder)
    
    // Generate the questionaire view
    this.displayedPage = <Questionaire 
      question={questionObject.question}
      answers={shuffledAnswers}
      pageIndex={index + 1}
      numPages={this.questionaire.length}
      answerParser={this.parseAnswer}
    />
  }

  render() {
    // Reset timer
    clearTimeout(this.resetTimer)
    

    if (this.state.pageIndex === -1) {
      // Initialize with the start screen
      this.displayedPage = <StartScreen startDate={this.stepQuestionaire} />
    }
    else {
      // Start timer which resets the questionaire after 1 minute
      this.resetTimer = setTimeout(() => {this.resetQuestionaire(-1)}, 60_000)
    }

    // Render the currently displayed page
    return (
      <div>
        {this.displayedPage}
        <img hidden src={Liliana_img} alt=""/>
        <img hidden src={Frizi_img} alt=""/>
        <img hidden src={Fridolin_img} alt=""/>
        <img hidden src={Erin_img} alt=""/>
        <img hidden src={Orlando_img} alt=""/>
      </div>
    );
  }
}

export default App;
