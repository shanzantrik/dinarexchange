export default function Rates() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-4 animate-fade-in">
        Live Exchange Rates & Market Updates
      </h1>
      <p className="mb-8 text-gray-700">
        Check the latest rates for Iraqi Dinar (IQD) and Zimbabwe Dollar (ZWD). Rates updated daily. For large orders, call for a custom quote.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:scale-105 transition-transform duration-200">
          <h3 className="font-semibold mb-2">Iraqi Dinar (IQD)</h3>
          <p className="text-2xl text-yellow-600 font-bold">1,000,000 IQD ≈ $1200 AUD</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:scale-105 transition-transform duration-200">
          <h3 className="font-semibold mb-2">Zimbabwe Dollar (ZWD)</h3>
          <p className="text-2xl text-blue-600 font-bold">100 Trillion ZWD ≈ $500 AUD</p>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-3">Recent News</h2>
      <ul className="space-y-4">
        <li>
          <strong>[20 July 2025]</strong> - Dinar revaluation updates and gold-backed currency rumors.
        </li>
        <li>
          <strong>[01 July 2025]</strong> - Zimbabwe currency reforms—implications for collectors.
        </li>
      </ul>
    </section>
  );
}
