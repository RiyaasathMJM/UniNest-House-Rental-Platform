export const UNIVERSITIES = [
  {
    id: 'u-colombo',
    name: 'University of Colombo',
    code: 'UOC',
    location: 'Cinnamon Gardens, Colombo 07',
    faculties: ['Faculty of Science', 'Faculty of Medicine', 'Faculty of Arts', 'UCSC (Computing)']
  },
  {
    id: 'u-peradeniya',
    name: 'University of Peradeniya',
    code: 'UOP',
    location: 'Peradeniya, Kandy',
    faculties: ['Engineering Faculty', 'Science Faculty', 'Medical Faculty', 'Agriculture Faculty']
  },
  {
    id: 'u-moratuwa',
    name: 'University of Moratuwa',
    code: 'UOM',
    location: 'Katubedda, Moratuwa',
    faculties: ['Faculty of Engineering', 'Faculty of Information Technology', 'Faculty of Architecture']
  },
  {
    id: 'u-kelaniya',
    name: 'University of Kelaniya',
    code: 'UOK',
    location: 'Dalugama, Kelaniya',
    faculties: ['Faculty of Humanities', 'Faculty of Science', 'Faculty of Commerce']
  }
];

export const PROPERTY_TYPES = [
  { id: 'Annex', label: 'Private Annex' },
  { id: 'Boarding House', label: 'Boarding House Room' },
  { id: 'Shared Flat', label: 'Shared Apartment' },
  { id: 'Studio', label: 'Studio Apartment' }
];

export const AMENITIES_LIST = [
  'High-Speed Wi-Fi',
  'Air Conditioning',
  'Study Desk & Chair',
  'Attached Bathroom',
  'Kitchen Access',
  'Washing Machine',
  'Hot Water',
  'Ceiling Fan',
  '24/7 CCTV & Security',
  'Motorbike Parking'
];

