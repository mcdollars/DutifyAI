import {Button, Card} from "antd";

export default function AIInsightCard(props:any){
    let recording = props.recording;
    let fieldName = props.fieldName;
    let split = props.split;
    let showModal = props.showModal;
    let isApplied = props.isApplied;

    let headStyle = {backgroundColor: "#d9c8f5"}

    function titleCase(str:string) {
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    return (
        <Card title={titleCase(fieldName)} headStyle={headStyle}>
            <ul>
                {split? recording[fieldName].split("\n").map((point: any) => <li key={point}>{point}</li>) : recording[fieldName]}
            </ul>
            <br/>
            {!isApplied &&
                <Button type="primary" style={{backgroundColor: "#8c51a0"}} onClick={() => showModal(fieldName)}>
                    Add As Comment
                </Button>}
            {isApplied &&
                <Button type="primary" style={{backgroundColor: "#f6e1ff"}} disabled>
                    Applied
                </Button>}
        </Card>
    )
}