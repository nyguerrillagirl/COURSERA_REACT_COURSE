import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'

function RenderDish({ dish }) {
    if (dish !== null) {
        return (
            <Card>
                <CardImg src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return (
            <div></div>
        )
    }
}

function getCommentList(commentList) {
    const comments = commentList.map((aComment) => {
        return (
            <li key={aComment.id} className="list-group-item">
                <div>{aComment.comment}</div>
                <p></p>
                <div>-- {aComment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(aComment.date)))}</div>
            </li>
        )
    });
    return comments;

}

function RenderComments({ comments }) {

    const commentList = getCommentList(comments);
    return (
        <div>
            <h4><strong>Comments</strong></h4>
            <ul className="list-group">
                {commentList}
            </ul>
        </div>
    );

}

const DishDetail = (props) => {
    const dish = props.dish;
    console.log("===> dish sent", dish.name);
    if (dish) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                       <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                       <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;