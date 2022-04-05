import React from 'react';
import './Card.scss'

interface CardProps {
    author: string;
    name: string;
    quantity: number;
    price: number;
}

const Card: React.FC<CardProps> = ({author, price, name, quantity}) => {

    const cardImg = require('../../assets/cardImg.png')

    return (
        <div className={'card'}>
            <div className={'card-top'}>
                <span className={'author'}>
                    <span className={'desc'}>created by</span>
                    {author}
                </span>
                <span className={'name'}>{name}</span>
                <img src={cardImg} alt=""/>
            </div>
            <div className={'card-bottom'}>
                <div className={'available'}>
                    <span className={'desc'}>available</span>
                    <span className={'count'}>{quantity}&nbsp;of&nbsp;50</span>
                </div>
                <div className={'price'}>
                    <span className={'desc'}>price</span>
                    <span className={'count'}>{price}&nbsp;ETH</span>
                </div>
            </div>
        </div>
    );
};

export default Card;