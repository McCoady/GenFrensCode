import { Card, ContentItem } from "./index"

const Content = (props) => {

    return (
        <Card className="content">
            <ContentItem
                title={props.content[0].title}
                para1={props.content[0].para1}
                para2={props.content[0].para2}
            />
            <ContentItem
                title={props.content[1].title}
                para1={props.content[1].para1}
                para2={props.content[1].para2}
            />
            <ContentItem
                title={props.content[2].title}
                para1={props.content[2].para1}
                para2={props.content[2].para2}
            />
        </Card>
    );
};

export default Content;