import {useState} from 'react'
import {Modal} from 'react-bootstrap'

export default function ProductItem({ProductLists, updateProductLists}){
  const[show, setShow] = useState(false);
  const[showImge, setShowImge] = useState({});
  const[sortType, updateSortType] = useState({});

  const sortProducts = (products, sortType) =>{
    const sortedProducts = [...products];
    switch(sortType) {
      case 'normal':
        return sortedProducts.sort((a,b) => a.id-b.id);
      case 'lowest':
        return sortedProducts.sort((a,b) => a.price-b.price);
      case 'highest':
        return sortedProducts.sort((a,b) => b.price-a.price);
      default:
        return sortedProducts;
    }
  };

  const handleClose = () =>setShow(false);
  const handleShow = (product) =>{
    setShow(true);
    setShowImge(product);
  }

  const handleAddItem = (index) => {
    const newProducts = ProductLists.products.map((item, i) => 
      i === index ? {...item, value: item.value + 1} : item
    );
    updateProductLists({
      ...ProductLists,
      products: newProducts
    });
  }

  const handleReduceItem = (index) => {
    const newProducts = ProductLists.products.map((item, i) => 
      i === index && item.value > 0 ? {...item, value: item.value - 1} : item
    );
    updateProductLists({
      ...ProductLists,
      products: newProducts
    });
  }

  return(
    <div>
      <div className="d-flex justify-content-center align-items-center my-4">
        <div className="d-flex align-items-center">
          <span className="me-2">Sort Price By: </span>
          <select
            value={sortType}
            onChange={(e)=>updateSortType(e.target.value)}
            className="form-select form-select-sm"
            style={{ width: 'auto' }}
          >
            <option value="normal">Normal</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
      </div>
      {sortProducts(ProductLists.products, sortType).map((product, index)=>(
        <div className="product-item" key={index}>
        <div key={index}>{product.desc}<span class='ms-2 text-danger'>${product.price}</span></div>
        <div className="nowrap-left">
          <div>
          <img 
                className="product_image" 
                src={product.image} 
                alt={product.desc}
                onClick={() => handleShow(product)}
                style={{ cursor: 'pointer' }}
              />
          </div>
          <div className="d-flex gap-2">
            <button className="btn bg-secondary rounded d-flex align-items-center justify-content-center" 
              style={{ width: '40px', height: '40px' }}
              onClick={() => handleAddItem(index)}>
              <span className="bg-white rounded-circle d-flex align-items-center justify-content-center" 
                style={{ 
                  width: '25px',
                  height: '22px',
                  fontSize: '30px',
                  lineHeight: '1',
                  fontWeight: '500',
                  color: '#6c757d',
                  paddingBottom: '5px'
                }}>
                +
              </span>
            </button>

            <button className="btn bg-secondary rounded d-flex align-items-center justify-content-center" 
              style={{ width: '40px', height: '40px' }}
              onClick={() => handleReduceItem(index)}>
              <span className="bg-white rounded-circle d-flex align-items-center justify-content-center" 
                style={{ 
                  width: '50px',
                  height: '20px',
                  fontSize: '40px',
                  lineHeight: '1',
                  fontWeight: '500',
                  color: '#6c757d',
                  paddingBottom: '5px'
                }}>
                -
              </span>
            </button>
          </div>
          <div className="nowrap-left ms-3" style={{marginTop:'-25px'}}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}><span> Quantity </span><span className="product_number_show">{product.value}</span></div>
          </div>
        </div>
      </div>
    ))}
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{showImge.desc}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={showImge.image}
              width="350"
              alt={showImge.desc}
              className="mx-5"
            />
            <p><span className="text-dark">Ratings: </span>{showImge.ratings}/5</p>
          </Modal.Body>
    </Modal>


    {/* 
      {this.state.ProductLists.showModal && (
      <div className="modal-overlay" onClick={this.handleCloseModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={this.handleCloseModal}>×</button>
          <div className="modal-body">
            <h3>{this.state.ProductLists.activeProduct.desc}</h3>
            <img 
              src={this.state.ProductLists.activeProduct.image} 
              alt={this.state.ProductLists.activeProduct.desc} 
              className="modal-image"
            />
            <p>Rating: {this.state.ProductLists.activeProduct.ratings}</p>
          </div>
        </div>
      </div>
      )}
  */}

  </div>
  )
}

