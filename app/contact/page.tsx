export default function Contact() {
  return (
    <section className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-4 animate-fade-in">
        Contact Us
      </h1>
      <p className="mb-6 text-gray-700">
        Have a question or want to book an appointment? Call, email, or use the form below and our team will respond promptly.
      </p>
      <div className="bg-white rounded-xl shadow p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
        <div>
          <strong>Office:</strong> 106/797 Plenty Rd, South Morang, VIC 3752<br/>
          <strong>Phone:</strong> 1300 856 881 / 0417 460 236<br/>
          <strong>Email:</strong> <a href="mailto:dinars@dinarexchange.com.au" className="text-blue-600 hover:text-blue-800 transition-colors">dinars@dinarexchange.com.au</a>
        </div>
      </div>
      <form className="space-y-5">
        <input type="text" className="w-full border border-gray-300 rounded p-3 focus:border-blue-500 focus:outline-none transition-colors" placeholder="Name" required />
        <input type="email" className="w-full border border-gray-300 rounded p-3 focus:border-blue-500 focus:outline-none transition-colors" placeholder="Email" required />
        <textarea className="w-full border border-gray-300 rounded p-3 focus:border-blue-500 focus:outline-none transition-colors" rows={4} placeholder="Message" required />
        <button type="submit" className="btn-primary hover:scale-105 transition-transform duration-200">Send Message</button>
      </form>
    </section>
  );
}
