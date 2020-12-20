import React, {useEffect} from 'react'

const CodeFormater = ({code, language}) => {
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

export default CodeFormater
