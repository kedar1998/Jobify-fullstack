import React from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi'


const PageBtnContainer = () => {

    const {numOfPages, page, changePage} = useAppContext()

    const nextPage = () =>{
        let newPage = page + 1
        if(newPage > numOfPages){
            newPage = 1
        }
        changePage(newPage)
    }

    const prevPage = () =>{
        let newPage = page - 1
        if(newPage < 1){
            newPage = numOfPages
        }
        changePage(newPage)
    }

    const pages = Array.from({length: numOfPages}, (_, index) =>{
        return index+1
    })

  return (
    <Wrapper>
        <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
        </button>
        <div className='btn-container'>
            {
                pages.map((item) =>{
                    return (
                        <button type="button" className={item === page ? 'active pageBtn' : 'pageBtn'} key={item} onClick={() => {changePage(item)}}>{item}</button>
                    )
                })
            }
        </div>
        <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
        </button>
    </Wrapper>
  )
}

export default PageBtnContainer