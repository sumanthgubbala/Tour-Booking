import React from 'react'
import ServiceCard from './ServiceCard'

import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customization from '../assets/images/customization.png'

const serviceData =[
    {
        imgUrl: weatherImg,
        title:'Weather',
        desc:'watch weather for changes in the weather service and update the weather service accordingly to the weather service settings settings settings settings'
    },
    {
        imgUrl: guideImg,
        title:'Guide',
        desc:'watch weather for changes in the weather service and update the weather service accordingly to the weather service settings settings settings'
    },{
        imgUrl: customization,
        title:'Customization',
        desc:'watch weather for changes in the weather service and update the weather service accordingly to the weather service settings settings settings'
    }
]

const ServiceList = () => {
  return( 
  <>
  {
    serviceData.map((item, index) => 
    <Col lg='3' md='6' sm='12'className='mb-4' key={index}>
        <ServiceCard item = {item} />
    </Col>)
  }

  </>
  )
};

export default ServiceList