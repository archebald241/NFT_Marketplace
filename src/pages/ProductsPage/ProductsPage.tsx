import React, {useEffect, useMemo, useState} from 'react';
import './ProductsPage.scss'
import Card from '../../components/Card/Card';
import {fetchProducts} from "../../api/products";
import Pagination from "../../components/Pagination/Pagination";


const ProductsPage = () => {
    const [products, setProducts] = useState<Array<any>>([])
    const [isFiltered, serIsFiltered] = useState(false)
    const [firstIndex, setFirstIndex] = useState(0)
    const [lastIndex, setLastIndex] = useState(5)

    const getProducts = async () => {
        const response = await fetchProducts()
        setProducts(response)
    }

    const filteredProducts = useMemo(() => {
            if (isFiltered) {
                return products.filter((product) => product['quantity_available'] > 0)
            } else {
                return products
            }
        },
        [products, isFiltered])

    const availabilityFilter = () => {
        serIsFiltered(!isFiltered)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <main>
            {products.length > 0
                ? <div className={'cards'}>
                    <div className={'card-navigation'}>
                        <Pagination
                            contentPerPage={5}
                            count={filteredProducts.length}
                            setLastIndex={setLastIndex}
                            setFirstIndex={setFirstIndex}
                        />

                        <div className={'filter-by-quantity'}>
                            <label htmlFor={'checkFilt'}>В наличии:</label>&nbsp;
                            <input type="checkbox" id={'checkFilt'} name={'checkFilt'} checked={isFiltered} onChange={availabilityFilter}/>
                        </div>
                    </div>
                    <div className={'card-list'}>
                        {filteredProducts
                            .slice(firstIndex, lastIndex)
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

export default ProductsPage;

