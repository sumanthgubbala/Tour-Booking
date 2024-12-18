import React, {useRef}from 'react'
import './Search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'

import {BASE_URL} from './../utils/config'

import { useNavigate } from 'react-router-dom'

const SearchBar = () => {

    const locationref = useRef('');
    const distanceref = useRef(0);
    const maxGroupsizeref = useRef(0);
    const navigate = useNavigate();

    const serachhandelr = async ()=>{
        const location =locationref.current.value
        const distance = distanceref.current.value
        const maxGroupSize = maxGroupsizeref.current.value
        if(location === '' || distance === '' ||  maxGroupSize === '') {
            return alert('Please enter a location or distance')
        }
        const res = await fetch(`${BASE_URL}/tours/serach/tours?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)
        if(!res.ok) alert('Could not retrieve location');

        const result = await res.json()
        navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
            ,{state: result.data}
        )
    }
  return (
    <Col lg='2'>
    <div className='search__bar'>
    <Form className='d-flex align-items-center gap-4'>
        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span>
            <i class="ri-map-pin-line"></i>
            </span>
            <div>
                <h6>Location</h6>
                <input type='text'placeholder='Where are you gonig?' ref={locationref} />
            </div>
        </FormGroup>
        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span>
            <i class="ri-map-pin-time-fill"></i>
            </span>
            <div>
                <h6>Distance</h6>
                <input type='number'placeholder='Distance k/m' ref={distanceref} />
            </div>
        </FormGroup>
        <FormGroup className='d-flex gap-3 form__group form__group-last'>
            <span>
            <i class="ri-team-line"></i>
            </span>
            <div>
                <h6>Max People</h6>
                <input type='number'placeholder='0' ref={maxGroupsizeref} />
            </div>
        </FormGroup>
        <span className='search__icon' type='submit' onClick={serachhandelr}>
        <i class="ri-search-2-line"></i>
        </span>
    </Form>
    </div>
    </Col>
  )
}

export default SearchBar