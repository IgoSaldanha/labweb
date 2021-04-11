import React, {useState} from 'react';
import './style.css';

export default (showProfile) => {

  const showp = showProfile;

  return (
    <div className="profileWindow"  style={{left: showp? 3000: '25%'}}>
      <div>
        {console.log(showp)}
      </div>
    </div>
  );
}