import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mumbai cities/areas list
  const mumbaiAreas = [
    "Andheri", "Bandra", "Borivali", "Colaba", "Dadar",
    "Dharavi", "Goregaon", "Juhu", "Kandivali", "Kurla",
    "Malad", "Mulund", "Powai", "Thane", "Worli"
  ];

  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const handleCitySearch = (searchTerm: string) => {
    setFormData(prev => ({ ...prev, city: searchTerm }));
    if (searchTerm.length > 0) {
      const filtered = mumbaiAreas.filter(city => 
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowCityDropdown(true);
    } else {
      setFilteredCities([]);
      setShowCityDropdown(false);
    }
  };

  const selectCity = (city: string) => {
    setFormData(prev => ({ ...prev, city }));
    setShowCityDropdown(false);
    toast({
      title: "City Selected",
      description: `Selected location: ${city}`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('Clients')
        .insert([
          {
            Name: formData.name,
            Email: formData.email,
            Pincode: formData.pincode,
            City: formData.city
          }
        ])
        .select();

      if (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "There was a problem submitting your registration. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Successfully registered!",
        description: "We'll contact you with more details soon.",
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        pincode: "",
        city: "",
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "💄 Learn from a Celebrity Makeup Artist – Get exclusive insights from an international expert",
    "✨ Master the Latest Makeup Techniques – Glass skin, HD contouring, airbrush, red carpet & bridal looks",
    "🎥 Live Demonstrations & Hands-On Practice – Watch real-time demos and apply what you learn",
    "📸 Professional Lighting & Camera Knowledge – Perfect your makeup for photography & social media",
    "🙋 Personalized Doubt-Solving Sessions – Get direct guidance from the expert",
    "🛍 Product Examination & Usage – Learn about top international makeup products",
    "📜 Certification on Completion – Boost your professional credibility"
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Limited Time Offer
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Master the Art of Makeup
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our exclusive masterclass and learn professional techniques from industry experts
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Reserve Your Spot
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  pattern="[0-9]{6}"
                  placeholder="Enter 6-digit pincode"
                  className="form-input"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.city}
                  onChange={(e) => handleCitySearch(e.target.value)}
                  placeholder="Search for areas in Mumbai"
                />
                {showCityDropdown && filteredCities.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredCities.map((city, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectCity(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button 
                type="submit" 
                className="btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Secure Your Spot Now"}
              </button>
            </form>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                What You'll Get
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-3 text-sm sm:text-base"
                  >
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social Proof */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This masterclass will transformed your approach to makeup. The techniques you will learn are invaluable!"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
