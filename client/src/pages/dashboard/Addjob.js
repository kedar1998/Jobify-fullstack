import React from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {FormRow, Alert, FormRowSelect} from '../../components'
import { useAppContext } from '../../context/appContext'


const Addjob = () => {


  const {showAlert, displayAlert, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, isEditing, handleChange, clearValues, isLoading, createJob, editJob} = useAppContext()

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!position || !company || !jobLocation){
      displayAlert()
      return 
    }

    if(isEditing){
      editJob()
      return ;
    }

    createJob()

  }

  const handleJobInput = (e) =>{
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }


  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />

          <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />

          <FormRow type="text" name="jobLocation" value={jobLocation} handleChange={handleJobInput} labelText="job location" />

          {/* JOB TYPE */}
          <FormRowSelect name="status" value={status} handleChange={handleJobInput} list={statusOptions} />

          {/* JOB STATUS */}
          <FormRowSelect labelText="job type" name="jobType" value={jobType} handleChange={handleJobInput} list={jobTypeOptions} />

          {/* btn container */}
          <div className='btn-container'>
            <button type="submit" className='btn btn-block submit-btn' disabled={isLoading} >submit</button>

            <button onClick={(e) =>{
              e.preventDefault() 
              clearValues()
              }} className='btn btn-block clear-btn'>clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default Addjob