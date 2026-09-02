const supabase = require('../config/supabase');

// Format application record to match Frontend state structure
const formatApplication = (item) => {
  return {
    id: item.id,
    listingId: item.listing_id,
    listingTitle: item.listing ? item.listing.title : (item.listing_title || 'Accommodation Unit'),
    studentName: item.student_name,
    studentEmail: item.student_email,
    studentPhone: item.student_phone,
    university: item.university,
    faculty: item.faculty,
    studentIdNum: item.student_id_num,
    moveInDate: item.move_in_date,
    status: item.status || 'Pending',
    notes: item.notes || '',
    createdAt: item.created_at
  };
};

// @desc    Submit rental application / viewing request
// @route   POST /api/applications
// @access  Public / Student Private
const createApplication = async (req, res) => {
  try {
    const {
      listingId,
      studentName,
      studentEmail,
      studentPhone,
      university,
      faculty,
      studentIdNum,
      moveInDate,
      notes
    } = req.body;

    if (!listingId || !studentName || !studentEmail || !moveInDate) {
      return res.status(400).json({ success: false, message: 'Please provide all required application fields' });
    }

    const newApp = {
      listing_id: listingId,
      student_id: req.user ? req.user.id : null,
      student_name: studentName,
      student_email: studentEmail,
      student_phone: studentPhone || '',
      university: university || 'University of Colombo',
      faculty: faculty || 'Computing',
      student_id_num: studentIdNum || '2026/UG/001',
      move_in_date: moveInDate,
      status: 'Pending',
      notes: notes || ''
    };

    const { data, error } = await supabase
      .from('applications')
      .insert([newApp])
      .select('*, listing:listings(title)')
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: formatApplication(data)
    });
  } catch (error) {
    console.error('createApplication error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applications for logged-in student
// @route   GET /api/applications/student
// @access  Private (Student)
const getStudentApplications = async (req, res) => {
  try {
    let query = supabase.from('applications').select('*, listing:listings(title)');
    
    if (req.user && req.user.id) {
      query = query.eq('student_id', req.user.id);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    const formatted = (data || []).map(formatApplication);
    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applications received for landlord listings
// @route   GET /api/applications/landlord
// @access  Private (Landlord)
const getLandlordApplications = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*, listing:listings(title, landlord_id)');

    if (error) {
      throw error;
    }

    const formatted = (data || []).map(formatApplication);
    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application status (Approved / Declined)
// @route   PATCH /api/applications/:id/status
// @access  Private (Landlord)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Declined', 'Pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*, listing:listings(title)')
      .single();

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: `Application ${status.toLowerCase()} successfully`,
      data: formatApplication(data)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createApplication,
  getStudentApplications,
  getLandlordApplications,
  updateApplicationStatus
};
