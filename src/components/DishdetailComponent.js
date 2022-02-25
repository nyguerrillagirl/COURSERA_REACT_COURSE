import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        // Check if rating is in the values
        let formValues = Object.assign({}, values);
        if (!formValues.rating) {
            formValues = { rating: 1, ...formValues} ;
        }
        console.log("===> Current values is: " + JSON.stringify(formValues));
        alert("Current form values is: " + JSON.stringify(formValues));
        this.toggleModal();
    }

    render() {
        return (
            <div>
                <Button type="button" className="btn btn-outline-dark mt-3" onClick={this.toggleModal} >
                    <span className="fa fa-pencil"> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}><strong>Submit Comment</strong></ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="m-2">
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>

                                <Control.select model=".rating" name="rating" id="rating"
                                    className="form-control">
                                    <option selected>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" name="author" id="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} >
                                </Control.text>
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters of less"
                                        }} />

                            </div>
                            <div className="form-group">
                                <Label htmlFor="comments">Comment</Label>
                                <Control.textarea model=".author_comment" name="author_comment"
                                    id="author_comment"
                                    className="form-control"
                                    rows="6">
                                </Control.textarea>
                            </div>
                            <div>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>

                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

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
                        <CommentForm></CommentForm>
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