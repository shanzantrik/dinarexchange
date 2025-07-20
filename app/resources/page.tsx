'use client';
import { useState, useMemo } from 'react';

const articles = [
  {
    id: 1,
    date: "03 June",
    title: "📉 IMF Warns of 1.5% Economic Contraction in Iraq for 2025 — Is IQD Revaluation Becoming a Necessity?",
    category: "Economic Analysis",
    featured: true,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    date: "28 February",
    title: "The Benefits of Regulating the Iraqi Dinar (IQD): A Path to Economic Stability and Growth",
    category: "Policy & Regulation",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    date: "25 February",
    title: "How to Exchange Iraqi Dinar: Best Practices for Travelers and Investors",
    category: "Trading Guide",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    date: "19 February",
    title: "Iraq Currency Exchange: Best Practices for Safe and Legal Transactions",
    category: "Trading Guide",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=400&fit=crop"
  },
  {
    id: 5,
    date: "10 February",
    title: "The Future of the Iraqi Dinar: How Digital Banking Innovations Are Changing the Game",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop"
  },
  {
    id: 6,
    date: "04 February",
    title: "How Regional Conflicts Are Shaking Up the Iraqi Dinar – What Investors Need to Know",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
  },
  {
    id: 7,
    date: "16 September",
    title: "IQD Update: Over 77 Trillion Iraqi Dinars in Revenue, Oil Dominance Continues",
    category: "Market Update",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
  },
  {
    id: 8,
    date: "04 September",
    title: "IQD Update: Iraqi Dinar Stands Firm as Iraq Sustains B-/B Credit Rating and Strong Foreign Currency Reserves",
    category: "Market Update",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 9,
    date: "04 September",
    title: "Latest IQD Update: Iraqi Banks' Role in International Transfers Expanded - What It Means for the Iraqi Dinar",
    category: "Banking",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 10,
    date: "03 September",
    title: "Iraqi Dinar News Update: Feasibility of Using Dinar Instead of Dollar for Oil Sales",
    category: "Oil & Energy",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
  },
  {
    id: 11,
    date: "02 September",
    title: "Iraqi Dinar Value: Understanding Its Past, Present, and Future",
    category: "Historical Analysis",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=400&fit=crop"
  },
  {
    id: 12,
    date: "30 August",
    title: "Iraqi Dinar Update: Is the New NATO-Iraq Partnership a Turning Point for Economic Stability and the Iraqi Dinar?",
    category: "International Relations",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 13,
    date: "28 August",
    title: "Iraqi Dinar News: Could Changes in Dollar Restrictions Revitalize the Iraqi Dinar Market?",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 14,
    date: "28 August",
    title: "Iraqi Dinar News: What Do Iraq's Latest Oil and Gas Contracts Mean for the Iraqi Dinar?",
    category: "Oil & Energy",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
  },
  {
    id: 15,
    date: "27 August",
    title: "Iraqi Dinar Update: Will Iraq Introduce New Paper Currency Soon?",
    category: "Currency News",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=400&fit=crop"
  },
  {
    id: 16,
    date: "26 August",
    title: "Iraqi Dinar News Update: What's Next for the Iraqi Dinar as Iraq and America Set to Resume Banking Negotiations?",
    category: "Banking",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 17,
    date: "23 August",
    title: "How Significant Is Al-Alaq's NY Mission in Shifting Oil Sales from the Dollar to the Iraqi Dinar?",
    category: "Oil & Energy",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
  },
  {
    id: 18,
    date: "22 August",
    title: "Iraqi Dinar News Update: Upcoming CBI Governor's Visit: Could the Iraqi Dinar See a Surge in Value?",
    category: "Central Bank",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 19,
    date: "16 August",
    title: "Iraqi Dinar News Update: Is the Iraqi Dinar Gaining Strength Against the US Dollar?",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 20,
    date: "15 August",
    title: "Iraqi Dinar News (IQD Update)- Potential Growth Amid Central Bank Reforms and Anti-Corruption Efforts",
    category: "Central Bank",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 21,
    date: "14 August",
    title: "Could the Serbian Invitation to Iraqi PM Boost the Iraqi Dinar? Details on the Bilateral Talks",
    category: "International Relations",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 22,
    date: "13 August",
    title: "Will a Managed Float Approach Impact the Iraqi Dinar's Value Against the Dollar?",
    category: "Economic Policy",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 23,
    date: "12 August",
    title: "The Rising Potential of the Iraqi Dinar in Global Markets",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 24,
    date: "08 August",
    title: "Turning Crisis into Opportunity: Iraqi Dinar Eyes Recovery After Central Bank Governor's Strategic Resignation",
    category: "Central Bank",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 25,
    date: "07 August",
    title: "US Treasury Intensifies Oversight of Iraqi Dinar Transactions to Combat Money Laundering",
    category: "Regulation",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 26,
    date: "06 August",
    title: "Iraqi PM Announces 5 Year Development Plan : A New Horizon for the Iraqi Dinar",
    category: "Economic Policy",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 27,
    date: "05 August",
    title: "Iraqi Dinar's Future Bright as Iraq Returns to WTO Accession Talks After 16 Years",
    category: "International Trade",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 28,
    date: "02 August",
    title: "Bright Prospects for the Iraqi Dinar Amidst Currency Stabilization",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 29,
    date: "01 August",
    title: "Uplift in Iraqi Economy Signals Potential Rise in Dinar Value",
    category: "Economic Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 30,
    date: "30 July",
    title: "Iraqi Dinar Sees Potential for Increase Amid U.S. Treasury Talks",
    category: "US Relations",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 31,
    date: "29 July",
    title: "Iran's Exchange Rates Released, Iraqi Dinar Sees Positive Change Compared to Previous Day",
    category: "Regional Markets",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 32,
    date: "18 July",
    title: "Iraqi Dinar Investors Maintain Optimism: A Glimmer of Hope with Trump's Insights",
    category: "Political Analysis",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 33,
    date: "17 July",
    title: "Iraqi Dinar Sees Positive Shift as PM Al-Sudani and Currency Exchange Firms Reach Crucial Agreement",
    category: "Government Policy",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 34,
    date: "16 July",
    title: "Iraqi Dinar Remains Stable Amid US Dollar Exchange Fluctuations, Assures Iraqi PM's Financial Advisor",
    category: "Market Stability",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 35,
    date: "10 July",
    title: "Will Iraq's Continued Upper-Middle-Income Status Boost the Iraqi Dinar?",
    category: "Economic Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 36,
    date: "02 July",
    title: "Understanding the Impact of Dual Exchange Rates on Iraq's Anti-Corruption Drive",
    category: "Economic Policy",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 37,
    date: "02 July",
    title: "Could the Recent US Summit Be the Catalyst for Strengthening the Iraqi Dinar in Kurdistan and Beyond?",
    category: "US Relations",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 38,
    date: "28 June",
    title: "Could This Be the Turning Point for the Iraqi Dinar? Unveiling IBBC Webinar Findings",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 39,
    date: "26 June",
    title: "The Iraqi Parliament's 2024 Budget Approval: A New Hope for the Dinar?",
    category: "Government Policy",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 40,
    date: "11 June",
    title: "Iraqi Dinar Surpasses Dollar in Baghdad and Erbil Markets",
    category: "Market Update",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 41,
    date: "10 June",
    title: "Unfreezing Iraqi Funds - A Step Towards Dinar Value Increase?",
    category: "Financial Policy",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 42,
    date: "10 June",
    title: "The Iraqi Parliament's 2024 Budget Approval: A New Hope for the Dinar?",
    category: "Government Policy",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 43,
    date: "03 June",
    title: "Major New Developments in the De-Dollarization of Iraq and Impact on Dinar Value",
    category: "De-Dollarization",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 44,
    date: "29 May",
    title: "Iraq: A Rising Star in the Fight against Money Laundering and Terrorist Financing",
    category: "Compliance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 45,
    date: "28 May",
    title: "Iraq Embarks on a New Era of Industrial Support with Loan Incentives: Will The Loan Program Impact the Dinar?",
    category: "Economic Policy",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 46,
    date: "27 May",
    title: "Potential Surge in the Iraqi Dinar: Insights and Indicators",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 47,
    date: "24 May",
    title: "Could the Iraq Currency See a Value Increase Amid Controversies in the Dollar Auction System?",
    category: "Banking",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 48,
    date: "23 May",
    title: "Can the Iraqi Dinar Navigate Through Currency Volatility and Black Market Influence?",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 49,
    date: "20 May",
    title: "Iraqi Dinar: Poised for a Positive Shift Amid Banking Sector Developments?",
    category: "Banking",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 50,
    date: "15 May",
    title: "Strengthening Financial Infrastructure: IDB's New Chapter in Erbil",
    category: "Banking",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 51,
    date: "13 May",
    title: "Iraq in Conversations with IMF and World Bank for Enhanced Fiscal Support",
    category: "International Finance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 52,
    date: "10 May",
    title: "The Debate Over the Future of the Iraqi Dinar: Economic Strategy or Risk?",
    category: "Economic Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 53,
    date: "07 May",
    title: "Speculation Rises on the Future of Iraqi Dinar Under Prime Minister Sudani's Economic Policies",
    category: "Political Analysis",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 54,
    date: "02 May",
    title: "Will the Central Bank Agreement with the US Treasury Revolutionize the Dinar Value?",
    category: "Central Bank",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 55,
    date: "30 April",
    title: "Iraq's Pursuit of Banking Sector Reform and Its Potential Influence on the Dinar Value",
    category: "Banking",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 56,
    date: "29 April",
    title: "Iraqi Dinar: A Rising Force in the World Economy?",
    category: "Global Markets",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 57,
    date: "26 April",
    title: "Exploring the Potential Rise in the Iraqi Dinar Value",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 58,
    date: "25 April",
    title: "Iraqi Dinar Update: Could the Iraqi Dinar Value See a Rise?",
    category: "Market Update",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 59,
    date: "23 April",
    title: "Could the Iraqi Dinar's Value Change Soon?",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 60,
    date: "22 April",
    title: "Anticipation Builds Over Potential Increases in Iraqi Dinar Value",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 61,
    date: "04 April",
    title: "Does Australia's Shift Away From Cash Impact Iraqi Dinar Exchange Dynamics?",
    category: "Regional Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 62,
    date: "03 April",
    title: "Central Bank Vows to Propel Building Sector with Dinar Loans, Iraqi Committee Reveals",
    category: "Central Bank",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 63,
    date: "02 April",
    title: "GAZA Ceasefire, Ramadan, EID And Their Impact On The Iraqi Dinar Revaluation",
    category: "Regional Analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 64,
    date: "01 April",
    title: "USD Value Depreciates Rapidly Against Iraqi Dinar by Over 3,000 IQD In Kurdistan",
    category: "Market Update",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 65,
    date: "27 March",
    title: "US Federal Reserve Gives Green Light to Dollar Cash for Dinar Revaluation",
    category: "Federal Reserve",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 66,
    date: "26 March",
    title: "Central Bank Announces Measures for Ensuring Iraqi Dinar Stability Against Global Currencies",
    category: "Central Bank",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 67,
    date: "25 March",
    title: "Iraqi Dinar Gains Strength Against US Dollar in Recent Baghdad & Erbil Exchange Rates",
    category: "Market Update",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  },
  {
    id: 68,
    date: "22 March",
    title: "Iraqi Government Embarks on Bold Strategy, Raising Dinar Value to Safeguard Citizens' Purchasing Power",
    category: "Government Policy",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 69,
    date: "20 March",
    title: "Iraqi Central Bank Governor Unveils Plans to Elevate Dinar Value Through Strategic Partnerships",
    category: "Central Bank",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
  },
  {
    id: 70,
    date: "18 March",
    title: "How Much Is Iraqi Dinar Worth?",
    category: "Educational",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=400&fit=crop"
  },
  {
    id: 71,
    date: "14 March",
    title: "What Is Iraq's Currency?",
    category: "Educational",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=400&fit=crop"
  },
  {
    id: 72,
    date: "03 June",
    title: "Iraq Exports in May Close to a High Record",
    category: "Trade & Exports",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
  }
];

