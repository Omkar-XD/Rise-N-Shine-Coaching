import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        form.reset();
        setCategory("");
        setBoard("");
        setStandard("");
        setCity("");
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SUCCESS POPUP */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-[60]"
          >
            <div className="bg-white rounded-2xl p-8 text-center w-[90%] max-w-md shadow-xl">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2">Enquiry Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Our academic team will contact you shortly.
              </p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  onClose();
                }}
                className="bg-brand-navy text-white px-6 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERROR POPUP */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-[60]"
          >
            <div className="bg-white rounded-2xl p-8 text-center w-[90%] max-w-md shadow-xl">
              <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2">Submission Failed</h3>
              <p className="text-gray-600 mb-6">
                Something went wrong. Please try again.
              </p>
              <button
                onClick={() => setShowError(false)}
                className="bg-brand-navy text-white px-6 py-2 rounded-full"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ORIGINAL MODAL */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={onClose}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed right-0 top-0 h-screen w-full md:w-[60vw] bg-white z-50 shadow-2xl flex flex-col justify-center"
            >
              <div className="px-10 md:px-16 py-14 relative h-full flex flex-col justify-center">
                <button
                  onClick={onClose}
                  className="absolute top-8 right-8 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                >
                  <X size={18} />
                </button>

                <div className="mb-10">
                  <h2 className="text-4xl font-bold text-brand-navy mb-3">
                    Admission Enquiry
                  </h2>
                  <p className="text-gray-500 text-base">
                    Fill in the details below and our academic team will contact you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <Input name="name" placeholder="Full Name" required />
                    <Input name="phone" placeholder="Phone Number" required />
                    <Input name="email" type="email" placeholder="Email Address" required />
                  </div>

                  <Textarea name="message" placeholder="Additional message (optional)" />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-navy text-white py-4 rounded-full"
                  >
                    {loading ? <Loader2 className="animate-spin inline mr-2" /> : "Submit Enquiry"}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnquireModal;