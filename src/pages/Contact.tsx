// pages/ContactPage.jsx
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('general');

  const contactTopics = [
    { id: 'general', label: 'General Inquiry', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'product', label: 'Product Information', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'order', label: 'Order Status', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'wholesale', label: 'Wholesale/Bulk Orders', icon: <Send className="w-5 h-5" /> },
    { id: 'returns', label: 'Returns & Refunds', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      details: ["+91 98765 43210", "+91 98765 43211"],
      description: "Available 9 AM - 7 PM, Monday to Saturday",
      color: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["support@pureearthorganics.com", "orders@pureearthorganics.com"],
      description: "Response within 24 hours",
      color: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Head Office",
      details: ["PureEarth Organics Ltd.", "Organic Valley, Sector 45", "Gurugram, Haryana - 122003"],
      description: "Visit by appointment only",
      color: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-600 dark:text-amber-400"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Saturday: 9 AM - 7 PM", "Sunday: 10 AM - 5 PM"],
      description: "Closed on National Holidays",
      color: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  const faqs = [
    {
      question: "What are your delivery timings?",
      answer: "We deliver across India within 3-7 business days. Metro cities usually receive orders within 2-3 days."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. We're working on expanding our international delivery options."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking link via SMS and email. You can also track it from your account dashboard."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy for unopened products. For any quality concerns, please contact us within 24 hours of delivery."
    },
    {
      question: "Are your products certified organic?",
      answer: "Yes, all our products are certified organic by USDA and India Organic. Certificates are available upon request."
    },
    {
      question: "Do you offer bulk/wholesale pricing?",
      answer: "Yes, we offer special pricing for bulk orders. Please contact our wholesale department for customized quotes."
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111811] dark:text-white transition-colors duration-200">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-900/90 to-emerald-900/90 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-primary/90 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              We're Here to Help
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Have questions about our organic products, orders, or partnerships? Our team is ready to assist you with personalized support.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Send us a Message</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              {/* Success Message */}
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-green-800 dark:text-green-300 font-medium">
                      Thank you! Your message has been sent successfully. We'll contact you soon.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Topic Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">What can we help you with?</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {contactTopics.map((topic) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          selectedTopic === topic.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        <div className={`mb-2 ${selectedTopic === topic.id ? 'text-primary' : 'text-gray-500'}`}>
                          {topic.icon}
                        </div>
                        <span className="text-xs font-medium text-center">{topic.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-primary hover:bg-[#0eb80e] text-white font-bold py-4 px-8 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`${info.color} rounded-2xl p-6 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-all`}
              >
                <div className={`${info.iconColor} mb-4`}>
                  {info.icon}
                </div>
                <h3 className="font-bold text-lg mb-3">{info.title}</h3>
                <div className="space-y-2 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 dark:text-gray-300">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start mb-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Map & Location */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Visit Our Store</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Experience the purity of our products firsthand at our flagship store in Gurugram. 
                  Our knowledgeable staff will guide you through our complete range of organic products.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Address</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Organic Valley, Sector 45, Gurugram<br />
                        Haryana - 122003, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Store Contact</h4>
                      <p className="text-gray-600 dark:text-gray-400">+91 98765 43212</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Store Hours</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Monday - Saturday: 10 AM - 8 PM<br />
                        Sunday: 11 AM - 6 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden h-64 lg:h-auto">
                {/* Google Maps Embed */}
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-gray-600 dark:to-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="font-bold">PureEarth Organics Store</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Organic Valley, Sector 45, Gurugram
                    </p>
                    <button className="mt-4 bg-primary hover:bg-[#0eb80e] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                      Get Directions
                    </button>
                  </div>
                </div>
                {/* In production, replace with actual Google Maps embed:
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.923445348855!2d77.071521!3d28.459556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18e8b3d3d4a1%3A0x1b8b5b5b5b5b5b5b!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;