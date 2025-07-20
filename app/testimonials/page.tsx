'use client';
import { useState, useEffect } from 'react';
import TrustpilotWidget from '../../components/TrustpilotWidget';

const testimonials = [
  {
    name: "Tara",
    date: "July 18, 2025",
    rating: 5,
    review: "I just had my first interactions with Dinar Exchange. Karla was so very helpful and kind. I will add to this after I receive my first order, but if you have any questions call the number and ask for Karla. She explains the process so well. I am not an investor, in my mid fifties so have some catching up to do. Thank you so much Dinar exchange team, and a huge should out to Karla",
    source: "ProductReview.com.au"
  },
  {
    name: "James M.",
    date: "June 26, 2025",
    rating: 5,
    review: "Prompt reply and good product and service. Neil was great to work.",
    source: "ProductReview.com.au"
  },
  {
    name: "Lesley B.",
    date: "June 25, 2025",
    rating: 5,
    review: "I have been using Dinar Exchange for over 4yrs, never had a problem, very professional. Very trustworthy.",
    source: "Google"
  },
  {
    name: "David",
    date: "May 9, 2025",
    rating: 5,
    review: "Great company to deal with never let me down on my orders and always answer the phone or email when I need them",
    source: "ProductReview.com.au"
  },
  {
    name: "rod m.",
    date: "April 19, 2025",
    rating: 5,
    review: "Very profesional team to deal with . highly recomend Dinar Exchange to anyone looking at buying or selling these curencies , extreamly happy with the service i recieved , keep up the good work, cheers Rod",
    source: "ProductReview.com.au"
  },
  {
    name: "Mike P.",
    date: "April 9, 2025",
    rating: 5,
    review: "Excellent service will deal with again. Kept me informed every step of the way",
    source: "ProductReview.com.au"
  },
  {
    name: "Rachel C.",
    date: "April 7, 2025",
    rating: 5,
    review: "Really appreciate all the support I have received from Dinar exchange ... a great and caring team .. thanks for your ongoing support...highly recommended.",
    source: "ProductReview.com.au"
  },
  {
    name: "Greg",
    date: "March 31, 2025",
    rating: 5,
    review: "very happy with the service Thank you Dinar Exchange I highly recommend if you are looking to purchase Iraqi dinar in Australia",
    source: "ProductReview.com.au"
  },
  {
    name: "Gillian",
    date: "March 26, 2025",
    rating: 5,
    review: "Hi I'm based in New Zealand and this is my second order for Iraqi Dinar that I have placed through Dinar Exchange. I find them all to be incredibly helpful, talking me through the process. Couldn't recommend them highly enough!",
    source: "ProductReview.com.au"
  },
  {
    name: "Lesley",
    date: "March 19, 2025",
    rating: 5,
    review: "I've been a customer of Dinar Exchange for approx. 8 or 9 years and my experience has consistently been positive. Over the years, my dealings with Dinar Exchange have been smooth and reliable. The customer service team at Dinar Exchange has been excellent. They are responsive and professional, always ready to assist with any queries or issues. Transactions with Dinar Exchange are straightforward and hassle-free. Whether in person or online, the process is quick and efficient, saving me time and effort Throughout these years, Dinar Exchange has proven trustworthy and reliable. I've never faced any issues, which speaks volumes about their professionalism and integrity. They have consistently provided a service that I can rely on. \"I confidently recommend Dinar Exchange to anyone searching for a dependable and reliable currency exchange provider.\"",
    source: "ProductReview.com.au"
  },
  {
    name: "Aastha",
    date: "March 15, 2025",
    rating: 5,
    review: "Great service and very professional. I would definitely use their services in the future. Thanks Aastha",
    source: "ProductReview.com.au"
  },
  {
    name: "Robert C.",
    date: "March 14, 2025",
    rating: 5,
    review: "Easy to deal with ,fast and reliable service Have used twice now",
    source: "ProductReview.com.au"
  },
  {
    name: "S H.",
    date: "March 14, 2025",
    rating: 5,
    review: "Great service and product. Have bought from them a few times and would highly recommend them.",
    source: "ProductReview.com.au"
  },
  {
    name: "Maxine",
    date: "March 14, 2025",
    rating: 5,
    review: "I highly recommend the Dinar exchange. They were so easy to deal with. Professional, very respectful, answered any questions I had speedily. Thank you The Dinar Exchange.",
    source: "ProductReview.com.au"
  },
  {
    name: "Ben L.",
    date: "March 14, 2025",
    rating: 5,
    review: "Amazing packaging no matter how small or how large the amounts are, they make sure the package doesn't stand out in a Registered post tracking fashion. It does take time due to it come from overseas. Its like waiting for the RV. Just Be Patient. Not endorsed by D.E, just a happy buyer. Residing in WA Well done D.E & Thankyou",
    source: "ProductReview.com.au"
  },
  {
    name: "Mike P.",
    date: "March 14, 2025",
    rating: 5,
    review: "Excellent service, kept me informed through the whole process. Will use again.",
    source: "ProductReview.com.au"
  },
  {
    name: "Dom",
    date: "March 14, 2025",
    rating: 5,
    review: "Fantastic professional service. Most importantly they answer the phones and call back. Refreshing to see this day and age",
    source: "ProductReview.com.au"
  },
  {
    name: "Laurine W.",
    date: "March 14, 2025",
    rating: 5,
    review: "I have purchased from Dinar Exchange Australia many times over the past 4 years and have always found them great to deal with. I highly recommend this company",
    source: "ProductReview.com.au"
  },
  {
    name: "Aaron",
    date: "March 14, 2025",
    rating: 5,
    review: "They performed my order perfectly and in a timely manner. Thank you",
    source: "ProductReview.com.au"
  },
  {
    name: "SUNs a.",
    date: "March 13, 2025",
    rating: 5,
    review: "I'm VERY VERY HAPPY dealing with Dinar Exchange. They have the BEST RATES OUT. I have been buying my Iraqi Dinars here for some time. I consider the staff my friends they have given me GREAT SUPPORT AND HELP. The staff at other exchanges treat you like a customer, BUT HERE I get treated like a friend. If ONLY OTHER BUSINESSES treated me like the friendly staff do here, the world would be a better place. Try IRAQI DINAR their service is 1ST TO NO-ONE ELSE……. And don't forget they have the best rates.",
    source: "ProductReview.com.au"
  },
  {
    name: "Tanya w.",
    date: "March 13, 2025",
    rating: 5,
    review: "Highly recommend, easy transaction, professional. Would deal with them again",
    source: "ProductReview.com.au"
  },
  {
    name: "Jennifer W.",
    date: "March 13, 2025",
    rating: 5,
    review: "Fantastic to deal with very helpful and fast at responding to my questions.",
    source: "ProductReview.com.au"
  },
  {
    name: "Troy F.",
    date: "March 13, 2025",
    rating: 5,
    review: "I first placed a small initial order for Iraqi Dinar to test out the company and the authenticity of the notes. That was my #1 criteria. I received them in a few days. Everything was as expected and the notes were 100% authentic. Since then I have placed many more orders as funds became available. Each time they turned up the following week. One order was delayed, however they called me ahead of time to inform me that there would be a short delay as their shipment had arrived yet. That's reassuring and good customer service. Highly recommend them.",
    source: "ProductReview.com.au"
  },
  {
    name: "Frederik V.",
    date: "March 12, 2025",
    rating: 5,
    review: "The service is first rate,and personal,very helpful on all levels,simply professional,with no fuss and if something needs addressing or a detail was omitted ,it is rectified fast and efficiently, Highly recommend this organisation",
    source: "ProductReview.com.au"
  },
  {
    name: "Fiona J",
    date: "March 6, 2025",
    rating: 5,
    review: "Great people to deal with. Very helpful, very efficient and professional. Thanks Dinar Exchange.",
    source: "Google"
  },
  {
    name: "Beverley C.",
    date: "March 6, 2025",
    rating: 5,
    review: "Courteous and helpful staff. Thorough follow-up. Safe delivery of purchases. No complaints at all, just praise.",
    source: "Google"
  },
  {
    name: "Craig L.",
    date: "March 6, 2025",
    rating: 5,
    review: "2nd time using Dinar Exchange. Quick process, quick deliveries, A+ communication.",
    source: "Google"
  },
  {
    name: "Micky F.",
    date: "February 27, 2025",
    rating: 5,
    review: "Prompt polite service!",
    source: "Google"
  },
  {
    name: "Dennis B.",
    date: "February 27, 2025",
    rating: 5,
    review: "Great service",
    source: "Google"
  },
  {
    name: "Jane D.",
    date: "February 27, 2025",
    rating: 5,
    review: "Wonderful personalised service, thank you",
    source: "Google"
  },
  {
    name: "Ben L",
    date: "February 20, 2025",
    rating: 5,
    review: "Repeat customer, all authentic & delivered safetly, takes some time to deliver but worth the wait, sit back and be patient. bought in bulk and even recieved a surprise gift, totally took me off guard lol Plan to be buying more in the future & will only be buying from Dinar exchange. Thanks guys appreciate the Transparency",
    source: "Google"
  },
  {
    name: "Karawini W.",
    date: "February 20, 2025",
    rating: 5,
    review: "What a great service Dinar Exchange provides. They went above and beyond to help with my first purchase. Can highly recommend them to do business with. Big thank you to Russel.",
    source: "Google"
  },
  {
    name: "Patina R.",
    date: "February 20, 2025",
    rating: 5,
    review: "Great to deal with and got my Dinar in no time at all. Thank you",
    source: "Google"
  },
  {
    name: "John S.",
    date: "February 20, 2025",
    rating: 5,
    review: "Great service here in Aust, now lets get a RV 😀😀",
    source: "Google"
  },
  {
    name: "Sigma T.",
    date: "February 20, 2025",
    rating: 5,
    review: "I've had multiple dealings with Dinar Exchange Australia & every time they've been a pleasure to deal with & highly professional. I can vouch for their integrity & you should have no hesitation proceeding with any business with this enterprise. I'm very relieved there's a business operating in Australia where I can safely participate in this investment opportunity without me having sleepless nights wondering if my order will be delivered.",
    source: "Google"
  },
  {
    name: "Saving B.",
    date: "February 20, 2025",
    rating: 5,
    review: "The team are always very helpful and professional in dealing with any questions I may have.👍",
    source: "Google"
  },
  {
    name: "Craig C.",
    date: "February 20, 2025",
    rating: 5,
    review: "Great service, quick delivery, friendly and helpful customer service.",
    source: "Google"
  },
  {
    name: "Sienna H.",
    date: "March 20, 2024",
    rating: 5,
    review: "Top-notch service for Iraqi dinar exchange at Dinar Exchange. Smooth and trustworthy.",
    source: "Google"
  },
  {
    name: "Melikhaya G.",
    date: "March 20, 2024",
    rating: 5,
    review: "Dinar Exchange values its customers and offers competitive rates for Iraqi dinar exchange. Excellent service.",
    source: "Google"
  },
  {
    name: "Grant A.",
    date: "March 20, 2024",
    rating: 5,
    review: "Dinar Exchange is a reliable partner for Iraqi dinar exchange. Quick and secure transactions every time.",
    source: "Google"
  },
  {
    name: "kure m.",
    date: "March 20, 2024",
    rating: 5,
    review: "If you need Iraqi dinar exchange services, Dinar Exchange is the place to go. They are efficient and reliable.",
    source: "Google"
  },
  {
    name: "steve00o",
    date: "March 20, 2022",
    rating: 5,
    review: "I have dealt with Dinar Exchange on numerous occasions now. Very trust worthy and professional. Highly recommended.",
    source: "Google"
  },
  {
    name: "Hendrik H.",
    date: "March 20, 2022",
    rating: 5,
    review: "I have been dealing with Dinar Exchange for 6.5 years and recommended hundreds of people to purchase Iraqi Dinars who have been satisfied and very happy with all aspects of their transactions. Staff have been so helpful and friendly. You will not be disappointed. Hendrik HENDRIKSE",
    source: "Google"
  },
  {
    name: "Steve G",
    date: "March 20, 2022",
    rating: 5,
    review: "Transaction went without any issues, highly recommend Dinar exchange to anyone looking at doing business with them. No stress on the purchasing side. Thanks again.",
    source: "Google"
  },
  {
    name: "Sabine L.",
    date: "March 20, 2022",
    rating: 5,
    review: "Great customer service. Products arrived as described.",
    source: "Google"
  },
  {
    name: "Karen S.",
    date: "March 20, 2022",
    rating: 5,
    review: "I have bought 3 lots of currency from Dinar Exchange and have always found them helpful, polite, and professional, and they immediately send me confirmations and.when mailed, an AusPost tracking number. I can totally recommend them. Karen Spencer",
    source: "Google"
  },
  {
    name: "Maya M.",
    date: "March 20, 2022",
    rating: 5,
    review: "Always great experience and most importantly confidence in the whole process! Service is absolutely amazing, especially Sonya that communicates no matter what the time it is, and what I might need and also Sherlyn. They are all very professional and quick! They also give you a call once Your notes have been shipped ! I would have give them 7stars Review if I could! Shop with confidence and fairness 🌟🌟🌟🌟🌟🌟🌟Thank you ladies so much ! I appreciate you! Great service as Always!!!",
    source: "Google"
  },
  {
    name: "Bill R.",
    date: "March 20, 2022",
    rating: 5,
    review: "Prompt service. Very helpful on request that I have made. Communications have been 1st Class. Thank you. Bill Ryan.",
    source: "Google"
  },
  {
    name: "Shelley M.",
    date: "March 20, 2022",
    rating: 5,
    review: "Great service, Great prices and speedy delivery. I had a few issues as i use a building society but the lovely customer service lady on Dinar exchange was more than happy to help me out. It is so nice to talk to a real human nowadays and not just a voice recording. I am on my second order now and i feel very confident using Dinar exchange. I highly recommend",
    source: "Google"
  },
  {
    name: "Edwina G.",
    date: "March 20, 2021",
    rating: 5,
    review: "I have known about dinar exchange for a few years and I am very happy with there service. They are very professional and trustworthy.",
    source: "Google"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Customer Testimonials
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            What Our Customers Say About Us
          </p>

          {/* Trustpilot Widget */}
          <div className="mb-8">
            <TrustpilotWidget className="inline-block" />
          </div>
        </div>
      </section>

      {/* Overall Rating Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Overall Rating</h2>
            <div className="text-6xl font-bold text-blue-600 mb-4">4.8</div>
            <div className="flex justify-center mb-4">
              <StarRating rating={5} />
            </div>
            <p className="text-lg text-gray-600 mb-2">Based On Real "Verified Client Reviews"</p>
            <p className="text-sm text-gray-500">Over {testimonials.length} verified customer reviews</p>
          </div>
        </div>
      </section>

      {/* Testimonial Slider */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative max-w-4xl mx-auto">
            {/* Main Testimonial */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-600">{testimonials[currentIndex].date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <StarRating rating={testimonials[currentIndex].rating} />
                  <span className="text-sm text-gray-500">({testimonials[currentIndex].source})</span>
                </div>
              </div>
              <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                "{testimonials[currentIndex].review}"
              </blockquote>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <button
                onClick={prevTestimonial}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isAutoPlaying
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isAutoPlaying ? 'Pause' : 'Play'} Auto
              </button>

              <button
                onClick={nextTestimonial}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mb-8">
              {testimonials.slice(0, 20).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Counter */}
            <div className="text-center text-gray-600">
              {currentIndex + 1} of {testimonials.length} testimonials
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">All Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.date}</p>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>
                <blockquote className="text-gray-700 text-sm leading-relaxed mb-3">
                  "{testimonial.review.length > 150
                    ? testimonial.review.substring(0, 150) + '...'
                    : testimonial.review}"
                </blockquote>
                <div className="text-xs text-gray-500">{testimonial.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Satisfied Customers</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the same level of service that our customers rave about
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/buy-dinar"
              className="bg-white text-emerald-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Buy Iraqi Dinar
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-emerald-600 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
