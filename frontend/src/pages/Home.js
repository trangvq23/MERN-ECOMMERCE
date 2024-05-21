import React from 'react'
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";


const Home = () => {
    return (
        <div className='pl-5 pr-5'>
            <CategoryList/>

            <HorizontalCardProduct category={"char"} heading={"Char"}/>
            <HorizontalCardProduct category={"table"} heading={"Table"}/>
            <HorizontalCardProduct category={"sofa"} heading={"Sofa"}/>
            <HorizontalCardProduct category={"bed"} heading={"Bed"}/>
            <HorizontalCardProduct category={"diningset"} heading={"Diningset"}/>
            <HorizontalCardProduct category={"wardrobe"} heading={"Wardrobe"}/>
        </div>
    )
}
export default Home
