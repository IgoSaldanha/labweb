import React, { useState } from 'react';
import './style.css';

export default (showProfile) => {

  const showp = showProfile;

  return (
    <div className="profileWindow">
      <div>
        {console.log(showp)}
      </div>
    </div>
  );
}