import React,{useState,useEffect} from 'react'
import { Button, Container, Form, InputGroup, Nav, Navbar, Table } from 'react-bootstrap'
import Badge from '@mui/material/Badge';
import {Link, NavLink} from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { DLT } from '../Redux/actions/actions';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [price,setPrice] = useState(0);
  const open = Boolean(anchorEl);
 
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  //fonction useselector for redux
  const getdata = useSelector((state)=> state.cartreducer.carts);
   console.log('hello',getdata);

  const dispatch=useDispatch()
  

//fonction delete
   const del = (id)=>{
    dispatch(DLT(id))
}

//fonction total carts  in shopping cart
const total = ()=>{
  let price = 0;
  getdata.map((ele,k)=>{
      price = ele.price * ele.qnty + price
  });
  setPrice(price);
};

useEffect(()=>{
  total();
},[total])



  return (


   
  <Navbar bg="dark" variant="dark" style={{height:'60px'}}>
    <Container >
     
    <Navbar.Brand href="#home"><img src='logo.jpg' alt='Pain Délice' style={{height:'60px',width:'60px',marginRight:'50px'}}/></Navbar.Brand>
    <Nav className="me-auto">
    
     
      <NavLink to='/' href="#features" className="text-decoration-none text-light mx-3" >Products</NavLink>
    
      

    </Nav>
   

                               
    <Badge badgeContent={getdata.length} color="primary" id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
                    >
    <i class="fa-solid fa-cart-shopping text-light" style={{fontSize:'30px',cursor:'pointer'}}></i>
</Badge>

    </Container>
    
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {getdata.length?
         <div className='card_details' style={{width:"24rem",padding:10}}>
         <Table>
             <thead>
                 <tr>
                     <th>Photo</th>
                     <th>Article Name</th>
                 </tr>
             </thead>
             <tbody>
                                    {
                                        getdata.map((e)=>{
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                        <NavLink to={`/cart/${e.id}`}   onClick={handleClose}>
                                                        <img src={e.imgdata} style={{width:"5rem",height:"5rem"}} alt="" />
                                                        </NavLink>   
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price : {e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                            <p style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>del(e.id)}>
                                                                <i className='fas fa-trash smalltrash'></i>
                                                            </p>
                                                        </td>

                                                        <td className='mt-5'style={{color:"red",fontSize:20,cursor:"pointer"}}  onClick={()=>del(e.id)}>
                                                        <i className='fas fa-trash largetrash'></i>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <p className='text-center'>Total : {price}</p>
                                </tbody>
                           
             </Table>
        </div>:
       <div className='card_details d-flex justify-content-center align-items-center' style={{width:"24rem",padding:10,position:"relative"}}>
       
       <i className='fas fa-close smallclose'onClick={handleClose} style={{position:"absolute",top:2,right:20,fontSize:15,cursor:"pointer"}}></i>
         <p style={{fontSize:22}}>Your Cart Is Empty</p>
        
         <img src="./cart.gif" alt="" className='emptycart_img' style={{width:'60px',marginLeft:'30px',justifyContent:'center'}} />
         </div> }
      
  
      </Menu>
  </Navbar>

    
  )
}

export default Header

