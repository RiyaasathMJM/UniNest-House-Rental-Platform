const supabase = require('./config/supabase');
const bcrypt = require('bcryptjs');

async function seed() {
  console.log('🌱 Starting Supabase Data Seeding...');

  try {
    const studentPasswordHash = await bcrypt.hash('student123', 10);
    const ownerPasswordHash = await bcrypt.hash('owner123', 10);

    const MOCK_USERS = [
      {
        name: 'Mrs. Jayasinghe',
        email: 'jayasinghe.rentals@gmail.com',
        password_hash: ownerPasswordHash,
        role: 'landlord',
        phone: '+94 77 123 4567',
        verified: true,
        response_rate: '98% within 1 hour',
        joined_year: '2022'
      },
      {
        name: 'UniNest House Owner Demo',
        email: 'owner@uninest.lk',
        password_hash: ownerPasswordHash,
        role: 'landlord',
        phone: '+94 77 987 6543',
        verified: true,
        response_rate: '100% within 30 mins',
        joined_year: '2023'
      },
      {
        name: 'Kavinda Fernando',
        email: 'kavinda.cs21@sci.cmb.ac.lk',
        password_hash: studentPasswordHash,
        role: 'student',
        phone: '+94 71 111 2233',
        university: 'University of Colombo',
        faculty: 'UCSC (Computing)',
        student_id_num: '2021/CS/084',
        verified: true
      },
      {
        name: 'UniNest Student Demo',
        email: 'student@uninest.lk',
        password_hash: studentPasswordHash,
        role: 'student',
        phone: '+94 71 999 8888',
        university: 'University of Colombo',
        faculty: 'Faculty of Science',
        student_id_num: '2022/SCI/101',
        verified: true
      }
    ];

    const MOCK_LISTINGS = [
      {
        id: 'lst-101',
        title: 'Modern Single Annex Room near UCSC',
        type: 'Annex',
        university_id: 'u-colombo',
        address: 'No. 45 Reid Avenue, Colombo 07',
        distance_km: 0.4,
        walking_time_minutes: 5,
        nearby_faculty: 'UCSC (Computing) & Science Faculty',
        monthly_rent: 22000,
        security_deposit: 22000,
        water_included: true,
        electricity_included: false,
        wifi_included: true,
        gender_preference: 'Boys Only',
        max_occupants: 1,
        verified: true,
        rating: 4.9,
        review_count: 14,
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
        house_rules: [
          'Strict Curfew at 10:30 PM',
          'No Smoking inside premises',
          'Quiet Hours after 10:00 PM',
          'Daytime visitors allowed until 7:30 PM'
        ],
        description: 'Bright and quiet single room inside a calm residential annex, ideal for computing and science students. Comes with high-speed fiber internet and a dedicated ergonomic study desk. 5 minutes walking distance to Reid Avenue complex.'
      },
      {
        id: 'lst-102',
        title: 'Spacious Girls Boarding Room with Kitchen',
        type: 'Boarding House',
        university_id: 'u-colombo',
        address: 'Thurstan Road, Colombo 03',
        distance_km: 0.7,
        walking_time_minutes: 8,
        nearby_faculty: 'Faculty of Arts & Faculty of Law',
        monthly_rent: 18500,
        security_deposit: 18500,
        water_included: true,
        electricity_included: true,
        wifi_included: true,
        gender_preference: 'Girls Only',
        max_occupants: 2,
        verified: true,
        rating: 4.8,
        review_count: 22,
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
        house_rules: [
          'Curfew at 10:00 PM',
          'No Male Visitors inside rooms',
          'Shared kitchen cleaning turn system'
        ],
        description: 'Safe and secure female student boarding house located right next to Thurstan College and University of Colombo Arts gate. All utility bills (electricity, water, wifi) are fully included in the monthly rent.'
      },
      {
        id: 'lst-103',
        title: 'Luxury AC Studio near Engineering Faculty',
        type: 'Studio',
        university_id: 'u-moratuwa',
        address: 'Bandaranayake Mawatha, Katubedda',
        distance_km: 0.3,
        walking_time_minutes: 4,
        nearby_faculty: 'Faculty of Engineering & IT',
        monthly_rent: 35000,
        security_deposit: 35000,
        water_included: true,
        electricity_included: false,
        wifi_included: true,
        gender_preference: 'Any',
        max_occupants: 2,
        verified: true,
        rating: 5.0,
        review_count: 9,
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
        house_rules: [
          'No heavy loud music after 11 PM',
          'Utility bill paid based on separate sub-meter'
        ],
        description: 'Self-contained luxury studio apartment for undergraduate or postgraduate students who prefer privacy. Includes inverter AC, mini-kitchenette, private balcony, and high-speed fiber connection.'
      },
      {
        id: 'lst-104',
        title: 'Peradeniya Riverview Shared Apartment',
        type: 'Shared Flat',
        university_id: 'u-peradeniya',
        address: 'Old Galaha Road, Peradeniya',
        distance_km: 0.8,
        walking_time_minutes: 10,
        nearby_faculty: 'Engineering & Science Faculty',
        monthly_rent: 16000,
        security_deposit: 16000,
        water_included: true,
        electricity_included: false,
        wifi_included: true,
        gender_preference: 'Boys Only',
        max_occupants: 3,
        verified: false,
        rating: 4.6,
        review_count: 18,
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
        house_rules: [
          'Keep shared living room clean',
          'Guests allowed with prior roommate consent'
        ],
        description: 'Scenic shared 3-bedroom apartment along Old Galaha Road with Mahaweli river breeze. Perfect for engineering students looking for a friendly shared community house.'
      },
      {
        id: 'lst-105',
        title: 'Quiet Study Room near Kelaniya Main Campus',
        type: 'Boarding House',
        university_id: 'u-kelaniya',
        address: 'Kandy Road, Dalugama',
        distance_km: 0.5,
        walking_time_minutes: 6,
        nearby_faculty: 'Faculty of Humanities & Science',
        monthly_rent: 15000,
        security_deposit: 15000,
        water_included: true,
        electricity_included: true,
        wifi_included: true,
        gender_preference: 'Any',
        max_occupants: 1,
        verified: true,
        rating: 4.7,
        review_count: 11,
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
        house_rules: [
          'Strict No Alcohol policy',
          'Curfew 10:00 PM'
        ],
        description: 'Affordable single student room in a peaceful boarding house family environment. Walking distance to Kelaniya university main gate and bus stop.'
      }
    ];

    // 1. Seed Users
    console.log('Pushing users...');
    const { data: usersData, error: usersErr } = await supabase
      .from('users')
      .upsert(MOCK_USERS, { onConflict: 'email' })
      .select();

    if (usersErr) throw usersErr;
    console.log(`✅ Seeded ${usersData ? usersData.length : 0} users.`);

    // 2. Seed Listings
    console.log('Pushing listings...');
    const { data: listingsData, error: listingsErr } = await supabase
      .from('listings')
      .upsert(MOCK_LISTINGS, { onConflict: 'id' })
      .select();

    if (listingsErr) throw listingsErr;
    console.log(`✅ Seeded ${listingsData ? listingsData.length : 0} property listings.`);

    console.log('🎉 Seeding successfully completed!');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  }
}

seed();
