import { useState, type FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnquireModal = ({ isOpen, onClose }: EnquireModalProps) => {
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("");
  const [board, setBoard] = useState("");
  const [standard, setStandard] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = (formData.get("message") as string) || "";

    if (!name || !email || !phone || !category || !board || !standard || !city) {
      alert("Please complete all required fields.");
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    const formattedMessage = `
RISE N SHINE COACHING
New Admission Enquiry

STUDENT DETAILS
Name: ${name}
Phone: ${phone}
Email: ${email}

ACADEMIC DETAILS
Program: ${category}
Board: ${board}
Class: ${standard}
City: ${city}

Message:
${message || "Not provided"}
`;

    formData.set("access_key", accessKey);
    formData.set("subject", "Rise N Shine Coaching | New Admission Enquiry");
    formData.set("message", formattedMessage);
    formData.set("email_to", "swapnalimore3020@gmail.com");

    try {
      setLoading(true);
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      form.reset();
      setCategory("");
      setBoard("");
      setStandard("");
      setCity("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed right-0 top-0 h-screen w-full md:w-[60vw] bg-white z-50 shadow-2xl flex flex-col justify-center"
          >
            <div className="px-10 md:px-16 py-14 relative h-full flex flex-col justify-center">
              
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
              >
                <X size={18} />
              </button>

              {/* Heading */}
              <div className="mb-10">
                <h2 className="text-4xl font-bold text-brand-navy mb-3">
                  Admission Enquiry
                </h2>
                <p className="text-gray-500 text-base">
                  Fill in the details below and our academic team will contact you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">

                {/* STUDENT INFO */}
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold tracking-wider text-gray-600 uppercase">
                    Student Information
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    <Input name="name" placeholder="Full Name" required className="h-12 rounded-lg" />
                    <Input name="phone" placeholder="Phone Number" maxLength={10} required className="h-12 rounded-lg" />
                    <Input name="email" type="email" placeholder="Email Address" required className="h-12 rounded-lg" />

                    <Select onValueChange={setCity}>
                      <SelectTrigger className="h-12 rounded-lg">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Pune","Mumbai","Nagpur","Other"].map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* ACADEMIC INFO */}
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold tracking-wider text-gray-600 uppercase">
                    Academic Details
                  </h3>

                  <div className="grid grid-cols-3 gap-6">
                    <Select onValueChange={setCategory}>
                      <SelectTrigger className="h-12 rounded-lg">
                        <SelectValue placeholder="Program" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Foundation","NEET","IIT-JEE","Board Prep"].map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select onValueChange={setBoard}>
                      <SelectTrigger className="h-12 rounded-lg">
                        <SelectValue placeholder="Board" />
                      </SelectTrigger>
                      <SelectContent>
                        {["SSC","CBSE"].map(b => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select onValueChange={setStandard}>
                      <SelectTrigger className="h-12 rounded-lg">
                        <SelectValue placeholder="Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => `Class ${i+1}`).map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* MESSAGE */}
                <Textarea
                  name="message"
                  placeholder="Additional message (optional)"
                  className="min-h-[110px] rounded-lg"
                />

                {/* SUBMIT */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white py-4 rounded-full text-lg font-semibold shadow-lg transition-all"
                  >
                    {loading ? <Loader2 className="animate-spin inline mr-2" /> : "Submit Enquiry"}
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquireModal;