import React, {useEffect, useState} from 'react';
import './MarketPage.scss'
import Card from '../../components/Card/Card';
import {fetchProducts} from "../../api/products";


const MarketPage = () => {
    const [products, setProducts] = useState<Array<any>>([])

    const getProducts = async () => {
        const response = await fetchProducts()
        setProducts(response)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <main>
            {products.length > 0
                ? <div className={'cards'}>
                    <div className={'card-list'}>
                        {products
                            .map((product) =>
                                <Card author={product['created_by']['display_name']}
                                      name={product['name']}
                                      price={product['initial_price']}
                                      quantity={product['quantity']}
                                      key={product['product_id']}
                                />
                            )
                        }
                    </div>
                </div>
                : <h1>Loading...</h1>
            }
        </main>
    );
}

export default MarketPage;

