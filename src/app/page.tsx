'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Menu, X, Github, Download, Mail, ExternalLink, ChevronRight, Send, MapPin, Phone, Facebook, Instagram, TwitterIcon, LinkedinIcon, MailPlus } from 'lucide-react';
import Image from 'next/image';
import GitHubContributionGraph from './GitHubContributionGraph'; // Adjust the path as needed
import GitLabContributionGraph from './GitLabContributionGraph'; // Adjust the path as needed

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const assetPrefix = process.env.NODE_ENV === 'production'
    ? '/tharinduathapaththu.portfolio.io'
    : '';

  useEffect(() => {
    // Simulating content loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to section when activeSection changes
  useEffect(() => {
    if (!isLoading) {
      const element = document.getElementById(activeSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection, isLoading]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const stats = {
    totalProjects: 11,
    totalContributions: 15,
    totalRepositories: 11
  };

  const projects = [
    {
      id: 1,
      title: 'YOOZ Ibiza | Algeria',
      imageUrl: '${assetPrefix}/images/projects/1.png',
      subtitle: 'Telco App',
      category: 'Android, Huawei',
      description: 'Developed the YOOZ mobile app for Ooredoo Algeria using native Android (Java), with support for Android, and Huawei. Integrated RESTful APIs, analytics tools, and Unity features within a scalable MVM architecture.',
      fullDescription: 'YOOZ Ibiza is a premier telecommunications application developed for Ooredoo Algeria, offering users a seamless and feature-rich mobile experience. As a native Android application built with Java, the app delivers exceptional performance and reliability across the Android ecosystem, including specialized support for Huawei devices.\nThe development of YOOZ Ibiza focused on creating a robust architecture using the Model-View-Model (MVM) pattern, ensuring scalability and maintainability as new features are added. This architectural choice facilitates efficient data management and responsive user interfaces, key factors in providing a smooth telecom service experience.\nIntegration with RESTful APIs forms the backbone of the application, enabling real-time communication with Ooredoo\'s backend services. This allows users to access account information, manage services, track usage, and perform transactions securely from their mobile devices. The comprehensive API implementation ensures that all telecom services are accessible directly through the application interface.\nA standout feature of YOOZ Ibiza is its incorporation of Unity 3D elements, bringing interactive and engaging visual components to what would typically be a utilitarian telecom application. This innovative approach enhances user engagement and differentiates YOOZ from competitors in the telecommunications app market.\nAnalytics tools have been seamlessly integrated into the application architecture, providing valuable insights into user behavior, feature usage, and performance metrics. This data-driven approach allows for continuous improvement of the application based on actual user interactions and preferences.\nThe user interface, designed with Adobe XD, offers an intuitive and visually appealing experience that adheres to modern design principles while maintaining brand consistency with Ooredoo\'s visual identity. The UI implementation utilizes XML for layout design, ensuring compatibility across various Android devices and screen sizes.\nFor Huawei users, specialized integration with Huawei App Gallery Connect (AGC) services ensures full functionality even without Google Mobile Services, addressing the needs of a significant portion of the Algerian market using Huawei devices.\nYOOZ Ibiza represents a comprehensive telecom solution that balances functional utility with user experience, providing Ooredoo Algeria customers with a powerful tool to manage their telecommunications needs efficiently and effectively. The application\'s availability on both Google Play Store and Huawei AppGallery maximizes its reach across the Algerian mobile user base.',
      technologies: ['Native Android', 'Firebase', 'Huawei AGC', 'Unity 3D', 'JAVA', 'XML', 'Adobe XD', 'Android Studio', 'JIRA'],
      images: ['${assetPrefix}/images/projects/1/6.jpg', '${assetPrefix}/images/projects/1/2.jpg', '/images/projects/1/4.jpg', '/images/projects/1/3.jpg', '/images/projects/1/5.jpg'],
      color: 'bg-blue-500',
      urls: [
        {
          link: 'https://play.google.com/store/apps/details?id=dz.ooredoo.ibiza&hl=en',
          type: 'playstore',
          isWorking: true
        },
        {
          link: 'https://appgallery.huawei.com/app/C103964575?sharePrepath=ag&locale=en_GB&source=appshare&subsource=C103964575&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=4b0f9e5204794469be7a2c229ad41ff4_com.android.bluetooth&callType=SHARE',
          type: 'appgallery',
          isWorking: true
        }
      ]
    },
    {
      id: 2,
      title: 'My Ooredoo | Algeria',
      imageUrl: '/images/projects/3.png',
      subtitle: 'Telco App',
      category: 'iOS, Android, Huawei',
      description: 'Built a cross-platform telco service app using Flutter and Dart, integrating RESTful APIs, Firebase & Huawei Analytics, and Bloc architecture. Enabled Add-to-App functionality and optimized performance across iOS, Android, and Huawei devices.',
      fullDescription: 'My Ooredoo Algeria is a comprehensive telecommunications service application that empowers users with complete control over their Ooredoo accounts and services. Developed using Flutter and Dart, this cross-platform solution delivers a consistent and responsive experience across iOS, Android, and Huawei devices, ensuring all Ooredoo customers receive the same high-quality service regardless of their device preference.\nThe application architecture is built on the robust Bloc pattern, providing excellent state management and a clean separation of concerns that enhances maintainability and facilitates feature expansion. This architectural choice has allowed the development team to rapidly deploy new features while maintaining application stability.\nIntegration with RESTful APIs forms the core of the application\'s functionality, enabling real-time access to account information, service management, billing details, and usage statistics. Users can easily monitor their data consumption, voice minutes, and SMS usage through intuitive visualization tools and receive timely notifications when approaching plan limits.\nThe app incorporates dual analytics solutions with both Firebase Analytics and Huawei Analytics integration, ensuring comprehensive usage data collection across all platforms. This analytics implementation provides valuable insights into user behavior patterns, feature popularity, and potential pain points, driving continuous improvement of the application.\nA standout technical achievement of My Ooredoo Algeria is its implementation of Add-to-App functionality, allowing the Flutter modules to be seamlessly integrated into existing native applications. This approach facilitated a gradual migration strategy from older native implementations to the new Flutter codebase without disrupting the user experience.\nPerformance optimization was a key focus during development, with special attention paid to reducing app size, minimizing memory usage, and ensuring smooth operation even on lower-end devices. Custom rendering optimizations and efficient resource management contribute to the app\'s responsive interface and quick loading times.\nThe app features a comprehensive suite of self-service tools including bill payment, package subscription management, balance transfers, and service activation/deactivation. The implementation of secure authentication protocols and encrypted data transmission ensures that all user information and transactions remain protected.\nLocalization support for Arabic, French, and English makes the application accessible to Algeria\'s linguistically diverse population, while adaptive UI elements ensure proper display regardless of language direction or text length.\nIntegration with CleverTap enables sophisticated customer engagement through personalized communications, targeted promotions, and behavior-based notifications that enhance the overall customer experience and drive engagement with Ooredoo services.\nMy Ooredoo Algeria represents a significant achievement in telecommunications app development, combining technical excellence with thoughtful UX design to deliver a solution that simplifies account management and enhances the customer relationship with Ooredoo\'s services.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Huawei Cloud', 'Android Studio', 'JIRA', 'Figma', 'CleverTap'],
      images: ['/images/projects/2/1.png', '/images/projects/2/2.png', '/images/projects/2/3.png', '/images/projects/2/4.png', '/images/projects/2/5.png'],
      color: 'bg-red-500',
      urls: [
        {
          link: 'https://play.google.com/store/apps/details?id=com.algeria.selfcare.app.android&hl=en',
          type: 'playstore',
          isWorking: true
        },
        {
          link: 'https://apps.apple.com/lk/app/my-ooredoo-algeria/id1644340373',
          type: 'appstore',
          isWorking: true
        },
        {
          link: 'https://appgallery.huawei.com/app/C107690933?sharePrepath=ag&locale=en_GB&source=appshare&subsource=C107690933&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=703dc3721a784d2091525a1c0e6b25a4_com.android.bluetooth&callType=SHARE',
          type: 'appgallery',
          isWorking: true
        }
      ]
    },
    {
      id: 3,
      title: 'Odoo Merchant | Kuwait (In-progress)',
      imageUrl: '/images/projects/5.png',
      subtitle: 'Logistic services',
      category: 'iOS, Android',
      description: 'Developing a delivery service solution with separate Flutter apps for drivers and merchants. Integrated RESTful APIs, Google Maps for real-time tracking, and used Bloc architecture for scalable, cross-platform performance.',
      fullDescription: 'SecureChat was built with privacy as its foundation, implementing state-of-the-art cryptographic protocols to ensure that conversations remain confidential and protected from third-party access. The application features end-to-end encryption for all messages, media, and file transfers, with the encryption keys stored only on user devices. Messages can be set to automatically delete after being read or after a specified time period. The app was developed using React Native for cross-platform compatibility while maintaining strict security standards. Notable features include secure group communications, encrypted video calls, two-factor authentication, secure cloud backup options, and a verification system for confirming contact identities.',
      technologies: ['Flutter', 'Dart', 'Firebase OneSignal', 'Google Maps', 'Android Studio', 'JIRA', 'Figma', 'MS App Center', 'Apple Connect', '/images/projects/3/5.png'],
      images: ['/images/projects/3/1.png', '/images/projects/3/2.png', '/images/projects/3/3.png', '/images/projects/3/4.png', '/images/projects/3/5.png'],
      color: 'bg-blue-500',
      urls: [
        {
          link: 'https://play.google.com/store/apps/details?id=com.algeria.selfcare.app.android&hl=en',
          type: 'playstore',
          isWorking: false
        },
        {
          link: 'https://apps.apple.com/lk/app/my-ooredoo-algeria/id1644340373',
          type: 'appstore',
          isWorking: false
        }
      ]
    },
    {
      id: 4,
      title: 'Odoo Driver | Kuwait (In-progress)',
      imageUrl: '/images/projects/4.png',
      subtitle: 'Logistic services',
      category: 'iOS, Android',
      description: 'Built a cross-platform telco service app using Flutter and Dart, integrating RESTful APIs, Firebase & Huawei Analytics, and Bloc architecture. Enabled Add-to-App functionality and optimized performance across iOS, Android, and Huawei devices.',
      fullDescription: 'Odoo Merchant is an innovative logistics and delivery service platform being developed for the Kuwait market, featuring a dual-application approach that caters separately to merchants and delivery drivers. This comprehensive solution streamlines the entire delivery process from order placement to final fulfillment, creating an efficient ecosystem for all stakeholders involved in the logistics chain.\nThe merchant application provides business owners with powerful tools to manage their delivery operations, including an intuitive order dashboard, real-time delivery tracking, customizable delivery zones, and comprehensive analytics on delivery performance. Merchants can easily process new orders, assign them to available drivers, and maintain complete visibility throughout the delivery journey. The application includes features for managing inventory, setting delivery priorities, and communicating special instructions to drivers.\nThe companion driver application is optimized for mobile use in delivery scenarios, with a streamlined interface that prioritizes critical information and minimizes distractions while on the road. Drivers receive new delivery assignments with optimized routing, turn-by-turn navigation, and the ability to communicate with both merchants and customers when needed. The app includes functionality for proof of delivery, delivery exception reporting, and shift management.\nAt the technical core of both applications is a sophisticated implementation of Google Maps APIs, enabling real-time location tracking, route optimization, and accurate delivery time estimations. The integration accounts for traffic conditions, historical delivery data, and custom delivery zones to provide realistic delivery windows to all parties.\nDeveloped using Flutter and Dart, both applications share a common codebase foundation while maintaining distinct user experiences appropriate for their respective users. This cross-platform approach ensures consistent performance and feature parity across iOS and Android devices while reducing development overhead. The Bloc architecture provides robust state management and a clear separation of concerns, making the system highly maintainable and expandable as requirements evolve.\nSeamless integration with RESTful APIs connects the mobile applications to backend services, enabling real-time data synchronization, secure authentication, and reliable transaction processing. The system architecture supports high volumes of concurrent users and transactions, crucial for a logistics platform serving multiple businesses simultaneously.\nNotifications and alerts are delivered through Firebase OneSignal integration, ensuring timely updates reach the intended recipients regarding new orders, status changes, delivery completions, and potential issues. These notifications are prioritized and contextualized based on user roles and urgency levels.\nThe development process incorporates continuous integration and delivery through Microsoft App Center, allowing for rapid iteration, robust testing, and streamlined deployment to both the Play Store and App Store. This approach, combined with JIRA for project management and Figma for design collaboration, enables an agile development cycle that can quickly adapt to evolving market requirements.\nAlthough still in progressive development, Odoo Merchant represents a significant advancement in delivery logistics technology for the Kuwait market, promising to increase operational efficiency, improve customer satisfaction, and provide valuable business intelligence to participating merchants.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Huawei Cloud', 'Android Studio', 'JIRA', 'Figma', 'CleverTap'],
      images: ['/images/projects/4/1.png', '/images/projects/4/2.png', '/images/projects/4/3.png', '/images/projects/4/4.png', '/images/projects/4/5.png'],
      color: 'bg-blue-500',
      urls: [
        {
          link: 'https://play.google.com/store/apps/details?id=com.algeria.selfcare.app.android&hl=en',
          type: 'playstore',
          isWorking: false
        },
        {
          link: 'https://apps.apple.com/lk/app/my-ooredoo-algeria/id1644340373',
          type: 'appstore',
          isWorking: false
        }
      ]
    },
    {
      id: 5,
      title: 'Pay Later | Qatar',
      imageUrl: '/images/projects/6.png',
      subtitle: 'FinTech Solutions',
      category: 'iOS, Android',
      description: 'Developed a cross-platform Flutter app for managing deferred payments, using Riverpod and Clean Architecture for scalability. Integrated Dio for robust API handling and delivered a smooth, modern UI for an intuitive user experience.',
      fullDescription: 'Pay Later is a sophisticated FinTech solution developed for the Qatar market that revolutionizes the shopping experience by enabling customers to split their purchases into manageable installments. This "buy now, pay later" platform provides financial flexibility without the complexity of traditional credit applications, making it an appealing alternative for modern consumers.\nThe application is built with Flutter and Dart, ensuring a consistent, high-quality user experience across both iOS and Android platforms. This cross-platform approach was crucial for rapid market penetration in Qatar\'s diverse mobile ecosystem while maintaining a single codebase for efficient development and maintenance.\nAt the architectural level, the app implements Clean Architecture principles with clear separation between domain, data, and presentation layers. This structure enhances maintainability, testability, and scalability – critical factors for a financial application expected to evolve with market demands and regulatory requirements. The implementation of Riverpod for state management provides a reactive and predictable approach to handling application state, resulting in a more robust user experience with fewer edge-case bugs.\nThe integration with backend services is handled through Dio, a powerful HTTP client that manages the complex network operations required for financial transactions. This includes secure authentication, encrypted data transmission, transaction processing, and error handling tailored to financial contexts. The networking layer includes sophisticated retry mechanisms, connection state management, and timeout handling to ensure reliable operation even under suboptimal network conditions.\nSecurity is a paramount consideration in the Pay Later app, with implementation of biometric authentication, secure local storage for sensitive information, certificate pinning to prevent man-in-the-middle attacks, and comprehensive input validation throughout the application. These security measures comply with financial industry standards while maintaining a frictionless user experience.\nThe user interface features a clean, modern design that simplifies complex financial processes. The payment scheduling interface provides clear visualization of upcoming payments, due dates, and payment history. The onboarding process is streamlined to minimize friction, using step-by-step guidance and real-time validation to ensure users can quickly begin using the service.\nNotable features include virtual card management for online purchases, integration with popular e-commerce platforms, spending analytics with visual representations, personalized payment plans based on user financial profiles, and proactive notification systems for upcoming payments. The app also includes a merchant discovery feature that showcases partnered retailers who accept the Pay Later payment method.\nTransaction processing is optimized for both speed and accuracy, with real-time status updates and detailed receipt generation. The implementation includes comprehensive error handling with user-friendly messages that provide clear guidance when issues arise, rather than technical error codes.\nThe development process utilized Firebase for analytics and crash reporting, enabling data-driven improvements to the application based on actual usage patterns. This telemetry data, combined with direct user feedback channels within the app, creates a continuous improvement cycle that has steadily enhanced the application since its initial release.\nPay Later represents a significant advancement in consumer financial technology for the Qatar market, combining sophisticated financial functionality with an accessible user experience that makes deferred payment options available to a broader segment of consumers.',
      technologies: ['Flutter', 'Dart', 'Riverpod', 'Dio', 'Android Studio', 'Apple Connect', 'JIRA', 'Figma'],
      images: ['/images/projects/5/1.png', '/images/projects/5/2.png', '/images/projects/5/3.png', '/images/projects/5/4.png'],
      color: 'bg-purple-500',
      urls: [
        {
          link: 'https://play.google.com/store/apps/details?id=com.paylaterapp.paylater',
          type: 'playstore',
          isWorking: true
        },
        {
          link: 'https://apps.apple.com/lk/app/paylater-split-in-4-payments/id6738985290',
          type: 'appstore',
          isWorking: true
        }
      ]
    },
    {
      id: 6,
      title: 'Lot Calculator',
      imageUrl: '/images/projects/7.png',
      subtitle: 'Day-to-day App',
      category: 'Android, Huawei',
      description: 'Developed a native Android utility application for real estate calculations using Java. Implemented Firebase analytics, responsive UI with XML layouts, and published on both Google Play Store and Huawei AppGallery.',
      fullDescription: 'Lot Calculator is a specialized utility application designed for real estate professionals, construction workers, and property investors who need quick and accurate land measurement calculations. Built with native Android technologies using Java, the app delivers exceptional performance and reliability while maintaining a small footprint on users\' devices.\nThe application addresses common challenges in property development by providing a comprehensive suite of calculation tools for lot dimensions, area conversions, irregular lot measurements, and cost estimations. Users can quickly convert between different measurement units (square feet, square meters, acres, hectares) with precise results that account for regional measurement standards.\nThe user interface, designed with simplicity and efficiency in mind, features an intuitive layout that minimizes the learning curve for new users. The implementation of XML layouts ensures responsive design that adapts to various screen sizes and orientations, maintaining usability across the diverse Android device ecosystem. Input validation prevents calculation errors, while the results display includes detailed breakdowns for verification.\nFor property developers working with irregular lots, the application offers specialized tools that use coordinate inputs or multiple measurements to calculate areas that would be difficult to determine with standard formulas. The cost estimation feature allows users to input land prices and instantly calculate total costs based on various measurement units, facilitating quicker decision-making during property transactions.\nData persistence is implemented through local storage, allowing users to save frequent calculations and measurement sets for future reference. This feature is particularly valuable for professionals working across multiple properties or comparing different lot options.\nThe app incorporates Firebase Analytics for usage insights, enabling data-driven improvements based on actual user behavior and calculation patterns. This analytical approach guided several feature refinements since the initial release, including the addition of new calculation types based on observed user needs.\nHuawei AppGallery Connect integration ensures full functionality on Huawei devices, which was a significant consideration for reaching users in markets where Huawei devices are prevalent. This dual-platform availability maximized the application\'s reach across the Android ecosystem.\nWhile the application is currently unpublished from both Google Play and Huawei AppGallery, it served as a valuable tool for thousands of users during its active period, maintaining a positive rating average and generating constructive user feedback that drove continuous improvements.\nThe development process employed industry best practices, including comprehensive testing across multiple device profiles to ensure calculation accuracy and UI consistency. Version control through Git facilitated organized development and feature implementation, while regular performance profiling ensured the application remained responsive even during complex calculations.',
      technologies: ['Native Android', 'Firebase', 'Huawei AGC', 'JAVA', 'XML', 'Figma', 'Android Studio'],
      images: ['/images/projects/6/1.jpg', '/images/projects/6/2.jpg', '/images/projects/6/3.jpg', '/images/projects/6/4.jpg', '/images/projects/6/5.jpg'],
      color: 'bg-red-500',
      urls: [
        {
          link: 'https://github.com/Tharindu127/LOT_Calculator',
          type: 'repository',
          isWorking: true
        },
        {
          link: 'https://apps.apple.com/lk/app/my-ooredoo-algeria/id1644340373',
          type: 'playstore',
          isWorking: false
        },
        {
          link: 'https://appgallery.huawei.com/app/C107690933?sharePrepath=ag&locale=en_GB&source=appshare&subsource=C107690933&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=703dc3721a784d2091525a1c0e6b25a4_com.android.bluetooth&callType=SHARE',
          type: 'appgallery',
          isWorking: false
        }
      ]
    },
    {
      id: 7,
      title: 'Student Repo (In-progress)',
      imageUrl: '/images/projects/2.png',
      subtitle: 'Student Activity Management App',
      category: 'iOS, Android, Huawei',
      description: 'Designing and developing a cross-platform Flutter application for university students to track activity records, access past examination papers, and collaborate on academic resources with integrated authentication and cloud storage.',
      fullDescription: 'Student Repo is an innovative academic management platform designed to enhance the university student experience by centralizing activity tracking, resource sharing, and collaboration tools. Currently in active development, this application aims to address key challenges faced by university students in organizing their academic journey and accessing critical educational resources.\nThe application is structured around three core functionalities: activity record management, past paper repository, and collaborative study tools. The activity record component allows students to log and track participation in extracurricular events, volunteer work, leadership roles, and other non-academic accomplishments that are valuable for resume building and professional development. This feature includes verification mechanisms for official university events and customizable categorization for different types of activities.\nThe past paper repository provides a structured, searchable database of previous year examination papers, organized by course, semester, and exam type. This functionality addresses the common challenge of fragmented access to past papers, which are crucial study resources but often difficult to locate consistently. The repository implements version control for papers, ensuring students always access the most recent and relevant materials while maintaining an archive of historical content.\nCollaborative features enable peer-to-peer knowledge sharing through discussion threads attached to specific papers, collaborative note-taking, and question flagging for difficult concepts. These social elements transform the application from a static repository into an interactive learning community, fostering peer support and collaborative problem-solving among the student body.\nDeveloped using Flutter and Dart, the application delivers a consistent experience across iOS, Android, and Huawei devices, reaching the entire student population regardless of device preference. This cross-platform approach streamlines development while ensuring a native-like experience on each platform through careful attention to platform-specific UI/UX considerations.\nBackend services are implemented through Firebase, providing reliable authentication, real-time database synchronization, and cloud storage for academic documents. The authentication system integrates with university credentials where possible, simplifying user onboarding while maintaining security. Cloud storage implementation includes optimized document rendering for quick viewing of papers without requiring full downloads.\nThe user interface, designed through iterative prototyping in Figma, prioritizes intuitive navigation and efficiency – recognizing that students often access such tools during high-pressure study periods when cognitive load is already high. The UI implements a system of visual cues and organization that reduces the time needed to locate specific resources or log activities.\nPrivacy and data protection are carefully considered in the application architecture, with granular control over what activity information is shared publicly versus kept private. Academic integrity features prevent unauthorized distribution of certain materials while still enabling legitimate study activities.\nThe development approach incorporates continuous user feedback from student beta testers, ensuring the evolving feature set remains aligned with actual student needs rather than assumptions. This user-centered design process has already led to several refinements in the interface and feature prioritization based on real-world usage patterns.\nOnce completed, Student Repo will represent a significant advancement in academic support technology, providing a comprehensive digital companion that enhances organization, resource access, and peer collaboration throughout the university journey.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Huawei Cloud', 'Android Studio', 'JIRA', 'Figma'],
      images: ['/images/projects/7/1.png', '/images/projects/7/2.png', '/images/projects/7/3.png', '/images/projects/7/4.png'],
      color: 'bg-cyan-500',
      urls: [
        {
          link: 'https://github.com/Tharindu127/student_repo',
          type: 'repository',
          isWorking: true
        },
        {
          link: 'https://www.figma.com/proto/0C6JIzdG2pB3bSxHwg6UvY/Student-rePO?node-id=6-20&p=f&t=8cjA7YpkmZ3HllNs-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=6%3A20',
          type: 'figma',
          isWorking: true
        }
      ]
    },
    {
      id: 8,
      title: 'ActiveMeet (R&D, Research Conference Publication)',
      imageUrl: '/images/projects/8.png',
      subtitle: 'Windows App & Web App',
      category: 'Windows, Web',
      description: 'Developed a comprehensive online lecture engagement monitoring system combining Windows application (Python) and web interface (PHP, HTML, CSS) with real-time facial analysis to enhance virtual classroom participation.',
      fullDescription: 'ActiveMeet represents a significant research and development project addressing the challenges of student engagement in virtual learning environments, culminating in multiple peer-reviewed conference publications. The system combines computer vision technology with educational analytics to provide instructors with real-time insights into student participation and attention during online lectures.\nThe technical implementation consists of two interconnected components: a Windows desktop application built with Python, and a web-based dashboard developed using PHP, HTML, and CSS. The Windows application utilizes computer vision libraries to capture and analyze facial expressions, eye movements, and posture indicators through the student\'s webcam during virtual classes. This data is processed locally to identify engagement patterns such as attention focus, confusion signals, and participation readiness.\nPrivacy considerations were paramount in the design, with all facial analysis processing occurring locally on the student\'s device. Only aggregated engagement metrics are transmitted to the central system, rather than raw video data or images. Students maintain control over when monitoring is active, and clear visual indicators show when the system is operational.\nThe web interface provides instructors with both real-time and historical analytics on class engagement. The dashboard visualizes attention patterns throughout lecture sessions, identifying potential learning gaps when engagement consistently drops during specific topics. Instructors can view both class-wide trends and anonymized individual participation metrics to identify students who might need additional support.\nThe research component of this project involved extensive data collection and analysis of virtual classroom interaction patterns. This research identified key factors contributing to reduced student-teacher interaction in video conferencing environments, including technical limitations, psychological barriers, and instructional design challenges. The findings were published in peer-reviewed conference proceedings, contributing to the growing body of knowledge on effective distance education methodologies.\nA significant innovation in ActiveMeet is its adaptive feedback system that provides subtle prompts to both instructors and students. When the system detects declining engagement across multiple participants, it can suggest to the instructor that a change of pace or interactive element might be beneficial. Similarly, students showing extended periods of inattention can receive gentle reminders to refocus on the lecture material.\nThe technical architecture employs a client-server model with the Python application serving as the client-side processor for facial analysis. This component utilizes machine learning models trained on classroom engagement datasets to accurately identify attention states specific to learning environments. The web server, built on a PHP backend with MySQL database integration, handles data aggregation, user authentication, and analytics visualization.\nThe development process included multiple rounds of user testing with both students and instructors, refining the system based on feedback regarding accuracy, usability, and perceived value. This iterative approach led to significant improvements in the user interface design and the refinement of engagement detection algorithms.\nThe ActiveMeet project demonstrates the potential for thoughtful application of computer vision technology to enhance educational outcomes in distance learning scenarios, while carefully balancing monitoring capabilities with privacy considerations and user autonomy.',
      technologies: ['Python', 'HTML', 'CSS', 'PHP', 'PyCharm', 'IntelliJ', 'Adobe XD', 'Windows', 'Web'],
      images: ['/images/projects/8/1.png', '/images/projects/8/2.png', '/images/projects/8/3.png', '/images/projects/8/4.png'],
      color: 'bg-red-500',
      urls: [
        {
          link: 'https://github.com/Tharindu127/activemeet',
          type: 'repository',
          isWorking: true
        },
        {
          link: 'https://www.researchgate.net/publication/361982594_Student_Activities_Detecting_and_Reporting_System_for_Online_Learning_Platforms?_sg%5B0%5D=WoWcMGF2r_L-KeDrfYzmjLP2ybBW8ubSdq2uL0J94FG7XlIPf0AgLtv7Aoa3G-yfBRaH0EvbrJnI9txtrSVHEnp5woS6k2vZFoDz-MlP.K9DJqsgBcPx8UN-G6OgsTjrlHCm-JXZpSTUrj0ArRZSebeaeqtAUKsdD6MITut5i6Poglc9dpSZizot0FDLYYg&_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6ImxvZ2luIiwicGFnZSI6InByb2ZpbGUiLCJwcmV2aW91c1BhZ2UiOiJwcm9maWxlIiwicG9zaXRpb24iOiJwYWdlQ29udGVudCJ9fQ',
          type: 'research',
          isWorking: true
        },
        {
          link: 'https://www.researchgate.net/publication/361982590_Causing_factors_for_less_Student-teacher_interaction_in_virtual_classrooms_video_conferencing_in_distance_learning_A_review?_sg%5B0%5D=C4Jn3ic8mWj5WQQo18ZPjOXtlenqhDRiz3btWDndgrbOyouqSMoO3KwbyhN6WKFRDDI-2kkZ9jVbQCfAG59CyYNt4QrEJHbh7yf_A7tN.hURqF-KJLM6Cvc__pGs3zwvA9DIe7E9W87YMxi8YvK6N58bfMT59PYIkCJyYprNbHmxiSP8PRkekRYw-1zM71A&_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6ImxvZ2luIiwicGFnZSI6InByb2ZpbGUiLCJwb3NpdGlvbiI6InBhZ2VDb250ZW50In19',
          type: 'research',
          isWorking: true
        }
      ]
    },
  ];

  const handleProjectClick = (project: React.SetStateAction<Project | null>) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleContactFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-t-blue-500 border-r-green-500 border-b-purple-500 border-l-red-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="mt-6 text-white text-xl font-bold">Loading Experience</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Floating nav on desktop */}
      <div className="fixed top-8 right-8 z-30 hidden md:block">
        <nav className="backdrop-blur-lg bg-white/10 rounded-full p-1">
          <ul className="flex space-x-1">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${activeSection === item.id
                    ? 'bg-white text-black shadow-lg'
                    : 'text-white hover:bg-white/20'
                    }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile menu button */}
      <div className="fixed top-6 right-6 z-30 md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-20 bg-black/90 backdrop-blur-lg flex items-center justify-center md:hidden">
          <nav>
            <ul className="flex flex-col space-y-6 text-center">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setMenuOpen(false);
                    }}
                    className={`text-2xl font-bold transition-all duration-300 ${activeSection === item.id
                      ? 'text-blue-400'
                      : 'text-white hover:text-blue-300'
                      }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Main content - Using scroll-snap for smooth section transitions */}
      <div className="snap-y snap-mandatory h-screen overflow-y-auto">
        {/* Hero Section */}
        <section
          id="home"
          className="snap-start h-screen flex items-center justify-center relative overflow-hidden"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-full h-full object-cover"
              style={{ filter: 'brightness(0.4)' }}
            >
              <source src="/videos/background4.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-black/60"></div>
          </div>

          {/* <div className="absolute inset-0 z-0">
            <div className="w-full h-full">
              <Image
                src="/gifs/background.gif"
                alt="Background animation"
                fill
                priority
                style={{
                  objectFit: 'cover',
                  filter: 'brightness(0.4)'
                }}
                quality={90}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-black/60"></div>
          </div> */}

          {/* Enhanced blurred and floating background elements */}
          <div className="absolute inset-0 overflow-hidden z-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-blue-500/10 backdrop-blur-xl animate-float"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 30 + 15}s`,
                  animationDelay: `${Math.random() * 10}s`,
                  opacity: Math.random() * 0.4,
                  filter: `blur(${Math.random() * 30 + 10}px)`
                }}
              ></div>
            ))}
            {[...Array(20)].map((_, i) => (
              <div
                key={`purple-${i}`}
                className="absolute rounded-full bg-purple-500/10 backdrop-blur-xl animate-float"
                style={{
                  width: `${Math.random() * 250 + 80}px`,
                  height: `${Math.random() * 250 + 80}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 25 + 20}s`,
                  animationDelay: `${Math.random() * 8}s`,
                  opacity: Math.random() * 0.3,
                  filter: `blur(${Math.random() * 25 + 15}px)`
                }}
              ></div>
            ))}
          </div>

          <div className="relative z-10 text-center max-w-4xl px-6">
            <div className="inline-block mb-6 p-2 rounded-full bg-white/10 backdrop-blur-md animate-fadeIn">
              <span className="px-4 py-1 rounded-full text-white font-medium">Software Engineer II - Mobile</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center leading-tight">
              <span className="block">Creating</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Next-Gen Mobile
              </span>
              <span className="block">Experiences</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slideUp" style={{ animationDelay: '0.4s' }}>
              I&apos;m Tharindu Athapaththu, a mobile app developer building innovative, user-friendly experiences with cutting-edge tech for iOS, Android and Huawei platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-slideUp" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={() => setActiveSection('projects')}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold flex items-center gap-2 transition-all group"
              >
                View My Work
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold flex items-center gap-2 transition-all"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="snap-start min-h-screen flex items-center justify-center py-20"
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fadeIn">
                <div className="relative w-full aspect-[4/5] min-h-[300px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold">
                    <Image
                      src="/FullSizeRender.jpg"  // During development
                      alt="Tharindu Athapaththu"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex gap-4">
                      <a
                        href="/FullSizeRender.jpg"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all"
                      >
                        <Download size={24} />
                      </a>
                      <a
                        href="mailto:tharinduathapaththuhewage@gmail.com"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all"
                      >
                        <MailPlus size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold mb-2">About Me</h2>
                <div className="w-16 h-1 bg-blue-500 mb-6"></div>
                <p className="text-gray-300 mb-6">
                  I&apos;m a mobile software engineer crafting innovative apps for iOS and Android. With skills in multiple languages and frameworks, I deliver efficient, engaging mobile experiences.
                </p>
                <p className="text-gray-300 mb-6">
                  I combine technical skill with creative problem-solving to transform challenges into elegant solutions, focusing on AR/VR, AI integration, and intuitive interfaces.
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Core Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Swift',
                      'Flutter',
                      'Firebase',
                      'Dart',
                      'Java',
                      'Python',
                      'HTML',
                      'CSS',
                      'PHP',
                      'Native Android',
                      'Android Studio',
                      'Xcode',
                      'Visual Studio Code',
                      'PyCharm',
                      'IntelliJ',
                      'MS Office',
                      'JIRA',
                      'GitLab',
                      'Postman',
                      'Figma',
                      'Adobe XD',
                      'CleverTap',
                      'Windows',
                      'macOS',
                      'iOS',
                      'Android',
                      'Web',
                      'HarmonyOS',
                      'Google Play Console',
                      'MS App Center',
                      'Apple Connect',
                      'Huawei AGC',
                      'Google Cloud',
                      'Huawei Cloud'
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-white/10 text-sm text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={() => window.open('/files/cv_tharindu_athapaththu.pdf', '_blank')}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold flex items-center gap-2 transition-all"
                  >
                    Download CV
                    <Download size={18} />
                  </button>

                  <button
                    onClick={() => window.open('/files/resume_tharindu_athapaththu.pdf', '_blank')}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold flex items-center gap-2 transition-all"
                  >
                    Download Resume
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="snap-start min-h-screen flex items-center justify-center py-20"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-2 text-center animate-fadeIn">My Projects</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-16 animate-expand"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="group cursor-pointer bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
                  onClick={() => handleProjectClick(project)}
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className={`h-60 ${project.color} flex items-center justify-center overflow-hidden relative group`}>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center bottom'
                        }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-md">{project.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.subtitle}</p>
                    <p className="text-gray-300 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-gray-700/80 text-xs">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 rounded-full bg-gray-700/80 text-xs">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                        View Details
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Section */}
        <section
          id="github-activity"
          className="snap-start min-h-screen flex items-center justify-center py-20"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-2 text-center animate-fadeIn">GitHub Activity</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-16 animate-expand"></div>

            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
              {/* GitHub Stats Card */}
              <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 animate-fadeInUp">
                <div className="bg-gray-800/50 p-6 rounded-xl overflow-hidden transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">GitHub Contributions</h3>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-md">GitHub</span>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-center">
                    <div className="relative w-full" style={{ height: "210px" }}>
                      {/* <Image
                        src="https://ghchart.rshah.org/2e7eea/Tharindu127"
                        alt="GitHub Contribution Graph"
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        style={{ objectFit: 'contain' }}
                        unoptimized // No need for =true, just the prop
                        priority // Add priority to ensure it loads early
                      /> */}
                      <GitHubContributionGraph />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">Contribution Graph</h3>
                  <p className="text-gray-400 mb-4">My GitHub activity over the past year</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-700/50 rounded-lg p-4 flex flex-col items-center">
                      <div className="text-2xl font-bold text-white mb-1">{stats.totalProjects}</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-4 flex flex-col items-center">
                      <div className="text-2xl font-bold text-white mb-1">{stats.totalContributions}</div>
                      <div className="text-xs text-gray-400">Contributions</div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-4 flex flex-col items-center">
                      <div className="text-2xl font-bold text-white mb-1">{stats.totalRepositories}</div>
                      <div className="text-xs text-gray-400">Repositories</div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href="https://github.com/Tharindu127"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                    >
                      View GitHub Profile
                      <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* GitLab Stats Card */}
              <div className="bg-gray-800/50 p-6 rounded-xl overflow-hidden transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">GitLab Activity</h3>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-md">GitLab</span>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-center">
                  <div className="relative w-full" style={{ height: "260px" }}>
                    {/* <Image
                      src="/images/contributions.png"
                      alt="GitLab Contributions"
                      fill
                      priority
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center'
                      }}
                    /> */}
                    <GitLabContributionGraph />
                  </div>
                </div>

                <p className="text-gray-400 mt-4 mb-4">My contribution activity on GitLab</p>

                {/* <div className="flex justify-end">
                  <a
                    href="https://gitlab.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    View GitLab Profile
                    <ChevronRight size={16} />
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="snap-start min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-2 text-center animate-fadeIn">Get In Touch</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 animate-expand"></div>
            <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Have a project in mind? Looking to collaborate or hire me? Feel free to reach out using the form below and I&apos;ll get back to you as soon as possible.
            </p>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 animate-slideUp" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                <form onSubmit={handleContactSubmit}>
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
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="john@example.com"
                      required
                      disabled={submitting}
                    />
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

                  <button
                    type="submit"
                    className={`w-full px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold flex items-center justify-center gap-2 transition-all ${submitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="animate-slideUp" style={{ animationDelay: '0.5s' }}>
                <div className="relative">
                  <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="relative bg-gray-800/30 backdrop-blur-md rounded-xl p-8 border border-white/5">
                    <h3 className="text-2xl font-bold mb-6">Let&apos;s Connect</h3>
                    <p className="text-gray-300 mb-8">
                      Whether you have a specific project in mind or just want to say hello, I&apos;m always open to discussing new opportunities and ideas.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <Phone size={24} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Phone</p>
                          <p className="text-white">+94 71 22 81 572</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <MapPin size={24} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Location</p>
                          <p className="text-white">Piliyandala, Sri Lanka</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <Mail size={24} className="text-blue-400" />
                        </div>
                        <div className="overflow-hidden max-w-[180px] sm:max-w-[220px] md:max-w-[300px]">
                          <p className="text-gray-400 text-sm">Email</p>
                          <p className="text-white truncate">tharinduathapaththuhewage@gmail.com</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Mail size={24} className="text-blue-400" />
                        </div>
                        <div className="overflow-hidden max-w-[180px] sm:max-w-[220px] md:max-w-[300px]">
                          <p className="text-gray-400 text-sm">Work Email</p>
                          <p className="text-white truncate">tharindu.athapaththu@arimaclanka.com</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Github size={24} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">GitHub</p>
                          <p className="text-white">github.com/Tharindu127</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="snap-start py-12 bg-gray-800/30 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold">Software Engineer II - Mobile</h2>
                <p className="text-gray-400">Creating next-gen mobile experiences</p>
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/Tharindu127" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100008335572167" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/tharindu_athapaththu" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://x.com/tharindu_athapa" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                  <TwitterIcon size={20} />
                </a>
                <a href="https://linkedin.com/in/tharindu-athapaththu-148908160" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>© {new Date().getFullYear()} Tharindu Athapaththu. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className={`h-100 ${selectedProject?.color || ''} flex items-center justify-center relative`}>
                <Image
                  src={selectedProject?.imageUrl}
                  alt={selectedProject?.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  quality={90}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-1 transition-colors">{selectedProject?.title}</h3>
                <p className="text-xl text-gray-300 mb-2">{selectedProject?.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject?.technologies?.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-gray-700 text-sm">{tech}</span>
                  ))}
                </div>
                <p className="whitespace-pre-line">{selectedProject?.fullDescription}</p>
              </div>

              <h3 className="text-xl font-bold mb-4">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {selectedProject?.images?.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden relative aspect-video cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      console.log("Setting selected image:", image);
                      setSelectedImage(image);
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${selectedProject?.title} screenshot ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 justify-end">
                {selectedProject?.urls?.map((url, index) => (
                  <a
                    key={index}
                    href={url.isWorking ? url.link : "#"}
                    target={url.isWorking ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all font-semibold ${url.isWorking
                      ? 'bg-white/10 hover:bg-white/50 text-white cursor-pointer'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
                      }`}
                    onClick={(e) => {
                      if (!url.isWorking) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {url.type === 'website' && (
                      <>
                        Visit Website
                        <ExternalLink size={18} />
                      </>
                    )}
                    {url.type === 'repository' && (
                      <>
                        View Code
                        <Github size={18} />
                      </>
                    )}
                    {url.type === 'appstore' && (
                      <>
                        App Store
                        <svg width="18" height="18" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                          <path fill="white" d="M396.6,183.8l16.2-28c10-17.5,32.3-23.4,49.8-13.4s23.4,32.3,13.4,49.8L319.9,462.4h112.9c36.6,0,57.1,43,41.2,72.8H143c-20.2,0-36.4-16.2-36.4-36.4c0-20.2,16.2-36.4,36.4-36.4h92.8l118.8-205.9l-37.1-64.4c-10-17.5-4.1-39.6,13.4-49.8c17.5-10,39.6-4.1,49.8,13.4L396.6,183.8L396.6,183.8z M256.2,572.7l-35,60.7c-10,17.5-32.3,23.4-49.8,13.4S148,614.5,158,597l26-45C213.4,542.9,237.3,549.9,256.2,572.7L256.2,572.7z M557.6,462.6h94.7c20.2,0,36.4,16.2,36.4,36.4c0,20.2-16.2,36.4-36.4,36.4h-52.6l35.5,61.6c10,17.5,4.1,39.6-13.4,49.8c-17.5,10-39.6,4.1-49.8-13.4c-59.8-103.7-104.7-181.3-134.5-233c-30.5-52.6-8.7-105.4,12.8-123.3C474.2,318.1,509.9,380,557.6,462.6L557.6,462.6z" />
                        </svg>
                      </>
                    )}
                    {url.type === 'playstore' && (
                      <>
                        Play Store
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 20.5V3.5C3 2.89 3.24 2.49 3.74 2.15L12.36 11.86L3.73 20.85C3.24 20.5 3 20.1 3 20.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M3.73 2.15L12.36 11.86L15.45 8.57L6.5 3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M3.73 20.85L12.36 11.86L15.5 15.5L6.5 20.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M15.5 15.5L19.5 13.03C20.17 12.67 20.17 11.33 19.5 10.97L15.45 8.57" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                    {url.type === 'appgallery' && (
                      <>
                        App Gallery
                        <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <mask id="cutoutMask">
                              <rect x="0" y="0" width="36" height="36" fill="white" />
                              <path d="m 15.703052,20.879251 h 1.445267 l -0.725093,-1.68629 z m -0.355892,0.8498 -0.428806,0.981162 h -0.976243 l 2.076035,-4.709924 h 0.843724 l 2.067644,4.709924 H 17.92723 l -0.423308,-0.981162 z m 15.709293,0.97769 H 32 V 18 h -0.943547 z m -3.755381,-2.021928 h 1.73924 v -0.858191 h -1.73924 v -0.96467 h 2.524806 v -0.85848 h -3.468064 v 4.706451 h 3.558917 v -0.85848 H 27.301072 Z M 23.552056,21.24093 22.482355,18 h -0.780647 l -1.069701,3.24093 -1.041055,-3.238326 h -1.017908 l 1.642888,4.710213 h 0.791353 l 1.071437,-3.093944 1.071437,3.093944 h 0.798297 l 1.638548,-4.710213 H 24.595426 Z M 12.501762,20.697833 c 0,0.76618 -0.380486,1.1756 -1.071437,1.1756 -0.694712,0 -1.077223,-0.421283 -1.077223,-1.208296 V 18.003183 H 9.3968234 v 2.69465 c 0,1.32548 0.7366666,2.085584 2.0204816,2.085584 1.296545,0 2.039867,-0.774571 2.039867,-2.124935 v -2.658193 h -0.95541 z M 7.1153548,18.000289 h 0.9556995 v 4.712817 H 7.1153548 V 20.799103 H 4.9562782 v 1.914003 H 4 v -4.712817 h 0.9562782 v 1.900983 h 2.1590766 z" fill="black" />
                              <path d="M 18,12 C 14.691262,12 12,9.3084491 12,6 h 0.847512 c 0,2.8408565 2.311632,5.152199 5.152488,5.152199 2.840856,0 5.152488,-2.3113425 5.152488,-5.152199 H 24 c 0,3.3084491 -2.691551,6 -6,6" fill="black" />
                            </mask>
                          </defs>
                          <path d="M 10.101,0 C 2.7051128,0 0,2.704641 0,10.099029 V 25.900971 C 0,33.295359 2.7051128,36 10.101,36 H 25.894186 C 33.289863,36 36,33.295359 36,25.900971 V 10.099029 C 36,2.704641 33.294887,0 25.899,0 Z" fill="white" mask="url(#cutoutMask)" />
                        </svg>
                      </>
                    )}
                    {url.type === 'figma' && (
                      <>
                        View Design
                        <svg width="18" height="18" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
                          <rect x="10" y="10" width="980" height="480" rx="240" ry="240" fill="white" />
                          <rect x="10" y="510" width="480" height="480" rx="240" ry="240" fill="white" />
                          <circle cx="730" cy="750" r="240" fill="white" />
                          <rect x="10" y="1010" width="480" height="480" rx="240" ry="240" fill="white" />
                        </svg>
                      </>
                    )}
                    {url.type === 'research' && (
                      <>
                        Read Article
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7 7H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7 11H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7 15H13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add this image popup modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[80vw] h-[80vh] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
              {/* Regular img tag for more reliable rendering */}
              <Image
                src={selectedImage}
                alt="Project screenshot"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                style={{ objectFit: 'contain' }}
                onError={() => console.error("Image failed to load:", selectedImage)}
                onLoad={() => console.log("Image loaded successfully:", selectedImage)}
                unoptimized={true} // Important for dynamic image sources
              />
            </div>
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}