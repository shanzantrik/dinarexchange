# Dinar Exchange Australia

A comprehensive currency exchange platform for Iraqi Dinar and Zimbabwe Dollar transactions in Australia and New Zealand.

## Features

- **Buy Iraqi Dinar** - Complete cart and checkout system
- **Buy Zimbabwe Dollar** - Historical currency collection
- **Voice Assistant** - 24/7 AI-powered customer support
- **Trustpilot Integration** - Customer trust indicators
- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Beautiful animations and interactions

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Vapi AI** - Voice assistant integration
- **Headless UI** - Accessible components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dinarexchange
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:

```env
# Vapi AI Configuration
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key_here
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id_here

# Trustpilot Configuration (optional)
NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID=your_trustpilot_business_unit_id
```

### Vapi AI Setup

1. Sign up at [Vapi Console](https://console.vapi.ai/)
2. Create an API key
3. Create an assistant with your desired voice and personality
4. Add the API key and assistant ID to your `.env.local` file

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
dinarexchange/
├── app/                    # Next.js App Router pages
│   ├── buy-dinar/         # Iraqi Dinar purchase page
│   ├── buy-zim/           # Zimbabwe Dollar purchase page
│   ├── testimonials/      # Customer reviews page
│   ├── faq/              # Frequently asked questions
│   ├── resources/        # News and updates
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── VapiAgentModal.tsx    # Voice assistant modal
│   ├── VapiAgentButton.tsx   # Floating voice button
│   ├── TrustpilotWidget.tsx  # Trust indicators
│   └── Navbar.tsx           # Navigation component
├── public/               # Static assets
└── env.example          # Environment variables template
```

## Key Features

### Voice Assistant (Vapi AI)

- 24/7 AI-powered customer support
- Real-time voice conversations
- Transcript display
- Professional UI with animations

### Trustpilot Integration

- Customer trust indicators
- Star ratings display
- Professional branding
- Trust signals throughout the site

### E-commerce Functionality

- Product selection with pricing
- Comprehensive checkout forms
- Payment method options
- Order processing with email integration

### Responsive Design

- Mobile-first approach
- Beautiful animations
- Consistent branding
- Professional UI/UX

## Environment Variables

| Variable                                  | Description                 | Required |
| ----------------------------------------- | --------------------------- | -------- |
| `NEXT_PUBLIC_VAPI_API_KEY`                | Vapi AI API key             | Yes      |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID`           | Vapi AI Assistant ID        | Yes      |
| `NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID` | Trustpilot Business Unit ID | No       |

## Deployment

The application can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform.

### Vercel Deployment

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For support, please contact the development team or use the voice assistant feature on the website.
