const MapSection = () => {
  const mapLink = "https://maps.app.goo.gl/mbo3GxwP3HYvn67F9";

  return (
    <section className="px-6 lg:px-20 py-14 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Clickable wrapper */}
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition"
        >
          <div className="w-full h-[420px] lg:h-[450px]">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps?q=Rise%20N%20Shine%20Coaching%20Narhe&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </a>

      </div>
    </section>
  );
};

export default MapSection;