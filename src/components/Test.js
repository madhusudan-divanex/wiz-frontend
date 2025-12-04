import React from 'react'
import { profiles } from '../utils/staticData'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
function Test() {
    return (
        <div id="profile-slider" class="splide">
            <Splide
                options={{
                    type: 'loop',
                    perPage: 4,
                    perMove: 1,
                    arrows: false,
                    pagination: true,
                    gap: '1rem',
                    breakpoints: {
                        1200: { perPage: 3 },
                        768: { perPage: 2 },
                        576: { perPage: 1 },
                    },
                }}
                aria-label="Profile Slider"
            >
                {profiles.map((profile, index) => (
                    <SplideSlide key={index}>
                        <div className="card text-center border-0">
                            <div className="dash-slider-bx">
                                <img src={profile.img} alt={profile.name} className="mx-auto" />
                            </div>
                            <div className="dash-slide-content mt-3">
                                <h6 className="mb-0 fw-bold">{profile.name}</h6>
                                <h4 className="text-primary">{profile.title}</h4>
                                <small className="text-muted">{profile.company}</small>
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    )
}

export default Test