const categories = [
  "All",
  "Market Analysis",
  "Economic Analysis",
  "Central Bank",
  "Government Policy",
  "Banking",
  "Oil & Energy",
  "International Relations",
  "US Relations",
  "Economic Policy",
  "Market Update",
  "Trading Guide",
  "Technology",
  "Historical Analysis",
  "Currency News",
  "De-Dollarization",
  "Compliance",
  "International Finance",
  "Political Analysis",
  "Global Markets",
  "Regional Analysis",
  "Federal Reserve",
  "Market Stability",
  "Financial Policy",
  "Regional Markets",
  "International Trade",
  "Policy & Regulation",
  "Trade & Exports",
  "Educational"
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Sort articles
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date + ' 2024').getTime() - new Date(a.date + ' 2024').getTime();
      }
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const featuredArticle = articles.find(article => article.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Iraqi Dinar Resources
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Latest News, Analysis & Market Updates
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "400ms" }}>
            Stay informed with comprehensive coverage of Iraqi Dinar developments, economic analysis, and market insights from trusted sources.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing {filteredArticles.length} of {articles.length} articles
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && selectedCategory === 'All' && !searchTerm && (
        <section className="py-12 px-6 bg-gradient-to-r from-blue-50 to-emerald-50">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Article</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 md:h-80">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                    <span className="text-white/90">{featuredArticle.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{featuredArticle.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredArticle.category}
                    </span>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-48">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/60 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {article.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-3">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-500">Latest Update</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200">
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest Iraqi Dinar news and market updates delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-emerald-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
