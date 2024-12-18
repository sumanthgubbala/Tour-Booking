import React,{useEffect, useRef,useState,useContext} from 'react'
import '../styles/tour-details.css'
import { Col , Row, Container, ListGroup, Form } from 'reactstrap'

import { useParams } from 'react-router-dom'

import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import useFetch from './../hooks/useFetch'
import { AuthContext} from './../Context/AuthContext'
import { BASE_URL } from './../utils/config'
const TourDetails = () => {
  const {id} = useParams()
  const reviewMsgRef = useRef('');
  const {data : tour,loading,error} = useFetch(`${BASE_URL}/tours/${id}`)
  const [tourRating,setTourRating] = useState(null)

  const {user} =useContext(AuthContext)

  const {photo, title , desc, price, address,reviews,city, distance , maxGroupSize} = tour
  const {totalRating,avgRating} = calculateAvgRating(reviews);
  const options= {
    day: "numeric",
    month:"long",
    year:"numeric"
  }

  //submit request to server
  const handleSubmit = async(e) => {
    e.preventDefault()
    const reviewText  =  reviewMsgRef.current.value

    if(!user || user===undefined || user===null || user==='' ){
      alert("please sign in")
    }

    //alert(`${reviewText}, ${tourRating}`)
    const reviewObj = {
      username : user?.username,
      reviewText,
      rating:tourRating
    }
    console.log(reviewObj);

    try {
      const res = await fetch(`${BASE_URL}/review/${id}`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
        credentials:'include',
        body:JSON.stringify(reviewObj)
      });
      const result = await res.json()
      if(!result.ok){
         alert(result.message);
         console.log(result.message);
         return 
      }
      alert(result.message)
    } catch (error) {
      alert(error.message)
    }

  }

  useEffect(()=>{
    window.scrollTo(0,0)
  },[tour])

  return (
    <>
      <section >
        <Container>
        {
          loading && <h4 className='text-center pt-5'>Loading...</h4>
        }
        {
          error && <h4 className='text-center pt-5'>Error</h4>
        }
          {
            !loading && !error  &&
            <Row>
            <Col lg='8'>
            <div className='tour__content'>
              <img src={photo} alt=''/>
              <div className='tour__info'>
                <h2>
                  {title}
                </h2>
                <div className='d-flex align-items-center gap-5'>
                <span className="tour__rating d-flex align-items-center gap-1">
              <i class="ri-star-fill" style={{'color':'var(--secondary-color)'}}></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? ("Not rated") : (<span>{reviews?.length}</span>)}
            </span>
            <span>
            <i class="ri-map-pin-user-fill"></i>{address}
            </span>
                </div>
                <div className='tour__extra-details'>
                  <span>
                  <i class="ri-map-pin-2-fill"></i>{city}
                  </span>
                  <span>
                  <i class="ri-money-rupee-circle-line"></i>${price } /per person
                  </span>
                  <span>
                  <i class="ri-pin-distance-line"></i>{distance} k/m
                  </span>
                  <span>
                  <i class="ri-group-line"></i>{maxGroupSize} people 
                  </span>
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>
              {/* =================== tour reviews =================*/}
              <div className='tour__reviews mt-4'>
                <h4>Reviews ({reviews?.length} reviews)</h4>
                <Form onSubmit={handleSubmit}  >
                  <div className='d-flex align-items-center gap-3 mb-4 rating__group '>
                    <span onClick={()=> setTourRating(1)}>1 <i class="ri-star-fill"></i></span>
                    <span onClick={()=> setTourRating(2)}>2 <i class="ri-star-fill"></i></span>
                    <span onClick={()=> setTourRating(3)}>3 <i class="ri-star-fill"></i></span>
                    <span onClick={()=> setTourRating(4)}>4 <i class="ri-star-fill"></i></span>
                    <span onClick={()=> setTourRating(5)}>5 <i class="ri-star-fill"></i></span>
                  </div>
                  <div className='review__input'>
                    <input type='text' ref={reviewMsgRef} placeholder='Share your thoughts' required />
                    <button className='btn primary__btn text-white' type='submit'>
                      Submit
                    </button>
                  </div>
                </Form>
                <ListGroup className='user__review'>
                {
                  reviews?.map((review) =>(
                    <div className='review__item'>
                      <img src={avatar} alt=''/>
                      <div className='w-100'>
                        <div className='d-flex align-items-center justify-content-between'>
                        <div>
                          <h5>{user.username}</h5>
                          <p>
                            {new Date(review.createdAt).toLocaleDateString("en-US",options)}
                          </p>
                        </div>
                        <span className='d-flex align-items-center'>
                        {review.rating}
                           <i class="ri-star-s-fill"></i>
                        </span>
                        </div>
                        <h6>{review.reviewText} </h6>
                      </div>
                    </div>
                  ))
                }

                </ListGroup>
              </div>
              {/* =================== tour reviews  ends=================*/}
            </div>
            </Col>
            <Col lg='4'>
            <Booking  tour={tour} avgRating ={avgRating}/>
            </Col>
          </Row>
          }
        </Container>
      </section>
    </>
  )
}

export default TourDetails