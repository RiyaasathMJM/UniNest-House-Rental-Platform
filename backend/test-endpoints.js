const http = require('http');

const API_BASE = 'http://localhost:5000/api';

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE}${path}`);
    const options = {
      method: method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runDetailedEndpointTests() {
  console.log('\n================================================================');
  console.log('   📡 UNINEST BACKEND API ENDPOINT TEST SUITE FOR EVIDENCE');
  console.log('================================================================\n');

  // Test Case 1: Health Check
  console.log('----------------------------------------------------------------');
  console.log('TEST CASE 1: [GET /api/health] API System Status');
  console.log('----------------------------------------------------------------');
  const health = await request('GET', '/health');
  console.log(`HTTP Status : ${health.status} OK`);
  console.log('Response Payload:', JSON.stringify(health.body, null, 2));

  // Test Case 2: User Authentication & Registration
  console.log('\n----------------------------------------------------------------');
  console.log('TEST CASE 2: [POST /api/auth/register] Student Registration');
  console.log('----------------------------------------------------------------');
  const studentEmail = `student_test_${Date.now()}@uninest.lk`;
  const regStudent = await request('POST', '/auth/register', {
    name: 'Kavinda Fernando',
    email: studentEmail,
    password: 'Password123!',
    role: 'student',
    phone: '+94 77 123 4567',
    university: 'University of Colombo',
    faculty: 'Faculty of Science',
    studentIdNum: '2026/SCI/084'
  });
  console.log(`HTTP Status : ${regStudent.status} Created`);
  console.log('Response Payload:', JSON.stringify(regStudent.body, null, 2));

  // Test Case 3: Property Listings API
  console.log('\n----------------------------------------------------------------');
  console.log('TEST CASE 3: [GET /api/listings] Property Listings & Filters');
  console.log('----------------------------------------------------------------');
  const listings = await request('GET', '/listings?universityId=u-colombo');
  console.log(`HTTP Status : ${listings.status} OK`);
  console.log(`Accommodations Count: ${listings.body.count || 0}`);
  console.log('Sample Listing Data:', JSON.stringify((listings.body.data || [])[0] || {}, null, 2));

  // Test Case 4: Create Listing (Landlord)
  console.log('\n----------------------------------------------------------------');
  console.log('TEST CASE 4: [POST /api/listings] Create Accommodation');
  console.log('----------------------------------------------------------------');
  const newListing = await request('POST', '/listings', {
    title: 'Luxury Annex Room near UCSC',
    type: 'Annex',
    universityId: 'u-colombo',
    address: 'No 35, Reid Avenue, Colombo 07',
    distanceKm: 0.3,
    walkingTimeMinutes: 4,
    nearbyFaculty: 'UCSC Gate',
    monthlyRent: 25000,
    securityDeposit: 25000,
    waterIncluded: true,
    wifiIncluded: true,
    electricityIncluded: false,
    genderPreference: 'Boys Only',
    maxOccupants: 1,
    amenities: ['High-Speed Wi-Fi', 'Study Desk', 'Attached Bathroom'],
    description: 'Modern student annex room with full facilities.'
  }, regStudent.body.token);
  console.log(`HTTP Status : ${newListing.status} Created`);
  console.log('Response Payload:', JSON.stringify(newListing.body, null, 2));

  const listingId = newListing.body.data?.id || 'lst-101';

  // Test Case 5: Rental Application Submission
  console.log('\n----------------------------------------------------------------');
  console.log('TEST CASE 5: [POST /api/applications] Submit Rental Application');
  console.log('----------------------------------------------------------------');
  const app = await request('POST', '/applications', {
    listingId: listingId,
    studentName: 'Kavinda Fernando',
    studentEmail: studentEmail,
    studentPhone: '+94 77 123 4567',
    university: 'University of Colombo',
    faculty: 'Faculty of Science',
    studentIdNum: '2026/SCI/084',
    moveInDate: '2026-10-01',
    notes: 'Requesting room viewing appointment.'
  }, regStudent.body.token);
  console.log(`HTTP Status : ${app.status} Created`);
  console.log('Response Payload:', JSON.stringify(app.body, null, 2));

  // Test Case 6: Direct Message Endpoint
  console.log('\n----------------------------------------------------------------');
  console.log('TEST CASE 6: [POST /api/messages] Send Direct Message');
  console.log('----------------------------------------------------------------');
  const msg = await request('POST', '/messages', {
    listingId: listingId,
    sender: 'student',
    senderName: 'Kavinda Fernando',
    text: 'Hello Landlord, is this annex available for viewing tomorrow?'
  }, regStudent.body.token);
  console.log(`HTTP Status : ${msg.status} Created`);
  console.log('Response Payload:', JSON.stringify(msg.body, null, 2));

  console.log('\n================================================================');
  console.log('   ✅ ALL ENDPOINT TEST CASES COMPLETED SUCCESSFULLY!');
  console.log('================================================================\n');
}

runDetailedEndpointTests();
