// scripts/uploadProjectsToFirebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6l6uyG5iuTcYCYDP8cUOvhKvfaQotr58",
    authDomain: "my-portfolio-and-rest.firebaseapp.com",
    projectId: "my-portfolio-and-rest",
    storageBucket: "my-portfolio-and-rest.firebasestorage.app",
    messagingSenderId: "225744370742",
    appId: "1:225744370742:web:23847554f6a85f14f96c97",
    measurementId: "G-N11P05ZQYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// This is your projects data from paste.txt
// You would typically import this from a file or get it from somewhere else
const projects = [
    {
        id: 1,
        title: 'YOOZ Ibiza | Algeria',
        imageUrl: 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/1.png',
        subtitle: 'Telco App',
        category: 'Android, Huawei',
        description: 'Developed the YOOZ mobile app for Ooredoo Algeria using native Android (Java), with support for Android, and Huawei. Integrated RESTful APIs, analytics tools, and Unity features within a scalable MVM architecture.',
        fullDescription: 'YOOZ Ibiza is a premier telecommunications application developed for Ooredoo Algeria, offering users a seamless and feature-rich mobile experience. As a native Android application built with Java, the app delivers exceptional performance and reliability across the Android ecosystem, including specialized support for Huawei devices.\nThe development of YOOZ Ibiza focused on creating a robust architecture using the Model-View-Model (MVM) pattern, ensuring scalability and maintainability as new features are added. This architectural choice facilitates efficient data management and responsive user interfaces, key factors in providing a smooth telecom service experience.\nIntegration with RESTful APIs forms the backbone of the application, enabling real-time communication with Ooredoo\'s backend services. This allows users to access account information, manage services, track usage, and perform transactions securely from their mobile devices. The comprehensive API implementation ensures that all telecom services are accessible directly through the application interface.\nA standout feature of YOOZ Ibiza is its incorporation of Unity 3D elements, bringing interactive and engaging visual components to what would typically be a utilitarian telecom application. This innovative approach enhances user engagement and differentiates YOOZ from competitors in the telecommunications app market.\nAnalytics tools have been seamlessly integrated into the application architecture, providing valuable insights into user behavior, feature usage, and performance metrics. This data-driven approach allows for continuous improvement of the application based on actual user interactions and preferences.\nThe user interface, designed with Adobe XD, offers an intuitive and visually appealing experience that adheres to modern design principles while maintaining brand consistency with Ooredoo\'s visual identity. The UI implementation utilizes XML for layout design, ensuring compatibility across various Android devices and screen sizes.\nFor Huawei users, specialized integration with Huawei App Gallery Connect (AGC) services ensures full functionality even without Google Mobile Services, addressing the needs of a significant portion of the Algerian market using Huawei devices.\nYOOZ Ibiza represents a comprehensive telecom solution that balances functional utility with user experience, providing Ooredoo Algeria customers with a powerful tool to manage their telecommunications needs efficiently and effectively. The application\'s availability on both Google Play Store and Huawei AppGallery maximizes its reach across the Algerian mobile user base.',
        technologies: ['Native Android', 'Firebase', 'Huawei AGC', 'Unity 3D', 'JAVA', 'XML', 'Adobe XD', 'Android Studio', 'JIRA'],
        images: ['https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/1/6.jpg', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/1/2.jpg', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/1/4.jpg', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/1/3.jpg', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/1/5.jpg'],
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
        imageUrl: 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/2.png',
        subtitle: 'Telco App',
        category: 'iOS, Android, Huawei',
        description: 'Built a cross-platform telco service app using Flutter and Dart, integrating RESTful APIs, Firebase & Huawei Analytics, and Bloc architecture. Enabled Add-to-App functionality and optimized performance across iOS, Android, and Huawei devices.',
        fullDescription: 'My Ooredoo Algeria is a comprehensive telecommunications service application that empowers users with complete control over their Ooredoo accounts and services. Developed using Flutter and Dart, this cross-platform solution delivers a consistent and responsive experience across iOS, Android, and Huawei devices, ensuring all Ooredoo customers receive the same high-quality service regardless of their device preference.\nThe application architecture is built on the robust Bloc pattern, providing excellent state management and a clean separation of concerns that enhances maintainability and facilitates feature expansion. This architectural choice has allowed the development team to rapidly deploy new features while maintaining application stability.\nIntegration with RESTful APIs forms the core of the application\'s functionality, enabling real-time access to account information, service management, billing details, and usage statistics. Users can easily monitor their data consumption, voice minutes, and SMS usage through intuitive visualization tools and receive timely notifications when approaching plan limits.\nThe app incorporates dual analytics solutions with both Firebase Analytics and Huawei Analytics integration, ensuring comprehensive usage data collection across all platforms. This analytics implementation provides valuable insights into user behavior patterns, feature popularity, and potential pain points, driving continuous improvement of the application.\nA standout technical achievement of My Ooredoo Algeria is its implementation of Add-to-App functionality, allowing the Flutter modules to be seamlessly integrated into existing native applications. This approach facilitated a gradual migration strategy from older native implementations to the new Flutter codebase without disrupting the user experience.\nPerformance optimization was a key focus during development, with special attention paid to reducing app size, minimizing memory usage, and ensuring smooth operation even on lower-end devices. Custom rendering optimizations and efficient resource management contribute to the app\'s responsive interface and quick loading times.\nThe app features a comprehensive suite of self-service tools including bill payment, package subscription management, balance transfers, and service activation/deactivation. The implementation of secure authentication protocols and encrypted data transmission ensures that all user information and transactions remain protected.\nLocalization support for Arabic, French, and English makes the application accessible to Algeria\'s linguistically diverse population, while adaptive UI elements ensure proper display regardless of language direction or text length.\nIntegration with CleverTap enables sophisticated customer engagement through personalized communications, targeted promotions, and behavior-based notifications that enhance the overall customer experience and drive engagement with Ooredoo services.\nMy Ooredoo Algeria represents a significant achievement in telecommunications app development, combining technical excellence with thoughtful UX design to deliver a solution that simplifies account management and enhances the customer relationship with Ooredoo\'s services.',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Huawei Cloud', 'Android Studio', 'JIRA', 'Figma', 'CleverTap'],
        images: ['https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/2/1.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/2/2.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/2/3.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/2/4.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/2/5.png'],
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
        imageUrl: 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/3.png',
        subtitle: 'Logistic services',
        category: 'iOS, Android',
        description: 'Developing a delivery service solution with separate Flutter apps for drivers and merchants. Integrated RESTful APIs, Google Maps for real-time tracking, and used Bloc architecture for scalable, cross-platform performance.',
        fullDescription: 'SecureChat was built with privacy as its foundation, implementing state-of-the-art cryptographic protocols to ensure that conversations remain confidential and protected from third-party access. The application features end-to-end encryption for all messages, media, and file transfers, with the encryption keys stored only on user devices. Messages can be set to automatically delete after being read or after a specified time period. The app was developed using React Native for cross-platform compatibility while maintaining strict security standards. Notable features include secure group communications, encrypted video calls, two-factor authentication, secure cloud backup options, and a verification system for confirming contact identities.',
        technologies: ['Flutter', 'Dart', 'Firebase OneSignal', 'Google Maps', 'Android Studio', 'JIRA', 'Figma', 'MS App Center', 'Apple Connect', '/images/projects/3/5.png'],
        images: ['https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/3/1.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/3/2.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/3/3.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/3/4.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/3/5.png'],
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
        imageUrl: 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/4.png',
        subtitle: 'Logistic services',
        category: 'iOS, Android',
        description: 'Built a cross-platform telco service app using Flutter and Dart, integrating RESTful APIs, Firebase & Huawei Analytics, and Bloc architecture. Enabled Add-to-App functionality and optimized performance across iOS, Android, and Huawei devices.',
        fullDescription: 'Odoo Merchant is an innovative logistics and delivery service platform being developed for the Kuwait market, featuring a dual-application approach that caters separately to merchants and delivery drivers. This comprehensive solution streamlines the entire delivery process from order placement to final fulfillment, creating an efficient ecosystem for all stakeholders involved in the logistics chain.\nThe merchant application provides business owners with powerful tools to manage their delivery operations, including an intuitive order dashboard, real-time delivery tracking, customizable delivery zones, and comprehensive analytics on delivery performance. Merchants can easily process new orders, assign them to available drivers, and maintain complete visibility throughout the delivery journey. The application includes features for managing inventory, setting delivery priorities, and communicating special instructions to drivers.\nThe companion driver application is optimized for mobile use in delivery scenarios, with a streamlined interface that prioritizes critical information and minimizes distractions while on the road. Drivers receive new delivery assignments with optimized routing, turn-by-turn navigation, and the ability to communicate with both merchants and customers when needed. The app includes functionality for proof of delivery, delivery exception reporting, and shift management.\nAt the technical core of both applications is a sophisticated implementation of Google Maps APIs, enabling real-time location tracking, route optimization, and accurate delivery time estimations. The integration accounts for traffic conditions, historical delivery data, and custom delivery zones to provide realistic delivery windows to all parties.\nDeveloped using Flutter and Dart, both applications share a common codebase foundation while maintaining distinct user experiences appropriate for their respective users. This cross-platform approach ensures consistent performance and feature parity across iOS and Android devices while reducing development overhead. The Bloc architecture provides robust state management and a clear separation of concerns, making the system highly maintainable and expandable as requirements evolve.\nSeamless integration with RESTful APIs connects the mobile applications to backend services, enabling real-time data synchronization, secure authentication, and reliable transaction processing. The system architecture supports high volumes of concurrent users and transactions, crucial for a logistics platform serving multiple businesses simultaneously.\nNotifications and alerts are delivered through Firebase OneSignal integration, ensuring timely updates reach the intended recipients regarding new orders, status changes, delivery completions, and potential issues. These notifications are prioritized and contextualized based on user roles and urgency levels.\nThe development process incorporates continuous integration and delivery through Microsoft App Center, allowing for rapid iteration, robust testing, and streamlined deployment to both the Play Store and App Store. This approach, combined with JIRA for project management and Figma for design collaboration, enables an agile development cycle that can quickly adapt to evolving market requirements.\nAlthough still in progressive development, Odoo Merchant represents a significant advancement in delivery logistics technology for the Kuwait market, promising to increase operational efficiency, improve customer satisfaction, and provide valuable business intelligence to participating merchants.',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Huawei Cloud', 'Android Studio', 'JIRA', 'Figma', 'CleverTap'],
        images: ['https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/4/1.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/4/2.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/4/3.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/4/4.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/4/5.png'],
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
        imageUrl: 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/5.png',
        subtitle: 'FinTech Solutions',
        category: 'iOS, Android',
        description: 'Developed a cross-platform Flutter app for managing deferred payments, using Riverpod and Clean Architecture for scalability. Integrated Dio for robust API handling and delivered a smooth, modern UI for an intuitive user experience.',
        fullDescription: 'Pay Later is a sophisticated FinTech solution developed for the Qatar market that revolutionizes the shopping experience by enabling customers to split their purchases into manageable installments. This "buy now, pay later" platform provides financial flexibility without the complexity of traditional credit applications, making it an appealing alternative for modern consumers.\nThe application is built with Flutter and Dart, ensuring a consistent, high-quality user experience across both iOS and Android platforms. This cross-platform approach was crucial for rapid market penetration in Qatar\'s diverse mobile ecosystem while maintaining a single codebase for efficient development and maintenance.\nAt the architectural level, the app implements Clean Architecture principles with clear separation between domain, data, and presentation layers. This structure enhances maintainability, testability, and scalability – critical factors for a financial application expected to evolve with market demands and regulatory requirements. The implementation of Riverpod for state management provides a reactive and predictable approach to handling application state, resulting in a more robust user experience with fewer edge-case bugs.\nThe integration with backend services is handled through Dio, a powerful HTTP client that manages the complex network operations required for financial transactions. This includes secure authentication, encrypted data transmission, transaction processing, and error handling tailored to financial contexts. The networking layer includes sophisticated retry mechanisms, connection state management, and timeout handling to ensure reliable operation even under suboptimal network conditions.\nSecurity is a paramount consideration in the Pay Later app, with implementation of biometric authentication, secure local storage for sensitive information, certificate pinning to prevent man-in-the-middle attacks, and comprehensive input validation throughout the application. These security measures comply with financial industry standards while maintaining a frictionless user experience.\nThe user interface features a clean, modern design that simplifies complex financial processes. The payment scheduling interface provides clear visualization of upcoming payments, due dates, and payment history. The onboarding process is streamlined to minimize friction, using step-by-step guidance and real-time validation to ensure users can quickly begin using the service.\nNotable features include virtual card management for online purchases, integration with popular e-commerce platforms, spending analytics with visual representations, personalized payment plans based on user financial profiles, and proactive notification systems for upcoming payments. The app also includes a merchant discovery feature that showcases partnered retailers who accept the Pay Later payment method.\nTransaction processing is optimized for both speed and accuracy, with real-time status updates and detailed receipt generation. The implementation includes comprehensive error handling with user-friendly messages that provide clear guidance when issues arise, rather than technical error codes.\nThe development process utilized Firebase for analytics and crash reporting, enabling data-driven improvements to the application based on actual usage patterns. This telemetry data, combined with direct user feedback channels within the app, creates a continuous improvement cycle that has steadily enhanced the application since its initial release.\nPay Later represents a significant advancement in consumer financial technology for the Qatar market, combining sophisticated financial functionality with an accessible user experience that makes deferred payment options available to a broader segment of consumers.',
        technologies: ['Flutter', 'Dart', 'Riverpod', 'Dio', 'Android Studio', 'Apple Connect', 'JIRA', 'Figma'],
        images: ['https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/5/1.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/5/2.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/5/3.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/5/4.png'],
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
        imageUrl: 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/6.png',
        subtitle: 'Day-to-day App',
        category: 'Android, Huawei',
        description: 'Developed a native Android utility application for real estate calculations using Java. Implemented Firebase analytics, responsive UI with XML layouts, and published on both Google Play Store and Huawei AppGallery.',
        fullDescription: 'Lot Calculator is a specialized utility application designed for real estate professionals, construction workers, and property investors who need quick and accurate land measurement calculations. Built with native Android technologies using Java, the app delivers exceptional performance and reliability while maintaining a small footprint on users\' devices.\nThe application addresses common challenges in property development by providing a comprehensive suite of calculation tools for lot dimensions, area conversions, irregular lot measurements, and cost estimations. Users can quickly convert between different measurement units (square feet, square meters, acres, hectares) with precise results that account for regional measurement standards.\nThe user interface, designed with simplicity and efficiency in mind, features an intuitive layout that minimizes the learning curve for new users. The implementation of XML layouts ensures responsive design that adapts to various screen sizes and orientations, maintaining usability across the diverse Android device ecosystem. Input validation prevents calculation errors, while the results display includes detailed breakdowns for verification.\nFor property developers working with irregular lots, the application offers specialized tools that use coordinate inputs or multiple measurements to calculate areas that would be difficult to determine with standard formulas. The cost estimation feature allows users to input land prices and instantly calculate total costs based on various measurement units, facilitating quicker decision-making during property transactions.\nData persistence is implemented through local storage, allowing users to save frequent calculations and measurement sets for future reference. This feature is particularly valuable for professionals working across multiple properties or comparing different lot options.\nThe app incorporates Firebase Analytics for usage insights, enabling data-driven improvements based on actual user behavior and calculation patterns. This analytical approach guided several feature refinements since the initial release, including the addition of new calculation types based on observed user needs.\nHuawei AppGallery Connect integration ensures full functionality on Huawei devices, which was a significant consideration for reaching users in markets where Huawei devices are prevalent. This dual-platform availability maximized the application\'s reach across the Android ecosystem.\nWhile the application is currently unpublished from both Google Play and Huawei AppGallery, it served as a valuable tool for thousands of users during its active period, maintaining a positive rating average and generating constructive user feedback that drove continuous improvements.\nThe development process employed industry best practices, including comprehensive testing across multiple device profiles to ensure calculation accuracy and UI consistency. Version control through Git facilitated organized development and feature implementation, while regular performance profiling ensured the application remained responsive even during complex calculations.',
        technologies: ['Native Android', 'Firebase', 'Huawei AGC', 'JAVA', 'XML', 'Figma', 'Android Studio'],
        images: ['https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/6/1.jpg', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/6/2.jpg', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/6/3.jpg', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/6/4.jpg', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/6/5.jpg'],
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
        imageUrl: 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/7.png',
        subtitle: 'Student Activity Management App',
        category: 'iOS, Android, Huawei',
        description: 'Designing and developing a cross-platform Flutter application for university students to track activity records, access past examination papers, and collaborate on academic resources with integrated authentication and cloud storage.',
        fullDescription: 'Student Repo is an innovative academic management platform designed to enhance the university student experience by centralizing activity tracking, resource sharing, and collaboration tools. Currently in active development, this application aims to address key challenges faced by university students in organizing their academic journey and accessing critical educational resources.\nThe application is structured around three core functionalities: activity record management, past paper repository, and collaborative study tools. The activity record component allows students to log and track participation in extracurricular events, volunteer work, leadership roles, and other non-academic accomplishments that are valuable for resume building and professional development. This feature includes verification mechanisms for official university events and customizable categorization for different types of activities.\nThe past paper repository provides a structured, searchable database of previous year examination papers, organized by course, semester, and exam type. This functionality addresses the common challenge of fragmented access to past papers, which are crucial study resources but often difficult to locate consistently. The repository implements version control for papers, ensuring students always access the most recent and relevant materials while maintaining an archive of historical content.\nCollaborative features enable peer-to-peer knowledge sharing through discussion threads attached to specific papers, collaborative note-taking, and question flagging for difficult concepts. These social elements transform the application from a static repository into an interactive learning community, fostering peer support and collaborative problem-solving among the student body.\nDeveloped using Flutter and Dart, the application delivers a consistent experience across iOS, Android, and Huawei devices, reaching the entire student population regardless of device preference. This cross-platform approach streamlines development while ensuring a native-like experience on each platform through careful attention to platform-specific UI/UX considerations.\nBackend services are implemented through Firebase, providing reliable authentication, real-time database synchronization, and cloud storage for academic documents. The authentication system integrates with university credentials where possible, simplifying user onboarding while maintaining security. Cloud storage implementation includes optimized document rendering for quick viewing of papers without requiring full downloads.\nThe user interface, designed through iterative prototyping in Figma, prioritizes intuitive navigation and efficiency – recognizing that students often access such tools during high-pressure study periods when cognitive load is already high. The UI implements a system of visual cues and organization that reduces the time needed to locate specific resources or log activities.\nPrivacy and data protection are carefully considered in the application architecture, with granular control over what activity information is shared publicly versus kept private. Academic integrity features prevent unauthorized distribution of certain materials while still enabling legitimate study activities.\nThe development approach incorporates continuous user feedback from student beta testers, ensuring the evolving feature set remains aligned with actual student needs rather than assumptions. This user-centered design process has already led to several refinements in the interface and feature prioritization based on real-world usage patterns.\nOnce completed, Student Repo will represent a significant advancement in academic support technology, providing a comprehensive digital companion that enhances organization, resource access, and peer collaboration throughout the university journey.',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Huawei Cloud', 'Android Studio', 'JIRA', 'Figma'],
        images: ['https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/7/1.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/7/2.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/7/3.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/7/4.png'],
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
        imageUrl: 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/8.png',
        subtitle: 'Windows App & Web App',
        category: 'Windows, Web',
        description: 'Developed a comprehensive online lecture engagement monitoring system combining Windows application (Python) and web interface (PHP, HTML, CSS) with real-time facial analysis to enhance virtual classroom participation.',
        fullDescription: 'ActiveMeet represents a significant research and development project addressing the challenges of student engagement in virtual learning environments, culminating in multiple peer-reviewed conference publications. The system combines computer vision technology with educational analytics to provide instructors with real-time insights into student participation and attention during online lectures.\nThe technical implementation consists of two interconnected components: a Windows desktop application built with Python, and a web-based dashboard developed using PHP, HTML, and CSS. The Windows application utilizes computer vision libraries to capture and analyze facial expressions, eye movements, and posture indicators through the student\'s webcam during virtual classes. This data is processed locally to identify engagement patterns such as attention focus, confusion signals, and participation readiness.\nPrivacy considerations were paramount in the design, with all facial analysis processing occurring locally on the student\'s device. Only aggregated engagement metrics are transmitted to the central system, rather than raw video data or images. Students maintain control over when monitoring is active, and clear visual indicators show when the system is operational.\nThe web interface provides instructors with both real-time and historical analytics on class engagement. The dashboard visualizes attention patterns throughout lecture sessions, identifying potential learning gaps when engagement consistently drops during specific topics. Instructors can view both class-wide trends and anonymized individual participation metrics to identify students who might need additional support.\nThe research component of this project involved extensive data collection and analysis of virtual classroom interaction patterns. This research identified key factors contributing to reduced student-teacher interaction in video conferencing environments, including technical limitations, psychological barriers, and instructional design challenges. The findings were published in peer-reviewed conference proceedings, contributing to the growing body of knowledge on effective distance education methodologies.\nA significant innovation in ActiveMeet is its adaptive feedback system that provides subtle prompts to both instructors and students. When the system detects declining engagement across multiple participants, it can suggest to the instructor that a change of pace or interactive element might be beneficial. Similarly, students showing extended periods of inattention can receive gentle reminders to refocus on the lecture material.\nThe technical architecture employs a client-server model with the Python application serving as the client-side processor for facial analysis. This component utilizes machine learning models trained on classroom engagement datasets to accurately identify attention states specific to learning environments. The web server, built on a PHP backend with MySQL database integration, handles data aggregation, user authentication, and analytics visualization.\nThe development process included multiple rounds of user testing with both students and instructors, refining the system based on feedback regarding accuracy, usability, and perceived value. This iterative approach led to significant improvements in the user interface design and the refinement of engagement detection algorithms.\nThe ActiveMeet project demonstrates the potential for thoughtful application of computer vision technology to enhance educational outcomes in distance learning scenarios, while carefully balancing monitoring capabilities with privacy considerations and user autonomy.',
        technologies: ['Python', 'HTML', 'CSS', 'PHP', 'PyCharm', 'IntelliJ', 'Adobe XD', 'Windows', 'Web'],
        images: ['https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/8/1.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/8/2.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/8/3.png', 'https://raw.githubusercontent.com/Tharindu127/tharinduathapaththu.portfolio.io/main/public/images/projects/8/4.png'],
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

// This is your stats data from paste.txt
const stats = {
    totalProjects: 11,
    totalContributions: 15,
    totalRepositories: 11
};

async function uploadProjects() {
    try {
        console.log("Starting to upload projects to Firebase...");

        // Upload each project
        for (const project of projects) {
            // Use project ID as document ID
            await setDoc(doc(db, "projects", project.id.toString()), project);
            console.log(`Uploaded project: ${project.title}`);
        }

        // Upload stats
        await setDoc(doc(db, "stats", "main"), stats);
        console.log("Uploaded stats");

        console.log("All data uploaded successfully!");
    } catch (error) {
        console.error("Error uploading data: ", error);
    }
}

// Execute the function
uploadProjects();