// class ProductItem extends Component{
//   constructor(props){
//     super(props)
//     this.state={
//       ProductLists: props.ProductLists
//     }
//   }
  // handleAddItem = (index) => {
  //   this.setState(prevState => {
  //     const newProductLists = {
  //       ...prevState.ProductLists,
  //       products: prevState.ProductLists.products.map((item, i) => 
  //         i === index ? {...item, value: item.value + 1} : item
  //       )
  //     };
  //     this.props.updateProductLists(newProductLists);  // 更新父组件数据
  //     return { ProductLists: newProductLists };        // 更新本地状态
  //   });
  // }
  //     handleReduceItem = (index) => {
  //       this.setState(prevState => {
  //         const newProductLists ={
  //           ...prevState.ProductLists,
  //         products: prevState.ProductLists.products.map((item, i) => 
  //           i === index && item.value > 0 ? {...item, value: item.value - 1} : item
  //         )}
  //         this.props.updateProductLists(newProductLists);
  //         return { ProductLists: newProductLists }; 
  //       });
  //     }

//       handleShowModal = (product) => {
//         this.setState(prevState=>({
//           ProductLists:{
//             ...prevState.ProductLists,
//             showModal: true,
//             activeProduct: product
//           }
//         }));
//       }
      
//       handleCloseModal = () => {
//         this.setState(prevState=>({
//           ProductLists:{
//             ...prevState.ProductLists,
//             showModal: false,
//             activeProduct: null
//           }
//         }));
//       }
  
//     render(){
//     return(
//     <div>
//       {this.state.ProductLists.products.map((product, index)=>(
//         <div className="product-item" key={index}>
//         <div key={index}>{product.desc}</div>
//         <div className="nowrap-left">
//           <div>
//           <img 
//                 className="product_image" 
//                 src={product.image} 
//                 alt={product.desc}
//                 onClick={() => this.handleShowModal(product)}
//                 style={{ cursor: 'pointer' }}
//               />
//           </div>
//           <div className="d-flex gap-2">
//             <button className="btn bg-secondary rounded d-flex align-items-center justify-content-center" 
//               style={{ width: '40px', height: '40px' }}
//               onClick={() => this.handleAddItem(index)}>
//               <span className="bg-white rounded-circle d-flex align-items-center justify-content-center" 
//                 style={{ 
//                   width: '25px',
//                   height: '22px',
//                   fontSize: '30px',
//                   lineHeight: '1',
//                   fontWeight: '500',
//                   color: '#6c757d',
//                   paddingBottom: '5px'
//                 }}>
//                 +
//               </span>
//             </button>

//             <button className="btn bg-secondary rounded d-flex align-items-center justify-content-center" 
//               style={{ width: '40px', height: '40px' }}
//               onClick={() => this.handleReduceItem(index)}>
//               <span className="bg-white rounded-circle d-flex align-items-center justify-content-center" 
//                 style={{ 
//                   width: '50px',
//                   height: '20px',
//                   fontSize: '40px',
//                   lineHeight: '1',
//                   fontWeight: '500',
//                   color: '#6c757d',
//                   paddingBottom: '5px'
//                 }}>
//                 -
//               </span>
//             </button>
//           </div>
//           <div className="nowrap-left ms-3" style={{marginTop:'-25px'}}>
//             <div style={{ 
//               display: 'flex', 
//               flexDirection: 'column', 
//               alignItems: 'center' 
//             }}><span> Quantity </span><span className="product_number_show">{product.value}</span></div>
//           </div>
//         </div>
//       </div>
//     ))}
//       {this.state.ProductLists.showModal && (
//       <div className="modal-overlay" onClick={this.handleCloseModal}>
//         <div className="modal-content" onClick={e => e.stopPropagation()}>
//           <button className="modal-close" onClick={this.handleCloseModal}>×</button>
//           <div className="modal-body">
//             <h3>{this.state.ProductLists.activeProduct.desc}</h3>
//             <img 
//               src={this.state.ProductLists.activeProduct.image} 
//               alt={this.state.ProductLists.activeProduct.desc} 
//               className="modal-image"
//             />
//             <p>Rating: {this.state.ProductLists.activeProduct.ratings}</p>
//           </div>
//         </div>
//       </div>
//     )}


//   </div>
//   )
// }
// }

// export default ProductItem;