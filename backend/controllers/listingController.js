const supabase = require('../config/supabase');

// Format Supabase record to match Frontend listing object structure
const formatListing = (item, landlordUser = null) => {
  return {
    id: item.id,
    title: item.title,
    type: item.type,
    universityId: item.university_id,
    address: item.address,
    distanceKm: parseFloat(item.distance_km || 0),
    walkingTimeMinutes: parseInt(item.walking_time_minutes || 0),
    nearbyFaculty: item.nearby_faculty,
    monthlyRent: parseFloat(item.monthly_rent || 0),
    securityDeposit: parseFloat(item.security_deposit || 0),
    billsIncluded: {
      water: item.water_included ?? true,
      electricity: item.electricity_included ?? false,
      wifi: item.wifi_included ?? true
    },
    genderPreference: item.gender_preference || 'Any',
    maxOccupants: parseInt(item.max_occupants || 1),
    verified: item.verified ?? true,
    rating: parseFloat(item.rating || 5.0),
    reviewCount: parseInt(item.review_count || 0),
    images: item.images && item.images.length > 0 ? item.images : [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: item.amenities || [],
    houseRules: item.house_rules || [],
    description: item.description || '',
    landlord: landlordUser ? {
      id: landlordUser.id,
      name: landlordUser.name,
      phone: landlordUser.phone,
      email: landlordUser.email,
      avatar: landlordUser.avatar_url,
      verified: landlordUser.verified,
      responseRate: landlordUser.response_rate || '98% within 1 hour',
      joinedYear: landlordUser.joined_year || '2026'
    } : (item.landlord || {
      id: item.landlord_id,
      name: 'Verified Landlord',
      phone: '+94 77 123 4567',
      email: 'landlord@uninest.lk',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      verified: true,
      responseRate: '98% within 1 hour',
      joinedYear: '2026'
    })
  };
};

// @desc    Get all listings with search and filter support
// @route   GET /api/listings
// @access  Public
const getListings = async (req, res) => {
  try {
    const { universityId, propertyType, maxRent, maxDistance, gender, searchQuery } = req.query;

    let query = supabase.from('listings').select('*, landlord:users(*)');

    if (universityId && universityId !== 'all') {
      query = query.eq('university_id', universityId);
    }
    if (propertyType && propertyType !== 'all') {
      query = query.eq('type', propertyType);
    }
    if (maxRent) {
      query = query.lte('monthly_rent', parseFloat(maxRent));
    }
    if (maxDistance) {
      query = query.lte('distance_km', parseFloat(maxDistance));
    }
    if (gender && gender !== 'Any') {
      query = query.eq('gender_preference', gender);
    }

    const { data: listings, error } = await query;

    if (error) {
      console.error('Supabase getListings error:', error.message);
      return res.status(500).json({ success: false, message: error.message });
    }

    let result = (listings || []).map((item) => formatListing(item, item.landlord));

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.nearbyFaculty.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    console.error('getListings error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single listing by ID
// @route   GET /api/listings/:id
// @access  Public
const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: item, error } = await supabase
      .from('listings')
      .select('*, landlord:users(*)')
      .eq('id', id)
      .single();

    if (error || !item) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    res.json({ success: true, data: formatListing(item, item.landlord) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new property listing (Landlord only)
// @route   POST /api/listings
// @access  Private (Landlord)
const createListing = async (req, res) => {
  try {
    const {
      title,
      type,
      universityId,
      address,
      distanceKm,
      walkingTimeMinutes,
      nearbyFaculty,
      monthlyRent,
      securityDeposit,
      waterIncluded,
      electricityIncluded,
      wifiIncluded,
      genderPreference,
      maxOccupants,
      amenities,
      houseRules,
      description,
      images: imageUrls
    } = req.body;

    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = req.files.map(file => file.path);
    } else if (imageUrls && Array.isArray(imageUrls)) {
      uploadedImages = imageUrls;
    } else {
      uploadedImages = [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'
      ];
    }

    const newListing = {
      landlord_id: req.user ? req.user.id : null,
      title,
      type,
      university_id: universityId,
      address,
      distance_km: parseFloat(distanceKm || 0.5),
      walking_time_minutes: parseInt(walkingTimeMinutes || 5),
      nearby_faculty: nearbyFaculty || '',
      monthly_rent: parseFloat(monthlyRent || 0),
      security_deposit: parseFloat(securityDeposit || 0),
      water_included: waterIncluded === 'true' || waterIncluded === true,
      electricity_included: electricityIncluded === 'true' || electricityIncluded === true,
      wifi_included: wifiIncluded === 'true' || wifiIncluded === true,
      gender_preference: genderPreference || 'Any',
      max_occupants: parseInt(maxOccupants || 1),
      verified: true,
      rating: 5.0,
      review_count: 0,
      images: uploadedImages,
      amenities: typeof amenities === 'string' ? JSON.parse(amenities) : (amenities || []),
      house_rules: typeof houseRules === 'string' ? JSON.parse(houseRules) : (houseRules || []),
      description: description || ''
    };

    const { data, error } = await supabase
      .from('listings')
      .insert([newListing])
      .select('*, landlord:users(*)')
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: formatListing(data, data.landlord)
    });
  } catch (error) {
    console.error('createListing error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private (Landlord)
const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.json({ success: true, message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  deleteListing
};
