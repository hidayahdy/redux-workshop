import React, { useEffect, useState } from 'react';
import { Button, NavLink } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ADD, DLT, REMOVE } from '../Redux/actions/actions';



function CardsDetails() {




  const [data,setData] = useState([]);
  // console.log(data);

  const {id} = useParams();
  // console.log(id);

  const history = useNavigate();

  const dispatch = useDispatch();

  
  const getdata = useSelector((state)=> state.cartreducer.carts);
  // console.log(getdata);
  
  const compare = ()=>{
    let comparedata = getdata.filter((e)=>{
      return e.id == id
    });
    setData(comparedata);
  }
 // add data
  

 const send = (e)=>{
  // console.log(e);
  dispatch(ADD(e));
}

const dlt = (id)=>{
  dispatch(DLT(id));
  history("/home");
}

// remove one
const remove = (item)=>{
dispatch(REMOVE(item))
}


useEffect(()=>{
  compare();
},[id])
  return (

<div className="container mt-2">
        <h2 className='text-center'>Add to shopping cart</h2>

        <div className='container mt-3'>
          <div className='itemsdetails'>
          {
            data.map((ele)=>{
              return (
                <>
            <div className='items_img'>
              <img alt='' src={ele.imgdata} style={{height:'300px',width:'300px'}}></img>
            </div>
<div className='details'>
<Table>
                <tr>
                  <td>
                    <p> <strong>Restaurant</strong>  : {ele.rname}</p>
                    <p> <strong>Price</strong>  : <span>{ele.price}DT</span></p>
                    <p> <strong>Total</strong>  :<span>{ele.price * ele.qnty}DT</span> </p>
                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                   <><span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                    <span style={{fontSize:22}}>{ele.qnty}</span>
                    <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span></> 
                   
                    </div>
                    <br></br>
                    <Link to='/'>
                    <Button   className="text-decoration-none  "  >Back</Button>
                    </Link>

                  </td>
                  <td>
                    <p><strong>Rating :</strong> <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}>{ele.rating} ★	</span></p>
                    <p><strong>Order Review :</strong> <span >{ele.somedata}	</span></p>
                    <p><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}></i>	</span></p>
                  </td>
                </tr>
              </Table>
</div></>)})}
          </div>
  </div>
  </div>
  )
}

export default CardsDetails