import React from 'react'
import LeftPaneHomeScreen from '../Components/Home/LeftPaneHomeScreen'
import RightPaneHomeScreen from '../Components/Home/RightPaneHomeScreen'

export default function Home() {
  return (
    <div className='grid grid-cols-2'>
 <div>
        <LeftPaneHomeScreen/>
      </div>
      <div>
        <RightPaneHomeScreen/>
      </div>
    </div>
  )
}
