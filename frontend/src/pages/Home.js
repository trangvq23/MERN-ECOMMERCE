import React from 'react'
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";


const Home = () => {
    return (
        <div>
            <CategoryList/>

            <HorizontalCardProduct category={"char"} heading={"Top's char"}/>
            <HorizontalCardProduct category={"table"} heading={"Table"}/>
            <HorizontalCardProduct category={"sofa"} heading={"Top's sofa"}/>
            <HorizontalCardProduct category={"bed"} heading={"Bed"}/>
            <HorizontalCardProduct category={"diningset"} heading={"Diningset"}/>
            <HorizontalCardProduct category={"wardrobe"} heading={"Wardrobe"}/>
        </div>
    )
}
export default Home
