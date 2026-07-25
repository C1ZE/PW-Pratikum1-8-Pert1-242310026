import React from "react"; 
 
export function TestimonSection() { 
  return ( 
    <section className="py-5"> 
      <div className="container"> 
        <div className="row mb-5"> 
          <div className="col"> 
            <h2 className="fw-bold text-center">Apa Kata Pembaca Kami</h2> 
            <p className="text-center text-muted"> 
              Bergabung bersama ribuan pecinta buku yang puas 
            </p> 
          </div> 
        </div> 
        <div className="row g-4"> 
          {user_testimonials.map((testimonial, index) => ( 
            <div key={index} className="col-md-4"> 
              <div className="card h-100 shadow-sm"> 
                <div className="card-body">
                    <div className="mb-3"> 
                    {[...Array(5)].map((_, i) => ( 
                      <i 
                        key={i} 
                        className={`bi bi-star${i < testimonial.rating ? "-fill" : ""} text-warning`} 
                      ></i> 
                    ))} 
                  </div> 
                  <p className="card-text mb-3">"{testimonial.review}"</p> 
                  <div className="d-flex align-items-center"> 
                    <div 
                      className="bg-info rounded-circle d-flex align-items-center justify-content-center" 
                      style={{ width: "50px", height: "50px" }} 
                    > 
                      <i 
                        className="bi bi-person-fill text-white" 
                        style={{ fontSize: "1.5rem" }} 
                      ></i> 
                    </div> 
                    <div className="ms-3"> 
                      <h6 className="mb-0">{testimonial.name}</h6> 
                      <small className="text-muted">Pembeli Terverifikasi</small> 
                    </div> 
                  </div> 
                </div> 
              </div> 
            </div> 
          ))} 
        </div> 
      </div> 
    </section> 
  ); 
}

const user_testimonials = [ 
    { 
      name: "Asep", 
      review: "Koleksinya luar biasa lengkap, semua buku favoritku ada di sini.", 
      rating: 5, 
    }, 
    { 
      name: "Surya", 
      review: "Pengirimannya cepat dan pelayanannya ramah, sangat direkomendasikan!", 
      rating: 5, 
    }, 
    { 
      name: "Bayu", 
      review: 
        "Harganya paling bersaing yang pernah aku temukan, pasti order lagi.", 
      rating: 4, 
    }, 
  ]