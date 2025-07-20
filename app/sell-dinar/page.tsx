export default function SellDinar() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-4 animate-fade-in">
        Sell Iraqi Dinar & Zimbabwe Dollar
      </h1>
      <p className="mb-6 text-gray-700">
        Securely sell your IQD & ZWD to Australia's most trusted dealer. Get paid quickly via bank transfer—compliance guaranteed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {title:"Submit Details",desc:"Let us know what you'd like to sell."},
          {title:"ID Verification",desc:"Upload or email your photo ID."},
          {title:"Send Notes",desc:"Use express post with tracking for safety."}
        ].map((card,idx)=>(
          <div
            key={card.title}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
            style={{ animationDelay: `${idx * 120}ms` }}
          >
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>
      <ul className="text-gray-600 mb-6">
        <li>✔ Fast payout nationwide</li>
        <li>✔ ASIC & AUSTRAC regulated</li>
        <li>✔ Physical office in Melbourne</li>
        <li>✔ Friendly phone/email support</li>
      </ul>
      <a
        href="/contact"
        className="btn-primary block w-max hover:scale-105 transition-transform duration-200"
      >
        Start Selling Now
      </a>
    </section>
  );
}
