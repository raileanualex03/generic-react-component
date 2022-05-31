import React, {useEffect, useState} from 'react';
import './GenericToggle.css';
import {Answer} from "../models/Answer";
import clsx from "clsx";

interface Props {
  id: string;
  answers: Answer[],
  isDisabled: boolean;
  onSelection: Function;
}

const DEFAULT_MAX_WIDTH_MOBILE = 768;
const DEFAULT_RATIO_SPAN_DIV = 7/10;

function GenericToggle(props: Props) {
  const [highlightedAnswer, setHighlightedAnswer] = useState<Answer| null>(null);
  const [shouldBeRearranged, setShouldBeRearranged] = useState<boolean>(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
    setIsMobile(window.innerWidth < DEFAULT_MAX_WIDTH_MOBILE);
  };

  const setOverrideTogglePosition = (index: number) => {
    let toggle = document.getElementById(`override-button-${props.id}`)

    if (toggle && toggle.parentElement) {
      if (isMobile || shouldBeRearranged) {
        toggle.style.height = String(100 / props.answers.length) + "%";
        toggle.style.top = String(toggle?.parentElement.offsetHeight / props.answers.length * index) + "px";
        toggle.style.left = '0px';
        toggle.style.width = '100%';
      } else {
        toggle.style.height = "100%"
        toggle.style.top = "0px";
        toggle.style.width = String(100 / props.answers.length) + "%";
        toggle.style.left = String(toggle?.parentElement.offsetWidth / props.answers.length * index) + "px";
      }
    }
  }

  const shouldRearrangeAnswer = (answer: Answer): boolean => {
    const spanElement = document.getElementById(`text-${props.id}-${answer.text}-${answer.id}`);

    const divElement = spanElement?.parentElement;

    if (divElement && spanElement) {
      return (DEFAULT_RATIO_SPAN_DIV * divElement.offsetWidth < spanElement.offsetWidth);
    }

    return false;
  }

  const ensureOverflowingTextGetsRearranged = () => {
    props.answers.forEach(
        answer => {
          if (shouldRearrangeAnswer(answer)) {
            const spanElement = document.getElementById(`text-${props.id}-${answer.text}-${answer.id}`);
            let divElement: any;

            if (spanElement && spanElement.parentElement) {
              divElement = spanElement.parentElement;
            }

            if (divElement.parentElement) {
              divElement.parentElement.style.flexDirection = 'column';
              divElement.parentElement.parentElement.style.borderRadius = '20px';
              setShouldBeRearranged(true);
            }
          }
        }
    )
  }

  const onAnswerSelected = (answer: Answer, index: number) => {
    if (!props.isDisabled) {
      setOverrideTogglePosition(index);
      setHighlightedAnswer(answer);
    }
  }

  useEffect(() => {
    props.onSelection(highlightedAnswer?.isCorrect)
  }, [highlightedAnswer]);

  useEffect(() => {
    ensureOverflowingTextGetsRearranged();

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    let toggle = document.getElementById(`override-button-${props.id}`)
    setIsMobile(width < DEFAULT_MAX_WIDTH_MOBILE);
    if (toggle) {
      toggle.style.width = '0';
      toggle.style.height = '0';
      setHighlightedAnswer(null);
    }
  }, [width])

  return (
    <div className="container-toggle" id={`container-toggle-${props.id}`}>
      {props.answers && (
          <div className="buttons">
            <div className="override-button" id={`override-button-${props.id}`} />
            {props.answers.map((answer: Answer, index) =>
            <div className={clsx("answer", highlightedAnswer === answer ? 'highlighted' : '')} key={`${answer.id}-${props.id}`} onClick={() => onAnswerSelected(answer, index)}>
              <span id={`text-${props.id}-${answer.text}-${answer.id}`} className="answer-text">{answer.text} </span>
            </div>
            )}
          </div>
      )}
    </div>
  );
}

export default GenericToggle;
