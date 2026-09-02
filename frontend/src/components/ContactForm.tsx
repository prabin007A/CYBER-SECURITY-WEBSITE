"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { INDUSTRY_OPTIONS, INTEREST_OPTIONS } from "@/data/content";

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

interface FormState {
    full_name: string;
    company: string;
    email: string;
    phone: string;
    industry: string;
    interest: string;
    message: string;
    website: string;
}

type FormErrors = Partial<Record<keyof FormState, string | undefined>>;

const initial: FormState = { full_name: "", company: "", email: "", phone: "", industry: "", interest: "", message: "", website: "" };

const validate = (f: FormState): FormErrors => {
    const errors: FormErrors = {};
    if (f.full_name.trim().length < 2) errors.full_name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = "Please enter a valid email address.";
    if (!/^[+0-9][0-9\s\-()]{5,22}$/.test(f.phone.trim())) errors.phone = "Please enter a valid phone number.";
    if (f.message.trim().length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
    return errors;
};

const inputClass = (error?: string | boolean) =>
    `w-full border bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${
        error ? "border-red-400" : "border-navy-900/15 hover:border-navy-900/30 focus:border-cyan-500"
    }`;

const Field = ({ label, name, error, children, required = true }: { label: string; name: string; error?: string; children: React.ReactNode; required?: boolean }) => (
    <div>
        <label htmlFor={name} className="mb-2 block font-display text-sm font-semibold text-navy-900">
            {label} {required && <span className="text-cyan-600">*</span>}
        </label>
        {children}
        <AnimatePresence>
            {error && (
                <motion.p
                    data-testid={`error-${name}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1.5 text-xs text-red-500"
                    role="alert"
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
);

export default function ContactForm() {
    const [form, setForm] = useState<FormState>(initial);
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        if (errors[name as keyof FormState]) setErrors((er) => ({ ...er, [name]: undefined }));
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs = validate(form);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;
        setStatus("loading");
        try {
            const res = await fetch(`${API}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.status === 429) {
                setStatus("idle");
                toast.error("Too many requests. Please try again later.");
                return;
            }
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                setStatus("idle");
                toast.error(data?.detail?.[0]?.msg || "Something went wrong. Please try again.");
                return;
            }
            setStatus("success");
        } catch {
            setStatus("idle");
            toast.error("Network error. Please check your connection and try again.");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                data-testid="contact-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center border border-cyan-500/30 bg-cyan-500/5 p-10 text-center"
            >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-600">
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-navy-900">Thank you.</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                    Your request has been submitted successfully. Our team will review it and get back to you.
                </p>
            </motion.div>
        );
    }

    return (
        <form data-testid="contact-form" onSubmit={submit} noValidate className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
            </div>

            <Field label="Full Name" name="full_name" error={errors.full_name}>
                <input id="full_name" name="full_name" data-testid="input-full-name" type="text" autoComplete="name" placeholder="Your full name" value={form.full_name} onChange={update} className={inputClass(errors.full_name)} />
            </Field>
            <Field label="Company" name="company" required={false}>
                <input id="company" name="company" data-testid="input-company" type="text" autoComplete="organization" placeholder="Your organization" value={form.company} onChange={update} className={inputClass(false)} />
            </Field>
            <Field label="Email" name="email" error={errors.email}>
                <input id="email" name="email" data-testid="input-email" type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={update} className={inputClass(errors.email)} />
            </Field>
            <Field label="Phone" name="phone" error={errors.phone}>
                <input id="phone" name="phone" data-testid="input-phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={update} className={inputClass(errors.phone)} />
            </Field>
            <Field label="Industry" name="industry" required={false}>
                <select id="industry" name="industry" data-testid="select-industry" value={form.industry} onChange={update} className={inputClass(false)}>
                    <option value="">Select your industry</option>
                    {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    <option value="Other">Other</option>
                </select>
            </Field>
            <Field label="Service / Area of Interest" name="interest" required={false}>
                <select id="interest" name="interest" data-testid="select-interest" value={form.interest} onChange={update} className={inputClass(false)}>
                    <option value="">Select an area</option>
                    {INTEREST_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
            </Field>
            <div className="sm:col-span-2">
                <Field label="Message" name="message" error={errors.message}>
                    <textarea id="message" name="message" data-testid="input-message" rows={5} placeholder="Tell us about your technology and cybersecurity requirements" value={form.message} onChange={update} className={`${inputClass(errors.message)} resize-y`} />
                </Field>
            </div>

            <div className="sm:col-span-2">
                <button
                    type="submit"
                    data-testid="contact-submit-button"
                    disabled={status === "loading"}
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden bg-blue-600 px-8 py-4 font-display text-sm font-semibold tracking-wide text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-cyan-500 transition-transform duration-300 group-hover:scale-y-100" aria-hidden="true" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                        {status === "loading" ? "Submitting…" : "Request Consultation"}
                    </span>
                </button>
            </div>
        </form>
    );
}
