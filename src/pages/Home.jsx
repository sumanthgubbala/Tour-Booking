import React from 'react'
import '../styles/home.css'

import { Container , Row ,Col} from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg2 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import Subtitle from './../shared/Subtitle'
import worldImg from '../assets/images/world.png'

import SearchBar from '../shared/SearchBar'

import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'

const Home = () => {
  return (
    <>
    {/* ============Hero Section start =================*/}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
            <div className='hero__content'>
            <div className='hero__subtitle d-flex align-items-center'>
              <Subtitle subtitle={'know Before You Go '}/>
              <img src={worldImg} alt=''/>
            </div>
            <h1>Traveling open the door to creating <span className='highlight'>memories</span> 
            </h1>
            <p>
              Explore the world, discover new cultures, 
              and make unforgettable memories.
              Whether you're a seasoned traveler or a follower of the
                <span className='highlight'>
                road less traveled</span>, we've got you covered.
            </p>
            </div>
            </Col>
            <Col lg='2'>
            <div className='hero_img-box'>
            <img src={heroImg} alt='' />
            </div>
            </Col>
            <Col lg='2'>
            <div className='hero_img-box mt-4 hero__video-box' >
            <video src={heroVideo} alt='' controls/>
            </div>
            </Col>
            <Col lg='2'>
            <div className='hero_img-box mt-5'>
            <img src={heroImg2} alt='' />
            </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ============Hero Section ends =================*/}
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className='service__subtitle'>What we serve</h5>
              <h2 className='service__title'>we offer our best services</h2>
            </Col>
            <ServiceList/>
          </Row>
        </Container>
      </section>

      {/* ============ featured tour section start =================*/}
      <section>
        <Container>
          <Row>
            <Col lg='12' className='mb-5'>
            <Subtitle subtitle={'Explore'} />
            <h2 className='featured__tour-title'> Our Featured tours</h2>
            </Col>
            <FeaturedTourList/>
          </Row>
        </Container>
      </section>
      {/* ============ featured tour section ends =================*/}
    </>
  )
}

export default Home