import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formsubmit.co/mitchell.harris@aya.yale.edu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          _subject: "New Consulting Inquiry",
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('error');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full"
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <Input
          placeholder="Your Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full"
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <Input
          placeholder="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full"
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <Textarea
          placeholder="Tell us about your project"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full h-32"
          disabled={status === 'loading'}
        />
      </div>
      <button
        type="submit"
        className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
          status === 'loading' 
            ? 'bg-gray-400 cursor-not-allowed'
            : status === 'success'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : status === 'error'
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-blue-900 hover:bg-blue-800 text-white'
        }`}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending...' :
         status === 'success' ? 'Message Sent!' :
         status === 'error' ? 'Error - Try Again' :
         'Send Message'}
      </button>
    </form>
  );
};

const ConsultingWebsite = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Advanced AI Solutions for Complex Problems</h1>
          <p className="text-xl mb-8">Leveraging deep expertise in mathematical optimization and machine learning to transform your business</p>
          <div className="flex gap-4">
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
                  Schedule Consultation
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Expert Solutions in AI, Optimization, and Data Science</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Machine Learning Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Custom deep neural architectures and advanced ML models for non-standard data types. Proven track record of 50% performance improvements over existing solutions.</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Optimization Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Specialized in global non-convex optimization and polynomial systems. Patent-holder in algorithmic optimization for complex engineering problems.</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Algorithm Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Expert in developing high-performance algorithms for challenging computational problems. Published researcher in mathematical optimization.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Academic Excellence</h3>
              <p className="text-gray-600">
                PhD in Applied Mathematics from MIT, specializing in polynomial optimization and machine learning.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Industry Impact</h3>
              <p className="text-gray-600">
                Proven track record at Qualcomm AI Research and other leading tech companies. Multiple patents in optimization and algorithmic solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Let's Solve Complex Problems Together</h2>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <p className="text-gray-600 text-center mb-8">
            Currently accepting select high-impact consulting projects in machine learning, optimization, and algorithm development.
          </p>
          <div className="flex justify-center">
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800">
                  Contact for Consultation
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>Based in Cambridge, MA | Serving clients globally</p>
        </div>
      </footer>
    </div>
  );
};

export default ConsultingWebsite;