export const MOCK_LISTINGS = [
  {
    id: 'lst-101',
    title: 'Modern Single Annex Room near UCSC',
    type: 'Annex',
    universityId: 'u-colombo',
    address: 'No. 45 Reid Avenue, Colombo 07',
    distanceKm: 0.4,
    walkingTimeMinutes: 5,
    nearbyFaculty: 'UCSC (Computing) & Science Faculty',
    monthlyRent: 22000,
    securityDeposit: 22000,
    billsIncluded: {
      water: true,
      electricity: false,
      wifi: true
    },
    genderPreference: 'Boys Only',
    maxOccupants: 1,
    verified: true,
    rating: 4.9,
    reviewCount: 14,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Study Desk & Chair',
      'Attached Bathroom',
      'Ceiling Fan',
      'Hot Water',
      'Motorbike Parking'
    ],
    houseRules: [
      'Strict Curfew at 10:30 PM',
      'No Smoking inside premises',
      'Quiet Hours after 10:00 PM',
      'Daytime visitors allowed until 7:30 PM'
    ],
    description: 'Bright and quiet single room inside a calm residential annex, ideal for computing and science students. Comes with high-speed fiber internet and a dedicated ergonomic study desk. 5 minutes walking distance to Reid Avenue complex.',
    landlord: {
      id: 'l-01',
      name: 'Mrs. Jayasinghe',
      phone: '+94 77 123 4567',
      email: 'jayasinghe.rentals@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      verified: true,
      responseRate: '98% within 1 hour',
      joinedYear: '2022'
    }
  },
  {
    id: 'lst-102',
    title: 'Spacious Girls Boarding Room with Kitchen',
    type: 'Boarding House',
    universityId: 'u-colombo',
    address: 'Thurstan Road, Colombo 03',
    distanceKm: 0.7,
    walkingTimeMinutes: 8,
    nearbyFaculty: 'Faculty of Arts & Faculty of Law',
    monthlyRent: 18500,
    securityDeposit: 18500,
    billsIncluded: {
      water: true,
      electricity: true,
      wifi: true
    },
    genderPreference: 'Girls Only',
    maxOccupants: 2,
    verified: true,
    rating: 4.8,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Kitchen Access',
      'Washing Machine',
      '24/7 CCTV & Security',
      'Ceiling Fan'
    ],
    houseRules: [
      'Curfew at 10:00 PM',
      'No Male Visitors inside rooms',
      'Shared kitchen cleaning turn system'
    ],
    description: 'Safe and secure female student boarding house located right next to Thurstan College and University of Colombo Arts gate. All utility bills (electricity, water, wifi) are fully included in the monthly rent.',
    landlord: {
      id: 'l-02',
      name: 'Mr. Nimal Perera',
      phone: '+94 71 987 6543',
      email: 'nimal.p@pererahomes.lk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true,
      responseRate: '95% within 2 hours',
      joinedYear: '2021'
    }
  },
  {
    id: 'lst-103',
    title: 'Luxury AC Studio near Engineering Faculty',
    type: 'Studio',
    universityId: 'u-moratuwa',
    address: 'Bandaranayake Mawatha, Katubedda',
    distanceKm: 0.3,
    walkingTimeMinutes: 4,
    nearbyFaculty: 'Faculty of Engineering & IT',
    monthlyRent: 35000,
    securityDeposit: 35000,
    billsIncluded: {
      water: true,
      electricity: false,
      wifi: true
    },
    genderPreference: 'Any',
    maxOccupants: 2,
    verified: true,
    rating: 5.0,
    reviewCount: 9,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Air Conditioning',
      'High-Speed Wi-Fi',
      'Study Desk & Chair',
      'Attached Bathroom',
      'Kitchen Access',
      'Hot Water',
      'Motorbike Parking'
    ],
    houseRules: [
      'No heavy loud music after 11 PM',
      'Utility bill paid based on separate sub-meter'
    ],
    description: 'Self-contained luxury studio apartment for undergraduate or postgraduate students who prefer privacy. Includes inverter AC, mini-kitchenette, private balcony, and high-speed fiber connection.',
    landlord: {
      id: 'l-03',
      name: 'Dr. Wickramasinghe',
      phone: '+94 77 444 8899',
      email: 'wickrama.apts@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true,
      responseRate: '100% within 30 mins',
      joinedYear: '2023'
    }
  },
  {
    id: 'lst-104',
    title: 'Peradeniya Riverview Shared Apartment',
    type: 'Shared Flat',
    universityId: 'u-peradeniya',
    address: 'Old Galaha Road, Peradeniya',
    distanceKm: 0.8,
    walkingTimeMinutes: 10,
    nearbyFaculty: 'Engineering & Science Faculty',
    monthlyRent: 16000,
    securityDeposit: 16000,
    billsIncluded: {
      water: true,
      electricity: false,
      wifi: true
    },
    genderPreference: 'Boys Only',
    maxOccupants: 3,
    verified: false,
    rating: 4.6,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Kitchen Access',
      'Washing Machine',
      'Ceiling Fan',
      'Motorbike Parking'
    ],
    houseRules: [
      'Keep shared living room clean',
      'Guests allowed with prior roommate consent'
    ],
    description: 'Scenic shared 3-bedroom apartment along Old Galaha Road with Mahaweli river breeze. Perfect for engineering students looking for a friendly shared community house.',
    landlord: {
      id: 'l-04',
      name: 'Mr. Bandara',
      phone: '+94 81 234 5678',
      email: 'bandara.galaha@yahoo.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      verified: false,
      responseRate: '88% within 4 hours',
      joinedYear: '2024'
    }
  },
  {
    id: 'lst-105',
    title: 'Quiet Study Room near Kelaniya Main Campus',
    type: 'Boarding House',
    universityId: 'u-kelaniya',
    address: 'Kandy Road, Dalugama',
    distanceKm: 0.5,
    walkingTimeMinutes: 6,
    nearbyFaculty: 'Faculty of Humanities & Science',
    monthlyRent: 15000,
    securityDeposit: 15000,
    billsIncluded: {
      water: true,
      electricity: true,
      wifi: true
    },
    genderPreference: 'Any',
    maxOccupants: 1,
    verified: true,
    rating: 4.7,
    reviewCount: 11,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'High-Speed Wi-Fi',
      'Study Desk & Chair',
      'Attached Bathroom',
      'Ceiling Fan'
    ],
    houseRules: [
      'Strict No Alcohol policy',
      'Curfew 10:00 PM'
    ],
    description: 'Affordable single student room in a peaceful boarding house family environment. Walking distance to Kelaniya university main gate and bus stop.',
    landlord: {
      id: 'l-05',
      name: 'Mrs. Silva',
      phone: '+94 76 555 1212',
      email: 'silva.boarding@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
      responseRate: '96% within 1 hour',
      joinedYear: '2022'
    }
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-901',
    listingId: 'lst-101',
    listingTitle: 'Modern Single Annex Room near UCSC',
    studentName: 'Kavinda Fernando',
    studentEmail: 'kavinda.cs21@sci.cmb.ac.lk',
    studentPhone: '+94 71 111 2233',
    university: 'University of Colombo',
    faculty: 'UCSC (Computing)',
    studentIdNum: '2021/CS/084',
    moveInDate: '2026-09-01',
    status: 'Pending', // Pending, Approved, Declined
    notes: 'I am a 3rd year Computer Science student. I prefer a quiet environment for studying.'
  },
  {
    id: 'app-902',
    listingId: 'lst-103',
    listingTitle: 'Luxury AC Studio near Engineering Faculty',
    studentName: 'Dilini Senanayake',
    studentEmail: 'dilini.s@uom.lk',
    studentPhone: '+94 77 999 8877',
    university: 'University of Moratuwa',
    faculty: 'Faculty of Engineering',
    studentIdNum: '2022/ENG/142',
    moveInDate: '2026-08-25',
    status: 'Approved',
    notes: 'Looking forward to moving in before the new semester starts.'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    listingId: 'lst-101',
    sender: 'student',
    senderName: 'Kavinda Fernando',
    text: 'Hello Mrs. Jayasinghe, is the single annex room still available for viewing this Saturday?',
    timestamp: '10:14 AM'
  },
  {
    id: 'msg-2',
    listingId: 'lst-101',
    sender: 'landlord',
    senderName: 'Mrs. Jayasinghe',
    text: 'Yes Kavinda! You can visit Saturday between 2 PM and 5 PM. Please bring your university identity card.',
    timestamp: '10:22 AM'
  }
];
