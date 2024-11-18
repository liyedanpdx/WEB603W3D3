import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import ProductItem from "./displayProducts"
import Cart from "./Cart"
import { Link, Route, Routes } from "react-router-dom";


export default function Nav({ProductLists,updateProductLists,isLoggedInStatus,updateLoggedInStatus}){
    const getTotalQuantty=()=>{
        return ProductLists.products.map(product=> product.value).reduce((acc, cur)=>acc+cur, 0)
      }

    return(
    <div>
        {/*Navigation*/}
        <div className="nowrap product-title-background">
            <div className="product-title"><Link  style={{ textDecoration: 'none' }} to="/"><span>Shop 2 <span className="bg-white rounded-circle" style={{fontWeight: '1000',color:'#61DAFB',width: '35px',height: '35px',display: 'inline-flex',position: 'relative',bottom: '-3px', paddingLeft: '8px'}}>R</span> eact</span></Link></div>
            <div className="product-title-statistic"><Link  style={{ textDecoration: 'none' }} to="/Cart"><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon><span className="cart-icon">{getTotalQuantty()} items</span></Link></div>
        </div>
        {/* Routes */}
        <Routes>
            <Route path="/" element={        
            <ProductItem  
                ProductLists={ProductLists} 
                updateProductLists={updateProductLists}
                />}
            />
            <Route path="/Cart" element={<Cart ProductLists={ProductLists} TotalQuantShow={getTotalQuantty()} isLoggedInStatus={isLoggedInStatus} updateLoggedInStatus={updateLoggedInStatus}/>}/>
        </Routes>  
    </div>
    )
}




