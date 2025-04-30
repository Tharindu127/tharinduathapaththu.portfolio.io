import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../../types';
import Button from './Button';

interface ContactFormProps {
    className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
    const [contactForm, setContactForm] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [emailTouched, setEmailTouched] = useState(false);

    // Email validation function
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Validate email whenever it changes
    useEffect(() => {
        if (contactForm.email && emailTouched) {
            setEmailValid(validateEmail(contactForm.email));
        }
    }, [contactForm.email, emailTouched]);

    const handleContactFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactForm(prev => ({ ...prev, [name]: value }));

        // Mark email as touched when user starts typing in it
        if (name === 'email' && !emailTouched) {
            setEmailTouched(true);
        }
    };

    const handleEmailBlur = () => {
        if (contactForm.email) {
            setEmailTouched(true);
        }
    };

    const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate email before submission
        if (!validateEmail(contactForm.email)) {
            setEmailTouched(true);
            setEmailValid(false);
            return;
        }

        setSubmitting(true);
        setSubmitStatus(null);

        try {
            // Using Formspree for form submission
            const response = await fetch('https://formspree.io/f/mldjoybz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactForm),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setContactForm({ name: '', email: '', message: '' });
                setEmailTouched(false);
                setEmailValid(null);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleContactSubmit} className={className}>
            <div className="mb-6">
                <label htmlFor="name" className="block text-gray-400 mb-2">Your Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactFormChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="John Doe"
                    required
                    disabled={submitting}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-400 mb-2">Your Email</label>
                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactFormChange}
                        onBlur={handleEmailBlur}
                        className={`w-full bg-gray-700/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all pr-10 ${emailTouched && emailValid === false
                            ? 'border-red-500 focus:ring-red-500'
                            : emailTouched && emailValid === true
                                ? 'border-green-500 focus:ring-green-500'
                                : 'border-gray-600 focus:ring-blue-500'
                            }`}
                        placeholder="john@example.com"
                        required
                        disabled={submitting}
                    />
                    {emailTouched && emailValid !== null && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {emailValid ? (
                                <CheckCircle size={18} className="text-green-500" />
                            ) : (
                                <AlertCircle size={18} className="text-red-500" />
                            )}
                        </div>
                    )}
                </div>
                {emailTouched && emailValid === false && (
                    <p className="mt-1 text-red-400 text-sm">Please enter a valid email address</p>
                )}
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-gray-400 mb-2">Your Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    rows={4}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Hi, I'd like to talk about..."
                    required
                    disabled={submitting}
                ></textarea>
            </div>

            {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/20 text-green-300">
                    Thank you for your message! I&apos;ll get back to you as soon as possible.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/20 text-red-300">
                    There was an error sending your message. Please try again or contact me directly.
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                className="w-full px-6 py-3 flex items-center justify-center gap-2"
                disabled={submitting || (emailTouched && emailValid === false)}>
                {submitting ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <span>Send Message</span>
                        <Send size={18} />
                    </>
                )}
            </Button>
        </form>
    );
};

export default ContactForm;