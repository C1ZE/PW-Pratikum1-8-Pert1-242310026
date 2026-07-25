export function FeaturesSection() {
    return (
        <section id="books" className="py-5">
            <div className="container">
                <div className="row mb-5">
                    <div className="col">
                        <h2 className="fw-bold text-center">Rekomendasi Bacaan</h2>
                        <p className="text-center text-muted">Pilihan terbaik minggu ini, dipilih khusus untuk kamu.</p>
                    </div>
                </div>
                <div className="row g-4">
                    {ListBooks.map((book) => (
                        <div key={book.id} className="col-md-6 col-lg-4">
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const ListBooks = [
    {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        img: "harpot.jpg",
        author: "J.K. Rowling",
        is_free: false,
        sinopsis: "Harry Potter is a wizard, and he's going to Hogwarts School of Witchcraft and Wizardry.",
        rating: 4.5,
        views: 1000
    },
    {
        id: 2,
        title: "Hunger Games",
        img: "hg.jpg",
        author: "Suzanne Collins",
        is_free: false,
        sinopsis: "In a dystopian future, teenagers are forced to compete in a televised battle to the death.",
        rating: 4.9,
        views: 2000
    },
    {
        id: 3,
        title: "Maze Runner",
        img: "maze.jpeg",
        author: "James Dashner",
        is_free: false,
        sinopsis: "In a dystopian future, teenagers are forced to compete in a televised battle to the death.",
        rating: 4.7,
        views: 500
    },
    {
        id: 4,
        title: "Divergent",
        img: "divergent.jpeg",
        author: "Veronica Roth",
        is_free: false,
        sinopsis: "In a dystopian future, teenagers are forced to compete in a televised battle to the death.",
        rating: 3.7,
        views: 300
    },
    {
        id: 5,
        title: "1984",
        img: "nineteeneightyfour.jpg",
        author: "George Orwell",
        is_free: true,
        sinopsis: "A dystopian novel about a totalitarian regime that watches its citizens' every move.",
        rating: 4.8,
        views: 1500
    },
    {
        id: 6,
        title: "The Hobbit",
        img: "thehobbit.jpg",
        author: "J.R.R. Tolkien",
        is_free: false,
        sinopsis: "A reluctant hobbit sets out on an unexpected journey to help reclaim a treasure guarded by a dragon.",
        rating: 4.6,
        views: 800
    },
]

const BookCard = ({ book }) => {
  const { title, author, rating, img } = book;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`bi bi-star${i < Math.floor(rating) ? "-fill" : ""} text-info`}
      ></i>
    ));
  };

  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body text-center">
        <div className="bg-light p-3 mb-3 rounded overflow-hidden" style={{ height: "220px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {img ? (
            <img
              src={`/books-images/${img}`}
              alt={title}
              className="img-fluid rounded"
              style={{ maxHeight: "210px", objectFit: "cover" }}
            />
          ) : (
            <i
              className="bi bi-book-half"
              style={{ fontSize: "4rem", color: "#6c757d" }}
            ></i>
          )}
        </div>
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="text-muted small mb-2">oleh {author}</p>
        <div className="mb-2">
          {renderStars(rating)}
          <span className="ms-2 text-muted small">({rating})</span>
        </div>
      </div>
    </div>
  );
};
