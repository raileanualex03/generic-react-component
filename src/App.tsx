import React from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionWithMultipleAnswers, {MultipleAnswer} from "./components/QuestionWithMultipleAnswers";
import {Answer} from "./shared/models/Answer";

function App() {
  const multipleAnswers: MultipleAnswer[] = [
    {
      id: '1',
      answers: [{
        id: '1',
        text: 'Ronaldo',
        isCorrect: true,
      },
        {
          id: '2',
          text: 'Messi',
          isCorrect: false,
        },
        {
          id: '3',
          text: 'Messi',
          isCorrect: false,
        },
        {
          id: '4',
          text: 'Messi',
          isCorrect: false,
        },
      ],
    },
    {
      id: '2',
      answers: [{
        id: '1',
        text: 'Ronaldo2',
        isCorrect: true,
      },
        {
          id: '2',
          text: 'Messi2',
          isCorrect: false,
        },
      ],
    },
    {
      id: '3',
      answers: [{
        id: '1',
        text: 'Ronaldo3',
        isCorrect: true,
      },
        {
          id: '2',
          text: 'Messi3',
          isCorrect: false,
        },
      ],
    },
    {
      id: '4',
      answers: [{
        id: '1',
        text: 'Ronaldo4',
        isCorrect: true,
      },
        {
          id: '2',
          text: 'Messi4',
          isCorrect: false,
        },
        {
          id: '3',
          text: 'Messi3',
          isCorrect: false,
        }
      ],
    }];

  return (
    <div className="App">
      <div style={{
        width: 'full',
        backgroundColor: 'white',
        height: 'full',
      }}>
        <QuestionWithMultipleAnswers
            question={'Who is the best player in Europe?'}
            multipleAnswers={multipleAnswers}
        />
      </div>
    </div>
  );
}

export default App;
