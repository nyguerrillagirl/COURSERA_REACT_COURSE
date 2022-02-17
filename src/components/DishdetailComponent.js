import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
     }
 
     renderDish(dish) {
        if (dish !== null) {
            return(
                    <Card>
                        <CardImg src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle> 
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                    </Card>
               );
        } else {
            return(
                <div></div>
            )
        }
    }

    getCommentList(commentList) {
        const comments = commentList.map((aComment) => {
              return(
                <li className="list-group-item">
                    <div>{aComment.comment}</div>
                    <p></p>
                    <div>-- {aComment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(aComment.date)))}</div>                   
                </li>
            )
        });
        return comments;
        
    }

    renderComments(dish) {

        if (dish !== null && dish.comments != null) {
            const commentList = this.getCommentList(dish.comments);
            return(
                <div>
                    <h4><strong>Comments</strong></h4>
                    <ul className="list-group">
                    {commentList}
                    </ul>
                </div>
              );
        } else {
            return(
                <div></div>
            )
        }
    }

    render() {
        const dish = this.props.dish;
        if (dish) {
            const dishDetailPart = this.renderDish(dish);
            const dishCommentPart = this.renderComments(dish);
            return(
                <div className="container">
                <div className="row">
                 <div  className="col-12 col-md-5 m-1">
                    {dishDetailPart}
                </div>
                <div  className="col-12 col-md-5 m-1">
                    {dishCommentPart}
                </div>
                </div>    
                </div> 
            );
        } else {
            return(
                <div></div> 
            );
        }    
    }
}

export default DishDetail;