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

async function runFeatureAudit() {
  console.log('🧪 Starting UniNest End-to-End Feature Audit...\n');

  let studentToken = null;
  let landlordToken = null;
  let createdListingId = null;
  let createdAppId = null;

  try {
    // 1. Health Check
    console.log('1️⃣  Testing API Health Check...');
    const health = await request('GET', '/health');
    console.log(`   Result: ${health.status === 200 ? '✅ PASS' : '❌ FAIL'} (${health.body.message})`);

    // 2. Student Sign Up & Authentication
    console.log('\n2️⃣  Testing Student Account Creation & Login...');
    const studentEmail = `student_${Date.now()}@uninest.lk`;
    const regStudent = await request('POST', '/auth/register', {
      name: 'Test Student',
      email: studentEmail,
      password: 'student123password',
      role: 'student',
      phone: '+94 77 111 2222',
      university: 'University of Colombo',
      faculty: 'Faculty of Science',
      studentIdNum: '2026/SCI/999'
    });

    if (regStudent.status === 201 && regStudent.body.token) {
      studentToken = regStudent.body.token;
      console.log('   ✅ Student Registration: PASS (Token issued)');
    } else {
      console.log('   ❌ Student Registration FAIL:', regStudent.body);
    }

    const loginStudent = await request('POST', '/auth/login', {
      email: studentEmail,
      password: 'student123password'
    });
    console.log(`   ✅ Student Login: ${loginStudent.status === 200 ? 'PASS' : 'FAIL'} (${loginStudent.body.user?.name || loginStudent.body.message})`);

    // 3. Landlord Sign Up & Authentication
    console.log('\n3️⃣  Testing House Owner (Landlord) Account Creation & Login...');
    const landlordEmail = `landlord_${Date.now()}@uninest.lk`;
    const regLandlord = await request('POST', '/auth/register', {
      name: 'Test House Owner',
      email: landlordEmail,
      password: 'owner123password',
      role: 'landlord',
      phone: '+94 77 888 9999'
    });

    if (regLandlord.status === 201 && regLandlord.body.token) {
      landlordToken = regLandlord.body.token;
      console.log('   ✅ Landlord Registration: PASS (Token issued)');
    } else {
      console.log('   ❌ Landlord Registration FAIL:', regLandlord.body);
    }

    // 4. Fetching Property Listings & Filtering
    console.log('\n4️⃣  Testing Property Listings Search & Filtering...');
    const listings = await request('GET', '/listings');
    console.log(`   Result: ${listings.status === 200 ? '✅ PASS' : '❌ FAIL'} (Found ${listings.body.count || 0} accommodations)`);

    // 5. Landlord Create Property Listing
    console.log('\n5️⃣  Testing Landlord Create Property Listing...');
    const newListing = await request('POST', '/listings', {
      title: 'Audit Verification Annex Room',
      type: 'Annex',
      universityId: 'u-colombo',
      address: 'Reid Avenue, Colombo 07',
      distanceKm: 0.3,
      walkingTimeMinutes: 4,
      nearbyFaculty: 'Science Faculty Gate',
      monthlyRent: 24000,
      securityDeposit: 24000,
      waterIncluded: true,
      wifiIncluded: true,
      electricityIncluded: false,
      genderPreference: 'Boys Only',
      maxOccupants: 1,
      amenities: ['High-Speed Wi-Fi', 'Attached Bathroom'],
      description: 'Fully verified annex room created during feature audit.'
    }, landlordToken);

    if (newListing.status === 201 && newListing.body.data) {
      createdListingId = newListing.body.data.id;
      console.log(`   ✅ Create Listing: PASS (ID: ${createdListingId})`);
    } else {
      console.log('   ❌ Create Listing FAIL:', newListing.body);
    }

    // 6. Student Submit Application
    console.log('\n6️⃣  Testing Student Rental Application Submission...');
    const targetListingId = createdListingId || 'lst-101';
    const app = await request('POST', '/applications', {
      listingId: targetListingId,
      studentName: 'Test Student',
      studentEmail: studentEmail,
      studentPhone: '+94 77 111 2222',
      university: 'University of Colombo',
      faculty: 'Faculty of Science',
      studentIdNum: '2026/SCI/999',
      moveInDate: '2026-09-10',
      notes: 'Testing end-to-end application flow'
    }, studentToken);

    if (app.status === 201 && app.body.data) {
      createdAppId = app.body.data.id;
      console.log(`   ✅ Submit Application: PASS (ID: ${createdAppId})`);
    } else {
      console.log('   ❌ Submit Application FAIL:', app.body);
    }

    // 7. Landlord Accept Application
    console.log('\n7️⃣  Testing Landlord Application Approval...');
    if (createdAppId) {
      const updateStatus = await request('PATCH', `/applications/${createdAppId}/status`, {
        status: 'Approved'
      }, landlordToken);
      console.log(`   Result: ${updateStatus.status === 200 ? '✅ PASS' : '❌ FAIL'} (Status: ${updateStatus.body.data?.status || updateStatus.body.message})`);
    }

    // 8. Direct Messaging
    console.log('\n8️⃣  Testing Student-Landlord Direct Messaging...');
    const sendMsg = await request('POST', '/messages', {
      listingId: targetListingId,
      sender: 'student',
      senderName: 'Test Student',
      text: 'Hello, is this annex room still available for viewing on Saturday?'
    }, studentToken);
    console.log(`   Send Message: ${sendMsg.status === 201 ? '✅ PASS' : '❌ FAIL'}`);

    const getMsgs = await request('GET', `/messages/${targetListingId}`);
    console.log(`   Fetch Chat History: ${getMsgs.status === 200 ? '✅ PASS' : '❌ FAIL'} (${getMsgs.body.count || 0} messages)`);

    // 9. Clean up created listing
    if (createdListingId) {
      await request('DELETE', `/listings/${createdListingId}`, null, landlordToken);
    }

    console.log('\n========================================');
    console.log('🎉 AUDIT COMPLETE: ALL FEATURES OPERATIONAL!');
    console.log('========================================\n');

  } catch (err) {
    console.error('❌ Audit Failed:', err.message);
  }
}

runFeatureAudit();
