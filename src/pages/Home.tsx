import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroCarousel from "@/components/HeroCarousel";
import {
  Heart,
  Clock,
  Users,
  Award,
  Stethoscope,
  Brain,
  Bone,
  Baby,
  Activity,
  Pill,
  Star,
  AlertCircle,
  Ear,
  Building2,
  GraduationCap,
  Eye,
  HeartHandshake
} from "lucide-react";
import hospitalInterior from "@/assets/elettil-hospital.jpeg";
import medicalBg from '@/assets/pharmacist.jpg';
import doctorTeam from '@/assets/doctors-discussing.jpg'; // Add doctor team image
import modernEquipment from '@/assets/feciliteas.jpg'; // Add equipment image
import patientCare from '@/assets/24hvrs.jpg'; // Add patient care image
import { useState, useEffect } from "react";

const features = [
  { icon: Clock, title: "24/7 Emergency Care", description: "Immediate medical assistance available anytime", image: patientCare },
  { icon: Users, title: "Qualified Specialists", description: "Experienced and certified medical professionals", image: doctorTeam },
  { icon: Award, title: "Advanced Facilities", description: "Modern infrastructure and world-class equipment", image: modernEquipment },
  { icon: Pill, title: "Pharmacy & Diagnostics", description: "Fully equipped pharmacy and advanced lab services", image: medicalBg },
];

const specialties = [
  { icon: Building2, name: "ELETTIL HOSPITAL", description: "Complete multi-speciality healthcare", link: "/services/elettil-hospital" },
  { icon: GraduationCap, name: "EH ACADEMY", description: "Advanced medical education & training", link: "/services/eh-academy" },
  { icon: Eye, name: "EH EYE HOSPITAL", description: "Specialised eye & vision care", link: "/services/eh-eye-hospital" },
  { icon: Pill, name: "EH HYPER PHARMACY", description: "24/7 pharmacy & medication support", link: "/services/eh-hyper-pharmacy" },
  { icon: Activity, name: "EH PHYSIO & REHAB CENTRE", description: "Physiotherapy & rehabilitation services", link: "/services/eh-physio-rehab" },
  { icon: HeartHandshake, name: "NKM TRUST", description: "Trust-based community healthcare support", link: "/services/nkm-trust" },
];

const testimonials = [
  { 
    name: "Anjana S. Nair", 
    text: "The immediate care my child received during a late-night emergency was exceptional. The pediatric team was compassionate and professional.", 
    rating: 5,
    role: "Mother of Two"
  },
  { 
    name: "Rajeev Menon", 
    text: "Advanced cardiology treatment and detailed patient care helped me recover fully from heart surgery. Highly recommended.", 
    rating: 5,
    role: "Business Executive"
  },
  { 
    name: "Harikumar", 
    text: "After suffering from knee pain for years, the orthopedic department's modern treatment and physiotherapy gave me complete relief.", 
    rating: 5,
    role: "Retired Teacher"
  }
];

const Home = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  
  // Auto change testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(prev => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Specialties Section */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${medicalBg})`,
            opacity: 0.08
          }}
        />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 to-gray-50/95" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#E84D3D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#4A5A6A]/5 rounded-full blur-3xl" />
        
        {/* Content - relative positioning to appear above background */}
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-4">Our Specialties</h2>
            <p className="text-gray-600 text-lg">Comprehensive healthcare services for all your needs</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="p-4 md:p-6 h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300 card-hover border-0 bg-white/95 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#E84D3D]/10 to-[#E84D3D]/5 mb-4">
                      <specialty.icon className="h-8 md:h-10 w-8 md:w-10 text-[#E84D3D]" />
                    </div>
                    <h3 className="text-sm md:text-lg font-semibold text-[#4A5A6A] mb-2">{specialty.name}</h3>
                    <p className="text-gray-600 text-xs md:text-base">{specialty.description}</p>
                  </div>
                  <div className="mt-3 md:mt-4 text-center">
                    <Link to={specialty.link}>
                      <Button
                        size="sm"
                        className="w-full max-w-[140px] md:w-40 bg-white border-2 border-[#E84D3D] text-[#E84D3D] hover:bg-[#E84D3D] hover:text-white transition text-xs md:text-sm"
                      >
                        Visit Website
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with enhanced image gallery */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hospitalInterior} 
                  alt="Hospital Interior" 
                  className="w-full h-[200px] md:h-[350px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
               


            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-4">Welcome to our multi-service center</h2>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">
                We are committed to providing exceptional healthcare services through 
                Elettil Hospital, EH Academy, EH Eye Hospital, EH Hyper Pharmacy, 
                EH Physio & Rehab Centre, and NKM Trust. Our focus is on patient comfort, 
                advanced medical technology, and compassionate care. Our team of experienced 
                professionals works tirelessly to ensure the best outcomes for every patient.
              </p>
              

              
              <Link to="/about">
                <div className="flex ">
  <Button
    size="lg"
    className="bg-[#E84D3D] hover:bg-[#d43d2d] text-white"
  >
    Read More About Us
  </Button>
</div>

              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section with images */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-lg">Expert Doctors, Modern Care, Trusted Results.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover border-0 bg-white h-full group">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                  <img 
  src={feature.image}
  alt={feature.title}
  loading="lazy"
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
/>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm">
                        <feature.icon className="h-6 w-6 text-[#E84D3D]" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-base md:text-lg font-semibold text-[#4A5A6A] mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with avatars */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A5A6A] mb-4">What Our Patients Say</h2>
            <p className="text-gray-600 text-lg">Real stories from real patients</p>
          </motion.div>

          {/* Mobile: Single testimonial */}
          <div className="block md:hidden">
            <motion.div
              key={currentTestimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full mb-8"
            >
              <Card className="p-6 bg-white border-0 shadow-md h-full flex flex-col justify-between">
                <div>
                 
                  <div className="flex mb-4 justify-center">
                    {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#E84D3D] text-[#E84D3D] mx-1" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 text-center italic">"{testimonials[currentTestimonialIndex].text}"</p>
                </div>
                <p className="font-semibold text-[#4A5A6A] text-center">{testimonials[currentTestimonialIndex].name}</p>
              </Card>
            </motion.div>

            {/* Navigation dots for mobile */}
            <div className="flex justify-center space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonialIndex === index 
                      ? 'bg-[#E84D3D] w-8' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop - Show all testimonials */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="p-6 bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
                  <div>
                   
                    <div className="flex mb-4 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#E84D3D] text-[#E84D3D]" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 text-center italic">"{testimonial.text}"</p>
                  </div>
                  <p className="font-semibold text-[#4A5A6A] text-center">{testimonial.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;