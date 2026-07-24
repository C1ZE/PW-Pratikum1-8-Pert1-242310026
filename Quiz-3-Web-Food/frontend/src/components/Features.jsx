import React from "react";

const featureList = [
  { title: "Smart Kitchen", desc: "Otomasi penuh untuk rasa yang konsisten sempurna." },
  { title: "Eco-Packaging", desc: "100% ramah lingkungan tanpa plastik sekali pakai." },
  { title: "Drone Delivery", desc: "Pengantaran super cepat dalam radius 5km." },
];

function Features() {
  return (
    <section id="tech" className="features">
      <div className="container grid">
        {featureList.map((f) => (
          <div className="card" key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
