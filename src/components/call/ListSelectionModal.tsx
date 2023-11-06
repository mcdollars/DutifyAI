import {Select} from "antd";
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import ClickUpContext from "../../store/ClickUpStore";
import ClickUpService from "../../service/clickUpService";
import AuthContext from "../../store/AuthStore";

function ListSelectionModal(props: any) {

    let store:any = useContext(ClickUpContext);
    let authStore = useContext(AuthContext);
    let service = new ClickUpService(authStore);

    let teamsOptions = store.teams.map((team:any) => ({value: team.id, label: team.name}));
    let spaceOptions = store.spaces.map((value:any) => ({value: value.id, label: value.name}));
    let foldersOptions = store.folders.map((value:any) => ({value: value.id, label: value.name}));
    let listOptions = store.lists.map((value:any) => ({value: value.id, label: value.name}));
    let tasksOptions = store.tasks.map((value:any) => ({value: value.id, label: value.name}))

    if (!store.isRequestInProgress) {
        store.setIsRequestInProgress(true);
        if (store.teams.length === 0) {
            service.getWorkspaces().then((data:any) => {
                let workspaces = data.teams;
                store.setTeams(workspaces);
                store.setIsRequestInProgress(false);
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    let onTeamsChange = (value: any) => {
        service.getSpaces(value).then((data:any) => {
            let entityList = data.spaces;
            store.setSpaces(entityList);
        }).catch((error) => {
            console.log(error)
        });
        store.setSpaces([])
        store.setFolders([]);
        store.setLists([])
    }

    let onSpaceChange = (value: any) => {
        store.setFolders([]);
        store.setLists([]);
        service.getFolders(value).then((data:any) => {
            let entityList = data.folders;
            store.setFolders(entityList);
        }).catch((error) => {
            console.log(error)
        });
        service.getFolderlessLists(value).then((data:any) => {
            let entityList = data.lists;
            store.setLists(entityList);
        }).catch((error) => {
            console.log(error)
        });
    }

    let onFolderChange = (value: any) => {
        service.getListsFromFolder(value).then((data:any) => {
            let entityList = data.lists;
            store.setLists(entityList);
        }).catch((error) => {
            console.log(error)
        });
    }

    let onListChange = (value: any) => {
        store.setSelectedListId(value);
        service.getTasks(value).then((data:any) => {
           let entityList = data.tasks;
           store.setTasks(entityList);
        }).catch((error) => {
            console.log(error)
        });
    }

    let onTaskChance = (value: any) => {
        store.setSelectedTaskId(value);
    }

    return (
        <div className={"flex-column-container"}>
            <div style={{marginTop: "1vh"}}>
                <Select placeholder={"Select Workspace"} size={"large"} style={{width: "200px"}}
                        onChange={onTeamsChange} options={teamsOptions}/>
            </div>
            <div style={{marginTop: "1vh"}}>
                <Select placeholder={"Select Space"} size={"large"} style={{width: "200px"}} onChange={onSpaceChange}
                        options={spaceOptions}/>
            </div>
            <div style={{marginTop: "1vh"}}>
                <Select placeholder={"Select Folder"} size={"large"} style={{width: "200px"}} onChange={onFolderChange}
                        options={foldersOptions}/>
            </div>
            <div style={{marginTop: "1vh"}}>
                <Select placeholder={"Select List"} size={"large"} style={{width: "200px"}} onChange={onListChange}
                        options={listOptions}/>
            </div>
            <div style={{marginTop: "1vh"}}>
                <Select placeholder={"Select Task"} size={"large"} style={{width: "200px"}} onChange={onTaskChance}
                        options={tasksOptions}/>
            </div>
        </div>
    )
}

export default observer(ListSelectionModal)