import { openingHours, socials } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { SplitText} from 'gsap/all';
import gsap from 'gsap';
import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAccessTime,
  MdShare,
  MdDirections,
  MdCall,
  MdMailOutline
} from 'react-icons/md';
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

const Contact = () => {
 	useGSAP(() => {
		const titleSplit = SplitText.create('#contact h2', { type: 'words' });

		const timeline = gsap.timeline({
		 scrollTrigger: {
			trigger: '#contact',
			start: 'top center',
		 },
		 ease: "power1.inOut"
		})

	 timeline
		.from(titleSplit.words, {
		 opacity: 0, yPercent: 100, stagger: 0.02
	 })
		.from('.contact-card', {
			opacity: 0,
			y: 50,
			scale: 0.9,
			stagger: 0.1,
			duration: 0.6,
			ease: 'back.out(1.7)'
	 })
		.from('.social-icon', {
			opacity: 0,
			scale: 0,
			rotation: 180,
			stagger: 0.05,
			duration: 0.4,
			ease: 'back.out(1.7)'
		})
		.to('#f-right-leaf', {
		 y: '-50',
		 rotation: 5,
		 duration: 1,
		 ease: 'power1.inOut'
	 }).to('#f-left-leaf', {
		 y: '-50',
		 rotation: -5,
		 duration: 1,
		 ease: 'power1.inOut'
	 }, '<')

	 // Add hover animations for cards
	 gsap.utils.toArray('.contact-card').forEach(card => {
		card.addEventListener('mouseenter', () => {
			gsap.to(card, {
				scale: 1.05,
				y: -10,
				duration: 0.3,
				ease: 'power2.out'
			});
		});

		card.addEventListener('mouseleave', () => {
			gsap.to(card, {
				scale: 1,
				y: 0,
				duration: 0.3,
				ease: 'power2.out'
			});
		});
	 });
	})
 
 return (
	<footer id="contact" className="relative bg-black text-white overflow-hidden">
	 {/* Enhanced leaf images with better visibility */}
	 <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" className="leaf-image" />
	 <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" className="leaf-image" />

	 {/* Enhanced Background decorative elements */}
	 <div className="absolute inset-0 opacity-10">
		<div className="absolute top-20 left-20 w-32 h-32 border border-white/30 rounded-full animate-pulse"></div>
		<div className="absolute bottom-32 right-32 w-24 h-24 border border-white/30 rounded-full animate-pulse delay-1000"></div>
		<div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/30 rounded-full animate-pulse delay-2000"></div>
		<div className="absolute top-1/3 right-1/4 w-20 h-20 border border-white/30 rounded-full animate-pulse delay-3000"></div>

		{/* Floating particles */}
		<div className="absolute top-10 left-1/3 w-2 h-2 bg-white/20 rounded-full floating-particle"></div>
		<div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white/30 rounded-full floating-particle delay-1000"></div>
		<div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-white/15 rounded-full floating-particle delay-2000"></div>
		<div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-white/25 rounded-full floating-particle delay-3000"></div>
	 </div>

	 {/* Gradient overlay for depth */}
	 <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/70 pointer-events-none"></div>

	 <div className="content relative z-10">
		{/* Ultra-Premium Title Section */}
		<div className="text-center mb-40 relative">
			{/* Advanced dynamic background system */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/8 via-white/3 to-transparent animate-pulse"></div>
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/5 animate-pulse delay-1000"></div>
				<div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
				<div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/2 rounded-full blur-3xl animate-pulse delay-3000"></div>
			</div>

			<div className="inline-block relative">
				{/* Ultra-advanced multi-layered glow system */}
				<div className="absolute -inset-12 bg-gradient-to-r from-white/20 via-white/12 to-white/20 blur-3xl opacity-70 animate-pulse"></div>
				<div className="absolute -inset-8 bg-gradient-to-r from-white/15 via-white/8 to-white/15 blur-2xl opacity-50 animate-pulse delay-300"></div>
				<div className="absolute -inset-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-xl opacity-30 animate-pulse delay-600"></div>

				<h2 className="text-8xl md:text-[10rem] lg:text-[14rem] font-black mb-16 relative z-10 leading-none">
					<span className="bg-gradient-to-r from-white via-gray-50 to-white bg-clip-text text-transparent drop-shadow-2xl tracking-tight relative">
						Where to
						{/* Text depth effect */}
						<span className="absolute inset-0 text-white/5 blur-sm scale-105">Where to</span>
					</span>
					<br />
					<span className="bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-clip-text text-transparent drop-shadow-2xl tracking-wider relative">
						Find Us
						{/* Text depth effect */}
						<span className="absolute inset-0 text-white/5 blur-sm scale-105">Find Us</span>
					</span>

					{/* Advanced animated underline constellation */}
					<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
						<div className="flex gap-1">
							<div className="w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
							<div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200"></div>
						</div>
						<div className="w-20 h-1 bg-gradient-to-r from-white via-white/80 to-white rounded-full animate-pulse delay-400"></div>
						<div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center animate-pulse delay-600 border-2 border-white/40">
							<div className="w-2 h-2 bg-white rounded-full"></div>
						</div>
						<div className="w-20 h-1 bg-gradient-to-l from-white via-white/80 to-white rounded-full animate-pulse delay-800"></div>
						<div className="flex gap-1">
							<div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-1000"></div>
							<div className="w-3 h-3 bg-white/80 rounded-full animate-pulse delay-1200"></div>
						</div>
					</div>
				</h2>
			</div>

			{/* Ultra-Advanced Decorative Constellation */}
			<div className="flex items-center justify-center gap-12 mb-12">
				<div className="flex items-center gap-3">
					<div className="w-32 h-px bg-gradient-to-r from-transparent via-white/60 to-white animate-pulse"></div>
					<div className="relative">
						<div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
						<div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping opacity-30"></div>
					</div>
					<div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-200"></div>
				</div>

				<div className="relative">
					<div className="w-10 h-10 bg-white/15 rounded-full animate-pulse border-2 border-white/50 backdrop-blur-sm"></div>
					<div className="absolute inset-0 w-10 h-10 bg-white rounded-full animate-ping opacity-15"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/80 rounded-full"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>

					{/* Orbital elements */}
					<div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-500"></div>
					<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-700"></div>
					<div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-900"></div>
					<div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full animate-pulse delay-1100"></div>
				</div>

				<div className="flex items-center gap-3">
					<div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-200"></div>
					<div className="relative">
						<div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
						<div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping opacity-30"></div>
					</div>
					<div className="w-32 h-px bg-gradient-to-l from-transparent via-white/60 to-white animate-pulse"></div>
				</div>
			</div>

			<div className="max-w-5xl mx-auto">
				<p className="text-3xl md:text-4xl text-white/95 leading-relaxed font-light mb-6">
					Experience the perfect blend of <span className="text-white font-bold bg-white/10 px-2 py-1 rounded-lg">sophistication</span> and <span className="text-white font-bold bg-white/10 px-2 py-1 rounded-lg">warmth</span>
				</p>
				<p className="text-xl text-white/85 leading-relaxed mb-4">
					in our carefully crafted space where <span className="text-white font-semibold italic bg-gradient-to-r from-white/10 to-white/5 px-3 py-1 rounded-full">every visit tells a story</span>
				</p>
				<p className="text-lg text-white/70 leading-relaxed">
					Discover an atmosphere that transcends the ordinary, where every detail has been meticulously designed for your comfort and enjoyment.
				</p>
			</div>

			{/* Advanced Floating Constellation Elements */}
			<div className="absolute -top-20 left-1/6 w-10 h-10 border-2 border-white/20 rounded-full animate-float delay-1000 backdrop-blur-sm">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full"></div>
			</div>
			<div className="absolute -top-12 right-1/4 w-8 h-8 border border-white/25 rounded-full animate-float delay-2000 backdrop-blur-sm">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/50 rounded-full"></div>
			</div>
			<div className="absolute top-8 left-1/3 w-6 h-6 border border-white/30 rounded-full animate-float delay-3000 backdrop-blur-sm">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/60 rounded-full"></div>
			</div>
			<div className="absolute top-16 right-1/6 w-7 h-7 border border-white/22 rounded-full animate-float delay-4000 backdrop-blur-sm">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/45 rounded-full"></div>
			</div>
			<div className="absolute -top-6 left-1/2 w-4 h-4 border border-white/35 rounded-full animate-float delay-5000 backdrop-blur-sm">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/70 rounded-full"></div>
			</div>
		</div>

		{/* Interactive Map Section */}
		<div className="max-w-7xl mx-auto mb-20 px-6 map-container">
			<div className="relative">
				{/* Map Container */}
				<div className="relative bg-black/80 rounded-3xl p-8 border border-white/30 shadow-2xl overflow-hidden">
					{/* Decorative background elements */}
					<div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
					<div className="absolute bottom-0 left-0 w-32 h-32 bg-white/3 rounded-full blur-2xl"></div>

					<div className="relative z-10">
						{/* Enhanced Map Header */}
						<div className="text-center mb-12">
							<div className="inline-block relative mb-6">
								{/* Icon container with glow effect */}
								<div className="w-20 h-20 bg-gradient-to-br from-red-500/30 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/50">
									<svg className="w-10 h-10 text-red-400" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
									</svg>
									<div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
								</div>

								<h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-wide">
									<span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
										Find Us in Srikakulam
									</span>
								</h3>

								{/* Decorative underline */}
								<div className="flex items-center justify-center gap-3 mb-4">
									<div className="w-16 h-px bg-gradient-to-r from-transparent to-red-400"></div>
									<div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
									<div className="w-16 h-px bg-gradient-to-l from-transparent to-red-400"></div>
								</div>
							</div>

							<p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
								Located at the heart of <span className="text-white font-semibold">RGUKT Srikakulam campus</span> -
								where tradition meets innovation in every sip
							</p>
						</div>

						{/* Dual Map Layout */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
							{/* Interactive Google Map */}
							<div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/30 group">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.8234567890123!2d83.89876543210987!3d18.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c1234567890ab%3A0x1234567890abcdef!2sRGUKT%20Srikakulam!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
									width="100%"
									height="350"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="w-full h-[350px] rounded-2xl"
									title="REDEX Location - RGUKT Srikakulam"
								></iframe>

								{/* Map Overlay with Location Info */}
								<div className="absolute top-4 left-4 bg-black/90 text-white p-3 rounded-xl border border-white/30">
									<div className="flex items-center gap-2">
										<div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
										<div>
											<p className="font-semibold text-sm">REDEX Bar</p>
											<p className="text-xs text-white/80">Interactive Map</p>
										</div>
									</div>
								</div>

								{/* Map Controls */}
								<div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<button className="bg-black/80 text-white p-2 rounded-lg border border-white/40 hover:bg-black/90 transition-all duration-300">
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
										</svg>
									</button>
									<button className="bg-black/80 text-white p-2 rounded-lg border border-white/40 hover:bg-black/90 transition-all duration-300">
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
										</svg>
									</button>
								</div>
							</div>

							{/* Custom Map Image */}
							<div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/30 group">
								{/* Map Image Container */}
								<div className="relative h-[350px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
									{/* Custom Map Illustration */}
									<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-green-900/20 to-gray-900/20"></div>

									{/* Map Roads and Landmarks */}
									<svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 350" fill="none">
										{/* Background */}
										<rect width="400" height="350" fill="url(#mapGradient)" />

										{/* Roads */}
										<path d="M0 175 L400 175" stroke="#4A5568" strokeWidth="8" opacity="0.8" />
										<path d="M200 0 L200 350" stroke="#4A5568" strokeWidth="6" opacity="0.6" />
										<path d="M100 100 L300 250" stroke="#2D3748" strokeWidth="4" opacity="0.5" />

										{/* RGUKT Campus Area */}
										<rect x="150" y="125" width="100" height="100" rx="10" fill="#2B6CB0" opacity="0.3" stroke="#3182CE" strokeWidth="2" />

										{/* Buildings */}
										<rect x="160" y="140" width="20" height="15" rx="2" fill="#E2E8F0" opacity="0.8" />
										<rect x="185" y="135" width="25" height="20" rx="2" fill="#E2E8F0" opacity="0.8" />
										<rect x="215" y="145" width="18" height="12" rx="2" fill="#E2E8F0" opacity="0.8" />
										<rect x="170" y="165" width="22" height="18" rx="2" fill="#E2E8F0" opacity="0.8" />
										<rect x="200" y="170" width="20" height="15" rx="2" fill="#E2E8F0" opacity="0.8" />

										{/* REDEX Location Marker */}
										<circle cx="200" cy="175" r="8" fill="#EF4444" />
										<circle cx="200" cy="175" r="12" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.6">
											<animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
											<animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
										</circle>

										{/* Trees/Green Areas */}
										<circle cx="120" cy="80" r="15" fill="#48BB78" opacity="0.4" />
										<circle cx="280" cy="90" r="12" fill="#48BB78" opacity="0.4" />
										<circle cx="80" cy="250" r="18" fill="#48BB78" opacity="0.4" />
										<circle cx="320" cy="280" r="14" fill="#48BB78" opacity="0.4" />

										{/* Gradient Definition */}
										<defs>
											<linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
												<stop offset="0%" stopColor="#1A202C" />
												<stop offset="50%" stopColor="#2D3748" />
												<stop offset="100%" stopColor="#1A202C" />
											</linearGradient>
										</defs>
									</svg>

									{/* Map Labels */}
									<div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-lg text-xs">
										<p className="font-semibold">Srikakulam District</p>
										<p className="text-white/80">Andhra Pradesh</p>
									</div>

									{/* REDEX Location Label */}
									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
										REDEX
									</div>

									{/* Campus Label */}
									<div className="absolute bottom-4 right-4 bg-blue-600/80 backdrop-blur-sm text-white p-2 rounded-lg text-xs">
										<p className="font-semibold">Etcherla</p>
										<p className="text-white/80">Main Building</p>
									</div>
								</div>

								{/* Map Image Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

								{/* Map Type Indicator */}
								<div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg border border-white/20">
									<p className="text-xs font-semibold">🗺️ Campus Map</p>
								</div>
							</div>
						</div>

						{/* Enhanced Location Features Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
							{/* Campus Location */}
							<div className="group text-center p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-500 hover:transform hover:scale-105">
								<div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
									<svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.84L18 12v7h-2v-6H8v6H6v-7l6-6.16z"/>
									</svg>
								</div>
								<h4 className="font-bold text-white mb-2 text-lg">Campus Location</h4>
								<p className="text-white/80 text-sm leading-relaxed">Srikakulam , Main Building Complex</p>
								<div className="mt-3 text-xs text-blue-400 font-medium">📍 Pincode: 532001</div>
							</div>

							{/* Transportation */}
							<div className="group text-center p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-500 hover:transform hover:scale-105">
								<div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
									<svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
										<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
									</svg>
								</div>
								<h4 className="font-bold text-white mb-2 text-lg">Easy Access</h4>
								<p className="text-white/80 text-sm leading-relaxed">Free parking, bus stop nearby, auto-rickshaw available</p>
								<div className="mt-3 text-xs text-green-400 font-medium">🚌 Public Transport</div>
							</div>

							{/* Contact Info */}
							<div className="group text-center p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-500 hover:transform hover:scale-105">
								<div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
									<svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
									</svg>
								</div>
								<h4 className="font-bold text-white mb-2 text-lg">Contact Info</h4>
								<p className="text-white/80 text-sm leading-relaxed">redex@rgukt.ac.in<br/>+91 8942 123456</p>
								<div className="mt-3 text-xs text-purple-400 font-medium">📞 24/7 Support</div>
							</div>

							{/* Operating Hours */}
							<div className="group text-center p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-500 hover:transform hover:scale-105">
								<div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
									<svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
									</svg>
								</div>
								<h4 className="font-bold text-white mb-2 text-lg">Opening Hours</h4>
								<p className="text-white/80 text-sm leading-relaxed">Mon-Sun: 6:00 PM - 11:00 PM<br/>Happy Hour: 6-8 PM</p>
								<div className="mt-3 text-xs text-orange-400 font-medium">🕕 Open Now</div>
							</div>
						</div>

						{/* Additional Features Section */}
						<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Weather & Best Time to Visit */}
							<div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-2xl p-6 border border-white/30">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-full flex items-center justify-center">
										<svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
										</svg>
									</div>
									<h4 className="text-xl font-bold text-white">Best Time to Visit</h4>
								</div>
								<p className="text-white/80 mb-3">Perfect weather year-round in Srikakulam! Evening hours offer the most comfortable temperature for outdoor seating.</p>
								<div className="flex items-center gap-4 text-sm">
									<span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">🌤️ 28°C Today</span>
									<span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">💨 Light Breeze</span>
								</div>
							</div>

							{/* Special Features */}
							<div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-2xl p-6 border border-white/30">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-full flex items-center justify-center">
										<svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
										</svg>
									</div>
									<h4 className="text-xl font-bold text-white">Special Features</h4>
								</div>
								<div className="space-y-2 text-white/80">
									<div className="flex items-center gap-2">
										<span className="w-2 h-2 bg-pink-400 rounded-full"></span>
										<span>Live DJ every Friday & Saturday</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="w-2 h-2 bg-pink-400 rounded-full"></span>
										<span>Outdoor terrace with city views</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="w-2 h-2 bg-pink-400 rounded-full"></span>
										<span>Private party bookings available</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="w-2 h-2 bg-pink-400 rounded-full"></span>
										<span>Student discounts with ID</span>
									</div>
								</div>
							</div>
						</div>

						{/* Quick Actions Section */}
						<div className="mt-12 bg-gradient-to-r from-gray-800/80 via-gray-900/80 to-gray-800/80 rounded-2xl p-8 border border-white/30">
							<div className="text-center mb-6">
								<h4 className="text-2xl font-bold text-white mb-2">Quick Actions</h4>
								<p className="text-white/70">Everything you need to plan your visit</p>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{/* Get Directions */}
								<button
									onClick={() => window.open('https://maps.google.com/?q=RGUKT+Srikakulam', '_blank')}
									className="group bg-gradient-to-br from-blue-500/30 to-blue-600/20 hover:from-blue-500/40 hover:to-blue-600/30 rounded-xl p-4 border border-blue-500/40 hover:border-blue-500/60 transition-all duration-300"
								>
									<div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
											<path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.39.39-1.02 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/>
										</svg>
									</div>
									<span className="text-white text-sm font-medium">Directions</span>
								</button>

								{/* Call Now */}
								<button
									onClick={() => window.open('tel:+918942123456', '_self')}
									className="group bg-gradient-to-br from-green-500/30 to-green-600/20 hover:from-green-500/40 hover:to-green-600/30 rounded-xl p-4 border border-green-500/40 hover:border-green-500/60 transition-all duration-300"
								>
									<div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
											<path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
										</svg>
									</div>
									<span className="text-white text-sm font-medium">Call Now</span>
								</button>

								{/* Share Location */}
								<button
									onClick={() => {
										if (navigator.share) {
											navigator.share({
												title: 'REDEX Cocktail Bar',
												text: 'Check out REDEX Cocktail Bar at RGUKT Srikakulam!',
												url: window.location.href
											});
										} else {
											navigator.clipboard.writeText(window.location.href);
											alert('Location link copied to clipboard!');
										}
									}}
									className="group bg-gradient-to-br from-purple-500/30 to-purple-600/20 hover:from-purple-500/40 hover:to-purple-600/30 rounded-xl p-4 border border-purple-500/40 hover:border-purple-500/60 transition-all duration-300"
								>
									<div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
											<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
										</svg>
									</div>
									<span className="text-white text-sm font-medium">Share</span>
								</button>

								{/* Save Location */}
								<button
									onClick={() => {
										const contact = {
											name: 'REDEX Cocktail Bar',
											phone: '+918942123456',
											email: 'redex@rgukt.ac.in',
											address: 'RGUKT Srikakulam Campus, Srikakulam, Andhra Pradesh 532001'
										};
										const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phone}
EMAIL:${contact.email}
ADR:;;${contact.address};;;;
END:VCARD`;
										const blob = new Blob([vCard], { type: 'text/vcard' });
										const url = URL.createObjectURL(blob);
										const a = document.createElement('a');
										a.href = url;
										a.download = 'redex-contact.vcf';
										a.click();
									}}
									className="group bg-gradient-to-br from-orange-500/30 to-orange-600/20 hover:from-orange-500/40 hover:to-orange-600/30 rounded-xl p-4 border border-orange-500/40 hover:border-orange-500/60 transition-all duration-300"
								>
									<div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
											<path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V7h10v2z"/>
										</svg>
									</div>
									<span className="text-white text-sm font-medium">Save</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		{/* Revolutionary Content Grid */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-8xl mx-auto mb-24 px-6">

			{/* Enhanced Location Card with Map Integration */}
			<div className="contact-card bg-gradient-to-br from-gray-800/90 to-gray-900/90 text-white rounded-3xl p-10 shadow-2xl hover:shadow-4xl transition-all duration-700 group relative overflow-hidden border border-white/30">
				{/* Dynamic background effects */}
				<div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-transparent rounded-3xl"></div>
				<div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

				<div className="text-center relative z-10">
					{/* Enhanced icon container */}
					<div className="relative mx-auto mb-8">
						<div className="w-24 h-24 bg-gradient-to-br from-white/35 to-white/20 rounded-2xl flex items-center justify-center border border-white/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
							<FaMapMarkerAlt className="text-4xl text-white drop-shadow-lg" />
						</div>
						<div className="absolute -inset-2 bg-white/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
						{/* Pulsing location indicator */}
						<div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
					</div>

					<h3 className="text-3xl font-black mb-4 uppercase tracking-wider text-white">Visit Our Bar</h3>
					<div className="flex items-center justify-center gap-2 mb-6">
						<div className="w-8 h-px bg-white/60"></div>
						<div className="w-2 h-2 bg-white rounded-full"></div>
						<div className="w-8 h-px bg-white/60"></div>
					</div>

					<div className="bg-gray-800/60 rounded-2xl p-6 mb-6 border border-white/30">
						<p className="text-xl font-bold mb-2 text-white flex items-center justify-center gap-2">
							📍 RGUKT Srikakulam
						</p>
						<p className="text-white/80 leading-relaxed mb-3">Experience craft cocktails in our sophisticated lounge</p>
						<div className="text-sm text-white/70">
							<p>📧 redex@rgukt.ac.in</p>
							<p>📞 +91 8942 123456</p>
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<button
							onClick={() => window.open('https://maps.google.com/?q=RGUKT+Srikakulam', '_blank')}
							className="bg-gradient-to-r from-white/30 to-white/20 text-white px-10 py-4 rounded-2xl hover:bg-white hover:text-black border border-white/40 transition-all duration-500 flex items-center gap-3 mx-auto group-hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
						>
							<MdDirections className="text-xl" />
							Get Directions
						</button>
						<button
							onClick={() => {
								const mapSection = document.querySelector('.map-container');
								if (mapSection) {
									mapSection.scrollIntoView({ behavior: 'smooth' });
								}
							}}
							className="bg-gray-800/60 text-white px-8 py-3 rounded-xl hover:bg-gray-700/60 border border-white/30 transition-all duration-300 flex items-center gap-2 mx-auto text-sm font-medium"
						>
							🗺️ View on Map
						</button>
					</div>
				</div>
			</div>

			{/* Contact Card */}
			<div className="contact-card glass-card text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
				<div className="text-center relative">
					<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

					<div className="relative z-10">
						<div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/40 group-hover:scale-110 transition-transform duration-300">
							<FaPhoneAlt className="text-3xl text-white drop-shadow-lg" />
						</div>
						<h3 className="text-2xl font-bold mb-3 uppercase tracking-wide text-white">Contact Us</h3>
						<div className="w-12 h-px bg-white/50 mx-auto mb-4"></div>
						<div className="space-y-4 mb-6">
							<div className="flex items-center justify-center gap-3 text-white/90 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
								<MdPhone className="text-xl" />
								<p className="text-lg font-medium">1234567890</p>
							</div>
							<div className="flex items-center justify-center gap-3 text-white/90 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
								<MdEmail className="text-xl" />
								<p className="text-lg font-medium">red@gmail.com</p>
							</div>
						</div>
						<button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl hover:bg-white hover:text-black border border-white/30 transition-all duration-300 flex items-center gap-3 mx-auto group-hover:scale-105">
							<MdCall className="text-lg" />
							Call Now
						</button>
					</div>
				</div>
			</div>

			{/* Hours Card */}
			<div className="contact-card glass-card text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
				<div className="text-center relative">
					<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

					<div className="relative z-10">
						<div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/40 group-hover:scale-110 transition-transform duration-300">
							<FaClock className="text-3xl text-white drop-shadow-lg" />
						</div>
						<h3 className="text-2xl font-bold mb-3 uppercase tracking-wide text-white">Open Every Day</h3>
						<div className="w-12 h-px bg-white/50 mx-auto mb-4"></div>
						<div className="space-y-3 mb-6 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
							{openingHours.map((time) => (
								<div key={time.day} className="flex justify-between items-center text-sm text-white/90 border-b border-white/20 pb-2 last:border-b-0 last:pb-0">
									<span className="font-semibold">{time.day}</span>
									<span className="font-medium">{time.time}</span>
								</div>
							))}
						</div>
						<div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl text-sm font-bold border border-green-400/30 group-hover:scale-105 transition-transform duration-300">
							<MdAccessTime className="inline mr-2 text-green-400" />
							Always Open
						</div>
					</div>
				</div>
			</div>

			{/* Social Media Card */}
			<div className="contact-card glass-card text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
				<div className="text-center relative">
					<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

					<div className="relative z-10">
						<div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/40 group-hover:scale-110 transition-transform duration-300">
							<MdShare className="text-3xl text-white drop-shadow-lg" />
						</div>
						<h3 className="text-2xl font-bold mb-3 uppercase tracking-wide text-white">Follow Us</h3>
						<div className="w-12 h-px bg-white/50 mx-auto mb-4"></div>
						<p className="text-sm mb-6 text-white/80">Stay connected for updates & events</p>
						<div className="flex justify-center gap-4 mb-4">
							{socials.map((social) => (
								<a
									key={social.name}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.name}
									className="social-icon w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black border border-white/30 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
								>
									{social.name === 'Instagram' && <FaInstagram className="text-white hover:text-black text-xl" />}
									{social.name === 'Facebook' && <FaFacebook className="text-white hover:text-black text-xl" />}
									{social.name === 'Twitter' && <FaTwitter className="text-white hover:text-black text-xl" />}
									{social.name === 'LinkedIn' && <FaLinkedin className="text-white hover:text-black text-xl" />}
								</a>
							))}
						</div>
						<p className="text-xs text-white/60">Join our community of cocktail enthusiasts</p>
					</div>
				</div>
			</div>
		</div>

		{/* Bottom CTA Section */}
		<div className="text-center glass-card text-white rounded-2xl p-8 max-w-4xl mx-auto">
			<h3 className="text-3xl font-bold mb-4 text-white">Ready for an Unforgettable Experience?</h3>
			<p className="text-lg mb-6 text-white/80">
				Join us for expertly crafted cocktails in an atmosphere that's both sophisticated and welcoming.
			</p>
			<div className="flex flex-col sm:flex-row gap-4 justify-center">
				<button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black border border-white/30 transition-all duration-300 flex items-center gap-2 justify-center">
					<MdLocationOn className="text-lg" />
					Visit Us Today
				</button>
				<button className="bg-white text-black px-8 py-3 rounded-lg hover:bg-white/20 hover:text-white border border-white/30 transition-all duration-300 flex items-center gap-2 justify-center">
					<MdMailOutline className="text-lg" />
					Get in Touch
				</button>
			</div>
		</div>
	 </div>
	</footer>
 )
}

export default Contact
