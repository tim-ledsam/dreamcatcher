import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import {TeamAnswers} from "../../models/team-answers.model";
import {Answers} from "../../models/answers.model";

@Injectable()
export class FirebaseService {
    private firebaseApp: firebase.app.App;

    constructor() {
        this.initialiseApp();
    }

    private initialiseApp(): void {
        this.firebaseApp = firebase.initializeApp({
            apiKey: "AIzaSyATwkxov5QyvVGZTDi9GYP3MrTGyUBY7Bo", // TODO make this a secret?
            authDomain: "puzzlehunt2018.firebaseapp.com",
            projectId: "puzzlehunt2018",
            databaseURL: "https://puzzlehunt2018.firebaseio.com",
            storageBucket: "puzzlehunt2018.appspot.com",
            messagingSenderId: "default-sender-id"
        });
    }

    public readData<T>(refPath: string): Promise<T> {
        return this.firebaseApp.database().ref(refPath).once("value").then((result) => {
            return result.val();
        });
    }

    public getAnswers(teamName: string): Promise<Answers> {
        let getAnswersCall = this.firebaseApp.functions().httpsCallable('getAnswers');
        return getAnswersCall({teamName: teamName}).then((result) => {
            return result.data;
        });
    }

}