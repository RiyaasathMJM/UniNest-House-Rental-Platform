const supabase = require('./config/supabase');
const { cloudinary } = require('./config/cloudinary');

async function testConnections() {
  console.log('--- CONNECTION TEST START ---');

  // Cloudinary
  try {
    const res = await cloudinary.api.ping();
    console.log('☁️ CLOUDINARY:', res.status === 'ok' ? 'SUCCESS (Connected!)' : res);
  } catch (err) {
    console.log('☁️ CLOUDINARY ERROR:', err.message);
  }

  // Supabase
  try {
    const response = await supabase.from('users').select('id').limit(1);
    console.log('⚡ SUPABASE RESPONSE:', JSON.stringify(response));
    if (response.error) {
      if (response.error.code === '42P01' || response.error.message.includes('does not exist')) {
        console.log('⚡ SUPABASE STATUS: Connected to Supabase Server! (Tables not created yet)');
      } else {
        console.log('⚡ SUPABASE ERROR DETAIL:', response.error);
      }
    } else {
      console.log('⚡ SUPABASE STATUS: SUCCESS (Connected & Tables Ready!)');
    }
  } catch (err) {
    console.log('⚡ SUPABASE EXCEPTION:', err.message);
  }

  console.log('--- CONNECTION TEST END ---');
  process.exit(0);
}

testConnections();
