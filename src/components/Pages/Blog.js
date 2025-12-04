import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSecureApiData } from '../../services/api'
import { toast } from 'react-toastify'
import base_url from '../../baseUrl'

function Blog() {
  const [blogList, setBlogList] = useState([])
  const [featureBlog,setFeatureBlog]=useState([])
  const [categoryList, setCategoryList] = useState([])
  const [fQuery, setFQuery] = useState({ title: "", catId: "", date: "" })
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  const fetchBlog = async (page) => {
    try {
      const result = await getSecureApiData(`cms/blogs?page=${page}&limit=21&title=${fQuery.title}&catId=${fQuery.catId}&date=${fQuery.date}`)
      if (result.success) {
        setFeatureBlog(result.featureBlog)
        setBlogList(result.data)
        setPages(result.page);
        setTotalPages(result.totalPages);
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log("error fetch blogs", error);
    }
  }
  const fetchCategory = async (page) => {
    try {
      const result = await getSecureApiData(`cms/blog-category`)
      if (result.status) {
        setCategoryList(result.categoryData)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log("error fetch blogs", error);
    }
  }
  useEffect(() => {
    setTimeout(() => {

      fetchBlog()
    }, 800)
  }, [fQuery])
  useEffect(() => {
    fetchCategory()
  }, [])
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
      fetchBlog(page); // call your API
    }
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  return (
    <div className='newBnr'>
      <>
        <section className="reference-banner bloging-banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-70 col-md-7 col-sm-12">
                <h6>UAE News</h6>
                <h5>Blogging the&nbsp;Expat Experience</h5>
                <p>
                  Stay informed: Industry insights, expert interviews, scam alerts,
                  and essential resources
                </p>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12">
                <div className="custom-frm-bx">
                  <div className="banner-filter">
                    <div className="banner-filter-innr">
                      <input
                        type="text"
                        className="form-control"
                        id="search-filter"
                        name=""
                        placeholder="Email address"
                      />
                      <label htmlFor="" />
                      <button type="button">Search</button>
                    </div>
                    <p>We care about your data in our privacy policy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="blog-post-section">
          <div className="container">
            <div className="row">
              <h3 className="mb-3">Recent blog posts</h3>
              <Link to={`/blog-detail/${featureBlog[0]?.title}/${featureBlog[0]?._id}`} className={featureBlog.length == 1 ? "col-12" : "col-lg-6 col-md-6 col-sm-12"}>
                <div className="blog-post-crd">
                  <div className="blog-crd-img">
                    <img src={featureBlog[0]?.image ? `${base_url}/${featureBlog[0].image}` : "assets/images/post-first.jpg"} alt="" />
                  </div>
                  <div className="post-content mt-2">
                    <div className="post-shre-box">
                      <h3>{featureBlog[0]?.title} </h3>
                      <a href="javascript:void(0)">
                        <i className="fas fa-arrow-right" />
                      </a>
                    </div>
                    {/* <p>
                      How do you create compelling presentations that wow your
                      colleagues and impress your managers?
                    </p> */}
                  </div>
                </div>
              </Link>
              {featureBlog?.length > 1 && <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  <Link to={`/blog-detail/${featureBlog[1]?.title}/${featureBlog[1]?._id}`} className="col-lg-12 col-md-12 col-sm-12">
                    <div className="post-right-box d-flex gap-3 align-items-center justify-content-center">
                      <div className="post-right-pic">
                        <img src={featureBlog[1]?.image ? `${base_url}/${featureBlog[1].image}` : "assets/images/post-first.jpg"} alt="" />
                      </div>
                      <div className="post-right-content">
                        <h5>{featureBlog[1]?.title} </h5>
                        {/* <p>
                          Linear helps streamline software projects, sprints, tasks,
                          and bug tracking. Here’s how to get...
                        </p> */}
                      </div>
                    </div>
                  </Link>
                  <Link to={`/blog-detail/${featureBlog[2]?.title}/${featureBlog[2]?._id}`} className="col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="post-right-box d-flex gap-3  align-items-center justify-content-center">
                      <div className="post-right-pic">
                        <img src={featureBlog[2]?.image ? `${base_url}/${featureBlog[2].image}` : "assets/images/post-first.jpg"} alt="" />
                      </div>
                      <div className="post-right-content">
                        <h5>{featureBlog[1]?.title} </h5>
                        {/* <p>
                          Linear helps streamline software projects, sprints, tasks,
                          and bug tracking. Here’s how to get...
                        </p> */}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>}
            </div>
          </div>
        </section>
        <section className="post-all-section blog-post-section py-0">
          <div className="container">
            <div className="row">
              <h2>All blog posts</h2>
              <div to='/blog-detail' className="col-lg-4 col-md-4 col-sm-12">
                <div className="custom-frm-bx post-search-br postition-relative">
                  <input
                    type="text"
                    id=""
                    value={fQuery.title}
                    onChange={(e) => setFQuery({ ...fQuery, title: e.target.value })}
                    className="form-control"
                    placeholder="Search"
                  />
                  <a href="javascript:void(0)">
                    <i className="fas fa-search cht-search-icon" />
                  </a>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="row justify-content-end">
                  <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="custom-frm-bx option-size">
                      <select name="" id="" className="form-select" value={fQuery?.catId} onChange={(e)=>setFQuery({...fQuery,catId:e.target.value})}>
                        <option value="">Categories</option>
                        {categoryList?.length > 0 &&
                          categoryList?.map((item, key) => <option value={item?._id} key={key}>{item?.name}</option>)}
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="custom-frm-bx option-size">
                      <select name="" id="" className="form-select">
                        <option value="">Subject</option>
                        <option value="">Prestige Car Sourcing One</option>
                        <option value="">Prestige Car Sourcing Two</option>
                        <option value="">Prestige Car Sourcing Three</option>
                        <option value="">Prestige Car Sourcing Four</option>
                      </select>
                    </div>
                  </div> */}
                  <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="custom-frm-bx">
                      <input
                        type="date"
                        className="form-control"
                        placeholder=""
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row border-bottom pb-4">
              {blogList?.length > 0 &&
                blogList?.map((item, key) =>
                  <Link key={key} to={`/blog-detail/${item?.title}/${item?._id}`} className="col-lg-4 col-md-4 col-sm-12">
                    <div className="blog-post-crd">
                      <div className="blog-crd-img">
                        <img src={item?.image ? `${base_url}/${item?.image}` : "/assets/images/all-blog-post.jpg"} alt="" />
                      </div>
                      <div className="post-content mt-2">
                        <div className="post-shre-box">
                          <h3>{item?.title} </h3>
                          <a href="javascript:void(0)">
                            <i className="fas fa-arrow-right" />
                          </a>
                        </div>
                        {/* <div
                          dangerouslySetInnerHTML={{ __html: item?.description?.slice(0, 100) }}
                        ></div> */}
                      </div>
                    </div>
                  </Link>)}

              {/* <Link to='/blog-detail' className="col-lg-4 col-md-4 col-sm-12">
                <div className="blog-post-crd">
                  <div className="blog-crd-img">
                    <img src="assets/images/all-blog-post.jpg" alt="" />
                  </div>
                  <div className="post-content mt-2">
                    <div className="post-shre-box">
                      <h3>How collaboration makes us better designers </h3>
                      <a href="javascript:void(0)">
                        <i className="fas fa-arrow-right" />
                      </a>
                    </div>
                    <p>
                      Collaboration can make our teams stronger, and our individual
                      designs better.
                    </p>
                  </div>
                </div>
              </Link> */}
            </div>
            <div className="row py-4">
              <div className="col-lg-12">
                <div className="posting-histry-sec">

                  {/* Desktop Pagination */}
                  <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-desk-sec align-items-center">

                    {/* Previous */}
                    <div className="adver-prev">
                      <a onClick={prevPage} style={{ cursor: "pointer", opacity: page === 1 ? 0.5 : 1 }}>
                        <i className="fas fa-arrow-left" /> Previous
                      </a>
                    </div>
                    {/* Number Buttons */}
                    <div>
                      <ul className="adver-numbr-list">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <li key={i}>
                            <a
                              onClick={() => goToPage(i + 1)}
                              className={page === i + 1 ? "active" : ""}
                              style={{ cursor: "pointer" }}
                            >
                              {i + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Next */}
                    <div className="adver-next">
                      <a onClick={nextPage} style={{ cursor: "pointer", opacity: page === totalPages ? 0.5 : 1 }}>
                        Next <i className="fas fa-arrow-right" />
                      </a>
                    </div>
                  </div>

                  {/* Mobile Pagination */}
                  <div className="d-flex justify-content-between adver-pagi-sec adver-pagi-mob-sec d-none">
                    <div className="adver-prev">
                      <a onClick={prevPage} style={{ cursor: "pointer", opacity: page === 1 ? 0.5 : 1 }}>
                        <i className="fas fa-arrow-left" />
                      </a>
                    </div>

                    <div>
                      <ul className="adver-numbr-list">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <li key={i}>
                            <a
                              onClick={() => goToPage(i + 1)}
                              className={page === i + 1 ? "active" : ""}
                              style={{ cursor: "pointer" }}
                            >
                              {i + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="adver-next">
                      <a onClick={nextPage} style={{ cursor: "pointer", opacity: page === totalPages ? 0.5 : 1 }}>
                        <i className="fas fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </>

    </div>
  )
}

export default Blog
