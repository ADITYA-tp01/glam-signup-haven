
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    city: "",
  });

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pincode = e.target.value;
    setFormData((prev) => ({ ...prev, pincode }));

    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const [data] = await response.json();
        
        if (data.Status === "Success") {
          const cityName = data.PostOffice[0].District;
          setFormData((prev) => ({ ...prev, city: cityName }));
          toast({
            title: "City Found",
            description: `Location set to ${cityName}`,
          });
        } else {
          setFormData((prev) => ({ ...prev, city: "" }));
          toast({
            title: "Invalid Pincode",
            description: "Please enter a valid pincode",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch city information",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Successfully registered!",
      description: "We'll contact you with more details soon.",
    });
  };

  const benefits = [
    "Professional makeup techniques",
    "Personal guidance from experts",
    "Hands-on practice sessions",
    "Premium beauty kit included",
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
                  onChange={handlePincodeChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  readOnly
                  className="form-input bg-gray-50"
                  value={formData.city}
                  placeholder="City will be auto-filled"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Secure Your Spot Now
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
                    className="flex items-center space-x-3"
                  >
                    <span className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-gray-700">{benefit}</span>
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
                <span className="text-sm text-gray-600">
                  Join 500+ happy students
                </span>
              </div>
              <p className="text-gray-600 italic">
                "This masterclass transformed my approach to makeup. The techniques I
                learned are invaluable!"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
