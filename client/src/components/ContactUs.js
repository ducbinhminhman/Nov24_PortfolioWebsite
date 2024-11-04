import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendInquiry = () => {
    const { firstName, lastName, email, phoneNumber, message } = formData;
    const mailtoLink = `mailto:manbinhminh99@gmail.com?subject=Contact%20Inquiry&body=First%20Name:%20${encodeURIComponent(
      firstName
    )}%0ALast%20Name:%20${encodeURIComponent(lastName)}%0AEmail:%20${encodeURIComponent(
      email
    )}%0APhone%20Number:%20${encodeURIComponent(
      phoneNumber
    )}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl lg:max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Contact me</h1>
          <p className="mt-1 text-gray-600">I'd love to talk about how I can help you.</p>
        </div>

        <div className="mt-12 grid items-center lg:grid-cols-2 gap-6 lg:gap-16">
          {/* Form Card - Visible on all screen sizes */}
          <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8">
            <h2 className="mb-8 text-xl font-semibold text-gray-800">Fill in the form</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="py-3 px-4 border-gray-200 rounded-lg text-sm w-full focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="py-3 px-4 border-gray-200 rounded-lg text-sm w-full focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-3 px-4 border-gray-200 rounded-lg text-sm w-full focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="py-3 px-4 border-gray-200 rounded-lg text-sm w-full focus:border-blue-500 focus:ring-blue-500"
                />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Details"
                  value={formData.message}
                  onChange={handleChange}
                  className="py-3 px-4 border-gray-200 rounded-lg text-sm w-full focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSendInquiry}
                className="w-full py-3 px-4 mt-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Send inquiry
              </button>
              <p className="mt-3 text-center text-sm text-gray-500">We'll get back to you in 1-2 business days.</p>
            </form>
          </div>

          {/* Contact Information - Visible only on large screens */}
          <div className="hidden lg:block divide-y divide-gray-200">
            <ContactInfo
              title="Data Expertise"
              description="I can analyze your data, provide insights, and support data-driven decision-making."
              linkText="Contact support"
              link="https://www.linkedin.com/in/binhminhman/"
            />
            <ContactInfo
              title="Data Automation Solutions"
              description="Discover how I can streamline your operations with custom data automation pipelines."
              linkText="Contact sales"
              link="https://www.linkedin.com/in/binhminhman/"
            />
            <ContactInfo
              title="Web Application Development"
              description="Explore how I can create a powerful, effective web application tailored to your business needs."
              linkText="Contact sales"
              link="https://www.linkedin.com/in/binhminhman/"
            />
            <ContactInfo
              title="Contact me by email"
              description="Feel free to reach out to me directly via email."
              linkText="manbinhminh99@gmail.com"
              link="https://www.linkedin.com/in/binhminhman/"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ title, description, linkText, link }) {
  return (
    <div className="flex gap-x-7 py-6">
      <div className="shrink-0 w-6 h-6 text-gray-800">
        {/* Optional SVG icon here */}
      </div>
      <div className="grow">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        <a href={link} className="mt-2 inline-flex items-center gap-x-2 text-m font-medium text-gray-600 hover:text-gray-800">
          {linkText}
        </a>
      </div>
    </div>
  );
}
