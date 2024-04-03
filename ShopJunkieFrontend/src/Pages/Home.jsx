import React from "react";
import HomeNavbar from "../Layouts/HomeNavbar";
import HomeContainer from "../Components/HomeComponents/HomeContainer";
import Footer from "../Layouts/Footer";


function Home()
{
    return(
        <>
        <HomeNavbar></HomeNavbar>
        <HomeContainer></HomeContainer>
        <Footer></Footer>
        </>
    )

}

export default Home