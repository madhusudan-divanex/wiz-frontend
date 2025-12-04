import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getApiData, getSecureApiData } from '../../services/api';

function SubCategory() {
  const params=useParams()
  const [subCategory, setSubCategory] = useState([])
  const fetchCategoryData = async (id) => {
    try {
      const result = await getApiData(`get-category-data/${id}`)
      if (result.status) {
        const data = result.categoryData
        const subCatFormatted = data?.subCat ? data.subCat.map(item =>item?.name  ) : [];
        setSubCategory({ ...subCategory, name: data.name, image: data.image, icon: data?.icon, subCat: subCatFormatted })
      }
    } catch (error) {
    }
  };
  useEffect(()=>{
    fetchCategoryData(params.id)
  },[params])
  return (
    <div className='newBnr'>
      <section className="sub-category-banner">
        <img src="/assets/images/category-bnner.png" className="w-100" alt="" />
      </section>
      <section className="sub-category-providers">
        <div className="container">
          <ol className="breadcrumb custom-bredcump">
            <li className="breadcrumb-item">
              <Link to="/find-provider">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {subCategory.name}
            </li>
          </ol>
          <h3 className="title text-center mt-5 mb-5">
            Select Your Subcategory of Trusted Providers
          </h3>
          <h4 className="innr-title ">{subCategory?.name}</h4>
          <div className="row">
            {subCategory?.subCat?.map((item,key)=>
            <div className="col-lg-2" key={key}>
              <a href="javascript:void(0);">
                <div className="category-cards">
                  <img src="/assets/images/search-02.svg" alt="" />
                  <p>{item}</p>
                </div>
              </a>
            </div>)}
            
          </div>
        </div>
      </section>
      <section className="category-relations tp-space bg-white">
        <div className="container">
          <div className="union-shape-top">
            <img src="/assets/images/union.png" alt="" />
          </div>
          <div className="cards-bg" />
          <div className="custom-category">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="custom-category-img">
                  <img src="/assets/images/mission-img-01.png" alt="" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="custom-category-content">
                  <h3>Let Wizbizla Handle the Screening</h3>
                  <p className="fz-18">
                    Have someone in mind for accreditation screening? Let us take
                    care of it! Our process connects you with trustworthy service
                    providers.Or do you need help finding the right accredited
                    service provider? Save time with our expert assistance!
                  </p>
                  <p className="fz-18 clr">
                    Get in touch with us below, and we’ll help you find the perfect
                    match!
                  </p>
                  <div className="custom-category-btn">
                    <a href="javascript:void(0);" className="thm-btn">
                      Start My Screening
                    </a>
                    <a href="javascript:void(0);" className="thm-btn outline">
                      Get My Expert Help!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="union-shape-bttm">
            <img src="/assets/images/union-shape-03.png" alt="" />
          </div>
        </div>
      </section>
    </div>

  )
}

export default SubCategory
