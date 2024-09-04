import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Header'
import { Baseurl } from './baseUrl'
import Loader from './Loader'
import './Exchanges.css'
import OurModel from './OurModel'

const Exchanges = () => {
    //for loading effect
    const [loading, setLoading] = useState(true)
    //data to show in the uI
    const [exchanges, setExchanges]=useState([])

    useEffect(()=>{
        const getExchangesData = async()=>{
            const {data} = await axios.get(`${Baseurl}/exchanges`);
            console.log(data)
            setExchanges(data)
            setLoading(false)
        }
        getExchangesData()
    },[])//[]--to stop infitity calling loop, set when api calls

    return(
        <>
            {loading ? <Loader/> : 
                <>
                    <Header/>
                    <OurModel/>
                    <div>
                        {
                            exchanges.map((item, i) => {
                                return (
                                    <div key={i} className='ex-cards'>
                                        <div className='image'>
                                            <img height={'80px'} src={item.image} alt=""/>
                                        </div>
                                        <div className='name'>
                                            {item.name}
                                        </div>
                                        <div className='price'>
                                            {item.trade_volume_24h_btc.toFixed(0)}
                                        </div>
                                        <div className="rank">
                                            {item.trust_score_rank}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </> 
            }
        </>
    )
}

export default Exchanges
