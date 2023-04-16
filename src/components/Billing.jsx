import React, { useState } from 'react';
import { apple, bill, google } from '../assets';
import styles, { layout } from '../style';
import Button from './Button';

const Billing = () => {
  
  const [showTrack, setShowTrack] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');

  const queryEmail = (event) => {
    setTargetEmail(e.target.value);
  }

  const TrackInfo = () => {
    return (
      <div>This is tracking page</div>
    )
  }

  const TrackButton = () => {
    return (
      <p className={styles.paragraph}>
        <div className="h-[60px] w-[100%] grid grid-cols-2 gap-2 content-center mt-4">
          <input type="text" className={styles.inputField} onChange={queryEmail} placeholder='something@something.com' />
          <Button text="Track" onClick={Track()} />
        </div>
      </p>
    )
  }

  const Track = () => {
    setShowTrack(true);
    console.log('Clicked');
  }

  return (
    <section id="track" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img src={bill} alt="billing"
        className='w-[100%] h-[100%] relative z-[5]' />

        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient" />
      </div>
      
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Easily control and <br className='sm:block hidden' /> track your transactions</h2>
        <p className={`${styles.paragraph} max-w-[470px mt-5]`}>
          We store each transaction in our database, so you could keep track of all the transactions you've made over time with our website. 
        </p>
        { showTrack ? <TrackInfo /> : <TrackButton /> }
      </div>

      
    </section>
  )
}

export default Billing