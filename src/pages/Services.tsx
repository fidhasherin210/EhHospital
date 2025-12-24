import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import hospitalInterior from "@/assets/eh-mediversity-03.jpeg";
import {
  Stethoscope,
  Heart,
  Bone,
  Baby,
  Brain,
  Activity,
  Award,
  Eye,
  Pill,
  HeartPulse,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "ELETTIL HOSPITAL",
    description:
      "EH Hospital, founded in 2018 in Elettil Vattoli, is a multi-specialty center with 24/7 care, now expanded to include an Eye Hospital, Pharmacy, Rehab Center, and Academy.",
    features: ["Routine Check-ups", "Health Screenings", "Chronic Disease Management", "Preventive Care"],
    link: "/services/elettil-hospital",
  },
  {
    icon: Award,
    title: "EH ACADEMY",
    description:
      "EH Paramedical Academy, launched in 2021 with four courses, now offers seven programs to 200+ students. A new campus is underway to host 500+ students with modern labs, library, and hostels",
    features: ["ECG & Stress Tests", "Cardiac Imaging", "Heart Disease Treatment", "Rehabilitation"],
    link: "/services/eh-academy",
  },
  {
    icon: Eye,
    title: "EH EYE HOSPITAL",
    description:
      "Inaugurated on February 3, 2025, EH Eye Hospital offers full-time eye care, advanced surgeries, and a complete optical store, reflecting strong demand and future expansion potential for other specialties.",
    features: ["Eye Examinations", "Cataract Surgery", "Vision Correction", "Advanced Imaging"],
    link: "/services/eh-eye-hospital",
  },
  {
    icon: Pill,
    title: "EH HYPER PHARMACY",
    description:
      "Launched in 2022, the unit offers medical, wellness, and baby care products, including generics. Located opposite the hospital, it’s expanding into a regional network with plans for Hyper Opticals and future integration into the new hospital building.",
    features: ["Prescription Medications", "Health Supplements", "Pharmacist Consultations", "Home Delivery"],
    link: "/services/eh-hyper-pharmacy",
  },
  {
    icon: HeartPulse,
    title: "EH PHYSIO & REHAB CENTRE",
    description:
      "Physical therapy and rehabilitation services for recovery, mobility improvement, and chronic condition management.",
    features: ["Physiotherapy", "Rehabilitation", "Pain Management", "Post-Surgery Care"],
    link: "/services/eh-physio-rehab",
  },
  {
    icon: Heart,
    title: "NKM TRUST",
    description:
      "Complete women's healthcare including reproductive health, prenatal care, and gynecological services.",
    features: ["Prenatal Care", "Family Planning", "Gynecological Check-ups", "Women's Wellness Programs"],
    link: "/services/nkm-trust",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-26 bg-gradient-to-r from-[#E84D3D] to-[#4A5A6A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hospitalInterior}
            alt="Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A5A6A]/90 to-[#4A5A6A]/70" />
        </div>
        <div className="relative container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-4xl font-bold mb-4"
          >
            Our Medical Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-lg text-white/90 max-w-2xl mx-auto"
          >
            Comprehensive healthcare solutions tailored to your needs
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-[#E84D3D]/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 card-hover border-0 bg-gradient-to-br from-white to-gray-50 flex flex-col justify-between hover:border-[#E84D3D]/20 hover:border">
                  <div>
                    {/* Icon with white on #E84D3D background */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-[#E84D3D] mb-4 shadow-md">
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#4A5A6A] mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-[#E84D3D]">Our Services Include:</p>
                      <ul className="space-y-1">
                        {service.features.map((feature) => (
                          <li key={feature} className="text-sm text-gray-600 flex items-start">
                            <span className="mr-2 text-[#E84D3D]">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Visit Website Button */}
                  <Link to={service.link}>
                    <button className="mt-6 w-full py-3 bg-[#E84D3D] text-white font-semibold rounded-lg hover:bg-[#d43f34] transition shadow-md hover:shadow-lg">
                      Visit Website
                    </button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;