const supabase = require('../config/supabase');

// Format message record to match Frontend structure
const formatMessage = (item) => {
  return {
    id: item.id,
    listingId: item.listing_id,
    sender: item.sender_role,
    senderName: item.sender_name,
    text: item.text,
    timestamp: new Date(item.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

// @desc    Get message history for listing / chat thread
// @route   GET /api/messages/:listingId
// @access  Public / Private
const getMessagesByListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    const formatted = (data || []).map(formatMessage);
    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Send new message
// @route   POST /api/messages
// @access  Public / Private
const sendMessage = async (req, res) => {
  try {
    const { listingId, sender, senderName, text } = req.body;

    if (!listingId || !text) {
      return res.status(400).json({ success: false, message: 'Please provide listing ID and text' });
    }

    const newMsg = {
      listing_id: listingId,
      sender_id: req.user ? req.user.id : null,
      sender_role: sender || 'student',
      sender_name: senderName || (req.user ? req.user.name : 'Student Inquiry'),
      text
    };

    const { data, error } = await supabase
      .from('messages')
      .insert([newMsg])
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: formatMessage(data)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMessagesByListing,
  sendMessage
};
