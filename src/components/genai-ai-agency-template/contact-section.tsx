"use client";

import type React from "react";

import { ArrowUpRight, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <Send className="w-5 h-5 text-primary" strokeWidth={2} />
          <span className="text-sm font-medium text-foreground/70">
            Contact us
          </span>
        </div>

        <p className="text-foreground/70 max-w-xl mb-12">
          Ready to harness the power of AI? Whether you need LLM integration,
          generative image solutions, or AI video production, our team of AI
          specialists is here to bring your vision to life.
        </p>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="overflow-hidden">
            <Image
              src="/images/d6ad6f46-989e-4989-921d-5121608695af.png"
              alt="AI Technology Abstract"
              width={600}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form */}
          <div className="bg-card p-8 border-border rounded-none border-0">
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
              Need AI expertise?
            </h3>
            <p className="text-foreground/70 mb-8">
              Let&apos;s discuss your AI project and transform your business
              with cutting-edge technology.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="First name*"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    placeholder="Email address*"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                  />
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Write your message here *"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
              >
                Submit
                <ArrowUpRight className="text-primary h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
