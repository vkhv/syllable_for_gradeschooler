import React, {useState} from 'react';
import './App.css';
import {sample, sampleSize} from 'lodash';
function App() {
    const [syllable, setSyllable] = useState('');
    const [studyState, toggleState] = useState(false);
    const pickText = ({currentTarget}) => setSyllable(currentTarget.value);
  return (
    <div className="App">
      <header className="App-header">
          {studyState ?
              <StudyPlate syllable={syllable}  /> :
              <>
                <input className="c-checkbox" type="checkbox" id="checkbox"/>
                    <div className="c-formContainer">
                        <form className="c-form" action="">
                            <input className="c-form__input" placeholder="Слог" type="text"
                             pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required onInput={pickText}/>
                            <label className="c-form__buttonLabel" htmlFor="checkbox">
                              <button className="c-form__button" type="button" onClick={() => toggleState(true)}>Учить</button>
                            </label>
                          <label className="c-form__toggle" htmlFor="checkbox" data-title="Ввести слог"></label>
                        </form>
                    </div>
              </>}
      </header>
    </div>
  );
}

export default App;

const StudyPlate = ({syllable}) => {
    const [result, setResult] = useState(0);
    const [fails, setFails] = useState(0)
    return <div style={{textAlign: '-webkit-center'}}>
        <div style={{cursor: 'pointer', height: '64px', width: '64px', fontSize: '64px'}} onClick={() => {
                speechSynthesis.speak(
                    new SpeechSynthesisUtterance(syllable)
                );

        }} >
            🔊
        </div>

        <div style={{display: 'flex'}}>
            {sampleSize(generateSyllables(syllable), 4).map(syll => <div className="c-form__toggle-2" key={syll} onClick={async () => {
                await speechSynthesis.speak(
                    new SpeechSynthesisUtterance(syll)
                );
                if (syllable === syll) {

                    return setResult(result + 1)
                }
                return setFails(fails + 1)
            }}>{syll}</div> ) }
        </div>
        {
            <div style={{cursor: 'pointer', height: '64px', marginTop: '40px', fontSize: '64px'}}>
                ✅ - {result}
                <br/>
                ❌ - {fails}
            </div>
        }
    </div>
}

const generateSyllables = (syllable) => {
    const secondLetter = syllable[1];
    const arrayLetter = ['а', 'о', 'э', 'ю', 'и', 'ы', 'я'];
    const kickMainSyllable = arrayLetter.filter(l => l !== syllable[0])
    return  [syllable, ...sampleSize(kickMainSyllable, 3).map(letterFromArray =>  letterFromArray + secondLetter)]
}
