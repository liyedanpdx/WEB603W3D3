// import {Component} from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import {Button} from "react-bootstrap";

// // import React, {useState} from 'react';
// // import FacebookLogin from 'react-facebook-login';
// // import {Card} from 'react-bootstrap';
// // import "bootstrap/dist/css/bootstrap.min.css"

// class Cart extends Component{
//     constructor(props){
//         super(props)
//         this.state={
//             ProductLists:props.ProductLists
//         }
//     }
//     render(){
//         return(
//             <div>
//                 <div><h2  style={{margin: '50px 200px'}} >Your Cart Items</h2></div>
//                 {this.state.ProductLists.products.map((product, index)=>(
//                 <div className="product-item" style={{margin: '0px 200px'}} key={index}>
//                 <div key={index}>{product.desc}</div>
//                 <div className="nowrap-left">
//                     <div>
//                     <img 
//                         className="product_image" 
//                         src={product.image} 
//                         alt={product.desc}
//                         onClick={() => this.handleShowModal(product)}
//                         style={{ cursor: 'pointer' }}
//                         />
//                     </div>
//                     <div className="d-flex gap-2">
                    
//                     </div>
//                     <div className="nowrap-left ms-3" style={{marginTop:'-25px'}}>
//                     <div><span> Quantity </span><span>{product.value}</span></div>
//                     </div>
//                 </div>
//                 </div>
//                 ))
//                 }
//                 <Button style={{margin: '50px 200px'}} variant="primary"         
//                 // onClick={(event) => {
//                 //     handleClose();
//                 //     props.deleteList(event, props.elementId);
//                 // }}
//                 >
//                     Check Out
//                 </Button>
//             </div>)
//     }
// }
    
// export default Cart;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import FacebookLogin from 'react-facebook-login';

const Cart = ({ ProductLists, TotalQuantShow, isLoggedInStatus, updateLoggedInStatus}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInStatus); 
    const [showHome, setShowHome] = useState(false);
    const [showLoginCard, setShowLoginCard] = useState(false);
    const [userData, setUserData] = useState({});
    const [userPicture, setUserPicture] = useState('');
    const navigate = useNavigate();

    const responseFacebook = (response) => {
        console.log(response);
        if (response.accessToken) {
            setIsLoggedIn(true);
            setUserData(response);
            if (response.picture && response.picture.data) {
                setUserPicture(response.picture.data.url);
            }
            setShowLoginCard(false);
            setShowHome(true);
        }
    };

    const handleNavigation = () => {
        navigate("/");
    };

    const handleCheckout = () => {
        if (!isLoggedIn) {
            setShowLoginCard(true);
        } else {
            // setShowHome(true);
            console.log("Proceeding with checkout...");
        }
    };

    if (isLoggedIn && showHome) {
        updateLoggedInStatus(true);
        return (
            <div className="container mt-4">
                <Home fbpic={userPicture} fbdata={userData} />
                <Button 
                    variant="secondary" 
                    className="mt-3"
                    style={{margin: '10px 160px'}} 
                    onClick={() => setShowHome(false)}
                >
                    Back to Cart
                </Button>
            </div>
        );
    }

    if (showLoginCard) {
        return (
            <Card style={{width: '800px'}} className="mx-auto mt-5">
                <Card.Header className="pb-4">
                    <h1>Sign in</h1>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <React.Fragment>
                            <h3>Please login using one of the following:</h3>
                            <LoginForm />
                            <FacebookLogin
                                appId="8719782111403218"
                                autoLoad={false}
                                fields="name,email,picture"
                                scope="public_profile,user_friends"
                                callback={responseFacebook}
                                icon="fa-facebook"
                            />
                        </React.Fragment>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
    return (
        <React.Fragment>
            <div>
                <h2 style={{ margin: '50px 200px 10px' }}>Your Cart Items</h2>
            </div>
            {TotalQuantShow === 0 ? (
                <div className="text-left">
                    <p style={{marginLeft: '200px'}}>There are 0 items in your cart</p>
                    <Button 
                        style={{margin: '10px 200px'}} 
                        variant="success"
                        onClick={handleNavigation}
                    >
                        Continue Shopping
                    </Button>   
                </div>     
            ) : (
                <div>
                    {ProductLists.products.map((product, index) => (
                        <div 
                            className="product-item" 
                            style={{margin: '0px 200px', display: product.value === 0 ? 'none' : 'block'}}
                            key={index}
                        >
                            <div>{product.desc}</div>
                            <div className="nowrap-left">
                                <div>
                                    <img
                                        className="product_image"
                                        src={product.image}
                                        alt={product.desc}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="d-flex gap-2">
                                </div>
                                <div className="nowrap-left ms-3" style={{marginTop: '-25px'}}>
                                    <div>
                                        <span>Quantity </span>
                                        <span>{product.value}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button 
                        style={{margin: '50px 200px'}} 
                        variant="primary"
                        onClick={handleCheckout}
                    >
                        Check Out
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
};

function LoginForm() {
    return (
        <form className="border mt-3 mb-5 p-3 bg-white">
            <label className="m-2">Name:</label>
            <input type="text" name="name" placeholder="Your name" />
            <label className="m-2">Email:</label>
            <input type="email" name="email" placeholder="Your Email" />
            <input type="submit" name="Login" className="btn bg-success text-white my-3"/>
        </form>
    );
}

function Home({fbpic, fbdata}) {
    return (
        <Card style={{width: '800px'}} className="mx-auto mt-5">
            <Card.Header className="pb-4">
                <h1>Check Out</h1>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <div className="text-left">
                        <img src={fbpic} alt={fbdata.name} className="rounded-circle" />
                        <h3 className="d-inline text-success mx-2">
                            Welcome Back {fbdata.name}!
                        </h3>
                        <p className="my-5">Time to check out?</p>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Cart;