import React, { useEffect, useState } from 'react'
import createSharedNoteRecord from '../service/createSharedNoteRecord'
import Loader from '../shared/Loader';

const SubmitComponent = ({ submitForm, selectedUserIdsWithAction }) => {
  const [response, setResponse] = useState({ loading: true, result: null });
  useEffect(() => {
    const createRecords = async (selectedUserIdsWithAction) => {
      setResponse({...response, loading: true})
      const result = await createSharedNoteRecord(selectedUserIdsWithAction)
      setResponse({loading: false, result: result})
    }
    
    if(submitForm) createRecords(selectedUserIdsWithAction)
  }, [submitForm])

  if(response.loading) return < Loader />

  return (
    response.result.success ? <h5 className='bg-info p-2 text-center'> SHARED NOTE WITH {response.result.result} User(s)</h5> : <p className='error'>An error ocurred - 
    {response.result.error} </p>
  )
}

export default SubmitComponent