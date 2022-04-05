import React, {useEffect, useMemo, useState} from 'react';
import './MarketPage.scss'
import Card from '../../components/Card/Card';
import {fetchProducts} from "../../api/products";
import usePagination from '../../hooks/UsePagination';


const MarketPage = () => {
    const [products, setProducts] = useState<Array<any>>([])
    const [isFiltered, serIsFiltered] = useState(false)

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

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 8,
        count: filteredProducts.length,
    });

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
                        <div className={''}>

                        </div>
                        <div className={'pagination'}>
                            <p className="text">
                                {page}/{totalPages}
                            </p>
                            <button onClick={prevPage} className="page">
                                &larr;
                            </button>
                            {/* @ts-ignore */}
                            {[...Array(totalPages).keys()]
                                .map((el) => (
                                    <button
                                        onClick={() => setPage(el + 1)}
                                        key={el}
                                        className={`page ${page === el + 1 ? "active" : ""}`}
                                    >
                                        {el + 1}
                                    </button>))
                            }
                            <button onClick={nextPage} className="page">
                                &rarr;
                            </button>
                        </div>
                        <div className={'filter-by-quantity'}>
                            <label htmlFor={'checkFilt'}>В наличии:</label>&nbsp;
                            <input type="checkbox" id={'checkFilt'} name={'checkFilt'} checked={isFiltered} onChange={availabilityFilter}/>
                        </div>
                    </div>
                    <div className={'card-list'}>
                        {filteredProducts
                            .slice(firstContentIndex, lastContentIndex)
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

