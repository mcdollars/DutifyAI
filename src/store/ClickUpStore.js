import {makeAutoObservable} from "mobx";
import {createContext} from "react";

class ClickUpStore {
    appInfo = {
        clientId: '',
        clientSecret: '',
        redirectUri: ''
    }
    clickUpCode = '';
    accessToken = null;
    teams = [];
    spaces = [];
    folders = [];
    lists = [];
    tasks =[];

    selectedListId = null;
    selectedTaskId = null;
    isSelectedListConfirmed = false;
    isRequestInProgress = false;

    constructor() {
        if(process.env.REACT_APP_LOCAL_START) {
            this.appInfo.clientId="KFUK0LTNJLLJ6TKLQ3FZIJRDZUNPTQ7Z";
            this.appInfo.clientSecret="5EJ6K6QSMZTHGHPF911IJ17O58NOPHYPL1WACIT0UUT79TG8H4AREDYQL3339RX9";
            this.appInfo.redirectUri = "http://localhost:9000/";
        } else {
            this.appInfo.clientId="J0DTZ5T3LEHGJ0VHRSYY8S2832SLMY5H";
            this.appInfo.clientSecret="29W81HWHX5BQ115QHOHV0HXLQIYSSH6S3RI0ZKW3I3U519PLDMOQKGK6P32YSTV7";
            this.appInfo.redirectUri = "https://czoomapp.dutify.ai/";
        }

        makeAutoObservable(this);
    }

    setClickUpCode(newCode){
        this.clickUpCode = newCode;
    }

    setAccessToken = (token) => {
        this.accessToken = token;
    }

    setTeams(teams){
        this.teams = teams;
    }

    setSpaces(value) {
        this.spaces = value;
    }

    setFolders(value) {
        this.folders = value;
    }

    setLists(value) {
        this.lists = value;
    }

    setTasks(value) {
        this.tasks = value;
    }

    setIsRequestInProgress(isInProgress){
        this.isRequestInProgress = isInProgress;
    }

    setSelectedListId(listId){
        this.selectedListId = listId;
    }

    setSelectedTaskId(taskId){
        this.selectedTaskId = taskId;
    }

    setSelectedListConfirmed(confirmed){
        this.isSelectedListConfirmed = confirmed;
    }

    getListById(listId){
        return this.lists.find(x => x.id === listId);
    }
}

const ClickUpContext = createContext(new ClickUpStore());
ClickUpContext.displayName = "ClickUpContext";

export default ClickUpContext;