"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { API_BASE_URL } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  service: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

const budgetOptions = [
  "Under ₹1 Lakh",
  "₹1–5 Lakh",
  "₹5–10 Lakh",
  "₹10–25 Lakh",
  "₹25 Lakh+",
  "Let's discuss",
];

const serviceOptions = [
  "Mobile App Development",
  "Web Development",
  "AI Automation",
  "AI Integration",
  "SaaS Development",
  "UI/UX Design",
  "Backend / Cloud",
  "Other / Not sure",
];

const initial: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  budget: "",
  service: "",
  description: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<Record<string, boolean>>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Please enter a valid email address.";
    if (!form.service) e.service = "Please select a service.";
    if (!form.description.trim() || form.description.trim().length < 20)
      e.description = "Please describe your project in at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleFocus = (name: string) => {
    setFocusedField((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name: string) => {
    setFocusedField((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          budget: form.budget,
          projectType: form.service,
          message: form.description
        })
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-3xl border border-green-200 bg-green-50/50 backdrop-blur-md h-full min-h-[450px]"
      >
        <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center mb-6 shadow-md shadow-green-200/50">
          <CheckCircle size={36} className="text-green-600 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Message Sent Successfully!</h3>
        <p className="text-slate-600 max-w-sm leading-relaxed mb-8">
          Thank you for reaching out. We've received your request and our technical partners will get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm(initial); }}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-md shadow-green-600/20 active:scale-95 cursor-pointer"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  const inputBase =
    "w-full px-4 py-3.5 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-slate-50/50 hover:bg-white";
  const inputNormal = `${inputBase} border-slate-200/80`;
  const inputError = `${inputBase} border-red-400 bg-red-50/30 focus:ring-red-500/10 focus:border-red-500`;

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white/80 backdrop-blur-md rounded-[32px] border border-slate-200/80 p-8 shadow-xl shadow-slate-900/5 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="eyebrow-light">
          <Sparkles size={10} className="text-blue-600" />
          Interactive Brief
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">Tell Us About Your Project</h2>
      <p className="text-sm text-slate-500 mb-8">Free consultation · NDA on request · Reply within 24h</p>

      <div className="space-y-6">
        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              placeholder="Rahul Sharma"
              className={errors.name ? inputError : inputNormal}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              placeholder="rahul@company.com"
              className={errors.email ? inputError : inputNormal}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Company + Phone */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Company / Startup
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              onFocus={() => handleFocus("company")}
              onBlur={() => handleBlur("company")}
              placeholder="Your company name"
              className={inputNormal}
            />
          </div>
          <div className="relative">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onFocus={() => handleFocus("phone")}
              onBlur={() => handleBlur("phone")}
              placeholder="+91 98765 43210"
              className={inputNormal}
            />
          </div>
        </div>

        {/* Service + Budget */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              onFocus={() => handleFocus("service")}
              onBlur={() => handleBlur("service")}
              className={`select-styled ${errors.service ? inputError : inputNormal}`}
            >
              <option value="">Select a service...</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircle size={12} /> {errors.service}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Project Budget
            </label>
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              onFocus={() => handleFocus("budget")}
              onBlur={() => handleBlur("budget")}
              className={`select-styled ${inputNormal}`}
            >
              <option value="">Select a range...</option>
              {budgetOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="relative">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Project Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            onFocus={() => handleFocus("description")}
            onBlur={() => handleBlur("description")}
            rows={5}
            placeholder="Tell us about your project — what you're building, who it's for, and what challenges you're facing..."
            className={`resize-none ${errors.description ? inputError : inputNormal}`}
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
              <AlertCircle size={12} /> {errors.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-400">At least 20 characters</p>
            <p className="text-xs text-slate-400 font-semibold">{form.description.length} chars</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-blue-400 disabled:to-indigo-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] shadow-md shadow-blue-500/10 cursor-pointer relative overflow-hidden group"
        >
          {/* Light sweep sweep effect */}
          <span className="absolute inset-0 w-full h-full block bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-beam-sweep pointer-events-none" />

          {status === "loading" ? (
            <>
              <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Send Message</span>
            </>
          )}
        </button>

        {status === "error" && (
          <p className="text-center text-xs text-red-500 font-semibold flex items-center justify-center gap-1.5 mt-2">
            <AlertCircle size={13} /> Something went wrong. Please check your connection and try again.
          </p>
        )}

      </div>
    </form>
  );
}
