const Skeleton = () => {
  return (
    <div className="d-flex flex-column gap-3 py-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="placeholder-glow">
          <span className="placeholder col-12" style={{ height: "48px", borderRadius: "8px" }}></span>
        </div>
      ))}
    </div>
  );
};

export { Skeleton };
