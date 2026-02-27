import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [board, setBoard] = useState("");
  const [standard, setStandard] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    // ⭐ VALIDATIONS
    if (!name || !email || !phone || !message || !category || !board || !standard || !city) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrorMessage("Form not configured");
      return;
    }

    const formattedMessage = `
New Coaching Enquiry – Rise N Shine Coaching

Student Details
Name: ${name}
Email: ${email}
Phone: ${phone}

Academic Details
Category: ${category}
Board: ${board}
Standard: ${standard}

Location
City: ${city}

Message
${message}
`;

    formData.set("access_key", accessKey);
    formData.set("subject", `New Enquiry from ${name}`);
    formData.set("from_name", "Rise N Shine Coaching Website");
    formData.set("replyto", email);
    formData.set("message", formattedMessage);
    formData.set("email_to", "swapnalimore3020@gmail.com");

    try {
      setLoading(true);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMessage("Enquiry sent successfully");
        form.reset();
        setCategory("");
        setBoard("");
        setStandard("");
        setCity("");
      } else {
        setErrorMessage("Something went wrong");
      }
    } catch {
      setErrorMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "border border-gray-400 focus:border-gray-700";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

          <motion.div className="fixed right-0 top-0 h-screen bg-white z-50 w-full md:w-[60vw] flex flex-col justify-center px-6 md:px-10">
            <button onClick={onClose} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-orange-500 text-white p-2 rounded-full">
              <X />
            </button>

            <h2 className="text-3xl font-bold text-center mb-6">
              <span className="text-brand-navy">Enquire </span>Now
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Name</Label><Input name="name" required className={inputStyle} /></div>
                <div><Label>Email</Label><Input name="email" type="email" required className={inputStyle} /></div>
                <div><Label>Phone</Label><Input name="phone" maxLength={10} required className={inputStyle} /></div>

                <div>
                  <Label>Category</Label>
                  <Select onValueChange={setCategory}>
                    <SelectTrigger className={inputStyle}><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["Foundation","IIT-JEE","NEET","Crash Course","Olympiad","Board Prep"].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Board</Label>
                  <Select onValueChange={setBoard}>
                    <SelectTrigger className={inputStyle}><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["SSC","CBSE"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Standard</Label>
                  <Select onValueChange={setStandard}>
                    <SelectTrigger className={inputStyle}><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => `Class ${i+1}`).map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>City</Label>
                  <Select onValueChange={setCity}>
                    <SelectTrigger className={inputStyle}><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["Pune","Mumbai","Nagpur","Kolhapur","Nashik","Other"].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Message</Label>
                <Textarea name="message" required className={`min-h-[80px] ${inputStyle}`} />
              </div>

              <div className="flex flex-col items-center gap-2">
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-full flex items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : "Submit"}
                </button>

                {successMessage && <p className="text-green-600">{successMessage}</p>}
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquireModal;