import { Card } from "./index"

const ContentItem = props => {
    return (
        <Card className="content-item">
            <div>
                <h2>{props.title}</h2>
                <p>{props.para1}</p>
                <p>{props.para2}</p>
            </div>
        </Card>
    );
};

export default ContentItem;