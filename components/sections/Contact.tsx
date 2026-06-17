'use client';

import React, { useState, useRef } from 'react';
import {
  IconSend,
  IconCheck,
  IconAlertCircle,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandX,
  IconMail,
  IconCopy,
} from '@tabler/icons-react';
import { useLanguage } from '@/lib/i18n/context';
import { getTranslation } from '@/lib/i18n/translations';
import { isValidEmail, prefersReducedMotion } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const subjectOptions = [
    { value: '', label: getTranslation(lang, 'validation_select_subject') },
    { value: 'general', label: getTranslation(lang, 'contact_subject_general') },
    { value: 'project', label: getTranslation(lang, 'contact_subject_project') },
    { value: 'job', label: getTranslation(lang, 'contact_subject_job') },
    { value: 'other', label: getTranslation(lang, 'contact_subject_other') },
  ];

  // GSAP scroll animation
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from('.contact-animate', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = getTranslation(lang, 'validation_required');
    }
    if (!formData.email.trim()) {
      newErrors.email = getTranslation(lang, 'validation_required');
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = getTranslation(lang, 'validation_email');
    }
    if (!formData.subject) {
      newErrors.subject = getTranslation(lang, 'validation_select_subject');
    }
    if (!formData.message.trim()) {
      newErrors.message = getTranslation(lang, 'validation_required');
    } else if (formData.message.trim().length < 20) {
      newErrors.message = getTranslation(lang, 'validation_message_min');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nlesiecki@icloud.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const socialLinks = [
    {
      href: 'https://github.com/openpango',
      icon: IconBrandGithub,
      label: 'GitHub',
    },
    {
      href: 'https://instagram.com/skipper.lsc',
      icon: IconBrandInstagram,
      label: 'Instagram',
    },
    {
      href: 'https://x.com/joaopensao',
      icon: IconBrandX,
      label: 'X / Twitter',
    },
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-navy-base"
    >
      <div className="section-container relative z-10 border-t border-border-default pt-12 px-4 sm:px-6 lg:px-8">
        {/* Vertical section label */}
        <div className="hidden lg:block absolute left-8 top-12 -translate-y-full -rotate-90 origin-bottom-left text-[0.6rem] uppercase tracking-[0.3em] text-text-muted font-bold whitespace-nowrap">
          06 — CONTACT
        </div>

        <div className="ml-0 lg:ml-12">
        <SectionHeading
          title={getTranslation(lang, 'contact_title')}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          {/* Contact form */}
          <div className="contact-animate lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  {getTranslation(lang, 'contact_name')}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-none border-b bg-transparent px-0 py-3 text-text-primary placeholder-text-muted/50 transition-colors focus:border-red-primary focus:outline-none ${
                    errors.name ? 'border-red-primary' : 'border-border-default'
                  }`}
                  placeholder="JOHN DOE"
                />
                {errors.name && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-primary">
                    <IconAlertCircle size={14} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  {getTranslation(lang, 'contact_email')}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-none border-b bg-transparent px-0 py-3 text-text-primary placeholder-text-muted/50 transition-colors focus:border-red-primary focus:outline-none ${
                    errors.email ? 'border-red-primary' : 'border-border-default'
                  }`}
                  placeholder="JOHN@EXAMPLE.COM"
                />
                {errors.email && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-primary">
                    <IconAlertCircle size={14} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  {getTranslation(lang, 'contact_subject')}
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full rounded-none border-b bg-transparent px-0 py-3 text-text-primary transition-colors focus:border-red-primary focus:outline-none ${
                    errors.subject ? 'border-red-primary' : 'border-border-default'
                  }`}
                >
                  {subjectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-primary">
                    <IconAlertCircle size={14} /> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  {getTranslation(lang, 'contact_message')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full resize-none rounded-none border-b bg-transparent px-0 py-3 text-text-primary placeholder-text-muted/50 transition-colors focus:border-red-primary focus:outline-none ${
                    errors.message ? 'border-red-primary' : 'border-border-default'
                  }`}
                  placeholder={lang === 'en' ? 'TELL ME ABOUT YOUR PROJECT...' : 'OPOWIEDZ MI O SWOIM PROJEKCIE...'}
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-primary">
                    <IconAlertCircle size={14} /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                disabled={status === 'sending'}
                icon={
                  status === 'success' ? (
                    <IconCheck size={18} />
                  ) : (
                    <IconSend size={18} />
                  )
                }
              >
                {status === 'sending'
                  ? getTranslation(lang, 'contact_sending')
                  : status === 'success'
                  ? getTranslation(lang, 'contact_success')
                  : getTranslation(lang, 'contact_send')}
              </Button>

              {/* Status messages */}
              {status === 'success' && (
                <p className="flex items-center gap-2 text-sm text-green-400">
                  <IconCheck size={16} />
                  {getTranslation(lang, 'contact_success')}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-sm text-red-primary">
                  <IconAlertCircle size={16} />
                  {getTranslation(lang, 'contact_error')}
                </p>
              )}
            </form>
          </div>

          {/* Contact info sidebar */}
          <div className="contact-animate lg:col-span-2">
            <div className="space-y-8">
              {/* Email copy */}
              <div>
                <h3 className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-text-muted">
                  Email
                </h3>
                <button
                  onClick={copyEmail}
                  className="group flex w-full items-center gap-3 border border-border-default bg-transparent px-4 py-3 transition-all hover:border-red-primary"
                >
                  <IconMail size={18} className="text-text-muted" />
                  <span className="flex-1 text-left text-sm text-text-primary font-bold uppercase tracking-wider">
                    nlesiecki@icloud.com
                  </span>
                  {copied ? (
                    <span className="text-xs text-green-400">
                      {getTranslation(lang, 'contact_copied')}
                    </span>
                  ) : (
                    <IconCopy
                      size={16}
                      className="text-text-muted transition-colors group-hover:text-text-primary"
                    />
                  )}
                </button>
              </div>

              {/* Social links */}
              <div>
                <h3 className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-text-muted">
                  Social
                </h3>
                <div className="space-y-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 border border-border-default bg-transparent px-4 py-3 transition-all hover:border-red-primary hover:text-red-primary"
                    >
                      <link.icon size={18} className="text-text-muted group-hover:text-red-primary" />
                      <span className="text-xs font-bold uppercase tracking-widest text-text-primary">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
