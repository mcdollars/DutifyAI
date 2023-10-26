import axios from "axios";
import EndPointProvider from "../util/EndPointProvider";

export default class ClickUpService {
    endpoint = '';
    token = '';
    config;

    constructor(authStore) {
        this.endpoint = EndPointProvider.getEndPoint()+"/clickup/";
        this.token = authStore.token;
        this.config = {
            headers: {Authorization: `Bearer ${this.token}`}
        }
    }

    postNewTask = async (recordingId, changedTaskId) => {
        const response = await axios.post(this.endpoint + 'add/task', {
            recordingId: recordingId,
            changedTaskId: changedTaskId
        }, this.config);

        return response.data;
    }

    changeTaskFields = async (recordingId, changedTaskId) => {
        const response = await axios.post(this.endpoint + 'add/change', {
            recordingId: recordingId,
            changedTaskId: changedTaskId
        }, this.config);

        return response.data;
    }

    addComment = async (userZoomCallId, recordingId, fieldName, taskId) => {
        const response = await axios.post(this.endpoint + 'add/comment', {
            userZoomCallId: userZoomCallId,
            recordingId: recordingId,
            fieldName: fieldName,
            taskId: taskId,
        }, this.config);

        return response.data;
    }

    getAccessToken = async (clientId, clientSecret, code) => {
        const tokenResponse = await axios.post(this.endpoint + 'oauth/token', {
            clientId: clientId,
            clientSecret: clientSecret,
            code: code,
        }, this.config);

        return tokenResponse.data;
    }

    getWorkspaces = async () => {

        const response = await axios.get(this.endpoint + 'team', this.config);

        return response.data;
    }

    getSpaces = async (teamId) => {
        const response = await axios.get(this.endpoint + 'team/' + teamId + '/space', this.config);

        return response.data;
    }

    getFolders = async (spaceId) => {
        const response = await axios.get(this.endpoint + 'space/' + spaceId + '/folder', this.config);

        return response.data;
    }

    getFolderlessLists = async (spaceId) => {
        const response = await axios.get(this.endpoint + 'space/' + spaceId + '/list', this.config);

        return response.data;
    }

    getListsFromFolder = async (folderId) => {
        const response = await axios.get(this.endpoint + 'folder/' + folderId + '/list', this.config);

        return response.data;
    }

    getTasks = async (listId) => {
        const response = await axios.get(this.endpoint + 'list/' + listId + '/task', this.config);

        return response.data;
    }
}