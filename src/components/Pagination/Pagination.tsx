import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import './Pagination.scss'

interface PaginationProps {
    contentPerPage: number,
    count: number,
    setFirstIndex: Dispatch<SetStateAction<number>>,
    setLastIndex: Dispatch<SetStateAction<number>>
}

const Pagination: React.FC<PaginationProps> = ({count, contentPerPage, setFirstIndex, setLastIndex}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(count / contentPerPage)
    const lastContentIndex = currentPage * contentPerPage;
    const firstContentIndex = lastContentIndex - contentPerPage;

    useEffect(() => {
        setLastIndex(lastContentIndex)
        setFirstIndex(firstContentIndex)
    },[currentPage])

    useEffect(() => {
        setCurrentPage(1)
    },[count])

    const setPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const setNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className={'pagination'}>
            <p className="text">
                {currentPage}/{totalPages}
            </p>
            <button onClick={setPrevPage}>
                &larr;
            </button>
            <select
                value={currentPage}
                onChange={(e:ChangeEvent<HTMLSelectElement>) => {
                    setCurrentPage(parseInt(e.target.value))
                }}>
                {/* @ts-ignore */}
                {[...Array(totalPages).keys()]
                    .map((el) => (
                        <option value={el+1} key={el}>{el+1}</option>
                    ))}
            </select>
            <button onClick={setNextPage}>
                &rarr;
            </button>
        </div>
    );
};

export default Pagination;