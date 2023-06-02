import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import './Home.css'
import Product from "./Product.js"
import MetaData from '../layout/Metadata';
import Loader from '../layout/Loader/Loader';
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from 'react-alert'


function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products)


    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (<Loader />) :
                <Fragment>
                    <MetaData title="Shopper" />
                    <div className='banner'>
                        <p>
                            Welcome to Shopper!
                        </p>
                        <h1>Find awesome products for all of your needs!</h1>
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>
                    <div className='container' id='container'>
                        {products && products.map(product => <Product product={product} />)}
                    </div>
                </Fragment>}
        </Fragment>)

}

export default Home