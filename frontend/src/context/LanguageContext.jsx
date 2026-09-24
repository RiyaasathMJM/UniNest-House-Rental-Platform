import React, { createContext, useContext, useState, useEffect } from 'react';

// Language Dictionary for English (en), Tamil (ta), and Sinhala (si)
export const TRANSLATIONS = {
  en: {
    // Brand & Navbar
    brandSubStudent: 'Student Housing',
    brandSubLandlord: 'House Owner Portal',
    navFindHousing: 'Find Housing',
    navAllMarketHouses: 'All Market Houses',
    navStudentDashboard: 'My Student Dashboard',
    navLandlordDashboard: 'House Owner Dashboard',
    navPostNewListing: 'Post New Listing',
    navCompare: 'Compare',
    navLogout: 'Switch Account / Logout',
    navAllUniversities: 'All University Campuses',
    savedUnits: 'Saved Units',

    // Hero Section
    heroTitle: 'Find Your Perfect Student Housing Near Campus',
    heroSubtitle: 'Verified annexes, boarding rooms, and apartments near Sri Lankan universities with transparent utility bills & location maps.',
    searchPlaceholder: 'Search by house title, location, nearby faculty...',
    filterAll: 'All Units',
    filterWalking: '5 Min Walk',
    filterGirls: 'Girls Only',
    filterBills: 'Bills Included',
    filterBudget: 'Under Rs. 20,000',

    // Filter Sidebar
    filterHeading: 'Filter Accommodations',
    maxMonthlyRent: 'Max Monthly Rent',
    maxDistance: 'Max Distance from Campus',
    propertyType: 'Property Type',
    genderPref: 'Gender Preference',
    anyGender: 'Any Gender',
    boysOnly: 'Boys Only',
    girlsOnly: 'Girls Only',
    billsIncludedOnly: 'Utility Bills Included Only',
    resetFilters: 'Reset All Filters',
    allCampuses: 'All Campuses',
    underDist: 'Within',

    // Listing Cards & Details
    monthlyRent: 'Monthly Rent',
    securityDeposit: 'Refundable Deposit',
    perMonth: '/ month',
    viewUnit: 'View Unit',
    viewDetails: 'View Details',
    googleLocation: 'Google Location',
    openMaps: 'Open in Google Maps',
    minWalk: 'min walk',
    includedBills: 'Included Utility Bills',
    wifi: 'Wi-Fi',
    water: 'Water',
    electricity: 'Power',
    scheduleViewing: 'Schedule Viewing / Apply',
    messageLandlord: 'Message Landlord',
    owner: 'Owner',

    // Landlord Dashboard
    landlordPortalTag: 'House Owner Portal',
    landlordDashboardTitle: 'House Owner Management Dashboard',
    landlordSub: 'Manage your student accommodation listings, explore all market listings, verify student tenant applications, check Google Maps locations, and chat directly with inquiry students.',
    myActiveListings: 'My Active Listings',
    pendingApplications: 'Pending Applications',
    approvedTenants: 'Approved Tenants',
    allPlatformHouses: 'All Platform Houses',
    tabApplications: 'Student Applications',
    tabMessages: 'Direct Student Inquiries',
    tabMyListings: 'My Listings',
    tabAllListings: 'All Houses in Listing',
    postNewAccom: 'Post New Accommodation',
    acceptApp: 'Accept Application',
    declineApp: 'Decline',
    undoDecision: 'Undo Decision',
    editListing: 'Edit',
    deleteListing: 'Delete',
    totalYield: 'Total Yield Potential',

    // Student Dashboard
    studentPortalTag: 'Student Housing Portal',
    studentPortalTitle: 'Student Housing Portal',
    studentPortalSub: 'Track your viewing applications, review bookmarked boarding houses, and chat directly with landlords.',
    tabRentalApps: 'My Rental Applications',
    tabDirectMsgs: 'Direct Messages',
    tabSavedHouses: 'Saved Boarding Houses',
    targetMoveIn: 'Target Move-in Date',
    approvedByOwner: 'Approved by Owner!',
    replyMessage: 'Reply Message',
    removeBookmark: 'Remove',

    // Modals
    scheduleTitle: 'Schedule Viewing or Submit Rental Application',
    studentNameLabel: 'Your Full Name',
    studentEmailLabel: 'Email Address',
    studentPhoneLabel: 'Phone Number',
    universityLabel: 'Your University',
    facultyLabel: 'Faculty / Department',
    studentIdLabel: 'Student Reg / NIC No',
    desiredMoveIn: 'Desired Move-in Date',
    requestNotes: 'Additional Notes / Message',
    submitAppBtn: 'Submit Application to Owner',
    compareTitle: 'Compare Accommodations Side-by-Side',
    directChatTitle: 'Direct Conversation with Owner',
    sendMessageBtn: 'Send Message',

    // Login Screen
    loginTitle: 'UniNest Student Housing Platform',
    loginSubtitle: 'Find and manage verified student boarding rooms, annexes & apartments near Sri Lankan universities',
    selectRole: 'Select Role to Enter Demo',
    enterAsStudent: 'Enter as University Student',
    enterAsLandlord: 'Enter as House Owner (Landlord)',
    quickDemoHint: 'Click any role below to explore live features immediately'
  },
  ta: {
    // Brand & Navbar
    brandSubStudent: 'மாணவர் வீட்டுவசதி',
    brandSubLandlord: 'வீட்டு உரிமையாளர் முனையம்',
    navFindHousing: 'வீடு தேடுக',
    navAllMarketHouses: 'அனைத்து சந்தை வீடுகள்',
    navStudentDashboard: 'எனது மாணவர் டாஷ்போர்டு',
    navLandlordDashboard: 'வீட்டு உரிமையாளர் டாஷ்போர்டு',
    navPostNewListing: 'புதிய விளம்பரம் பதிவிடுக',
    navCompare: 'ஒப்பிடுக',
    navLogout: 'கணக்கை மாற்று / வெளியேறு',
    navAllUniversities: 'அனைத்து பல்கலைக்கழக வளாகங்கள்',
    savedUnits: 'சேமிக்கப்பட்ட வீடுகள்',

    // Hero Section
    heroTitle: 'வளாகத்திற்கு அருகில் சிறந்த மாணவர் வீட்டைக் கண்டறியவும்',
    heroSubtitle: 'இலங்கை பல்கலைக்கழகங்களுக்கு அருகில் சரிபார்க்கப்பட்ட அறைகள், போர்டிங் மற்றும் குடியிருப்புகள்.',
    searchPlaceholder: 'வீட்டின் தலைப்பு, இடம், பீடம் மூலம் தேடுக...',
    filterAll: 'அனைத்து வீடுகளும்',
    filterWalking: '5 நிமிட நடை',
    filterGirls: 'பெண்கள் மட்டும்',
    filterBills: 'கட்டணங்கள் உள்ளடக்கம்',
    filterBudget: 'ரூ. 20,000 க்கும் கீழ்',

    // Filter Sidebar
    filterHeading: 'வடிகட்டிகள்',
    maxMonthlyRent: 'அதிகபட்ச மாதாந்திர வாடகை',
    maxDistance: 'வளாகத்திலிருந்து அதிகபட்ச தூரம்',
    propertyType: 'சொத்து வகை',
    genderPref: 'பாலின விருப்பம்',
    anyGender: 'யாரும் சேர்க்கப்படலாம்',
    boysOnly: 'ஆண்கள் மட்டும்',
    girlsOnly: 'பெண்கள் மட்டும்',
    billsIncludedOnly: 'பயன்பாட்டு கட்டணங்கள் சேர்க்கப்பட்டவை மட்டும்',
    resetFilters: 'அனைத்து வடிகட்டிகளையும் மீட்டமை',
    allCampuses: 'அனைத்து வளாகங்கள்',
    underDist: 'உள்ளே',

    // Listing Cards & Details
    monthlyRent: 'மாதாந்திர வாடகை',
    securityDeposit: 'மீளளிக்கத்தக்க வைப்புத்தொகை',
    perMonth: '/ மாதம்',
    viewUnit: 'விவரங்களை காண்க',
    viewDetails: 'விவரங்களை காண்க',
    googleLocation: 'Google வரைபட இடம்',
    openMaps: 'Google Maps இல் திறக்க',
    minWalk: 'நிமிட நடை',
    includedBills: 'சேர்க்கப்பட்ட பயன்பாட்டுக் கட்டணங்கள்',
    wifi: 'வைஃபை',
    water: 'தண்ணீர்',
    electricity: 'மின்சாரம்',
    scheduleViewing: 'பார்வையிடலை திட்டமிடுக / விண்ணப்பிக்க',
    messageLandlord: 'வீட்டு உரிமையாளருக்கு செய்தி அனுப்பு',
    owner: 'உரிமையாளர்',

    // Landlord Dashboard
    landlordPortalTag: 'வீட்டு உரிமையாளர் போர்ட்டல்',
    landlordDashboardTitle: 'வீட்டு உரிமையாளர் நிர்வாக டாஷ்போர்டு',
    landlordSub: 'உங்கள் தங்குமிட விளம்பரங்களை நிர்வகிக்கவும், மாணவர் விண்ணப்பங்களை சரிபார்க்கவும், மாணவர்களுடன் நேரடியாக அரட்டை அடிக்கவும்.',
    myActiveListings: 'எனது செயலில் உள்ள விளம்பரங்கள்',
    pendingApplications: 'நிலுவையில் உள்ள விண்ணப்பங்கள்',
    approvedTenants: 'அங்கீகரிக்கப்பட்ட குத்தகைதாரர்கள்',
    allPlatformHouses: 'அனைத்து தள வீடுகள்',
    tabApplications: 'மாணவர் விண்ணப்பங்கள்',
    tabMessages: 'நேரடி மாணவர் விசாரணைகள்',
    tabMyListings: 'எனது விளம்பரங்கள்',
    tabAllListings: 'அனைத்து சந்தை வீடுகள்',
    postNewAccom: 'புதிய தங்குமிடம் பதிவிடுக',
    acceptApp: 'விண்ணப்பத்தை ஏற்றுக்கொள்',
    declineApp: 'நிராகரி',
    undoDecision: 'முடிவை ரத்துசெய்',
    editListing: 'திருத்து',
    deleteListing: 'நீக்கு',
    totalYield: 'மொத்த வருமான சாத்தியம்',

    // Student Dashboard
    studentPortalTag: 'மாணவர் வீட்டுவசதி போர்ட்டல்',
    studentPortalTitle: 'மாணவர் வீட்டுவசதி போர்ட்டல்',
    studentPortalSub: 'உங்கள் வாடகை விண்ணப்பங்களைக் கண்காணிக்கவும், சேமித்த வீடுகளை மதிப்பாய்வு செய்யவும், உரிமையாளர்களுடன் பேசவும்.',
    tabRentalApps: 'எனது வாடகை விண்ணப்பங்கள்',
    tabDirectMsgs: 'நேரடி செய்திகள்',
    tabSavedHouses: 'சேமிக்கப்பட்ட வீடுகள்',
    targetMoveIn: 'இலக்கு குடிபெயர்வு தேதி',
    approvedByOwner: 'உரிமையாளரால் அங்கீகரிக்கப்பட்டது!',
    replyMessage: 'பதிலளிக்கவும்',
    removeBookmark: 'அகற்று',

    // Modals
    scheduleTitle: 'பார்வையிடலை திட்டமிடுங்கள் அல்லது விண்ணப்பிக்கவும்',
    studentNameLabel: 'உங்கள் முழு பெயர்',
    studentEmailLabel: 'மின்னஞ்சல் முகவரி',
    studentPhoneLabel: 'தொலைபேசி எண்',
    universityLabel: 'உங்கள் பல்கலைக்கழகம்',
    facultyLabel: 'பீடம் / துறை',
    studentIdLabel: 'மாணவர் பதிவு எண் / தேசிய அடையாள அட்டை',
    desiredMoveIn: 'விரும்பிய குடிபெயர்வு தேதி',
    requestNotes: 'கூடுதல் குறிப்புகள் / செய்தி',
    submitAppBtn: 'உரிமையாளருக்கு விண்ணப்பத்தை சமர்ப்பிக்கவும்',
    compareTitle: 'தங்குமிடங்களை ஒப்பிடுக',
    directChatTitle: 'உரிமையாளருடன் நேரடி உரையாடல்',
    sendMessageBtn: 'செய்தி அனுப்பு',

    // Login Screen
    loginTitle: 'UniNest மாணவர் வீட்டுவசதி தளம்',
    loginSubtitle: 'இலங்கை பல்கலைக்கழகங்களுக்கு அருகில் சரிபார்க்கப்பட்ட மாணவர் போர்டிங் அறைகள் மற்றும் குடியிருப்புகளைக் கண்டறியவும்',
    selectRole: 'நுழைய கணக்கு பங்கைத் தேர்ந்தெடுக்கவும்',
    enterAsStudent: 'பல்கலைக்கழக மாணவராக நுழைக',
    enterAsLandlord: 'வீட்டு உரிமையாளராக நுழைக',
    quickDemoHint: 'நேரடி அம்சங்களை ஆராய கீழே உள்ள எந்த பங்கையும் கிளிக் செய்யவும்'
  },
  si: {
    // Brand & Navbar
    brandSubStudent: 'ශිෂ්‍ය නිවාස',
    brandSubLandlord: 'නිවාස හිමි ද්වාරය',
    navFindHousing: 'නිවාස සොයන්න',
    navAllMarketHouses: 'සියලුම වෙළඳපල නිවාස',
    navStudentDashboard: 'මගේ ශිෂ්‍ය පුවරුව',
    navLandlordDashboard: 'නිවාස හිමි පුවරුව',
    navPostNewListing: 'නව නිවාස ලැයිස්තුව',
    navCompare: 'සසඳන්න',
    navLogout: 'ගිණුම මාරු කරන්න / ලොග් අවුට්',
    navAllUniversities: 'සියලුම විශ්වවිද්‍යාල පරිශ්‍රයන්',
    savedUnits: 'සුරකින ලද නිවාස',

    // Hero Section
    heroTitle: 'ඔබේ කැම්පස් එක අසලම හොඳම ශිෂ්‍ය නිවාස සොයාගන්න',
    heroSubtitle: 'ශ්‍රී ලංකා විශ්වවිද්‍යාල අසල තහවුරු කරන ලද බෝඩිම් කාමර, ඇනෙක්ස් සහ නිවාස.',
    searchPlaceholder: 'ස්ථානය, පීඨය, කාමර වර්ගය අනුව සොයන්න...',
    filterAll: 'සියලුම නිවාස',
    filterWalking: 'මිනිත්තු 5 ඇවිදින දුර',
    filterGirls: 'ගැහැණු ළමුන් සඳහා පමණි',
    filterBills: 'ගාස්තු ඇතුළත්',
    filterBudget: 'රු. 20,000 ට අඩු',

    // Filter Sidebar
    filterHeading: 'පෙරහන්',
    maxMonthlyRent: 'උපරිම මාසික කුලිය',
    maxDistance: 'කැම්පස් එකේ සිට උපරිම දුර',
    propertyType: 'දේපල වර්ගය',
    genderPref: 'ස්ත්‍රී පුරුෂ භාවය',
    anyGender: 'ඕනෑම අයෙකුට',
    boysOnly: 'පිරිමි ළමුන් සඳහා පමණි',
    girlsOnly: 'ගැහැණු ළමුන් සඳහා පමණි',
    billsIncludedOnly: 'ඇතුළත් ගාස්තු සහිත නිවාස පමණි',
    resetFilters: 'සියලුම පෙරහන් යළි සැකසීම',
    allCampuses: 'සියලුම කැම්පස්',
    underDist: 'ඇතුළත',

    // Listing Cards & Details
    monthlyRent: 'මාසික කුලිය',
    securityDeposit: 'ආපසු ගෙවන තැන්පතුව',
    perMonth: '/ මාසයට',
    viewUnit: 'විස්තර බලන්න',
    viewDetails: 'විස්තර බලන්න',
    googleLocation: 'Google සිතියම',
    openMaps: 'Google Maps හි බලන්න',
    minWalk: 'මිනිත්තු ඇවිදින දුර',
    includedBills: 'ඇතුළත් ගාස්තු',
    wifi: 'Wi-Fi',
    water: 'ජලය',
    electricity: 'විදුලිය',
    scheduleViewing: 'නැරඹීමට වේලාවක් වෙන්කරගන්න / ඉල්ලුම් කරන්න',
    messageLandlord: 'නිවාස හිමියාට පණිවිඩයක් යවන්න',
    owner: 'හිමිකරු',

    // Landlord Dashboard
    landlordPortalTag: 'නිවාස හිමි ද්වාරය',
    landlordDashboardTitle: 'නිවාස හිමි කළමනාකරණ පුවරුව',
    landlordSub: 'ඔබේ ශිෂ්‍ය නිවාස ලැයිස්තු කළමනාකරණය කරන්න, ශිෂ්‍ය ඉල්ලුම්පත්‍ර පරීක්ෂා කරන්න, සහ ශිෂ්‍යයන් සමඟ ඍජුවම කතාබස් කරන්න.',
    myActiveListings: 'මගේ සක්‍රීය ලැයිස්තු',
    pendingApplications: 'පෙண்டிං ඉල්ලුම්පත්‍ර',
    approvedTenants: 'අනුමත වූ කුලීකරුවන්',
    allPlatformHouses: 'සියලුම ප්ලැට්ෆෝම් නිවාස',
    tabApplications: 'ශිෂ්‍ය ඉල්ලුම්පත්‍ර',
    tabMessages: 'ඍජු ශිෂ්‍ය විමසීම්',
    tabMyListings: 'මගේ ලැයිස්තු',
    tabAllListings: 'සියලුම වෙළඳපල නිවාස',
    postNewAccom: 'නව නවාතැනක් පළකරන්න',
    acceptApp: 'ඉල්ලුම්පත පිළිගන්න',
    declineApp: 'ප්‍රතික්ෂේප කරන්න',
    undoDecision: 'තීරණය වෙනස් කරන්න',
    editListing: 'වෙනස් කරන්න',
    deleteListing: 'ඉවත් කරන්න',
    totalYield: 'මුළු ආදායම් විභවය',

    // Student Dashboard
    studentPortalTag: 'ශිෂ්‍ය නිවාස ද්වාරය',
    studentPortalTitle: 'ශිෂ්‍ය නිවාස ද්වාරය',
    studentPortalSub: 'ඔබේ කුලී ඉල්ලුම්පත්‍ර පරීක්ෂා කරන්න, සුරකින ලද බෝඩිම් බලන්න, සහ නිවාස හිමියන් සමඟ කතාබස් කරන්න.',
    tabRentalApps: 'මගේ කුලී ඉල්ලුම්පත්‍ර',
    tabDirectMsgs: 'ඍජු පණිවිඩ',
    tabSavedHouses: 'සුරකින ලද බෝඩිම් නිවාස',
    targetMoveIn: 'පදිංචි වන දිනය',
    approvedByOwner: 'හිමිකරු විසින් අනුමත කරන ලදී!',
    replyMessage: 'පිළිතුරු යවන්න',
    removeBookmark: 'ඉවත් කරන්න',

    // Modals
    scheduleTitle: 'නැරඹීමට වේලාවක් වෙන්කරගන්න හෝ ඉල්ලුම් කරන්න',
    studentNameLabel: 'ඔබේ සම්පූර්ණ නම',
    studentEmailLabel: 'විද්‍යුත් තැපෑල',
    studentPhoneLabel: 'දුරකථන අංකය',
    universityLabel: 'ඔබේ විශ්වවිද්‍යාලය',
    facultyLabel: 'පීඨය / දෙපාර්තමේන්තුව',
    studentIdLabel: 'ශිෂ්‍ය ලියාපදිංචි අංකය / ජා.හැ. අංකය',
    desiredMoveIn: 'පදිංචි වීමට බලාපොරොත්තු වන දිනය',
    requestNotes: 'අමතර සටහන් / පණිවිඩය',
    submitAppBtn: 'ඉල්ලුම්පත නිවාස හිමියාට යවන්න',
    compareTitle: 'නිවාස සසඳා බලන්න',
    directChatTitle: 'නිවාස හිමියා සමඟ ඍජු කතාබහ',
    sendMessageBtn: 'පණිවිඩය යවන්න',

    // Login Screen
    loginTitle: 'UniNest ශිෂ්‍ය නිවාස ප්ලැට්ෆෝමය',
    loginSubtitle: 'ශ්‍රී ලංකා විශ්වවිද්‍යාල අසල තහවුරු කරන ලද බෝඩිම් කාමර, ඇනෙක්ස් සහ නිවාස සොයාගන්න',
    selectRole: 'ඇතුළු වීමට ගිණුම් වර්ගය තෝරන්න',
    enterAsStudent: 'විශ්වවිද්‍යාල ශිෂ්‍යයෙකු ලෙස ඇතුළු වන්න',
    enterAsLandlord: 'නිවාස හිමියෙකු ලෙස ඇතුළු වන්න',
    quickDemoHint: 'පහත ගිණුම් වර්ගයකට ක්ලික් කර ඇතුළු වන්න'
  }
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇱🇰' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' }
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('uninest_language') || 'en';
  });

  const setLanguage = (langCode) => {
    if (TRANSLATIONS[langCode]) {
      setLanguageState(langCode);
      localStorage.setItem('uninest_language', langCode);
    }
  };

  const t = (key, fallback = '') => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    // Fallback to English
    if (TRANSLATIONS.en && TRANSLATIONS.en[key] !== undefined) {
      return TRANSLATIONS.en[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
