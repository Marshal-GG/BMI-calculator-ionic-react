import React, { useRef, useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonContent,
  setupIonicReact,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonAlert
} from '@ionic/react';
import { calculatorOutline, pin, refreshOutline } from 'ionicons/icons';
import Bmicontrols from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InputControl from './components/InputControl';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => {
  const [calculatedBmi, setcalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredheight = heightInputRef.current!.value;

    if (
      !enteredheight ||
      !enteredWeight ||
      +enteredWeight <= 0 ||
      +enteredheight <= 0
    ) {
      setError("Please enter the positive value!");
      return;
    }

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredheight / heightConversionFactor;

    const bmi = +weight / (+height * +height);

    setcalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  return (
    <React.Fragment>
      <IonAlert isOpen={!!error}
        message={error}
        buttons={[{ text: "Ok", handler: clearError }]} />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>
              BMI Calculator
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className='ion-padding'>
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Height ({calcUnits === 'mkg' ? 'meters' : 'feets'})</IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Weight ({calcUnits === 'mkg' ? 'kg' : 'lbs'})</IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <Bmicontrols onCalculate={calculateBMI} onReset={resetInputs} />

            {calculatedBmi && (
              <BmiResult result={calculatedBmi} />
            )}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
