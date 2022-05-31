import React, {useEffect, useState} from 'react';
import './QuestionWithMultipleAnswers.css';
import GenericToggle from "../shared/components/GenericToggle";
import clsx from "clsx";
import {shuffleArray} from "../shared/services/shuffle.service";
import {MultipleAnswer} from "../shared/models/MultipleAnswer";

export interface Props {
  question: string;
  multipleAnswers: MultipleAnswer[];
}

function QuestionWithMultipleAnswers(props: Props) {
    const [multipleAnswers, setMultipleAnswers] = useState<MultipleAnswer[]>(shuffleArray(props.multipleAnswers));

    const onAnswerSelected = (multipleAnswerId: string, isCorrectResponseSelected: boolean) => {
        const index = props.multipleAnswers.findIndex(multipleAnswer => multipleAnswer.id === multipleAnswerId);

        const modifiedAnswers = [...props.multipleAnswers];
        modifiedAnswers[index].isCorrectResponseSelected = isCorrectResponseSelected;

        setMultipleAnswers([...modifiedAnswers]);
    }

    const getNumberOfCorrectAnswers = () => {
        return multipleAnswers
            .reduce((result, multipleAnswer) =>
                    result + (multipleAnswer.isCorrectResponseSelected ? 1 : 0)
                , 0);
    }

    const getBackgroundImageAccordingToCorrectAnswers = () => {
        const correctAnswersCount = getNumberOfCorrectAnswers();

        switch (true) {
            case correctAnswersCount === 0: {
                return 'incorrect-all-answers-background';
            }

            case correctAnswersCount === multipleAnswers.length: {
                return 'correct-answers-background';
            }

            default:
                return 'incorrect-partial-answers-background';
        }
    }

    return (
        <div className={clsx("container", getBackgroundImageAccordingToCorrectAnswers())}>
          <div className="question">
            {props.question}
          </div>
          <div className="answers">
              <div className="answer-rows">
                  {multipleAnswers && (
                      multipleAnswers.map((multipleAnswer: MultipleAnswer, index) =>
                          <GenericToggle
                              key={multipleAnswer.id}
                              id={multipleAnswer.id}
                              answers={multipleAnswer.answers}
                              isDisabled={getNumberOfCorrectAnswers() === multipleAnswers.length}
                              onSelection={(value: boolean) => onAnswerSelected(multipleAnswer.id, value)}
                          />)
                  )}
          </div>
          </div>
          <div className="response">
            { getNumberOfCorrectAnswers() === multipleAnswers.length ? (
                <span>The answer is correct</span>
                ) : (
              <span>The answer is incorrect</span>
            )}
          </div>
        </div>
    );
}

export default QuestionWithMultipleAnswers;
