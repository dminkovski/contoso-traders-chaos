import './footer.scss'

import { Grid } from '@mui/material';
import { EmailLogo, LogoHorizontal, PhoneLogo } from 'app/assets/images';
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    const getLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            setStatus("Geolocation is not supported by this browser.");
        }
    }, []);
    React.useEffect(() => {
        getLocation();
    }, [getLocation]);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);


    function showPosition(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        let point = position.coords.latitude + ',' + position.coords.longitude
        const geoApiUrlForAddress = `${import.meta.env.VITE_REACT_APP_GEOAPIBASEURL}/Locations/${point}?key=${import.meta.env.VITE_REACT_APP_BINGMAPSKEY}`;
        fetch(geoApiUrlForAddress)
            .then(res => res.json())
            .then(dat => {
                setStatus(null);
                if ( dat.resourceSets[0]) {
                    let address:string = dat.resourceSets[0].resources[0].address.locality + ', ' + dat.resourceSets[0].resources[0].address.countryRegion;
                    setLocation(address)    
                } else {
                    console.error(dat.errorDetails[0])
                }
            })
    }


    return (
        <div className='footer-container'>
            <Grid container className='footer-grid-container'>
                <Grid item lg={4} xs={12} className='section-1'>
                    <Link to="/">
                        <LogoHorizontal />
                    </Link>
                    <p className='mt-2 text-justify'>
                        Contoso Traders is an e-commerce platform that specializes in electronic items. Our website offers a wide range of electronics, including smartphones, laptops, and other popular gadgets.
                        We pride ourselves on providing high-quality products at competitive prices, and our dedicated customer service team is always on hand to assist with any queries or concerns. With fast and secure shipping, convenient payment options, and a user-friendly interface, Contoso Traders is the perfect place to shop for all your electronic needs.
                    </p>
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12} className='section-2'>
                    <ul>
                        <li className='main-element'>Catalog</li>
                        <li className='list-element'><Link to='/list/all-products'>All Products</Link></li>
                        <li className='list-element'><Link to='/list/controllers'>Controllers</Link></li>
                        <li className='list-element'><Link to='/list/laptops'>Laptops</Link></li>
                        <li className='list-element'><Link to='/list/monitors'>Monitors</Link></li>
                    </ul>
                </Grid>
                <Grid item lg={2} md={3} sm={6} xs={12} className='section-3'>
                    <ul>
                        <li className='main-element'>Legals</li>
                        <li className='list-element'><Link to='/terms-of-service'>Terms of Service</Link></li>
                        <li className='list-element'><Link to='/refund-policy'>Refund Policy</Link></li>
                        <li className='list-element'><Link to='/about-us'>About Us</Link></li>
                    </ul>
                </Grid>
                <Grid item lg={4} md={6} xs={12} className='section-4'>
                    <ul>
                        <li className='main-element'>Contact us</li>
                        <li className='list-element'>Feel free to get in touch with us via phone or send us a message</li>
                        <li>
                            <div className='contact-div' >
                                <div className='logo-div' >
                                    < PhoneLogo/>
                                </div>
                                <div className='list-element'>
                                    {' '}+123456768910
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='contact-div' >
                                <div className='logo-div' >
                                    <EmailLogo />
                                </div>
                                <div className='list-element'>
                                    {' '}support@contosotraders.com
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li className='main-element'>Your Current location</li>
                        {status && <li id="status" className='list-element'>{status}</li>}
                        {lat && <input id="latitude" value={lat} type="hidden" />}
                        {lng && <input id="longitude" value={lng} type="hidden" />}
                        {location && <address id="current-location">{location}</address>}
                        {lat && lng ?
                            <div id="mapviewer" className='w-100'><iframe title='geolocation' id="map" scrolling="no" width="400" height="200" frameBorder="0" src={`https://www.bing.com/maps/embed/?h=200&w=400&cp=${lat}~${lng}&lvl=10`}></iframe></div>
                            : null}
                    </ul>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer