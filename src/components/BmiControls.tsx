import React from "react";
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
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent
} from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

const Bmicontrols: React.FC<{
    onCalculate: () => void;
    onReset: () => void;
}> = props => {
    return (
        <IonRow>
            <IonCol className="ion-text-center">
                <IonButton onClick={props.onCalculate} shape="round" fill="outline">
                    <IonIcon slot='start' icon={calculatorOutline} />
                    Calculate
                </IonButton>
            </IonCol>

            <IonCol className="ion-text-center">
                <IonButton onClick={props.onReset} shape="round" fill="outline">
                    <IonIcon slot='start' icon={refreshOutline} />
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>
    )
};

export default Bmicontrols;