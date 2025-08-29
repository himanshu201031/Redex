import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState, useRef } from 'react';
import { MdAccessTime, MdGroup, MdCelebration, MdRestaurant } from 'react-icons/md';
import { FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const ReservationSystem = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const containerRef = useRef();
  const formRef = useRef();
  const successRef = useRef();

  useGSAP(() => {
    // Animate container entrance
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate form fields
    gsap.fromTo('.form-field',
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  useGSAP(() => {
    if (isSubmitted && successRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.5,
        ease: 'power2.in'
      });

      gsap.fromTo(successRef.current,
        { opacity: 0, scale: 0.8, x: 50 },
        { 
          opacity: 1, 
          scale: 1, 
          x: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: 0.3
        }
      );
    }
  }, [isSubmitted]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    // Check if date is in the future
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
      specialRequests: ''
    });
    setErrors({});
    
    gsap.set(formRef.current, { opacity: 1, x: 0 });
    gsap.set(successRef.current, { opacity: 0, scale: 0.8, x: 50 });
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 17; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  return (
    <section id="reservation-system" className="py-20 bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-4">
              <MdRestaurant className="text-5xl" />
              Reserve Your Table
            </h2>
            <p className="text-xl text-white mb-8">
              Secure your spot for an unforgettable evening of craft cocktails and exceptional service.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <MdAccessTime className="text-2xl text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Opening Hours</h3>
                  <p className="text-white">Daily: 5:00 PM - 12:00 AM</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <MdGroup className="text-2xl text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Group Reservations</h3>
                  <p className="text-white">Perfect for parties up to 12 guests</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <MdCelebration className="text-2xl text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Special Events</h3>
                  <p className="text-white">Private events and celebrations welcome</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-black">
            <div ref={formRef} className={isSubmitted ? 'hidden' : 'block'}>
              <h3 className="text-2xl font-bold text-black mb-6 text-center flex items-center justify-center gap-3">
                <FaCalendarAlt className="text-2xl" />
                Make a Reservation
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-field">
                    <label className="block text-black font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border-2 bg-white text-black ${
                        errors.name ? 'border-red-500' : 'border-black'
                      } focus:border-black focus:outline-none transition-colors`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="form-field">
                    <label className="block text-black font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border-2 bg-white text-black ${
                        errors.email ? 'border-red-500' : 'border-black'
                      } focus:border-black focus:outline-none transition-colors`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-black font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg border-2 bg-white text-black ${
                      errors.phone ? 'border-red-500' : 'border-black'
                    } focus:border-black focus:outline-none transition-colors`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="form-field">
                    <label className="block text-black font-medium mb-2">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full p-3 rounded-lg border-2 bg-white text-black ${
                        errors.date ? 'border-red-500' : 'border-black'
                      } focus:border-black focus:outline-none transition-colors`}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>

                  <div className="form-field">
                    <label className="block text-black font-medium mb-2">Time *</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border-2 bg-white text-black ${
                        errors.time ? 'border-red-500' : 'border-black'
                      } focus:border-black focus:outline-none transition-colors`}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                  </div>

                  <div className="form-field">
                    <label className="block text-black font-medium mb-2">Guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border-2 bg-white text-black border-black focus:border-black focus:outline-none transition-colors"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-black font-medium mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 rounded-lg border-2 bg-white text-black border-black focus:border-black focus:outline-none transition-colors resize-none"
                    placeholder="Any special requests or dietary restrictions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-lg font-bold transition-all duration-300 border-2 border-black ${
                    isLoading
                      ? 'bg-black text-white cursor-not-allowed'
                      : 'bg-black text-white hover:bg-white hover:text-black transform hover:scale-105'
                  } shadow-lg`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Reserve Table'
                  )}
                </button>
              </form>
            </div>

            {/* Success Message */}
            <div ref={successRef} className={isSubmitted ? 'block' : 'hidden'} style={{ opacity: 0 }}>
              <div className="text-center">
                <FaCheckCircle className="text-6xl mb-4 text-green-500 mx-auto" />
                <h3 className="text-3xl font-bold text-black mb-4">Reservation Confirmed!</h3>
                <div className="bg-black rounded-lg p-4 mb-6 text-left border-2 border-black">
                  <h4 className="font-bold text-white mb-2">Reservation Details:</h4>
                  <p className="text-white"><strong>Name:</strong> {formData.name}</p>
                  <p className="text-white"><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</p>
                  <p className="text-white"><strong>Time:</strong> {formData.time}</p>
                  <p className="text-white"><strong>Guests:</strong> {formData.guests}</p>
                </div>
                <p className="text-black mb-6">
                  We've sent a confirmation email to {formData.email}. We look forward to serving you!
                </p>
                <button
                  onClick={resetForm}
                  className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
                >
                  Make Another Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSystem;
