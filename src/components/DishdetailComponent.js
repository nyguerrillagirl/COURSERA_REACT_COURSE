import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
     }
 
     renderDish(dish) {
        if (dish !== null) {
            return(
                <div className="col-md-5 col-sm-12 m-2">
                    <Card>
                    <CardImg  width="40%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle> 
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
              );
        } else {
            return(
                <div></div>
            )
        }
    }

    getCommentList(commentList) {
        const comments = commentList.map((aComment) => {
             // From: https://www.codegrepper.com/code-examples/javascript/day+month+date+year+format+in+javascript
            let d = new Date(aComment.date)
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            const commentDate = mo + " " + da + ", " + ye;
             return(
                <li className="list-group-item">
                    <div>{aComment.comment}</div>
                    <p></p>
                    <div>-- {aComment.author} {commentDate}</div>                   
                </li>
            )
        });
        return comments;
        
    }

    renderComments(dish) {

        if (dish !== null && dish.comments != null) {
            const commentList = this.getCommentList(dish.comments);
            return(
                <div className="col-md-5 col-sm-12 m-0">
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
        const dish = this.props.selectedDish;
        const dishDetailPart = this.renderDish(dish);
        const dishCommentPart = this.renderComments(dish);
         return(

             <div className="row">
                {dishDetailPart}
                {dishCommentPart}
             </div>     
          );
    }
}

export default DishDetail;