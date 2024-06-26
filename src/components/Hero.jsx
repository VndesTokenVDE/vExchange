import React from 'react'
import styles from '../style';
import { discount, robot } from '../assets';
import GetStarted from './GetStarted';

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className='w-[32px] h-[32px]' />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">20%</span> Discount For {" "}
            <span className="text-white">1 Month</span> Account
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h3  className='text-white flex-1 font-poppins font-semibold ss:text-[32px] text-[40px] ss:leading-[100px] leading-[32px]'>The Next Generation <br className='sm:block hidden' /> {" "}</h3>
         

          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>
         <h1 className='text-white flex-2 font-poppins font-semibold ss:text-[72px] text-[52px] ss:leading-[73px] leading-[32px]'>
            <span className="text-gradient">VNDES Token</span>
          </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          VNDES is a decentralized finance (DeFi) token that is built on the Polygon blockchain. It is designed to be used as a medium of exchange for goods and services on the e-commerce platform. The VNDES is a peer-to-peer platform that allows users to buy and sell goods and services using VDE.  </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="robot" className='w-[100%] h-[100%] relative z-[5]' />
        
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] bottom-40 rounded-full white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  )
}

export default Hero
