import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSecureApiData } from '../../services/api'
import base_url from '../../baseUrl'

function BlogDetail() {
  const params = useParams()
  const id = params.id
  const [relatedBlog,setRelatedBlog]=useState([])
  const [blogData, setBlogData] = useState({})
  const fetchCategory = async () => {
    try {
      const result = await getSecureApiData(`cms/blog-data/${id}`)
      if (result.success) {
        setBlogData(result.blog)
        setRelatedBlog(result.relatedBlog)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    if (id) {
      fetchCategory()
    }
  }, [id])
  const handleCopy = (link) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };
  return (
    <div className='newBnr'>
      <section className="blog-post-section blog-details-sections ">
        <div className="container">
          <div className="row">
            <div className="d-flex gap-3 bck-arrow-btn">
              <Link to="/blog" className="bck-pst-btn">
                <i className="fas fa-chevron-left" />
                Back
              </Link>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12">
              <div className="blog-post-crd">
                <div className="post-content mt-2">
                  <div className="post-shre-box">
                    <h3 className="pb-4">{blogData?.title} </h3>
                  </div>
                  {/* <p className="pb-4">
                Like to know the secrets of transforming a 2-14 team into a 3x
                Super Bowl winning Dynasty? Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="blog-post-crd">
                <div className="blog-crd-img blog-crd-full-img">
                  <img src={blogData?.image ? `${base_url}/${blogData.image}` : "assets/images/post-first.jpg"} alt="" />
                </div>
                <div className="d-flex justify-content-between align-items-center shre-post-dta mt-2">
                  <div>
                    <h5>Published on</h5>
                    <h6>
                      {blogData?.createdAt &&
                        new Date(blogData.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                    </h6>
                  </div>
                  <div className="shre-link-bx">
                    <button onClick={()=>handleCopy(`http://216.48.189.66:9758/blog-detail/${blogData.title}/${id}`)} className="shre-lnk">
                      <i className="fas fa-share-alt" />
                      Share link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="post-indro-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-12">
              <div className="post-intro-details">
                <div
                  dangerouslySetInnerHTML={{ __html: blogData?.description }}
                ></div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="subscribe-crd-bx">
                <div className="subscribe-crd-bx-content">
                  <div className="subscribe-right-bx">
                    <div className="subscribe-tp">
                      <div className="subscribe-tp-pic ">
                        <img src="/assets/images/blue_w.png" alt="" />
                      </div>
                      <div className="subscribe-tp-txt">
                        <h6>Subscribe today to</h6>
                        <h4>Minute with Wizbizla</h4>
                      </div>
                    </div>
                    <p>All the news you need in one minute or less</p>
                  </div>
                  <div className="bottom-subscribe-bx mt-3">
                    <h3>Monthly newsletter</h3>
                    <p>
                      No spam. Just the latest releases and tips, interesting
                      articles, and exclusive interviews in your inbox every month.
                    </p>
                    <div className="custom-frm-bx mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        defaultValue=""
                      />
                    </div>
                    <div className="d-flex gap-3 justify-content-center align-items-center subscri-btn">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-primary subscr-btn-nw"
                      >
                        Send
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="post-all-section blog-post-section blog-post-related py-0">
        <div className="container">
          <div className="row ">
            <h1 className="mb-3">Related Articles</h1>
            {relatedBlog?.length> 0 && 
            relatedBlog?.map((item,key)=>
            <Link key={key} to={`/blog-detail/${item?.title}/${item?._id}`} className="col-lg-4 col-md-4 col-sm-12">
              <div className="blog-post-crd">
                <div className="blog-crd-img">
                  <img src={item?.image? `${base_url}/${item?.image}` :"/assets/images/related.jpg"} alt="" />
                </div>
                <div className="post-content mt-2">
                  <div className="post-shre-box">
                    <h3>{item?.title} </h3>
                    <a href="javascript:void(0)">
                      <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                  {/* <p>
                    Collaboration can make our teams stronger, and our individual
                    designs better.
                  </p> */}
                </div>
              </div>
            </Link>)}
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="blog-post-crd">
                <div className="blog-crd-img">
                  <img src="/assets/images/laptop.jpg" alt="" />
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
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="blog-post-crd">
                <div className="blog-crd-img">
                  <img src="/assets/images/all-blog-post.jpg" alt="" />
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
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default BlogDetail
