"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

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
  "Let&apos;s discuss",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // Simulate API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-2xl border border-green-200 bg-green-50 h-full min-h-96"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle size={36} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Message Sent!</h3>
        <p className="text-slate-600 max-w-sm leading-relaxed mb-6">
          Thank you for reaching out. We&apos;ll review your project details and get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm(initial); }}
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  const inputBase =
    "w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const inputNormal = `${inputBase} border-slate-200 bg-white hover:border-slate-300`;
  const inputError = `${inputBase} border-red-300 bg-red-50`;

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Tell Us About Your Project</h2>
      <p className="text-sm text-slate-500 mb-7">Free consultation · No obligation · Reply within 24h</p>

      <div className="space-y-5">
        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Rahul Sharma"
              className={errors.name ? inputError : inputNormal}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="rahul@company.com"
              className={errors.email ? inputError : inputNormal}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Company + Phone */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Company / Startup
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Your company name"
              className={inputNormal}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={inputNormal}
            />
          </div>
        </div>

        {/* Service + Budget */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className={errors.service ? inputError : inputNormal}
            >
              <option value="">Select a service...</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.service}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Project Budget
            </label>
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className={inputNormal}
            >
              <option value="">Select a range...</option>
              {budgetOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Project Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us about your project — what you're building, who it's for, and what challenges you're facing..."
            className={`resize-none ${errors.description ? inputError : inputNormal}`}
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle size={11} /> {errors.description}
            </p>
          )}
          <p className="mt-1.5 text-xs text-slate-400">{form.description.length} characters</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all duration-200 active:scale-99 shadow-sm hover:shadow-md hover:shadow-blue-100"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400">
          Your information is confidential and will never be shared.
        </p>
      </div>
    </form>
  );
}
