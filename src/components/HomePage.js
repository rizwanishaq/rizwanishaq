import React, {useEffect} from 'react'
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css";

const HomePage = () => {
  useEffect(() => {
    Prism.highlightAll();
  },[])
  return (
    <div className="Code">
      
      <pre>
      <code className='language-py'>
     {
     `
     import tensorflow as tf
     import numpy as np
     ` 
     }
    </code>
      
        
      </pre>
    </div>
  )
}

export default HomePage
